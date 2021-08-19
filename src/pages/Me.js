import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text } from "../css/main";
import styled from "styled-components";
import LoginBox from "../components/Me/LoginBox";

const ProfileCard = styled.div`
  @media (min-width: 320px) {
    width: 80%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }
  background: white;
  border-radius: 10px;
  height: 500px;
`;

const myRank = { rank: 2, username: "โชกุนน", focusTime: 3660 };
function Me() {
  const { timerStore } = useContext(MainStore);

  return (
    <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container>
        <LoginBox />
        {/* <ProfileCard>s</ProfileCard> */}
      </Container>
    </Base>
  );
}

export default Me;
