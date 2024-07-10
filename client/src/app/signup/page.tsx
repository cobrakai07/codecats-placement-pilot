"use client";
import Link from 'next/link';
import { useState } from "react";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { BsPatchCheckFill } from "react-icons/bs";
import { HiShieldCheck } from "react-icons/hi2";
import { MdCheckCircleOutline } from "react-icons/md";

function page() {
  const [mobileMenu, SetMobileMenu] = useState();
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-gray-950 flex justify-around flex-col md:flex-row  p-2 md:p-24 gap-5">
      {/* company detail */}
      <div className="text-white flex flex-col gap-16 md:w-[50%] justify-center content-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <div>
              <div className="bg-yellow-400 font-semibold p-1 rounded-md flex gap-1">
                <span className="p-1">PLACEMENT</span>
                <span className="bg-white text-black p-1 rounded-r-md">
                  Pilot
                </span>
              </div>
            </div>
            <div>
              <PiAirplaneTakeoffFill size={40} />
            </div>
          </div>
          <div className="font-semibold text-sm md:text-3xl">Start your prepration</div>
          <div className="flex gap-1 text-sm">
            <div>
              <MdCheckCircleOutline size={20} />
            </div>
            <div>No credit card required</div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-1 ">
          <div>
            <HiUsers className="text-yellow-400" size={25}/>
          </div>
          <div className="font-semibold">Invite unlimited colleagues</div>
          <div className="text-sm text-slate-300">
            Have a healthy competition to improve everyone hardworking spirit
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-1">
          <div>
            <BsPatchCheckFill className="text-yellow-400" size={25}/>
          </div>
          <div className="font-semibold">Ensure compliance</div>
          <div className="text-sm text-slate-300">Recive detailed insights on all your data in real-time.</div>
        </div>

        <div className="hidden md:flex flex-col gap-1">
          <div>
            <HiShieldCheck className="text-yellow-400" size={25}/>
          </div>
          <div className="font-semibold">Secure Success</div>
          <div className="text-sm text-slate-300">Prepare and track your efficiency to secure your success.</div>
        </div>
      </div>
      {/* login form */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-800 to-gray-700  rounded-md md:w-[50%]  flex flex-col justify-between gap-4 p-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center text-sm text-white">
            Register with
          </div>
          <div className="flex gap-1">
            <button className="bg-slate-400 hover:bg-slate-500 w-full p-2 rounded-md">
              <div className="flex justify-center">
                <IoLogoGoogle color="white" size={20} />
              </div>
            </button>
            <button className="bg-slate-400 hover:bg-slate-500 w-full p-2 rounded-md">
              <div className="flex justify-center">
                <FaGithub color="white" size={20} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-sm text-white">
          <div className="h-px bg-white w-full"></div>
          <div>Or</div>
          <div className="h-px bg-white w-full"></div>
        </div>

        <div>
          <form action="" className="flex flex-col gap-4">
            <div className="flex justify-between gap-2 flex-col md:flex-row">
              <div className="flex flex-col w-full">
                <label htmlFor="firstname" className="text-sm text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="rounded-md text-white bg-gray-500 p-1"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="text-sm text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="rounded-md text-white bg-gray-500 p-1"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="text-sm text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="rounded-md text-white bg-gray-500 p-1"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-sm text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-md text-white bg-gray-500 p-1"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-sm text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md text-white bg-gray-500 p-1"
              />
            </div>
            <div className="flex justify-center w-full">
              <button className="bg-yellow-400 w-full p-1 rounded-md">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center text-white gap-1 flex-col md:flex-row">
          <div>Already have an account?</div>
          <Link href="/signin">
            <div className="text-yellow-400 cursor-pointer">Login</div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default page;
