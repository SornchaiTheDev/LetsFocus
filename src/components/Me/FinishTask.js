import React from "react";
import { Card, Text } from "../../css/main";
import styled from "styled-components";
import TodoBox from "./TodoBox";
import { observer } from "mobx-react-lite";
const TaskTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FinishTask = observer(({ task, amount }) => {
  return (
    <Card>
      <TaskTopBar>
        <Text>รายการที่ทำเสร็จวันนี้ ({amount})</Text>
      </TaskTopBar>
      {task
        .filter((todo) => {
          return todo.completed === true;
        })
        .sort((a, b) => a.dated - b.dated)
        .map(({ event }) => (
          <TodoBox key={event} event={event} />
        ))}
    </Card>
  );
});

export default FinishTask;
