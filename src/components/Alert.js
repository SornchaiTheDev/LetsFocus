import React, { useContext } from "react";
import styled from "styled-components";
import { Text } from "../css/main";
import { AiFillAlert } from "react-icons/ai";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TimerMode from "./TimerMode";
const AlertContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
`;
const AlertBox = styled.div`
  width: 25%;
  height: 30%;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlertIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: gold;
  box-shadow: 0px 2px 1px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AcceptBtn = styled.button`
  cursor: pointer;
  padding: 10px 40px;
  border-radius: 20px;
  background: #eb3c27;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
`;
function Alert() {
  const mainStore = useContext(MainStore);
  return (
    <AlertContainer>
      <AlertBox>
        <AlertIcon>
          <AiFillAlert color="white" size="2rem" />
        </AlertIcon>
        <TextSection>
          <Text weight="900">แจ้งเตือน</Text>
          <Text weight="400">คุณเผลอออกจากหน้านี้</Text>
          <Text weight="400">หยุดการจับเวลา !</Text>
        </TextSection>
        <AcceptBtn onClick={() => mainStore.closeAlert()}>
          <Text size={1} weight="500" color="white">
            ตกลง
          </Text>
        </AcceptBtn>
      </AlertBox>
    </AlertContainer>
  );
}

export default Alert;
