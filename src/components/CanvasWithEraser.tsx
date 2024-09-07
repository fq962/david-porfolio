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
    const fps = 60;

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

    const intervalId = setInterval(updatePointsAge, 16);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(intervalId);
    };
  }, [updatePoints]);

  const createPath = (points: Point[]) => {
    if (points.length < 2) return "";

    const start = points[0];
    let path = `M ${start.x} ${start.y}`;

    for (let i = 1; i < points.length - 2; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      path += ` Q ${current.x} ${current.y}, ${midX} ${midY}`;
    }

    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;

    return path;
  };

  return (
    <>
      {isVisible && (
        <svg className="pointer-events-none fixed left-0 top-0 h-full w-full">
          <path
            d={createPath(points)}
            fill="none"
            stroke="rgba(65, 65, 65, 0.6)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="1000"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
    </>
  );
}
