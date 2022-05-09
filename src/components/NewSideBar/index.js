import React, { useState } from "react";
import logo from "../../images/logo.png";
import {
  FaBookmark,
  FaDirections,
  FaLock,
  FaMicrosoft,
  FaMoneyBill,
  FaPaperclip,
  FaUsers,
} from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
export const TailwindSideBar = () => {
  const [showSeguridad, setShowSeguridad] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showMotor, setShowMotor] = useState(false);

  return (
    <aside className="w-80" aria-label="Sidebar">
      <div className="overflow-y-auto py-3 px-3 bg-gray-50 h-full dark:bg-gray-800 shadow-xl shadow-black">
        <ul className="space-y-2">
          <li>
            <div className="flex w-full justify-between items-center mb-8">
              <img
                src={logo}
                alt="logo"
                className="rounded h-[45px] w-[45px]"
              />
              <p className="text-white text-2xl">Economysa</p>
              <div className="p-1.5 ml-1 bg-white text-gray-800 rounded-full flex items-center justify-center">
                <FaLock />
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-1 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => {
                setShowMotor(false);
                setShowConfig(false);
                setShowSeguridad((st) => !st);
              }}
            >
              <div className="text-gray-400">
                <FaLock />
              </div>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Seguridad
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {showSeguridad && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link
                    to="/security"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Usuarios <FaUsers />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => {
                setShowSeguridad(false);
                setShowMotor(false);
                setShowConfig((st) => !st);
              }}
            >
              <div className="text-gray-400">
                <FaPaperclip />
              </div>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Configuración
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {showConfig && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link
                    to="/categories"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Categorías <FaDirections />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marks"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Marcas <FaMoneyBill />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/units"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Unidades <FaMicrosoft />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => {
                setShowConfig(false);
                setShowSeguridad(false);
                setShowMotor((st) => !st);
              }}
            >
              <div className="text-gray-400">
                <BiWorld />
              </div>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Motor
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {showMotor && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link
                    to="/products"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Productos <FaBookmark />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mechs"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Mecánicas <FaBookmark />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/providers"
                    className="flex justify-between items-center p-2 pl-11 w-[90%] mx-auto text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Proveedores <FaBookmark />
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};
