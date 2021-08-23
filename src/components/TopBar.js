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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

function TopBar() {
  return (
    <LogoSection>
      <LogoGroup>
        <Text color="white" size={2} weight="bold">
          FocusRank
        </Text>
      </LogoGroup>

      <MenuBar />
    </LogoSection>
  );
}

export default TopBar;
