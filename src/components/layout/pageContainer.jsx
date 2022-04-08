import React from "react";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import { TailwindSideBar } from "../NewSideBar";

export const PageContainer = ({ children }) => {
  return (
    <div className="w-full flex bg-gray-200 h-[100vh]">
      <TailwindSideBar />
      <div className="w-full">
        <Header />
        <div className="h-[calc(100%-108px)] overflow-y-scroll p-3 mt-4 bg-gray-100">
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
