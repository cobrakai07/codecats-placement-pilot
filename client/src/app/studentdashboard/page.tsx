import React from "react";
import Folder from "../../../components/Folder";

function page() {
  return (
    <div className="flex gap-1">
        <div>Navbar</div>
        <div className="w-full">
            {/* DashBoard */}
            <div className="flex justify-between">
                <div className="text-xl font-bold">Dashboard</div>
                <div className="flex gap-2">
                    <div>icon 1</div>
                    <div>icon 2</div>
                    <div>user icon</div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-3 text-sm text-white">
                <div className="h-px bg-black w-full"></div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-semibold">Subjects</div>
                <div className="flex justify-between">
                <Folder /> 
                <Folder /> 
                <Folder /> 
                <Folder /> 
                </div>
            </div>
            <div>
                <div className="font-semibold">Records</div>
                <div className="flex gap-2">
                    <div>Progress bar</div>
                    <div>
                        <Folder /> 
                        <Folder /> 
                    </div>
                    <div>
                        Graph
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default page;
