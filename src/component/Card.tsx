
import React from "react";
import {
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
interface CardProps {
  id: string;
  mediaLink: string;
  mediaFile: string;
  paymentModel: number;
  offerType: string;
  description: string;
  budget: number;
  name: string;
}

const Card: React.FC<{ data: CardProps }> = ({ data }) => {
  const progress = Math.min((data.budget / data.paymentModel) * 100, 30);

  return (
    <div className=" rounded-lg overflow-hidden shadow-lg relative w-full">
      <div
        className={'absolute top-2 left-2 px-3 py-1 rounded-full text-white font-thin text-sm  bg-red-500 opacity-55'}
      >
      დასრულებული
      </div>
      <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center">
         {data.mediaFile ? (
          <Image
            src={data.mediaFile}
            alt={data.name}
            width={140}
            height={50}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Not Found</span>
        )}
      </div>
      <div className="flex justify-between items-center px-4 pt-2 font-light text-black ">
        <div className="flex justify-start items-center">
          <UserIcon className="w-4 h-4" /> {data.name} შემქმნელი
        </div>
        
        <span>
          {data.offerType} ნახვა
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
          <span> {data.paymentModel}</span>
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
