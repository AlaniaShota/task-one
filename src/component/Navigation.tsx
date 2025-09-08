"use client"
import React from "react";
import {motion} from 'framer-motion'
import { MagnifyingGlassIcon, UserIcon, BellIcon } from "@heroicons/react/24/outline";

const Navigation = () => {
  return (
    <div className="flex flex-row justify-between items-center m-auto p-6">
      <div className="flex flex-row justify-start items-center">
      <h1 className="text-5xl">Sellvi</h1>
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute w-12 h-12 rounded-full border-[6px] border-gray-400 top-4 left-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-full border-[6px] border-blue-500 top-0 left-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
        />
      </div>
    </div>
    <div className="flex gap-6 text-white">
      <MagnifyingGlassIcon className="w-10 h-10 border text-black border-gray-400 p-1 rounded-lg" />
      <UserIcon className="w-10 h-10 border text-black border-gray-400 p-1 rounded-lg" />
      <BellIcon className="w-10 h-10 border text-black border-gray-400 p-1 rounded-lg" />
    </div>
    </div>
  );
};

export default Navigation;
