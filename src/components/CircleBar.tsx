import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSwiper } from "swiper/react";
import gsap from "gsap";
import { CircleBarProps } from "../types";

const Circle = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 540px;
  height: 540px;
  background-color: transparent;
  border: 1px solid rgba(66, 86, 122, 0.1);
  border-radius: 50%;
  z-index: 50;
`;

const TitleEl = styled.div`
  position: absolute;
  right: -150%;
`;

const Dot = styled.span<{ x: number; y: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: rgba(66, 86, 122, 0.1) 1px solid;
  font-size: 30px;
  color: "#42567A";

  background: var(--primary);
  left: ${(props) => props.x - 3}px;
  top: ${(props) => props.y - 3}px;
`;

const CircleBar: React.FC<CircleBarProps> = ({
  data,
  activeIndex,
  isMobile,
}) => {
  const swiper = useSwiper();
  const dotRefs = useRef<Array<HTMLSpanElement | null>>(
    Array(data.length).fill(null)
  );
  const circleRef = useRef<HTMLDivElement>(null);
  const radius = 270;
  const center = { x: 270, y: 270 };

  const updateCirclePosition = (index: number) => {
    const deg = 360 / data.length;
    const needStep = data.length - index;

    gsap.to(circleRef.current, {
      duration: 2,
      rotate: ` ${deg * needStep}`,
      ease: "power1.inOut",
    });

    dotRefs.current.forEach((dot) => {
      gsap.to(dot, {
        duration: 2,
        rotation: `-${deg * needStep} `,
        ease: "power1.inOut",
      });
    });
  };

  useEffect(() => {
    updateCirclePosition(activeIndex);
  }, [activeIndex]);

  const handleOnEnter = (pointIndex: number, x: number, y: number) => {
    const dotRef = dotRefs.current[pointIndex];
    if (pointIndex !== activeIndex) {
      gsap.to(dotRef, {
        duration: 1,
        background: "#fff",
        fontSize: "20px",
        width: "56px",
        height: "56px",
        left: `${x - 28}px`,
        top: `${y - 28}px`,
        border: " 1px solid rgba(66, 86, 122, 0.1)",
      });
    }
  };

  const handleOnLeave = (pointIndex: number, x: number, y: number) => {
    const dotRef = dotRefs.current[pointIndex];
    gsap.to(dotRef, {
      duration: 1,
      background: activeIndex === pointIndex ? "#fff" : "rgba(66, 86, 122)",
      fontSize: activeIndex === pointIndex ? "20px" : 0,
      width: activeIndex === pointIndex ? "56px" : "6px",
      height: activeIndex === pointIndex ? "56px" : "6px",
      left: activeIndex === pointIndex ? `${x - 28}px` : `${x - 3}px`,
      top: activeIndex === pointIndex ? `${y - 28}px` : `${y - 3}px`,
      border:
        activeIndex === pointIndex
          ? "1px solid rgba(66, 86, 122, 0.1)"
          : "none",
    });
  };

  const points = data.map((_, index) => {
    const angle = ((-45 + index * (360 / data.length)) * Math.PI) / 180;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    return (
      <Dot
        key={index}
        x={x}
        y={y}
        style={
          activeIndex === index
            ? {
                background: "#fff",
                fontSize: "20px",
                width: "56px",
                height: "56px",
                left: `${x - 28}px`,
                top: `${y - 28}px`,
                border: "1px solid rgba(66, 86, 122, 0.1)",
              }
            : {
                background: "rgba(66, 86, 122)",
                fontSize: 0,
                width: "6px",
                height: "6px",
                left: `${x - 3}px`,
                top: `${y - 3}px`,
                border: "none",
              }
        }
        onClick={() => swiper.slideTo(index)}
        ref={(el) => (dotRefs.current[index] = el)}
        onMouseEnter={() => handleOnEnter(index, x, y)}
        onMouseLeave={() => handleOnLeave(index, x, y)}
      >
        {index + 1}
        {activeIndex === index ? (
          <TitleEl>{data[index].category.toUpperCase()}</TitleEl>
        ) : null}
      </Dot>
    );
  });
  return (
    <>
      {!isMobile && (
        <>
          <Circle ref={circleRef}>{points}</Circle>
        </>
      )}
    </>
  );
};

export default CircleBar;
