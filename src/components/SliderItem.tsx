import styled from "styled-components";
import { SliderItemProps } from "../types";

const TimerEl = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 200px;
  gap: 100px;
  & span {
    font-weight: var(--fw-bold);
    letter-spacing: -4px;
  }
  @media (max-width: 1023px) {
    font-size: 120px;
    gap: 60px;
  }
  @media (max-width: 767px) {
    font-size: var(--fs-l);
    gap: 30px;
  }
`;

const CategoryEl = styled.div`
  font-weight: var(--fw-bold);
  padding-top: 20px;
  @media (max-width: 1023px) {
    padding-left: 60px;
  }
  @media (max-width: 767px) {
    padding-left: 0px;
  }
`;

const Xline = styled.div`
  position: absolute;
  top: 50%;
  width: 100vw;
  height: 1px;
  background: rgba(66, 86, 122, 0.1) 1px;
  z-index: 1000;
  @media (max-width: 1023px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: block;
    top: 200%;
  }
`;

const SliderItem: React.FC<SliderItemProps> = ({
  startYear,
  endYear,
  isMobile,
  category,
}) => {
  return (
    <>
      <TimerEl>
        <span>{startYear}</span>
        <span style={{ color: "#EF5DA8" }}>{endYear}</span>
        <Xline />
      </TimerEl>
      {isMobile && <CategoryEl>{category.toUpperCase()}</CategoryEl>}
    </>
  );
};

export default SliderItem;
