import React, { useContext } from "react";
import TopBar from "../components/TopBar";

import { Base, Container, Text } from "../css/main";

import { MainStore } from "../store/MainStore";
import TimerClock from "../components/TimerClock";
import TodoList from "../components/TodoList";
import { observer } from "mobx-react-lite";
import Alert from "../components/Alert";

const Timer = observer(() => {
  const { timerStore } = useContext(MainStore);
  return (
    <>
      <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
        <Container>
          <TopBar />
          <TimerClock />
          <TodoList />
        </Container>
      </Base>
    </>
  );
});

export default Timer;
