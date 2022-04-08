import React from "react";
import "./Footer.css";
import Logo from "../../images/logo.png";
function Footer() {
  return (
    <footer className="bg-gray-800 flex items-center w-full h-28 p-2 mt-5 rounded">
      <div className="flex justify-start items-center">
        <img alt="user" className="w-14 h-14" src={Logo} />
        <div className="pl-2 flex-col">
          <p className="text-white">Economysa - 2022 &copy;</p>
          <p className="text-gray-300 text-sm">Linkhub.ai</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
