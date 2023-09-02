import { useEffect, useRef, useState } from "react";
import MessageBox from "../components/MessageBox";
import Navi from "../components/Navi";
import styles from '../src/app/chat.module.css'
import { io } from "socket.io-client";
import Button from 'react-bootstrap/Button';

const ioC = io('http://localhost:3001',{
    autoConnect: false
})
function chat(){
    const [matchedRoom,setMatchedRoom] = useState('');
    useEffect(()=>{
        ioC.on('connect',()=>{
            console.log(ioC.id);
        });
        ioC.on('matched!',(room)=>{
            console.log("matched!");
            setMatchedRoom(room);
            setITMD({});
        });
        ioC.on('messaged',(value)=>{
            setChatLog(current => [...current,{"value":value,"user":"someone"}])
        })
        ioC.on('byebye',()=>{
            setITR({});
            setMatchedRoom('')
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        })
        return () =>{
            ioC.removeAllListeners();
        }
    },[])
    const [MATCHEDBUTTON,setITMD] = useState({"display":"none"})
    const [REJOINBUTTON,setITR] = useState({"display":"none"})
    const [chatLog,setChatLog] = useState([]);
    const reff = useRef();
    const bodyRef = useRef();
    const [ENTERBUTTON,setITE] = useState({});
    const [MATCHING,setITM] = useState({"display":"none"});
    function handleSubmit(event){
        event.preventDefault();
        if(reff.current.value == '' || matchedRoom == ''){
            return;
        }
        setChatLog(current => [...current,{"value": reff.current.value, "user": "나"}]);
        ioC.emit('message',reff.current.value,matchedRoom);
    }
    
    function enterChat(){
        ioC.connect();
        console.log('connected');
        setITE({"display":"none"});
        setITM({});
    }
    function rejoinChat() {
        setITR({"display":"none"});
        setITE({"display":"none"});
        setITMD({"display":"none"})
        setITM({});
        setChatLog([]);
        ioC.disconnect();
        ioC.connect();
        
    }
    useEffect(()=>{
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        reff.current.value = '';
    },[chatLog])
    return(
    <div>
    <div className={styles.chatNavi}>
    <Navi title="채팅"/>
    </div>

    <div className={styles.chatBody} ref={bodyRef}>
    <div className={styles.excludedButton} style={ENTERBUTTON}>
            <h6>매칭하시겠습니까?</h6>
            <Button variant="dark" onClick={enterChat}>네</Button>
            <Button variant="light" href="/">아니요</Button>
        </div>
        <div className={styles.excludedButton} style={MATCHING}>
            매칭중...
        </div>
        <div className={styles.excludedButton} style={MATCHEDBUTTON}>
            <h6>매칭완료!</h6>
        </div>
        {chatLog.map((element,index) => <MessageBox value={element} key={index} index={index}/>)}
        <div className={styles.excludedButton} style={REJOINBUTTON}>
            <h6>상대가 나갔습니다. 다시 매칭하시겠습니까?</h6>
            <Button variant="dark" onClick={rejoinChat}>네</Button>
            <Button variant="light" href="/">아니요</Button>
        </div>
        
    </div>

    <div className={styles.chatInput}>
        <form onSubmit={handleSubmit}>
            <input type='text' ref={reff}></input>
            <button>보내기</button>
        </form>
    </div>
    </div>)
}
export default chat;