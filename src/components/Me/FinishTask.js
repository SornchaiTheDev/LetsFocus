import React, { useState, useEffect } from "react";
import { Card, Text } from "../../css/main";
import styled from "styled-components";
import TodoBox from "./TodoBox";
const TaskTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Mode = styled.button`
  background: #fdca3d;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  padding: 6px;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
`;

const task = [
  {
    event: "1/07/2021",
    completed: true,
    dated: new Date("July 1 , 2021 12:34:56"),
  },
  {
    event: "1/08/2021",
    completed: true,
    dated: new Date("August 1 , 2021 12:34:56"),
  },
  {
    event: "16/08/2021",
    completed: true,
    dated: new Date("August 16 , 2021 12:34:56"),
  },
  {
    event: "21/08/2021",
    completed: true,
    dated: new Date("August 21 , 2021 12:34:56"),
  },
  {
    event: "22/08/2021",
    completed: true,
    dated: new Date("August 22 , 2021 08:35:12"),
  },
];
function FinishTask() {
  const [mode, setMode] = useState(0);
  const [currentMode, setCurrentMode] = useState("วันนี้");
  const modeCycle = () => {
    if (mode < 2) return setMode((prev) => prev + 1);
    setMode(0);
  };

  useEffect(() => {
    if (mode === 0) setCurrentMode("วันนี้");
    if (mode === 1) setCurrentMode("สัปดาห์นี้");
    if (mode === 2) setCurrentMode("เดือนนี้");
    console.log(task);
  }, [mode]);
  return (
    <Card>
      <TaskTopBar>
        <Text>รายการที่ทำเสร็จ (1)</Text>
        <Mode onClick={modeCycle}>
          <Text size={1} color="white">
            {currentMode}
          </Text>
        </Mode>
      </TaskTopBar>
      {task
        .filter((todo) => {
          const today =
            new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;
          const todoDated =
            todo.dated.setHours(0, 0, 0, 0).valueOf() / 86400000;
          let filtering = false;
          if (mode === 0 && today - todoDated === 0) filtering = true;
          if (mode === 1 && today - todoDated <= 7) filtering = true;
          if (mode === 2 && today - todoDated <= 30) filtering = true;

          return filtering && todo.completed === true;
        })
        .sort((a, b) => a.dated - b.dated)
        .map(({ event }) => (
          <TodoBox event={event} />
        ))}
    </Card>
  );
}

export default FinishTask;
