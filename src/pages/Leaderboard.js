import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text } from "../css/main";

function Leaderboard() {
  const { timerStore } = useContext(MainStore);

  return (
    <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <Container>
        <TopBar />
      </Container>
    </Base>
  );
}

export default Leaderboard;
