"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";
import type { CardInterface } from "../../interfaces/CardExperience.interface";
import Tag from "./Tag";
import ExternalLinkIcon from "../icons/ExternalLink";

export const CardExperienceComponnent: React.FC<CardInterface> = ({
  title,
  description,
  yearExperience,
  pageURL,
  skills,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false); // Cuando el mouse sale del componente
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Cuando el mouse entra en el componente
  };

  return (
    <>
      <div
        // className="card relative grid grid-cols-12 gap-2 rounded-lg p-4 px-5 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform hover:bg-cardHover hover:bg-opacity-40 hover:shadow-lg hover:backdrop-blur-md hover:backdrop-filter sm:w-[750px]"
        className="card relative grid grid-cols-12 grid-rows-3 gap-2 rounded-lg p-4 px-5 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform hover:bg-cardHover hover:bg-opacity-40 hover:shadow-lg hover:backdrop-blur-md hover:backdrop-filter md:w-[750px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
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
        </div>
        <div className="col-start-1 col-end-13 row-start-2 flex flex-col">
          <div className="flex gap-4">
            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-linkGreen">
              {title}
            </h2>
            {pageURL && (
              <a
                href={pageURL}
                target="_blank"
                rel="noreferrer"
                className={`transform transition-opacity duration-300 ease-in-out ${
                  isHovered ? "scale-110 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <ExternalLinkIcon />
              </a>
            )}
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
                  <Tag
                    key={skill.skill}
                    tag={skill.skill}
                    iconKey={skill.skill}
                  ></Tag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
