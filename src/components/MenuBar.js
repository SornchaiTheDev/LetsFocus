import React from "react";
import styled from "styled-components";
import { Text } from "../css/main";
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
function MenuBar() {
  return (
    <MenuBox>
      <Menu active>
        <Text color="white">จับเวลา</Text>
      </Menu>
      <Menu>
        <Text color="white">อันดับ</Text>
      </Menu>
      <Menu>
        <Text color="white">ฉัน</Text>
      </Menu>
    </MenuBox>
  );
}

export default MenuBar;
