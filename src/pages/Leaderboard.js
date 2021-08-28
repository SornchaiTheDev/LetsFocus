import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text } from "../css/main";
import styled from "styled-components";
import LeaderboardCard from "../components/Leaderboard/LeaderboardCard";
import { clear } from "localforage";

// Styles
const LeaderBox = styled.div`
  @media (min-width: 320px) {
    width: 80%;
  }
  @media (min-width: 928px) {
    width: 70%;
  }
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

const Leaderboard = observer(({ history }) => {
  const mainStore = useContext(MainStore);

  const { timerStore, leaderBoardStore } = useContext(MainStore);

  const users = leaderBoardStore.usersRank;

  return (
    <Base background={mainStore.mode === "focus" ? "#D33F49" : "#3F7CAC"}>
      <TopBar menu />
      <Container>
        <LeaderBox>
          {mainStore.user.username === null ? (
            <Text size={1} weight="600" color="white">
              เข้าสู่ระบบเพื่อจัดอันดับคะแนน
            </Text>
          ) : (
            <LeaderboardCard
              status="me"
              startTime={timerStore.startTime}
              rank={leaderBoardStore.myRank}
              username={mainStore.user.username}
              onDbFocus={mainStore.user.focusTime}
            />
          )}

          <Divider />
        </LeaderBox>

        <LeaderBox style={{ marginBottom: 50 }}>
          {users
            .sort((a, b) => b.focusTime - a.focusTime)
            .map(({ username, startTime, status, focusTime }, index) => (
              <LeaderboardCard
                clickabled={username !== mainStore.user.username}
                onClick={() =>
                  username !== mainStore.user.username &&
                  history.push(`/user/${username}`)
                }
                status={status}
                key={index}
                rank={index + 1}
                username={username}
                onDbFocus={focusTime}
                startTime={startTime}
              />
            ))}
        </LeaderBox>
      </Container>
    </Base>
  );
});

export default Leaderboard;
