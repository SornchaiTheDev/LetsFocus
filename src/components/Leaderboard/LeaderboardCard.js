import React from "react";
import styled from "styled-components";
import { Text } from "../../css/main";
import { AiFillTrophy } from "react-icons/ai";

const Card = styled.div`
  width: 91%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
`;
const Icon = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${(props) => (props.background ? props.background : "black")};
`;
const LeaderboardCard = ({ rank, username, focusTime, onClick }) => {
  const getFocusTime = () => {
    if (focusTime === undefined) return "error";
    const hour = Math.floor(focusTime / 3600);
    const minutes = parseInt((focusTime / 60) % 60);

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
    <Card onClick={onClick}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon
          background={
            rank === 1
              ? "gold"
              : rank === 2
              ? "silver"
              : rank === 3
              ? "#FFA384"
              : "white"
          }
        >
          {rank > 3 ? (
            <Text>{rank}</Text>
          ) : (
            <AiFillTrophy size="1rem" color="white" />
          )}
        </Icon>

        <Text weight="600">{username}</Text>
      </div>
      <Text size={1} weight="500">
        {getFocusTime()}
      </Text>
    </Card>
  );
};

export default LeaderboardCard;
