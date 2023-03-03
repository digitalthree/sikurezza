import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="w-full bg-zinc-300 items-center justify-center p-6 mt-5">
        <div className="flex flex-row items-center justify-center">
          <div className="text-white text-xl mr-5 text-right w-fit">
            realizzato da
          </div>
          <div className=" border-l-2 border-white w-36 py-3 pl-6 ">
            <img src="img/logo_ccdstudio.png" alt="logo ccd studio"></img>
          </div>
        </div>
      </footer>
    </>
  );
};
