import styled from "styled-components";
import { NavButtonChildren } from "../types";

const NavButtonEl = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px var(--primary) solid;
  background: var(--white);
  cursor: pointer;
  z-index: 10;
  &:disabled {
    border: var(--primary-transparent) 1px solid;
  }
  &:disabled path {
    stroke: var(--primary-transparent);
  }
  @media (max-width: 767px) {
    height: 25px;
    width: 25px;
  }
`;

const NavButton: React.FC<NavButtonChildren> = ({
  children,
  handleButton,
  disabled,
  styles,
  classNames,
}) => {
  return (
    <NavButtonEl
      onClick={handleButton}
      disabled={disabled}
      style={styles}
      className={classNames}
    >
      {children}
    </NavButtonEl>
  );
};

export default NavButton;
