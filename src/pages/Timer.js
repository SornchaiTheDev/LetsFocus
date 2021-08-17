import React, { useContext } from "react";
import TopBar from "../components/TopBar";

import { Base, Container, Text } from "../css/main";

import { MainStore } from "../store/MainStore";
import TimerClock from "../components/TimerClock";
import TodoList from "../components/TodoList";

function Timer() {
  return (
    <Base>
      <Container>
        <TopBar />
        <TimerClock />
        <TodoList />
      </Container>
    </Base>
  );
}

export default Timer;
