import React from "react";
import { BsDownload } from "react-icons/bs";
const Body = () => {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];

  return (
    <div className="my-6">
      <h4 className="text-center text-4xl font-medium">Resume Builder</h4>
      <div className="container mt-3 mx-auto flex justify-between">
        <div>
          {colors.map((c, i) => (
            <span
              key={i}
              style={{ background: c }}
              className="inline-block w-8 h-8 rounded-full border border-orange-100 mx-2"
            ></span>
          ))}
        </div>
        <div>
          <button className="px-5 py-2 flex justify-between text-white rounded-sm bg-blue-500">
            Download <BsDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
