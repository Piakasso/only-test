import { FC } from "react";
import styled from "styled-components";
import { useSwiper } from "swiper/react";

import NavButton from "./NavButton";
import { Data } from "../types";

const NavigationEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 120px;
  padding-left: 80px;

  @media (max-width: 1023px) {
    padding-left: 60px;
    gap: 10px;
  }
  @media (max-width: 767px) {
    padding-left: 0;
    position: absolute;
    bottom: 15px;
  }
`;

const SliderNavigationsEl = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 767px) {
    gap: 9px;
  }
`;

interface SliderNavigationsProps {
  data: Data[];
}

const SliderNavigations: FC<SliderNavigationsProps> = ({ data }) => {
  const swiper = useSwiper();

  const nextButtonHandle = () => {
    swiper.slideNext();
  };

  const prevButtonHandle = () => {
    swiper.slidePrev();
  };

  const transformNum = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <NavigationEl>
      <div>
        <span>
          {transformNum(swiper.activeIndex + 1)}/ {transformNum(data.length)}
        </span>
      </div>
      <SliderNavigationsEl>
        <NavButton
          handleButton={prevButtonHandle}
          disabled={swiper.isBeginning}
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
        <NavButton handleButton={nextButtonHandle} disabled={swiper.isEnd}>
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
      </SliderNavigationsEl>
    </NavigationEl>
  );
};

export default SliderNavigations;
