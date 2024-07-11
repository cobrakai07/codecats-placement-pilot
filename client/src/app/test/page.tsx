import React from "react";

function Folder() {
  return (
    <div>
      <div className="flex h-36 w-44">
        <div className="h-[80%] w-[40%] rounded-l-2xl rounded-tr-lg border-l-2 border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-tr-lg rounded-l-2xl bg-yellow-300"></div>
        </div>
        <div className="rounded-lb-lg mt-2 h-[80%] w-[45%] rounded-b-lg border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-b-lg bg-yellow-300"></div>
        </div>
        <div className="rounded-lb-2xl mt-2 h-[75%] w-[15%] rounded-br-2xl rounded-tr-2xl border-r-2 border-t-2 border-black bg-black">
          <div className="h-[85%] w-full rounded-br-2xl rounded-tr-2xl bg-yellow-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
