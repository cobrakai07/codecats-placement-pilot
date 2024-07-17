import React from "react";
import Folder from "../../../components/Folder";
import { BsQuestionCircle } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { VscGraph } from "react-icons/vsc";
import { FiTarget } from "react-icons/fi";
import LineGraph from "../../../components/LineGraph";
import ProgressCard from "../../../components/ProgressCard";

function page() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = [65, 59, 80, 81, 56, 55]; // Example data points
  return (
    <div className=" absolute left-0 top-0 flex gap-1 h-full w-full p-2 bg-gray-200">
      {/* Navbar */}
      <div className="flex flex-col h-full justify-between gap-8 bg-black text-white p-2 rounded-md">
        <div className=" flex flex-col gap-10">
          <div>
            <div className="flex justify-center items-center">
              <PiAirplaneTakeoffFill size={40} color="yellow" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <ImHome size={30} />
          </div>
          <div className="flex justify-center items-center">
            <VscGraph size={30} />
          </div>
          <div className="flex justify-center items-center">
            <FiTarget size={30} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <MdOutlineSettings size={30} />
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-4 p-4 justify-evenly">
        {/* DashBoard */}

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Dashboard</div>
            <div className="flex gap-2">
              <div className="hover:cursor-pointer hover:text-yellow-200 hover:bg-black rounded-full flex justify-center items-center bg-white p-1">
                <BsQuestionCircle size={25} />
              </div>
              <div className="hover:cursor-pointer hover:text-yellow-200 hover:bg-black rounded-full flex justify-center items-center bg-white p-1">
                <FiBell size={25} />
              </div>
              <div className="hover:cursor-pointer hover:text-yellow-200 hover:bg-black rounded-full flex justify-center items-center bg-white p-1">
                <BiUserCircle size={28} />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 text-sm text-white">
            <div className="h-px bg-black w-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full">
          <div className="font-semibold text-lg">Subjects</div>
          <div className="flex justify-evenly gap-2 flex-wrap">
            <Folder title="Java" icon="j" time="2H" progress={70} />
            <Folder title="DBMS" icon="db" time="2H" progress={61} />
            <Folder title="OS" icon="os" time="2H" progress={50} />
            <Folder title="CN" icon="cn" time="2H" progress={30} />
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full">
          <div className="font-semibold  text-lg">Records</div>
          <div className="flex justify-around gap-1">
            <div className="flex w-[50%] justify-evenly">
              <div className="bg-yellow-500 border-2 border-black w-[40%] rounded-xl">
                {/* <ProgressCard/> */}
              </div>
              <div>
                <Folder title="DSA" icon="code" time="2H" progress={80} />
                <Folder title="QA/LR" icon="qa" time="2H" progress={10} />
              </div>
            </div>
            <div className="w-[50%] bg-black rounded-xl"></div>
            {/* /// */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default page;
