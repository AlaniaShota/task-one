"use client";

import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardProps {
  activeTab: "companies" | "analytics";
}

export interface Company {
  id: string;
  mediaLink: string;
  mediaFile: string;
  paymentModel: number;
  offerType: string;
  description: string;
  budget: number;
  name: string;
  
}

export default function Dashboard({ activeTab }: DashboardProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/companies");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Ошибка загрузки компаний:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {activeTab === "companies" && (
        <motion.div
          key="companies"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center my-6">
            <h1 className="text-black">შენი კემპინგი</h1>
            <button className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">
              დაიწყე ახალი კემპინგი
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">იტვირთება...</p>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full items-center">
              {companies.map((item) => (
                <Card key={item.id} data={item} />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "analytics" && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center my-6">
            <h1 className="text-black">ანალიტიკა</h1>
            <button className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">
              კომპანიის შექმნა
            </button>
          </div>
          {/* < /> */}
          <div className="flex justify-center items-center m-auto">
          <Link href='/login' className="px-4 py-2 rounded-lg text-white bg-[#3B82F6]">
            <span>რეგისტრაცია</span>
          </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
