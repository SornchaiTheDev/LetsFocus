import React from "react";
import styled from "styled-components";
import { Text } from "../../css/main";
import { FaCheck } from "react-icons/fa";

const TodoBox = styled.div`
  width: 95%;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 5px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 15px; //10px;
  display: flex;
  flex-diection: column;
  justify-content: space-between;
  align-items: center;
`;

const TextSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Box = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #0f1108;
  border-radius: 10px;
  box-shadow: 1px 2px 2px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function TodoBoxComp({ event }) {
  return (
    <TodoBox>
      <TextSection>
        <Text>{event}</Text>
      </TextSection>
      <Box>
        <div style={{ position: "absolute", top: -30, left: -17 }}>
          <FaCheck size="4rem" color="#85CB33" />
        </div>
      </Box>
    </TodoBox>
  );
}

export default TodoBoxComp;
