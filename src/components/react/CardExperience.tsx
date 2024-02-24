"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";
import type { CardInterface } from "../../interfaces/CardExpirience.interface";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
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
  pageURL,
  imageURL,
  knowledge,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 4;
      const rotateY = (centerX - x) / 25;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="grid grid-cols-12 hover:shadow-lg  p-4 hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-40 rounded-lg hover:bg-cardHover gap-2 px-5 w-[850px] card relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(50000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="col-start-1 col-end-3">
          {imageURL ? (
            <img
              className="rounded-md xl:w-32 lg:w-48"
              src={imageURL}
              alt="Site Image"
            />
          ) : (
            <span className="text-gray-500 font-medium">{yearExperience}</span>
          )}
          {/* <span className="text-gray-500 font-medium">{yearExperience}</span> */}
          {/* <img className="rounded-xl" src="../../../public/fermodoroPage.png" alt="Site Image" /> */}
        </div>
        <div className="col-start-3 col-end-13 flex flex-col xl:pl-3 pl-3">
          <div className=" ">
            <h2 className="font-bold text-xl mb-2 text-white group-hover:text-linkGreen">
              {title}
            </h2>
          </div>
          <div className="pb-5">
            <p className="text-gray-400">{description}</p>
          </div>
          <div className=" ">
            <div className="flex">
              {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                knowledge?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      {item}
                    </span>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
