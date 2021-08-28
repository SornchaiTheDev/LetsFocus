import React, { useContext } from "react";
import styled from "styled-components";
import { MainStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";

import { Text } from "../../css/main";
const TimerSelector = styled.div`
  cursor: pointer;
  user-select: none;
  width: 100px;
  height: 30px;
  padding: 6px;
  background: white;
  border: 1px solid white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
`;

const TimerMode = observer(() => {
  const mainStore = useContext(MainStore);

  return (
    <TimerSelector onClick={() => mainStore.setMode()}>
      <Text color="black" size={1} weight="700">
        {mainStore.mode === "focus" ? "ช่วงโฟกัส" : "ช่วงพัก"}
      </Text>
    </TimerSelector>
  );
});

export default TimerMode;
