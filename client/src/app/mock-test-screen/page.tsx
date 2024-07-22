"use client"
import React, { useState } from "react";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import Timer from "../../../components/Timer";

function page() {

    const [time, setTime] = useState<number>(90);
    const[codePaper,setCodePaper]=useState<string>("");
    const[corePaper,setCorePaper]=useState<string>("");
    const[quantPaper,setQuantPaper]=useState<string>("");

  return (
    <div>

      <div className="flex justify-between">
      <div className="flex gap-1">
        <div>
          <div className="bg-yellow-400 font-semibold p-1 rounded-md flex gap-1">
            <span className="p-1">PLACEMENT</span>
            <span className="bg-white text-black p-1 rounded-r-md">Pilot</span>
          </div>
        </div>
        <div>
          <PiAirplaneTakeoffFill size={40} color="white"/>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center gap-2 p-1 rounded-lg">
        <div>Code</div>
        <div>Core</div>
        <div>Quants</div>
      </div>
      <div className="text-white">
        <Timer startValue={time} stopTest={setTime}/>
      </div>
      </div>

      <div className="text-white">
        test screen
      </div>

      <div></div>

    </div>
  );
}

export default page;
