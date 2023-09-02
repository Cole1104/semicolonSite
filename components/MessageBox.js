
"use client"
/*
<MessageBox
index={}
value={}
user={}
/>
*/ 

import { useEffect, useState } from "react";
import '../app/globals.css'
import { ioC } from "@/components/Chatpage";

import { useRouter } from "next/router";
import  Router  from "next/router";
function MessageBox(props){
    let MessageBoxStyleBackgroundColor;
    let MessageBoxStyleFloat = 'left';
    
    let animationCss;
    const [preRouter,setPreRouter] = useState(Router);
    const [hide,setHide] = useState();

    if(props.sender == 'system'){
        animationCss = 'messageBoxtruesystem';
        MessageBoxStyleBackgroundColor = 'rgb(214 211 209)';
    }else if(props.sender == window.localStorage.getItem('userName')){
        animationCss = 'messageBoxtrueme';
        MessageBoxStyleBackgroundColor = 'rgb(252 165 165)'
            MessageBoxStyleFloat = 'right'
    }else{
        animationCss = 'messageBoxtruesomeone';
        MessageBoxStyleBackgroundColor = 'rgb(94 234 212)';
    }
    
   
    function connect(){
        
        ioC.connect();
    }

    function hideExcludedButton(e){
        e.preventDefault();
        setHide({display:'none'});
    }

    function goToMainPage(){
        preRouter.push('/');
    }
    return(
    <>
    <div className={`${animationCss} bg-white m-4 p-4 mb-8 rounded-2xl w-2/3 `} style={{
        
        backgroundColor:MessageBoxStyleBackgroundColor,
        float:MessageBoxStyleFloat,
        overflow:'hidden'}}>
    <h5>{props.sender}</h5>
    <span className=" text-2xl">{props.message}</span>

    {props.type == 'rejoin' || props.type == 'join' ? 
    <div>
    <form style={hide} onSubmit={hideExcludedButton} className="p-3 grid grid-cols-2">
    <button className="mx-2 bg-white p-1 rounded-lg  text-2xl" onClick={connect}>yes</button>
    <button className="mx-2 bg-gray-600 p-1 rounded-lg  text-2xl text-white" onClick={goToMainPage}>no</button>
    </form>
    </div>
    : null}
    </div>
    {/*
    <div key={props.index}  className={`messageBox${props.isLast}${props.sender}`} style={{
        
        border:`2px solid ${MessageBoxStyleBackgroundColor}`,
        backgroundColor:MessageBoxStyleBackgroundColor,
        float:MessageBoxStyleFloat,
        overflow:'hidden',
        }}>
    

    

    </div>
    */
}
    </>
)
    }
export default MessageBox;