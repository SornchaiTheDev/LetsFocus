import React, { useContext } from "react";
import TopBar from "../components/TopBar";

import { Base, Container, Text } from "../css/main";

import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
import TimerClock from "../components/Timer/TimerClock";
import TodoList from "../components/Timer/TodoList";
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
