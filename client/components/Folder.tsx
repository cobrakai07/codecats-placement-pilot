import React from "react";
import DonutChart from "./DonutChart";
import { FaJava } from "react-icons/fa";
import { PiDatabaseLight } from "react-icons/pi";
import { BsWindowStack } from "react-icons/bs";
import { BsHddNetwork } from "react-icons/bs";
import { PiCodeLight } from "react-icons/pi";
import { TbMath } from "react-icons/tb";

interface FolderProps{
  icon:string,
  title:string,
  progress:number,
  time:string
}
function iconMatch(icon:string){
  switch(icon){
    case 'j':return <FaJava size={30}/>
    case 'db':return <PiDatabaseLight size={30}/>
    case 'os':return <BsWindowStack size={30}/>
    case 'cn':return <BsHddNetwork size={30}/>
    case 'code':return <PiCodeLight size={30}/>
    case 'qa':return <TbMath size={30}/>
  }
}
function Folder({icon, title, progress , time}:FolderProps) {
  return (
    <div>
      <div className=" group flex h-36 w-44">
        <div className="h-[80%] w-[40%] rounded-l-2xl rounded-tr-lg border-l-2 border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-tr-lg rounded-l-2xl bg-white group-hover:bg-yellow-300 transition duration-300 flex flex-col p-2" >
            <div>{iconMatch(icon)}</div>
            <div className="font-bold">{title}</div>
            </div>
        </div>
        <div className="rounded-lb-lg mt-2 h-[80%] w-[45%] rounded-b-lg border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-b-lg bg-white group-hover:bg-yellow-300 transition duration-300 flex justify-center items-center flex-col">
            <div><DonutChart percentage={progress} size={40}/>
            </div>
            <div>{time}</div>
          </div>
        </div>
        <div className="rounded-lb-2xl mt-2 h-[75%] w-[15%] rounded-br-2xl rounded-tr-2xl border-r-2 border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-br-2xl rounded-tr-2xl bg-white group-hover:bg-yellow-300 transition duration-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
