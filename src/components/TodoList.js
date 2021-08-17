import React from "react";
import styled from "styled-components";
import { Text } from "../css/main";
import Checkbox from "./Checkbox";
const TodoBox = styled.div`
  @media (min-width: 320px) {
    width: 90%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }

  background: white;
  border-radius: 20px;
  box-shadow: 2px 5px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  display: flex;
  flex-diection: column;
  justify-content: space-between;
  align-items: center;
`;

const TodoArea = styled.div`
  width: 100%;
  height: 100%;
  background: gold;
`;

function TodoList() {
  return (
    <>
      <TodoBox>
        <Text weight={500}>แคล หน้า 1-10</Text>
        <Checkbox />
      </TodoBox>
    </>
  );
}

export default TodoList;
