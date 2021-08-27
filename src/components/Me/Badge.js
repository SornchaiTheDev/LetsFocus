import React, { useContext } from "react";
import styled from "styled-components";
import { Text, Icon, Card } from "../../css/main";
import { GiMeditation } from "react-icons/gi";
import { MainStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";
const BadgeCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  border-bottom: 10px solid #eb3c27;
  width: 200px;
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
  background: gold;
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
const Scroll = styled.div`
  height: 100%;
  flex-grow: 1;
`;

const Badge = observer(() => {
  const { achievementStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  return (
    <Card justify="flex-start" align="flex-start">
      <Text weight="900" size={1.25}>รางวัล</Text>
      <BadgeGroup>
        {achievementStore.all.map(({ alias, name }) => (
          <BadgeCard key={alias} onClick={() => (mainStore.isReceived = true)}>
            <BadgeIcon>
              <GiMeditation size="3rem" color="black" />
            </BadgeIcon>
            <Text weight="900" size={1}>
              {name}
            </Text>
            <Text size={0.9}>ได้รับเมื่อ 26.08.2021</Text>
          </BadgeCard>
        ))}
      </BadgeGroup>
    </Card>
  );
});

export default Badge;
