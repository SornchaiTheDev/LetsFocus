import React from "react";

import styled from "styled-components";
import { Text } from "../css/main";
import { useHistory, useLocation } from "react-router";

const MenuBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;
const Menu = styled.div`
  cursor: pointer;
  padding: 6px;
  border-bottom: ${(props) => (props.active ? "5px solid white" : "none")};
`;
const MenuBar = () => {
  let location = useLocation();
  const history = useHistory();

  return (
    <MenuBox>
      <Menu
        active={location.pathname === "/"}
        onClick={() => history.replace("/")}
      >
        <Text color="white">จับเวลา</Text>
      </Menu>
      <Menu
        active={location.pathname === "/leaderboard"}
        onClick={() => history.replace("/leaderboard")}
      >
        <Text color="white">อันดับ</Text>
      </Menu>
      <Menu
        active={location.pathname === "/me"}
        onClick={() => history.replace("/me")}
      >
        <Text color="white">ฉัน</Text>
      </Menu>
    </MenuBox>
  );
};

export default MenuBar;
