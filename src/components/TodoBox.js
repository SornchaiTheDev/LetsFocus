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
  padding: 15px; //10px;
  display: flex;
  flex-diection: column;
  justify-content: space-between;
  align-items: center;
`;

const TextSection = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TodoText = styled.h1`
  font-size: ${(props) => (props.size ? props.size : 1.25)}rem;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.color ? props.color : "black")};
`;

const TodoBoxComp = ({ id, event, completed }) => {
  return (
    <>
      <TodoBox>
        <TextSection>
          <TodoText weight={500} completed={completed}>
            {event}
          </TodoText>
        </TextSection>
        <Checkbox id={id} />
      </TodoBox>
    </>
  );
};

export default TodoBoxComp;
