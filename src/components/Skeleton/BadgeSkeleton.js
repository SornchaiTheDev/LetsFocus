import React from "react";
import styled from "styled-components";
import { Text } from "../../css/main";

import { observer } from "mobx-react-lite";

const BadgeCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  border-bottom: 10px solid hsl(356, 63%, 54%);
  width: 260px;
  padding: 20px;
  padding-bottom: 50px;
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
  animation: loading 1s infinite alternate;
  @keyframes loading {
    from {
      background: hsl(356, 20%, 90%);
    }
    to {
      background: hsl(356, 20%, 70%);
    }
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

// hsl(356, 63%, 54%)

const TextSkeleton = styled.div`
  width: 60%;
  height: 1.25rem;
  border-radius: 1rem;
  background: hsl(50, 20%, 90%);
  animation: loading 1s infinite alternate;
  @keyframes loading {
    from {
      background: hsl(356, 20%, 90%);
    }
    to {
      background: hsl(356, 20%, 70%);
    }
  }
`;

const DateSkeleton = styled.div`
  width: 30%;
  height: 0.75rem;
  border-radius: 1rem;
  background: hsl(50, 20%, 90%);
  animation: loading 1s infinite alternate;
  @keyframes loading {
    from {
      background: hsl(356, 20%, 90%);
    }
    to {
      background: hsl(356, 20%, 70%);
    }
  }
`;

const BadgeSkeleton = observer(({ achievements }) => {
  const getDated = (date) => {
    const achiveDated = new Date(date);

    return `${achiveDated.getDate()}.${achiveDated
      .getMonth()
      .toString()
      .padStart(2, "0")}.${achiveDated.getFullYear()}`;
  };

  return (
    <BadgeGroup>
      {new Array(10).fill("").map((data, index) => (
        <BadgeCard key={index}>
          <BadgeIcon></BadgeIcon>
          <TextSkeleton />
          <DateSkeleton />
          {/* <Text weight="900" size={1} style={{ textAlign: "justify" }}></Text> */}
        </BadgeCard>
      ))}
    </BadgeGroup>
  );
});

export default BadgeSkeleton;
