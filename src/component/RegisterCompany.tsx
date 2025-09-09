"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import logoFacebook from "../../public/facebook-svgrepo-com.svg";
import logoInstagram from "../../public/instagram-1-svgrepo-com.svg";
import logoTikTok from "../../public/tiktok-logo-logo-svgrepo-com.svg";
import {
  CpuChipIcon,
  ScissorsIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const schema = yup.object().shape({
  name: yup.string().required("სავალდებულოა კომპანიის სახელი"),
  budget: yup
    .number()
    .typeError("ბიუჯეტი უნდა იყოს რიცხვი")
    .positive("ბიუჯეტი უნდა იყოს დადებითი")
    .required("სავალდებულოა ბიუჯეტი"),
  description: yup.string().required("სავალდებულოა აღწერა"),
  includeBudget: yup.boolean(),
  platforms: yup.array().of(yup.string()),
  offerType: yup.string().required("სავალდებულოა ტიპი"),
  paymentModel: yup
    .number()
    .typeError("ბიუჯეტი უნდა იყოს რიცხვი")
    .positive("ბიუჯეტი უნდა იყოს დადებითი")
    .required("სავალდებულოა ბიუჯეტი"),
});

type FormData = {
  name: string;
  budget: number;
  description: string;
  includeBudget: boolean;
  platforms: string[];
  offerType: string;
  paymentModel: string;
};

export default function RegisterCompany() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCreatorType, setSelectedCreatorType] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      data.platforms = selectedPlatforms;
      data.targetCreatorType = selectedCreatorType;
      console.log("Submitting:", data);
      const res = await fetch("http://localhost:5000/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("Company registered:", data);
        setSubmitted(true);
        reset();
        setSelectedPlatforms([]);
      } else {
        console.error("Error:", await res.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const platformList = [
    { name: "facebook", logo: logoFacebook },
    { name: "instagram", logo: logoInstagram },
    { name: "tiktok", logo: logoTikTok },
  ];

  const targetCreatorType = [
    {
      id: 1,
      name: "სამიზნე შემქმნელების ტიპი",
      description: "ცნობილი შემქმნელები დამკვიდრებული აუდიტორიით",
      icon: <StarIcon />,
    },
    {
      id: 2,
      name: "გამოცდილი შემქმნელი",
      description: "შემქმნელები დადასტურებული კონტენტის გამოცდილებით",
      icon: <CpuChipIcon />,
    },
    {
      id: 3,
      name: "დამწყები შემქმნელი",
      description:
        "ახალი შემქმნელები რომლებიც ცდილობენ გამოცდილების დაგროვებას",
      icon: <UserIcon />,
    },
    {
      id: 4,
      name: "კლიპერი",
      description: "ვიდეო მონტაჟის სპეციალისტები",
      icon: <ScissorsIcon />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-2xl shadow-lg flex flex-col w-full justify-start "
    >
      <div className="py-2">
        <h2 className="text-xl text-start font-semibold text-black">
          კამპანიის საფუძვლები
        </h2>
        <span className="text-sm">
          დააყენეთ თქვენი კამპანიის ფუნდამენტური დეტალები
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-col justify-center items-start w-2/5">
            <label className="block mb-1 font-medium text-black">
              კომპანიის სახელი
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="მაგ: საზაფული პროექტი"
              className="w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-start w-2/5">
            <label className="block mb-1 font-medium text-black">
              ბიუჯეტი (ლარში)
            </label>
            <input
              {...register("budget")}
              type="number"
              placeholder="მაგ: 5000"
              className="w-full px-4  text-black py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-1">
                {errors.budget.message}
              </p>
            )}
          </div>
        </div>
        <label className="block mb-1 font-medium text-black">
          კომპანიის აღწერა
        </label>
        <textarea
          {...register("description")}
          placeholder="აღწერეთ თქვენი კომპანიის მიზნები, მომსახურება და რას ეწევით..."
          rows={4}
          className="w-full  text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
        <div className="py-12">
          <h2 className="text-xl text-start font-semibold text-black">
            აირჩიე პლატფორმა
          </h2>
          <span className="text-sm">
            აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
          </span>
          <div className="flex justify-between items-center gap-4 pt-2">
            {platformList.map((p) => (
              <div
                key={p.name}
                className={`py-6 px-10 rounded-lg cursor-pointer border-2 ${
                  selectedPlatforms.includes(p.name)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => togglePlatform(p.name)}
              >
                <Image src={p.logo} alt={p.name} width={52} height={52} />
              </div>
            ))}
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-xl text-start font-semibold text-black">
            გადახდის სტრუქტურა
          </h2>
          <span className="text-sm">
            კონფენსაცია, თუ როგორ მიიღებენ კომპენსაციას შემმნელები
          </span>
          <div className="flex flex-col items-start justify-start w-1/3">
            <label className="font-medium text-black mb-1">
              შეთავაზების ტიპი
            </label>
            <input
              {...register("offerType")}
              type="text"
              placeholder="Cost per View"
              className="w-full  text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.offerType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.offerType.message}
              </p>
            )}

            <label className="font-medium text-black mb-1">
              გადახდის მეთოდი
            </label>
            <input
              {...register("paymentModel")}
              type="number"
              placeholder="რაოდენობა"
              className="w-full  text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.paymentModel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentModel.message}
              </p>
            )}
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-xl text-start font-semibold text-black">
            სამიზნე შემქმნელების ტიპი
          </h2>
          <span className="text-sm">
            აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          </span>
          <div className="grid grid-cols-2 gap-10 my-2">
            {targetCreatorType.map((t) => (
              <div
                key={t.id}
                className={`rounded-lg cursor-pointer border-2 flex flex-row items-center gap-2 p-10 ${
                  selectedCreatorType === t.name
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedCreatorType(t.name)}
              >
                <div className="w-10 h-10">{t.icon}</div>
                <div className="flex flex-col items-start pl-6">
                  <h3 className="font-semibold text-black">{t.name}</h3>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          რეგისტრაცია
        </motion.button>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 mt-3 font-medium"
          >
            ✅ კომპანია წარმატებით დარეგისტრირდა!
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
