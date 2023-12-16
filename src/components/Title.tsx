import styled, { CSSProperties } from "styled-components";

interface TitleProps {
  styles?: CSSProperties;
}

const TitleEl = styled.div`
  display: flex;
  gap: 80px;
  padding-bottom: 40px;
  & h1 {
    font-size: var(--fs-l);
    font-weight: var(--fw-bold);
  }

  @media (max-width: 1023px) {
    gap: 60px;

    & h1 {
      font-size: 48px;
    }
  }

  @media (max-width: 767px) {
    gap: 60px;
    & h1 {
      font-size: var(--fs-sm);
    }
    & div {
      display: none;
    }
  }
`;

const Decor = styled.div`
  width: 5px;
  background: linear-gradient(#3877ee, #ef5da8);
`;

const Title = ({ styles }: TitleProps) => {
  return (
    <TitleEl style={styles}>
      <Decor />
      <h1>
        Исторические <br /> даты
      </h1>
    </TitleEl>
  );
};

export default Title;
