import React from "react";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="bg-gray-100 w-full h-20 flex justify-end items-center shadow-sm shadow-black">
      <div className="flex text-gray-600">
        <div className="w-[45px] h-[45px] rounded-full text-white bg-gray-600 flex justify-center items-center mr-3">
          <FaUser />
        </div>
        <div className="flex-col mr-10 justify-center items-center">
          <p className="font-bold">Jefferson Cieza</p>
          <p className="text-sm text-gray-500">Development</p>
        </div>
      </div>
    </div>
  );
};
