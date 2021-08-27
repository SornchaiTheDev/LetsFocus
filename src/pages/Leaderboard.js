import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text } from "../css/main";
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
`;

const Leaderboard = observer(({ history }) => {
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
              rank={leaderBoardStore.myRank}
              username={mainStore.user.username}
              focusTime={mainStore.user.focusTime}
            />
          )}

          <Divider />
        </LeaderBox>

        <LeaderBox style={{ marginBottom: 50 }}>
          {users
            .sort((a, b) => b.focusTime - a.focusTime)
            .map(({ username, focusTime, status }, index) => (
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
                focusTime={focusTime}
              />
            ))}
        </LeaderBox>
      </Container>
    </Base>
  );
});

export default Leaderboard;
