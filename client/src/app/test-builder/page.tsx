"use client";

import React, { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { VscGraph } from "react-icons/vsc";
import { FiTarget } from "react-icons/fi";
import QuestionLabel from "../../../components/QuestionLabel";

interface Question {
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  question: string;
}

function Page() {
  const [questionPaper, setQuestionPaper] = useState<Question[]>([]);
  const [questionLength, setQuestionLength] = useState<number[]>([1]);

  const addQuestion = (newQuestion: Question) => {
    setQuestionPaper((prev) => [...prev, newQuestion]);
  };

  useEffect(()=>{
    console.log(questionPaper);
  },[questionPaper])

  return (
    <div className="absolute left-0 top-0 flex gap-1 h-full w-full p-2 bg-gray-200">
      {/* Navbar */}
      <div className="flex flex-col h-full justify-between gap-8 bg-black text-white p-2 rounded-md">
        <div className="flex flex-col gap-10">
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
        {/* Dashboard */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Set Question Paper</div>
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

        <div className="flex flex-col gap-5 h-full overflow-y-auto">
          {questionLength.map((index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-gray-600 to-gray-300 p-5 rounded-lg m-3 hover:m-0 transition-all duration-300"
            >
              <QuestionLabel addQuestion={addQuestion}/>
            </div>
          ))}
          
          
        </div>
        <div className=" flex justify-end">
            <button onClick={()=>setQuestionLength([...questionLength,1])} className="bg-white p-2 rounded-lg  hover:bg-black hover:text-yellow-200 hover:cursor-pointer transition-all duration-500">Add Question</button>
          </div>
        <div className="flex justify-center bg-white rounded-lg p-2 font-semibold hover:bg-black hover:text-yellow-200 hover:cursor-pointer transition-all duration-500">
          Submit Paper
        </div>
      </div>
    </div>
  );
}

export default Page;