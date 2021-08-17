import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Text } from "../css/main";
import Checkbox from "./Checkbox";

import { MainStore } from "../store/MainStore";

const TodoBox = styled.div`
  width: 95%;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 5px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 15px 10px;
  display: flex;
  flex-diection: column;
  justify-content: space-between;
  align-items: center;
`;

const TextSection = styled.div`
  width: 70%;
  height: 100%;
`;

const TodoBoxComp = ({ id, event, completed }) => {
  return (
    <>
      <TodoBox>
        <TextSection>
          <Text weight={500}>{event}</Text>
        </TextSection>
        <Checkbox id={id} />
      </TodoBox>
    </>
  );
};

export default TodoBoxComp;
