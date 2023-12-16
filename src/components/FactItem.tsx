import React from "react";
import styled from "styled-components";
import { FactItemProps } from "../types";

const FactItemEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 320px;
  h2 {
    font-size: 25px;
    color: var(--blue);
    font-family: var(--font-bebas);
  }
  p {
    font-size: var(--fs-md);
    overflow-y: scroll;
  }

  @media (max-width: 767px) {
    h2 {
      font-size: inherit;
    }
    p {
      font-size: var(--fs-sm);
    }
  }
`;

const FactItem: React.FC<FactItemProps> = ({ date, description, title }) => {
  return (
    <FactItemEl>
      <h2>{date}</h2>
      <p>{description}</p>
    </FactItemEl>
  );
};

export default FactItem;
