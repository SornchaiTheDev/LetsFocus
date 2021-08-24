import React, { useState, useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import { Base, Container, Text, Card, Icon } from "../css/main";
import { FiEdit3 } from "react-icons/fi";
import TopBar from "../components/TopBar";
import FinishTask from "../components/Me/FinishTask";
import ProgressHistory from "../components/Me/ProgressHistory";
import LoginBox from "../components/Me/LoginBox";

// Styling
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

const Divider = styled.div`
  width: 20%;
  border-bottom: 3px solid #0f1108;
`;

// End Styling

const Me = observer(() => {
  const mainStore = useContext(MainStore);
  const [isChange, setIsChange] = useState(false);

  const getFocusTime = () => {
    const focusTime = mainStore.user.focusTime;

    if (focusTime === undefined) return "error";
    const hour = Math.floor(focusTime / 3600);
    const minutes = parseInt((focusTime / 60) % 60);

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
    const username = document.getElementById("username").value;
    mainStore.updateUser({ name: username, uid: mainStore.uid });
    setIsChange(false);
  };
  return (
    <Base background={mainStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}>
      <TopBar />
      <Container gap={20}>
        <Card>
          <ProfileName>
            {isChange ? (
              <form style={{ width: "100%" }} onSubmit={onChangeName}>
                <NameEdit
                  id="username"
                  placeholder="ชื่อผู้ใช้"
                  value={mainStore.user.username}
                  onChange={(e) => (mainStore.user.username = e.target.value)}
                  onBlur={onChangeName}
                  autoFocus
                />
              </form>
            ) : (
              <>
                <Text weight="600" size={2}>
                  {mainStore.user.username !== null
                    ? mainStore.user.username
                    : "กำลังโหลด"}
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
          {!mainStore.isMember && (
            <>
              <Divider />
              <LoginBox />
            </>
          )}
        </Card>

        <Card height={250}>
          <ProgressHistory progress={mainStore.userProgressHistory()} />
        </Card>

        <FinishTask />
      </Container>
    </Base>
  );
});

export default Me;
