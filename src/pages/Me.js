import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text, Card } from "../css/main";
import FinishTask from "../components/Me/FinishTask";
import ProgressHistory from "../components/Me/ProgressHistory";

const myRank = { rank: 2, username: "โชกุนน", focusTime: 3660 };

function Me() {
  const { timerStore } = useContext(MainStore);

  const { focusTime } = myRank;
  const getFocusTime = () => {
    if (focusTime === undefined) return "error";
    const hour = Math.floor(focusTime / 3600);
    const minutes = Math.ceil((focusTime / 60) % 60);

    if (hour >= 1) {
      if (minutes > 0) {
        return `โฟกัส ${hour} ชม. ${minutes} นาที`;
      }
      return `โฟกัส ${hour} ชม.`;
    } else {
      return `โฟกัส ${minutes} นาที`;
    }
  };
  return (
    <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container gap={20}>
        {/* <LoginBox /> */}
        <Card height={100}>
          <Text weight="600" size={2}>
            โชกุนนน
          </Text>

          <Text weight="300">{getFocusTime()}</Text>
        </Card>
        <Card height={250}>
          <ProgressHistory />
        </Card>

        <FinishTask />
      </Container>
    </Base>
  );
}

export default Me;
