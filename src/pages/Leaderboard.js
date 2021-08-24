import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text } from "../css/main";
import styled from "styled-components";
import LeaderboardCard from "../components/Leaderboard/LeaderboardCard";

const LeaderBox = styled.div`
  @media (min-width: 320px) {
    width: 80%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 50%;
  border-bottom: 3px solid white;
`;

const UserRank = [
  { username: "wrtk", focusTime: 12345 },
  { username: "SornchaiTheDev KU82", focusTime: 3660 },
  { username: "ปลาทูใจรว้าย", focusTime: 2341 },
  { username: "Apricotneonmagenta", focusTime: 2330 },
  { username: "มดซี้แดงง", focusTime: 1456 },
  { username: "หนูแหวนน", focusTime: 1220 },
];

const myRank = { rank: 2, username: "โชกุนน", focusTime: 3660 };
const Leaderboard = observer(() => {
  const mainStore = useContext(MainStore);

  return (
    <Base background={mainStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container>
        <LeaderBox>
          <LeaderboardCard
            rank={
              UserRank.findIndex(
                (user) => user.username === mainStore.username
              ) + 1
            }
            username={mainStore.username}
            focusTime={mainStore.focusTime}
          />

          <Divider />
          {UserRank.sort((a, b) => b.focusTime - a.focusTime).map(
            ({ username, focusTime }, index) => (
              <LeaderboardCard
                key={index}
                rank={index + 1}
                username={username}
                focusTime={focusTime}
              />
            )
          )}
        </LeaderBox>
      </Container>
    </Base>
  );
});

export default Leaderboard;
