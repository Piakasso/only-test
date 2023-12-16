import styled from "styled-components";
import { useEffect, useState } from "react";

import Slider from "./components/Slider";
import { data } from "./assets/data";

const AppEl = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  position: relative;
  max-width: 1440px;
  flex-grow: 1;
  height: 100%;
  margin: 0 auto;
  border-left: var(--primary-transparent) solid 1px;
  border-right: var(--primary-transparent) solid 1px;
  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const Yline = styled.div`
  height: 100%;
  position: absolute;
  width: 1px;
  background: rgba(66, 86, 122, 0.1) 1px;
  top: 0;
  left: 50%;
`;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <AppEl>
      <Wrapper>
        <Slider data={data} isMobile={isMobile} />
        {isMobile || <Yline />}
      </Wrapper>
    </AppEl>
  );
}

export default App;
