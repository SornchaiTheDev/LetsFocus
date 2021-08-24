import React, { useState, useEffect, useContext } from "react";
import { Card, Text } from "../../css/main";
import styled from "styled-components";
import TodoBox from "./TodoBox";
import { MainStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";
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

const FinishTask = observer(() => {
  const [mode, setMode] = useState(0);
  const [currentMode, setCurrentMode] = useState("วันนี้");
  const mainStore = useContext(MainStore);
  const modeCycle = () => {
    if (mode < 2) return setMode((prev) => prev + 1);
    setMode(0);
  };

  useEffect(() => {
    if (mode === 0) setCurrentMode("วันนี้");
    if (mode === 1) setCurrentMode("สัปดาห์นี้");
    if (mode === 2) setCurrentMode("เดือนนี้");
  }, [mode]);
  return (
    <Card>
      <TaskTopBar>
        <Text>รายการที่ทำเสร็จอาทิตย์นี้ ({mainStore.allFinishTask})</Text>
        {/* <Mode onClick={modeCycle}>
          <Text size={1} color="white">
            {currentMode}
          </Text>
        </Mode> */}
      </TaskTopBar>
      {mainStore.user.finishTask
        .filter((todo) => {
          const today =
            new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;
          const todoDated =
            new Date(todo.dated).setHours(0, 0, 0, 0).valueOf() / 86400000;
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
});

export default FinishTask;
