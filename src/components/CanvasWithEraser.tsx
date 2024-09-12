import React from "react";
import { useState, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function MouseStyle() {
  const [points, setPoints] = useState<Point[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [strokW, setStroke] = useState(0);

  const updatePoints = useCallback((newPoint: Point) => {
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, newPoint];
      if (updatedPoints.length > 20) {
        return updatedPoints.slice(-20);
      }
      return updatedPoints;
    });
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const fps = 200;

    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = performance.now();
      if (currentTime - lastTime > 1000 / fps) {
        const newPoint = { x: event.clientX, y: event.clientY, age: 0 };
        updatePoints(newPoint);
        setIsVisible(true);
        lastTime = currentTime;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePointsAge = () => {
      setPoints((prevPoints) =>
        prevPoints
          .map((point) => ({ ...point, age: point.age + 1 }))
          .filter((point) => point.age < 15),
      );
    };

    const intervalId = setInterval(updatePointsAge, 12);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(intervalId);
    };
  }, [updatePoints]);

  // const createPath = (points: Point[]) => {
  //   if (points.length < 2) return "";

  //   const start = points[0];
  //   let path = `M ${start.x} ${start.y}`;

  //   const totalLength = points.length - 30;

  //   for (let i = 1; i < points.length - 2; i++) {
  //     const current = points[i];
  //     const next = points[i + 1];
  //     const progress = 1 - i / totalLength; // 1 at the start, 0 at the end
  //     const strokeWidth = 0.5 + 3.8 * progress; // Varies from 7.5 to 0.5

  //     console.log(strokeWidth);

  //     if (i === 0) {
  //       path += `M ${next.x} ${next.y} `;
  //     }

  //     path += `L ${current.x} ${current.y} `;

  //     if (i < points.length - 2) {
  //       path += `M ${current.x} ${current.y} `;
  //     }

  //     path += `<path
  //               d="M ${current.x} ${current.y} L ${next.x} ${next.y}"
  //               fill="coral"
  //               stroke="rgba(157, 186, 150, 1)"
  //               stroke-width="${strokeWidth}"
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //             />`;
  //   }

  //   return path;
  // };

  const createPath = (points: Point[]) => {
    if (points.length < 2) return "";

    const start = points[0];
    let path = `M ${start.x},${start.y}`; // Comenzamos el path con M

    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      const progress = 1 - i / totalLength; // 1 at the start, 0 at the end
      const strokeWidth = 0.5 + 3.8 * progress; // Varies from 7.5 to 0.5

      if (i === 0) {
        path += `M ${next.x} ${next.y} `;
      }

      path += `L ${current.x} ${current.y} `;

      if (i < points.length - 2) {
        path += `M ${current.x} ${current.y} `;
      }


      // Usamos la curva de Bézier cuadrática (Q) para suavizar la transición
      const controlX = (current.x + next.x) / 2;
      const controlY = (current.y + next.y) / 2;


      path += ` Q ${current.x},${current.y} ${controlX},${controlY}`;
    }

    return path;
  };

  return (
    <>
      {isVisible && (
        <svg className="pointer-events-none fixed left-0 top-0 h-full w-full">
          <path
            d={createPath(points)}
            fill="none"
            stroke="rgba(157, 186, 150, 1)"
            strokeWidth="7.2" // Ajusta el ancho si lo necesitas
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        // <svg className="pointer-events-none fixed left-0 top-0 h-full w-full">
        //   <g dangerouslySetInnerHTML={{ __html: createPath(points) }} />
        //   {/* <path
        //     d={createPath(points)}
        //     fill="none"
        //     stroke="rgba(157, 186, 150, 0.5)"
        //     strokeWidth="7.5"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //   ></path> */}
        // </svg>
      )}
    </>
  );
}
