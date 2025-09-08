"use client";
import Dashboard from "@/component/Dashboard";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const [activeTab, setActiveTab] = useState<"companies" | "analytics">(
    "companies"
  );
  const tabs: { id: "companies" | "analytics"; label: string }[] = [
    { id: "analytics", label: "ანალიტიკა" },
    { id: "companies", label: "კომპანია" },
  ];
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between bg-gray-400 p-2 items-center gap-4 mb-4 rounded-lg">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2  rounded-lg flex justify-center w-full items-center"
            animate={{
              // scale: activeTab === tab.id ? 1.05 : 1,
              backgroundColor: activeTab === tab.id ? "#3B82F6" : "#F3F4F6", // bg-gray-100 или свой цвет
              color: activeTab === tab.id ? "#fff" : "#374151", // текст неактивной кнопки
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between items-center my-6 ">
        <h1 className="text-black">შენი კემპინგი</h1>
        <button className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">დაიწყე ახალი კემპინგი</button>
      </div>
      <Dashboard activeTab={activeTab} />
    </div>
  );
}
