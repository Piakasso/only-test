import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import styled from "styled-components";
import gsap from "gsap";

import "swiper/css";
import { FactsSliderProps } from "../types";

import FactItem from "./FactItem";
import NavButton from "./NavButton";

const FactsSliderEl = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 60px 0 80px 0;
`;

const StyledSwiper = styled(Swiper)`
  padding: 0 80px;

  @media (max-width: 767px) {
    padding: 0;
  }
`;
const FactsSlider: React.FC<FactsSliderProps> = ({ facts, isMobile }) => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768);
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [swiperRef, setSwiperRef] = useState<null | SwiperClass>(null);
  const componentRef = useRef(null);

  useEffect(() => {
    if (swiperRef) {
      setIsEnd(swiperRef.isEnd);
      setIsStart(swiperRef.isBeginning);
    }
    const handleResize = () => {
      setIsSmall(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [swiperRef]);

  useEffect(() => {
    gsap.fromTo(
      componentRef.current,
      {
        opacity: 0,
        yPercent: isSmall ? +3 : 0,
      },
      {
        opacity: 1,
        duration: isSmall ? 1 : 2,
        yPercent: 0,
        ease: "sine.in",
      }
    );
  }, [facts, isSmall]);

  return (
    <FactsSliderEl ref={componentRef}>
      <StyledSwiper
        id="factSlider"
        modules={[Navigation, FreeMode]}
        spaceBetween={isSmall ? 20 : 80}
        slidesPerView={isSmall ? 1.5 : 3}
        freeMode={true}
        navigation={{
          nextEl: ".leftbutton",
          prevEl: ".rightbutton",
        }}
        onSwiper={(swiper: SwiperClass) => setSwiperRef({ ...swiper })}
        onSlideChange={(swiper: SwiperClass) => {
          setSwiperRef({ ...swiper });
        }}
      >
        {facts.events.map((fact) => (
          <SwiperSlide key={fact.date}>
            <FactItem {...fact} />
          </SwiperSlide>
        ))}
        {isSmall || (
          <>
            <NavButton
              styles={{
                position: "absolute",
                top: "50%",
                left: 20,
                transform: "translateY(-50%)",
                height: "40px",
                width: "40px",
              }}
              classNames="rightbutton"
              disabled={isStart}
            >
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </NavButton>
            <NavButton
              styles={{
                position: "absolute",
                top: "50%",
                right: 20,
                transform: "translateY(-50%)",
                height: "40px",
                width: "40px",
              }}
              classNames="leftbutton"
              disabled={isEnd}
            >
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </NavButton>
          </>
        )}
      </StyledSwiper>
    </FactsSliderEl>
  );
};
export default FactsSlider;
