import React, { useContext } from "react";
import styled from "styled-components";
import { Text, Card } from "../../css/main";
import {
  GiMeditation,
  GiArcher,
  GiBabyFace,
  GiBeamsAura,
  GiBiceps,
  GiBullseye,
  GiBurningMeteor,
  GiDonut,
  GiFlyingFlag,
} from "react-icons/gi";
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

const Icons = ({ completed, alias }) => {
  if (alias === "focus_1_hour") {
    return <GiArcher size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_3_hours") {
    return <GiMeditation size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_for_3_days") {
    return <GiBabyFace size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_for_5_days") {
    return <GiBiceps size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_1_week") {
    return <GiBeamsAura size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_more_than_3_hours_a_week") {
    return <GiBullseye size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "focus_more_than_5_hours_a_week") {
    return (
      <GiBurningMeteor size="3rem" color={completed ? "white" : "#CED3D1"} />
    );
  }
  if (alias === "rest_for_1_hour") {
    return <GiDonut size="3rem" color={completed ? "white" : "#CED3D1"} />;
  }
  if (alias === "completed_10_todos") {
    return <GiFlyingFlag size="3rem" color={completed ? "white" : "#CED3D1"} />;
  } else {
    return <></>;
  }
};

const Badge = observer(() => {
  const { achievementStore } = useContext(MainStore);

  const getDated = (date) => {
    const achiveDated = new Date(date * 1000);

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
        {achievementStore.all.map(
          ({ alias, name, completed, received_dated }) => (
            <BadgeCard key={alias}>
              <BadgeIcon completed={completed}>
                <Icons completed={completed} alias={alias} />
              </BadgeIcon>
              <Text weight="900" size={1} style={{ textAlign: "center" }}>
                {name}
              </Text>
              {completed ? (
                <Text size={0.9}>ได้รับเมื่อ {getDated(received_dated)}</Text>
              ) : (
                <Text size={0.9}>ยังไม่ปลดล็อค</Text>
              )}
            </BadgeCard>
          )
        )}
      </BadgeGroup>
    </Card>
  );
});

export default Badge;
