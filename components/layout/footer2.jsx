/**
 * This code was generated by Builder.io.
 */
import React from "react";

const Footer = () => {
  const footerLinks = ['Contact Us', 'Donate', 'Take Our Survey', 'Link To Us'];
  const policyLinks = ['Privacy', 'Site Use Policies', 'Admin Login'];

  return (
    <footer className="flex flex-col items-center self-stretch bg-secondaryDark">
      <div className="flex flex-col self-stretch w-full text-center whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-wrap gap-1.5 justify-center items-start w-full max-md:px-5 max-md:max-w-full">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex grow shrink justify-center items-center w-8">
              <div className="flex flex-col self-stretch my-auto w-10">
                <div className="px-1 text-3xl leading-none text-gray-50"></div>
                <div className={`z-10 px-${index === 4 ? '3.5' : index === 1 ? '4' : '3'} -mt-8 text-base leading-8 text-blue-950`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-14 w-full max-w-[1240px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap justify-center items-center w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink self-stretch px-4 pb-4 my-auto w-full basis-0 max-w-[1240px] min-w-[240px] max-md:max-w-full">
            <div className="flex justify-center items-center self-center max-w-full w-[306px]">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/448d9c33c3956eb51cb814c764f6e52fe99a6e38fa6924b71d416c11fc73471d?placeholderIfAbsent=true&apiKey=7bf199de15724d268c1417f75ca31ce1" className="object-contain self-stretch my-auto aspect-[5.78] max-w-[1240px] min-w-[240px] w-[306px]" alt="Georgia CORE logo" />
            </div>
            <div className="flex w-full min-h-[24px] max-md:max-w-full"></div>
            <p className="pt-4 w-full text-xl tracking-normal leading-7 text-center text-primaryLight max-md:px-5 max-md:max-w-full">
              Advancing Cancer Care through Partnerships and Innovation
            </p>
            <p className="pt-4 pr-5 pl-5 w-full text-base tracking-normal leading-6 text-center text-primaryLight max-md:pl-5 max-md:max-w-full">
              Georgia CORE is a public-private partnership that creates collaboration among the state's cancer organizations and institutions to connect more Georgians to quality,
              personalized cancer care. We welcome you to this one-of-a-kind online information center for all things related to cancer and survivorship care in Georgia.
            </p>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden flex-col pt-2 w-full max-w-[1240px] max-md:max-w-full">
        <div className="flex flex-wrap justify-center items-center w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink self-stretch px-4 pb-4 my-auto w-full basis-0 max-w-[1240px] min-w-[240px] max-md:max-w-full">
            <nav className="flex flex-wrap gap-9 items-start py-4 px-60 w-full text-xl tracking-normal leading-8 text-center text-white max-md:px-5 max-md:max-w-full">
              {footerLinks.map((link, index) => (
                <a key={index} href="#" className="w-full md:w-fit px-4 py-2.5 border border-solid bg-accentGreen border-accentGreen">
                  {link}
                </a>
              ))}
            </nav>
            <p className="px-56 w-full text-base text-center text-primaryLight max-md:px-5 max-md:max-w-full">
              Copyright © 2005 - @ 2024 Georgia Center for Oncology Research and Education, Inc. All Rights Reserved.
            </p>
            <div className="flex flex-row mx-auto gap-2">
              {policyLinks.map((link, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-base text-primaryLight"> | </span>}
                  <a href="#" className="tracking-normal leading-6">{link}</a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;