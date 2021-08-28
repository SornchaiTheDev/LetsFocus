import React from "react";
import styled from "styled-components";
import { Group, Text } from "../../css/main";
import { AiFillTrophy } from "react-icons/ai";

const Card = styled.div`
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  width: 91%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
`;
const Icon = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${(props) => (props.background ? props.background : "black")};
`;
const LeaderboardCard = ({
  rank,
  username,
  startTime,
  onClick,
  clickabled,
  status,
  onDbFocus,
}) => {
  const getFocusTime = () => {
    let focusTime;
    if (startTime !== undefined) {
      if (startTime > 0 && status !== "idle") {
        focusTime = parseInt((Date.now() - startTime) / 1000);
      }
      if (status === "idle") {
        focusTime = onDbFocus;
      }
    }
    focusTime = onDbFocus;

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
    <Card onClick={onClick} clickable={clickabled}>
      <div
        style={{
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
      </div>
      <Group direction="column" width="100%" align="flex-start" gap={5}>
        <Text weight="600" size={1.5} style={{ flex: 1 }}>
          {username}
        </Text>
        <Text size={1.15} weight="500">
          {getFocusTime()}
        </Text>
        <Text size={1}>
          {status === "focus"
            ? "กำลังโฟกัส 📖"
            : status === "rest"
            ? "กำลังพัก 🦥"
            : status !== "me" && "ไม่อยู่ว ⛱"}
        </Text>
      </Group>
    </Card>
  );
};

export default LeaderboardCard;
