import React, { useContext } from "react";
import styled from "styled-components";
import { Text, Card } from "../../css/main";
import Icons from "./Icons";
import { MainStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";

const BadgeCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  border-bottom: 10px solid #ffa500;
  width: 260px;
  padding: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const BadgeIcon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.completed ? "#FFA500" : "#C88100")};
  padding: 20px;
  border-radius: 100px;
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Badge = observer(() => {
  const { achievementStore } = useContext(MainStore);

  const getDated = (date) => {
    const achiveDated = new Date(date);

    return `${achiveDated.getDate()}.${achiveDated
      .getMonth()
      .toString()
      .padStart(2, "0")}.${achiveDated.getFullYear()}`;
  };

  return (
    <Card justify="flex-start" align="flex-start" overflow="scroll">
      <Text weight="900" size={1.25}>
        รางวัล
      </Text>
      <BadgeGroup>
        {achievementStore.all
          .sort((a, b) => b.received_dated - a.received_dated)
          .map(({ alias, name, completed, received_dated }) => (
            <BadgeCard
              key={alias}
              onClick={() =>
                (achievementStore.updateAchievementState = {
                  mode: "focus",
                  time: 3600,
                })
              }
            >
              <BadgeIcon completed={completed}>
                <Icons completed={completed} alias={alias} />
              </BadgeIcon>
              <Text weight="900" size={1} style={{ textAlign: "justify" }}>
                {name}
              </Text>
              {completed ? (
                <Text size={0.9}>ได้รับเมื่อ {getDated(received_dated)}</Text>
              ) : (
                <Text size={0.9}>ยังไม่ปลดล็อค</Text>
              )}
            </BadgeCard>
          ))}
      </BadgeGroup>
    </Card>
  );
});

export default Badge;
