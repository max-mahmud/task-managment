import React from "react";
import mySvg from "../assets/resume.svg";
const Header = () => {
  return (
    <div className="bg-orange-100/40 h-screen flex items-center">
      <div className="container mx-auto h-[100%]  flex items-center justify-between">
        <div className="w-[100%]  text-6xl text-center font-medium">
          <h2>
            A{" "}
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              Resume
            </span>{" "}
            that
          </h2>
          <h2>stand out!</h2>
          <h2>Make your own</h2>
          <h2>
            resume.{" "}
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              It&apos;s free
            </span>
          </h2>
        </div>
        <div className="w-[100%]">
          <img src={mySvg} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
