import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import TopBar from "../components/TopBar";
import { Base, Container, Text, Card, Icon } from "../css/main";
import { FiEdit3 } from "react-icons/fi";
import FinishTask from "../components/Me/FinishTask";
import ProgressHistory from "../components/Me/ProgressHistory";
import styled from "styled-components";

const ProfileName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const NameEdit = styled.input`
  width: 100%;
  padding: 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  outline: none;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 600;
  font-size: 2rem;
`;

const Me = observer(() => {
  const { timerStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);
  const [isChange, setIsChange] = useState(false);
  const [username, setUserName] = useState("โชกุนนน");

  const getFocusTime = () => {
    const focusTime = mainStore.focusTime;
    if (focusTime === undefined) return "error";
    const hour = Math.floor(focusTime / 3600);
    const minutes = Math.ceil((focusTime / 60) % 60);

    if (hour >= 1) {
      if (minutes > 0) {
        return `โฟกัส ${hour} ชม. ${minutes} นาที`;
      }
      return `โฟกัส ${hour} ชม.`;
    } else {
      return `โฟกัส ${minutes} นาที`;
    }
  };

  const onChangeName = (e) => {
    e.preventDefault();
    mainStore.Setusername = username;
    setIsChange(false);
  };
  return (
    <Base background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container gap={20}>
        {/* <LoginBox /> */}
        <Card height={100}>
          <ProfileName>
            {isChange ? (
              <form style={{ width: "100%" }} onSubmit={onChangeName}>
                <NameEdit
                  placeholder="ชื่อผู้ใช้"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    if (e.target.value.length < 16) setUserName(e.target.value);
                  }}
                  onBlur={onChangeName}
                />
              </form>
            ) : (
              <>
                <Text weight="600" size={2}>
                  {username}
                </Text>
                <Icon
                  style={{ alignSelf: "flex-end" }}
                  onClick={() => setIsChange(true)}
                >
                  <FiEdit3 size="1rem" color="black" />
                </Icon>
              </>
            )}
          </ProfileName>
          <Text weight="300">{getFocusTime()}</Text>
        </Card>
        <Card height={250}>
          <ProgressHistory />
        </Card>

        <FinishTask />
      </Container>
    </Base>
  );
});

export default Me;
