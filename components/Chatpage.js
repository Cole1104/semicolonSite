"use client"
import { useEffect, useRef, useState } from "react";
import styles from '../app/chat.module.css'

import { io } from "socket.io-client";
import MessageBox from "./MessageBox";
import { Jua } from 'next/font/google'

const inter = Jua({ subsets: ['latin'] ,weight:'400'})
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
    <div className={inter.className}>
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

    
    <div className=" fixed bottom-0 w-screen h-16 bg-slate-600">
        <form onSubmit={handleSubmit} className=" flex justify-center">
            <input type='textarea' ref={reff} className=" rounded-xl  justify-center w-3/4 m-2 text-3xl"></input>
            <button className="bg-white p-3  rounded-full ">
            <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            </button>
        </form>
    </div>

    </div>
    </div>
    </>
    )
}