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

const LogoGroup = styled.div`
  border-top: 2px dotted white;
  border-bottom: 2px dotted white;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

function TopBar() {
  return (
    <LogoSection>
      <LogoGroup>
        <Text color="white" size={1.5} weight="bold">
          Let's Focus
        </Text>
      </LogoGroup>

      <MenuBar />
    </LogoSection>
  );
}

export default TopBar;
