import React from "react";
import { Text } from "../css/main";
import MenuBar from "./MenuBar";
import styled from "styled-components";

const LogoSection = styled.div`
  margin-top: 30px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function TopBar() {
  return (
    <LogoSection>
      <Text color="white" size={2} weight="bold">
        Pomodoro
      </Text>
      <MenuBar />
    </LogoSection>
  );
}

export default TopBar;
