import React from "react";
import {
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface CardProps {
  id: number;
  status: "აქტიური" | "დასრულებული";
  creator: string;
  watch: string;
  budget: string;
  totalBudget: string;
}

const Card: React.FC<{ data: CardProps }> = ({ data }) => {
  const [current, total] = data.budget
    .replace(/\$|,/g, "")
    .split(" / ")
    .map(Number);
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className=" rounded-lg overflow-hidden shadow-lg relative w-full">
      <div
        className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white font-thin text-sm  ${
          data.status === "აქტიური" ? "bg-green-500 " : "bg-red-500 opacity-55"
        }`}
      >
        {data.status}
      </div>
      <div className="h-[250px] w-full bg-[#636363] "></div>
      <div className="flex justify-between items-center px-4 pt-2 font-light text-black ">
        <div className="flex justify-start items-center">
          <UserIcon className="w-4 h-4" /> {data.creator} შემქმნელი
        </div>
        <span>
          {data.watch} ნახვა
        </span>
      </div>
      <div className="px-4 mt-2 font-light text-black ">
        <div className="flex justify-between items-center ">
          <span>ბიუდჯეტი </span>
          <span>{data.budget}</span>
        </div>
        <div className="w-full h-2 bg-white rounded mt-1">
          <div
            className="h-2 rounded bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" mt-1 block">
            ჯამური გადახდა
          </span>
          <span> {data.totalBudget}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 px-4 mt-4 pb-4 w-full">
        <button className="flex justify-center items-center gap-1 px-3 py-2 bg-gray-300 text-black rounded hover:bg-white transition w-2/3">
          <ChartBarIcon className="w-4 h-4" />
          ანალიტიკა
        </button>
        <button className="flex items-center gap-1 px-3 py-2 bg-gray-300 text-black rounded hover:bg-white transition">
          {/* <ChatBubbleLeftRightIcon className="w-4 h-4" /> */}
          გახსენი ჩატი
        </button>
      </div>
    </div>
  );
};

export default Card;
