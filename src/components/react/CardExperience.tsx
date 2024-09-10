"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";
import type { CardInterface } from "../../interfaces/CardExpirience.interface";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export const CardExperienceComponnent: React.FC<CardInterface> = ({
  title,
  description,
  yearExperience,
  imageURL,
  skills,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / (box.height / 2)) * -10; // Increased from -10 to -20
    const rotateY = (mouseX / (box.width / 2)) * 10; // Increased from 10 to 20
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        // className="card relative grid grid-cols-12 gap-2 rounded-lg p-4 px-5 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform hover:bg-cardHover hover:bg-opacity-40 hover:shadow-lg hover:backdrop-blur-md hover:backdrop-filter sm:w-[750px]"
        className="card relative grid grid-cols-12 grid-rows-3 gap-2 rounded-lg p-4 px-5 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform hover:bg-cardHover hover:bg-opacity-40 hover:shadow-lg hover:backdrop-blur-md hover:backdrop-filter md:w-[750px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // style={{
        //   transform: `perspective(50000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        //   transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        // }}
        style={{
          transform: `perspective(500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transformStyle: "preserve-3d",
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        {/* Imagen o año de experiencia */}
        <div className="order-1 col-start-1 col-end-13 row-start-1">
          <span className="font-medium text-gray-500">{yearExperience}</span>

          {/* {imageURL ? (
            <img
              // className="rounded-md lg:w-48 xl:w-32"
              className="w-40 rounded-md"
              src={imageURL}
              alt="Site Image"
            />
          ) : (
            <span className="font-medium text-gray-500">{yearExperience}</span>
          )} */}
          {/* <span className="text-gray-500 font-medium">{yearExperience}</span> */}
          {/* <img className="rounded-xl" src="../../../public/fermodoroPage.png" alt="Site Image" /> */}
        </div>
        {/* <div className="col-start-3 col-end-13 flex flex-col pl-3 xl:pl-3"> */}
        {/* Descripcion del card */}
        {/* <div className="col-start-3 col-end-13 row-start-2 flex flex-col pl-3"> */}
        <div className="col-start-1 col-end-13 row-start-2 flex flex-col">
          <div className=" ">
            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-linkGreen">
              {title}
            </h2>
          </div>
          <div className="pb-5">
            <p className="text-gray-400">{description}</p>
          </div>
          {/* Skills */}
          <div className="row-start-3">
            <div className="flex flex-wrap gap-2">
              {// eslint-disable-next-line @typescript-eslint/no-unused-vars
              skills?.map((skill) => {
                return (
                  <span
                    key={skill.id}
                    className=" me-2 flex items-center justify-center gap-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    <img className="h-4" src={skill.skillIcon} alt="" />
                    {skill.skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
