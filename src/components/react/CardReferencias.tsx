"use client";
import React from "react";
import { useState, type MouseEvent, useCallback } from "react";
import type { CardCertificadoInterface } from "../../interfaces/CardCertificado.interface";
import type { ReferenciaInterface } from "../../interfaces/Referencia.interface";

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

export const CardReferenciasComponnent: React.FC<ReferenciaInterface> = ({
  id,
  nombreReferencia,
  carreraReferencia,
  numeroTelefono,
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
        // className="
        //     card relative
        //     grid
        //     w-[350px]
        //     grid-cols-12 gap-2
        //     rounded-lg
        //     bg-cardHover
        //     bg-opacity-40 p-4 px-5
        //     shadow-lg
        //     backdrop-blur-md
        //     backdrop-filter
        //     transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s]
        //     will-change-transform"
        className="
            card relative
            grid
            w-[350px]
            grid-cols-12 gap-2
            rounded-lg
            backdrop-blur-md
            backdrop-filter
            transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s]
            will-change-transform"
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
        <div className="col-start-1 col-end-13 flex flex-col gap-2">
          <div>
            <h1 className="text-xl font-bold text-white group-hover:text-linkGreen">
              {nombreReferencia}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <span className="me-2 rounded  px-2.5 py-0.5 text-sm font-bold text-blue-800  dark:text-blue-300">
              {carreraReferencia}
            </span>
            <span className="me-2 rounded px-2.5 py-0.5 text-sm font-medium italic text-blue-800  dark:text-blue-300">
              {numeroTelefono}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};