"use client"

import { GoogleLogin,LogOut,authh,getUserInfo } from "@/app/api/fbase";
import { useEffect, useState } from "react";
import Navi from "./Navi";






function Front() {
    const [frontLoginStatus,setFrontLoginStatus] = useState();




   useEffect(()=>{
    setFrontLoginStatus(localStorage.getItem('isLogin'))
   },[])

   if(frontLoginStatus == 'true'){

    return(
    <>
    <Navi/>
    <div className="pt-20 flex justify-center items-center h-screen">
    <div className=" grid grid-rows-2">
    <h1 className=" font-bold">정말 로그아웃 하시겠습니까?</h1>
    <button onClick={LogOut} className=" bg-slate-300">log out</button>
    </div>
    </div>
    </>
    )
   }else{
    return(
        <>
        <Navi/>
        <div className="pt-20 flex justify-center items-center h-screen">
            <div className=" grid grid-rows-2">
            <h1 className=" font-bold">*주의* 반드시 학교 구글 계정으로만 로그인 해야 합니다.<br/>(어차피 다른 계정으로는 로그인 안됨)</h1>

            <button onClick={GoogleLogin} className=" bg-slate-300 p-5 rounded-lg ">로그인</button>
            </div>
        </div>
        </>
        )
    }


}
export default Front;
