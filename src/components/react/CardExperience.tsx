"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";

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

export default function CardExperienceComponnent() {
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
        className="grid grid-rows-3 hover:shadow-lg p-4 hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-40 rounded-lg hover:bg-cardHover grid-flow-col gap-2 px-5 w-[850px] card relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(50000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="row-span-3 p-2">
          <span className="text-gray-500 font-medium">2021 - PRESENTE</span>
          {/* <img className="rounded-md" src="../../../public/fermodoroPage.png" alt="Site Image" /> */}
        </div>

        <div className="col-span-2 row-span-1 p-2">
          <h2 className="font-bold text-xl mb-2 text-white group-hover:text-linkGreen">
            ALLAS Repuestos
          </h2>
        </div>
        <div className="col-span-2 row-span-1 p-2">
          <p className="text-gray-400">
            Pomodoro de concentracion, inspirado en web.app desarrollad asdasdad
            asd asd asd aa con el proposito de concentrarte blaa
            dasdasdasskldaklsjdadasd. alkdsakldlajda jsldjalksdjlajdla asd
            asjhdjkahdkjahdkashdkaas dasd ajshdkasdksajhdkasj ada das aksdlka
            aslkdj al laksjd alsjd alskd lakjs d dasskldaklsjdadasd.
            alkdsakldlajda jsldjalksdjlajdla asd asjhdjkahdkjahdkashdkaas dasd
            ajshdkasdksajhdkasj ada das aksdlka aslkdj al laksjd alsjd alskd
            lakjs d
          </p>
        </div>
        <div className="col-span-2 row-span-1 p-2">
          <div className="flex">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              React
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              Astro
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              Tailwind
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
