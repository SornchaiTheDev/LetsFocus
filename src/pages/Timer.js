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
      <Alert
        title="หยุดจับเวลา"
        btn={[
          {
            title: "ตกลง",
            onClick: () => console.log("accept"),
            background: "#85CB33",
          },

          {
            title: "ยกเลิก",
            onClick: () => console.log("cancel"),
            background: "#eb3c27",
          },
        ]}
      />
      <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
        <TopBar />
        <Container>
          <TimerClock />
          <TodoList />
        </Container>
      </Base>
    </>
  );
});

export default Timer;
