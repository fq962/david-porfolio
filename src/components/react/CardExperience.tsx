"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";
import type { CardInterface } from "../../interfaces/CardExperience.interface";
import Tag from "./Tag";

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
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 11;
      const rotateY = (centerX - x) / 25;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    [],
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="card relative grid grid-cols-12 gap-2 rounded-lg p-4 px-5 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform hover:bg-cardHover hover:bg-opacity-40 hover:shadow-lg hover:backdrop-blur-md hover:backdrop-filter sm:w-[750px]"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(50000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        {imageURL || yearExperience ? (
          <div className="col-start-1 col-end-3">
            {imageURL ? (
              <img
                className="rounded-md lg:w-48 xl:w-32"
                src={imageURL}
                alt="Site Image"
              />
            ) : (
              <span className="font-medium text-gray-500">
                {yearExperience}
              </span>
            )}
          </div>
        ) : null}
        <div
          className={`${!imageURL && !yearExperience ? "col-start-1" : "col-start-3"} col-end-13 flex flex-col pl-3 xl:pl-3`}
        >
          <div className=" ">
            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-linkGreen">
              {title}
            </h2>
          </div>
          <div className="pb-5">
            <p className="text-gray-400">{description}</p>
          </div>
          <div className="">
            <div className="flex flex-wrap gap-2">
              {// eslint-disable-next-line @typescript-eslint/no-unused-vars
              skills?.map((skill) => {
                return <Tag key={skill.skill} tag={skill.skill}></Tag>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
