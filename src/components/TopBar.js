import React from "react";
import { LogoSection } from "../css/Topbar";
import { Text } from "../css/main";
import MenuBar from "./MenuBar";
function TopBar({ children }) {
  return (
    <LogoSection>
      <Text color="white" size={2} weight="bold">Pomodoro</Text>
      <MenuBar />
    </LogoSection>
  );
}

export default TopBar;
