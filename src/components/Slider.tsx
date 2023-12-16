import { useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import SliderItem from "./SliderItem";
import SliderNavigations from "./SliderNavigations";
import CircleBar from "./CircleBar";
import Title from "./Title";
import FactsSlider from "./FactsSlider";
import { SliderProps } from "../types";

const SliderEl = styled.div`
  overflow: visible;
  padding-top: 170px;
  padding-bottom: 30px;
  position: relative;
  height: 100%;
  @media (max-width: 1023px) {
    padding-top: 100px;
  }

  @media (max-width: 767px) {
    padding-top: 60px;
  }
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  flex-direction: column;
  height: 100%;
  .swiper-pagination-bullet {
    background: rgba(66, 86, 122, 0.4);
  }
  @media (max-width: 767px) {
    .swiper-wrapper {
      height: auto;
    }
  }
`;

const Slider = ({ data, isMobile }: SliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <SliderEl>
      <StyledSwiper
        id="slider"
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper: SwiperClass) => {
          handleSlideChange(swiper);
        }}
        pagination={
          isMobile
            ? {
                clickable: true,
              }
            : false
        }
      >
        <span slot="container-start">
          <Title />
        </span>
        {data.map((item, i) => (
          <SwiperSlide key={item.category}>
            <SliderItem
              {...item}
              isMobile={isMobile}
              isActive={activeSlide === i ? true : false}
            />
          </SwiperSlide>
        ))}
        <SliderNavigations data={data} />
        <FactsSlider facts={data[activeSlide]} isMobile={isMobile} />
        <span slot="container-end">
          <CircleBar
            data={data}
            activeIndex={activeSlide}
            isMobile={isMobile}
          />
        </span>
      </StyledSwiper>
    </SliderEl>
  );
};

export default Slider;
