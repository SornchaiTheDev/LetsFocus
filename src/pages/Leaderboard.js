import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container } from "../css/main";
import styled from "styled-components";
import LeaderboardCard from "../components/Leaderboard/LeaderboardCard";

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

const ScrollBox = styled.div`
  width: 80%;
  padding: 20px;
  max-height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  // padding-bottom: 20vh;
`;

const Leaderboard = observer(() => {
  const mainStore = useContext(MainStore);
  const { leaderBoardStore } = useContext(MainStore);
  const users = leaderBoardStore.usersRank;

  // For lots user make lazy loading -- Plan
  // const _onScroll = () => {
  //   let startAt = 0;
  //   const leaderboard = document.getElementById("leaderboard");
  //   if (
  //     leaderboard.scrollHeight - leaderboard.offsetHeight ===
  //     leaderboard.scrollTop
  //     //   &&
  //     // startAt + 10 < allUser
  //   ) {
  //     console.log(startAt + 10);
  //     // setStartAt((prev) => prev + 10);
  //   }
  // };

  return (
    <Base background={mainStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container>
        <LeaderBox>
          <LeaderboardCard
            rank={leaderBoardStore.myRank}
            username={mainStore.user.username}
            focusTime={mainStore.user.focusTime}
          />

          <Divider />
        </LeaderBox>

        <LeaderBox style={{ marginBottom: 50 }}>
          {users
            .sort((a, b) => b.focusTime - a.focusTime)
            .map(({ username, focusTime }, index) => (
              <LeaderboardCard
                key={index}
                rank={index + 1}
                username={username}
                focusTime={focusTime}
              />
            ))}
        </LeaderBox>
      </Container>
    </Base>
  );
});

export default Leaderboard;
