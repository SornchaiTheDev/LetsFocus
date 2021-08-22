import React, { useState, useContext } from "react";
import TopBar from "../components/TopBar";

import { Base, Container, Text } from "../css/main";

import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
import TimerClock from "../components/Timer/TimerClock";
import TodoList from "../components/Timer/TodoList";
import Alert from "../components/Alert";

const Timer = observer(() => {
  const { timerStore } = useContext(MainStore);
  const [stopConfirm, setStopConfirm] = useState(false);
  return (
    <>
      {stopConfirm && (
        <Alert
          title="หยุดจับเวลา"
          btn={[
            {
              title: "ตกลง",
              onClick: () => {
                timerStore.stop();
                setStopConfirm(false);
              },
              background: "#85CB33",
            },

            {
              title: "ยกเลิก",
              onClick: () => setStopConfirm(false),
              background: "#eb3c27",
            },
          ]}
        />
      )}
      <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
        <TopBar />
        <Container>
          <TimerClock stopConfirm={() => setStopConfirm(true)} />
          <TodoList />
        </Container>
      </Base>
    </>
  );
});

export default Timer;
