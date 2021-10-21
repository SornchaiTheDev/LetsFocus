import React, { useState, useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import { Base, Container, Text, Card, Group, Icon } from "../css/main";
import { FiEdit3 } from "react-icons/fi";
import TopBar from "../components/TopBar";
import FinishTask from "../components/Me/FinishTask";
import ProgressHistory from "../components/Me/ProgressHistory";
import LoginBox from "../components/Me/LoginBox";
import Badge from "../components/Me/Badge";
import { auth, firestore } from "../firebase";
import LogoutBtn from "../components/Me/LogoutBtn";

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
  const [sameUsername, setSameUsername] = useState(false);
  const { achievementStore, timerStore } = useContext(MainStore);
  const [isChange, setIsChange] = useState(false);

  const getFocusTime = () => {
    const focusTime = mainStore.realtimeFocusTimer;

    if (focusTime === undefined) return "กำลังโหลด";
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

  const getRestTime = () => {
    const restTime = mainStore.realtimeRestTimer;

    if (restTime === undefined) return "กำลังโหลด";
    const hour = Math.floor(restTime / 3600);
    const minutes = parseInt((restTime / 60) % 60);

    if (hour >= 1) {
      if (minutes > 0) {
        return `พักผ่อน ${hour} ชม. ${minutes} นาที`;
      }
      return `พักผ่อน ${hour} ชม.`;
    } else {
      return `พักผ่อน ${minutes} นาที`;
    }
  };

  const onChangeName = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    // Check if same username
    const getUser = await firestore().collection("users").get();
    const allUsername = [];
    getUser.forEach((docs) => {
      allUsername.push(docs.data().username);
    });

    if (allUsername.includes(username)) return setSameUsername(true);

    mainStore.updateUser({ name: username, uid: mainStore.uid });
    setIsChange(false);
  };
  return (
    <>
      {mainStore.uid !== null && <LogoutBtn />}
      <Base background={mainStore.mode === "focus" ? "#D33F49" : "#3F7CAC"}>
        <TopBar menu />
        <Container gap={20}>
          <Card>
            {mainStore.uid === null && !mainStore.isLoading ? (
              <>
                <Text weight="800" size={1}>
                  เข้าสู่ระบบ / สมัครสมาชิก
                </Text>
                <Text weight="400" size={1}>
                  เพื่อบันทึกข้อมูลของคุณ
                </Text>

                <LoginBox
                  type="google"
                  text="เข้าสู่ระบบด้วยกูเกิ้ล"
                  onClick={() => {
                    const provider = new auth.GoogleAuthProvider();
                    auth().signInWithRedirect(provider);
                  }}
                />
              </>
            ) : (
              <>
                <ProfileName>
                  {isChange ? (
                    <form style={{ width: "100%" }} onSubmit={onChangeName}>
                      <NameEdit
                        id="username"
                        placeholder="ชื่อผู้ใช้"
                        value={mainStore.user.username}
                        onChange={(e) => {
                          setSameUsername(false);
                          if (e.target.value.length < 20)
                            mainStore.user.username = e.target.value;
                        }}
                        onBlur={onChangeName}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <>
                      <Text weight="600" size={2}>
                        {mainStore.user !== undefined &&
                        mainStore.user.username !== null
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
                {sameUsername && (
                  <Text color="red" weight="600">
                    มีคนใช้ชื่อนี้แล้ว!
                  </Text>
                )}
                <Group justify="center" align="center" wrap="wrap" gap={20}>
                  <Text weight="300">{getFocusTime()}</Text>
                  <Text weight="300">{getRestTime()}</Text>
                </Group>
                <Divider />
              </>
            )}
          </Card>

          <Card justify="flex-start" align="flex-start" overflow="scroll">
            <Text weight="900" size={1.25}>
              รางวัล
            </Text>
            <Badge achievements={achievementStore.all} />
          </Card>

          <Card height={250}>
            <ProgressHistory progress={mainStore.getWeekProgress} />
          </Card>
          <FinishTask
            task={mainStore.user.finishTask}
            amount={mainStore.allFinishTask}
          />
        </Container>
      </Base>
    </>
  );
});

export default Me;
