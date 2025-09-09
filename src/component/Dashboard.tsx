"use client";

import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import RegisterCompany from "./RegisterCompany";

interface DashboardProps {
  activeTab: "companies" | "analytics";
}
const data = [
  {
    id: 1,
    status: "აქტიური" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
  {
    id: 2,
    status: "დასრულებული" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
  {
    id: 3,
    status: "აქტიური" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
  {
    id: 4,
    status: "დასრულებული" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
  {
    id: 5,
    status: "დასრულებული" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
  {
    id: 6,
    status: "დასრულებული" as "აქტიური" | "დასრულებული",
    creator: "8",
    watch: "45,000",
    budget: "$1,240 / $5,240",
    totalBudget: "$1,240",
  },
];
export default function Dashboard({ activeTab }: DashboardProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === "companies" && (
        <>
          <div className="flex justify-between items-center my-6 ">
            <h1 className="text-black">შენი კემპინგი</h1>
            <button className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">
              დაიწყე ახალი კემპინგი
            </button>
          </div>
          <motion.div
            key="companies"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full items-center"
          >
            {data.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </motion.div>
        </>
      )}
      <div className="flex justify-between items-center my-6 ">
        <h1 className="text-black">ანალიტიკა</h1>
        <button className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">
          კომპანიის შემქმნა
        </button>
      </div>
      {activeTab === "analytics" && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <RegisterCompany />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
