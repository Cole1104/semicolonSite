"use client"
import { useEffect, useRef, useState } from "react";
import styles from '../app/chat.module.css'

import { io } from "socket.io-client";
import MessageBox from "./MessageBox";

import Router from "next/router";
import Navi from "./Navi";

export const ioC = io('http://localhost:3001',{
    autoConnect: false
})
export default function Chatpage(){

    const [chatLog, setChatLog] = useState([
        {
            sender:"system",
            type:"join",
            message:"매칭하시겠습니까?"
        }
    ])

    const [matchedRoom,setMatchedRoom] = useState('');

    useEffect(()=>{
       if(localStorage.getItem('isLogin') == 'false'){
        Router.push('/fronturl');
       }
        ioC.on('connect',()=>{
            console.log(ioC.id);
            setChatLog(current=>[...current,{sender:"system",type:"matching",message:"매칭 중 입니다..."}])
        });
        ioC.on('matched!',(room)=>{
            console.log("matched!");
            setMatchedRoom(room);
            setChatLog(current=>[...current,{sender:"system",type:"matched",message:"매칭 되었습니다!"}])
        });
        ioC.on('messaged',(value,name)=>{
            
            setChatLog(current=>[...current,{sender:name,type:"user_message",message:value}])
        })
        ioC.on('byebye',()=>{
            ioC.disconnect();
            setMatchedRoom('')
            setChatLog(current =>[...current,{sender:"system",type:"byebye",message:"상대방과의 연결이 끊어졌습니다."}])
            setTimeout(()=>{setChatLog(current=>[...current,{sender:"system",type:"rejoin",message:"다시 매칭 하시겠습니까?"}])},1000)
            
            
        })

        return () =>{
            ioC.removeAllListeners();
        }
    },[])

    const reff = useRef();
    const bodyRef = useRef();

    function handleChatLog(sender,type,message){
        setChatLog(current=>[...current,{sender:sender,type:type,message:message}])
    }
    function handleSubmit(e){
        try {
            e.preventDefault();
        if(reff.current.value == '' /*|matchedRoom == ''*/){
            reff.current.value = '';
            return;
        }
        
        if(window.localStorage.getItem('userName') !== undefined){
            setChatLog([...chatLog,{sender:window.localStorage.getItem('userName'),type:"user_message",message:reff.current.value}]);
            ioC.emit('message',reff.current.value,matchedRoom,window.localStorage.getItem('userName'));
        }

        
        
        
        reff.current.value = '';

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        
        if(chatLog.length >99){
            chatLog.shift();
        }
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    },[chatLog])



    return(
    <>
    <Navi/>

    <div className=" py-24  h-screen overflow-scroll" ref={bodyRef}>
    
    

    {chatLog.map((element,index)=> {
        return <MessageBox
        key={index}
        message={element.message}
        sender={element.sender}
        type={element.type}
        isLast={chatLog.length == index+1 ? true: false}
            
        
        
        />
    }
    )}

    
    <div className=" fixed bottom-0">
        <form onSubmit={handleSubmit}>
            <input type='textarea' ref={reff}></input>
            <button>보내기</button>
        </form>
    </div>

    </div>
    </>
    )
}