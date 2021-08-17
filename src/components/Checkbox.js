import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { Icon } from "../css/main";
const Box = styled.div`
  //   cursor: pointer;

  width: 30px;
  height: 30px;
  border: 3px solid #0f1108;
  border-radius: 10px;
  box-shadow: 1px 2px 2px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
function Checkbox() {
  return (
    <Box>
      <Icon
        color="#85CB33"
        style={{ position: "absolute", top: -30, left: -17 }}
      >
        <FaCheck size="4rem" />
      </Icon>
    </Box>
  );
}

export default Checkbox;
