import React from "react";
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
function FinishTask() {
  return (
    <Card>
      <TaskTopBar>
        <Text>รายการที่ทำเสร็จ (1)</Text>
        <Mode>
          <Text size={1} color="white">
            สัปดาห์นี้
          </Text>
        </Mode>
      </TaskTopBar>
    </Card>
  );
}

export default FinishTask;
