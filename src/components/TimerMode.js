import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";

import { Text } from "../css/main";
const TimerSelector = styled.div`
  width: 100px;
  height: 30px;
  padding: 10px;
  background: white;
  border: 1px solid white;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
`;

const TimerMode = observer(() => {
  const { timerStore } = useContext(MainStore);

  const modeChange = () => {
    if (timerStore.mode === "focus") {
      timerStore.setMode("rest");
    } else {
      timerStore.setMode("focus");
    }
  };

  return (
    <TimerSelector onClick={modeChange}>
      <Text color="black" size={1} weight="700">
        {timerStore.mode === "focus" ? "ช่วงโฟกัส" : "ช่วงพัก"}
      </Text>
    </TimerSelector>
  );
});

export default TimerMode;
