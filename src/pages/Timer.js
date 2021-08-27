import React, { useState, useContext } from "react";
import TopBar from "../components/TopBar";

import { Base, Container } from "../css/main";

import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
import TimerClock from "../components/Timer/TimerClock";
import TodoList from "../components/Timer/TodoList";
import Alert from "../components/Alert";

const Timer = observer(() => {
  const { timerStore } = useContext(MainStore);
  const [stopConfirm, setStopConfirm] = useState(false);
  const mainStore = useContext(MainStore);

  return (
    <>
      {stopConfirm && (
        <Alert
          title="หยุดจับเวลา"
          msg="ระบบจะไม่บันทึกเวลาของคุณ"
          btn={[
            {
              title: "ตกลง",
              onClick: () => {
                timerStore.stop();
                mainStore.uid !== null && timerStore.setStopStatus();
                setStopConfirm(false);
              },
              background: "#85CB33",
            },

            {
              title: "ยกเลิก",
              onClick: () => setStopConfirm(false),
              background: "#D33F49",
            },
          ]}
        />
      )}
      <Base background={mainStore.mode === "focus" ? "#D33F49" : "#3F7CAC"}>
        <TopBar menu />
        <Container gap={30}>
          <TimerClock stopConfirm={() => setStopConfirm(true)} />
          <TodoList />
        </Container>
      </Base>
    </>
  );
});

export default Timer;
