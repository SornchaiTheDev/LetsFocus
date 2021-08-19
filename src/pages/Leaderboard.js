import React, { useContext } from "react";
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
`;

const Divider = styled.div`
  width: 50%;
  border-bottom: 3px solid white;
`;

const UserRank = [
  { rank: 2, username: "โชกุนนน", focusTime: 3660 },
  { rank: 1, username: "wrtk", focusTime: 123456 },
  { rank: 3, username: "ปลาทูใจรว้าย", focusTime: 2341 },
  { rank: 4, username: "Apricotneonmagenta", focusTime: 2330 },
  { rank: 5, username: "มดซี้แดงง", focusTime: 1456 },
  { rank: 6, username: "หนูแหวนน", focusTime: 1220 },
];

const myRank = { rank: 2, username: "โชกุนน", focusTime: 3660 };
function Leaderboard() {
  const { timerStore } = useContext(MainStore);

  return (
    <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <Container>
        <TopBar />

        <LeaderBox>
          <LeaderboardCard
            rank={myRank.rank}
            username={myRank.username}
            focusTime={myRank.focusTime}
          />

          <Divider />
          {UserRank.sort((a, b) => b.focusTime - a.focusTime).map(
            ({ rank, username, focusTime }, index) => (
              <LeaderboardCard
                key={index}
                rank={rank}
                username={username}
                focusTime={focusTime}
              />
            )
          )}
        </LeaderBox>
      </Container>
    </Base>
  );
}

export default Leaderboard;
