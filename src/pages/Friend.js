import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { MainStore } from "../store/MainStore";
import { Base, Container, Text, Card, Group, Icon } from "../css/main";
import { BsArrowLeft } from "react-icons/bs";
import TopBar from "../components/TopBar";
import FinishTask from "../components/Me/FinishTask";
import ProgressHistory from "../components/Me/ProgressHistory";

import { firestore } from "../firebase";

// Styling
const ProfileName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  width: 20%;
  border-bottom: 3px solid #0f1108;
`;

// End Styling

const Friend = observer(({ history }) => {
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const mainStore = useContext(MainStore);
  const [progressHist, setProgressHist] = useState([]);
  const getUser = async () => {
    try {
      const getUserdoc = await firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

      if (getUserdoc.empty) history.replace("/404");
      getUserdoc.forEach(async (doc) => {
        setUser(doc.data());
        const getProgressHistory = await firestore()
          .collection("users")
          .doc(doc.id)
          .collection("progress_history")
          .get();
        const progressHistCol = [];
        getProgressHistory.forEach((doc) => progressHistCol.push(doc.data()));

        const template = [
          { day: "จันทร์", hour: 0, seconds: 0 },
          { day: "อังคาร", hour: 0, seconds: 0 },
          { day: "พุธ", hour: 0, seconds: 0 },
          { day: "พฤหัส", hour: 0, seconds: 0 },
          { day: "ศุกร์", hour: 0, seconds: 0 },
          { day: "เสาร์", hour: 0, seconds: 0 },
          { day: "อาทิตย์", hour: 0, seconds: 0 },
        ];

        if (progressHistCol.length > 0) {
          progressHistCol.map((db) => {
            const index = template.findIndex((data) => data.day === db.day);
            return (template[index] = db);
          });
        }
        setProgressHist(template);
      });
    } catch {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const getFocusTime = () => {
    let focusTime;

    if (user.startTime !== 0) {
      if (user.startTime > 0 && user.status !== "idle") {
        focusTime =
          parseInt((Date.now() - user.startTime) / 1000) + user.focusTime;
      }
    } else {
      focusTime = user.focusTime;
    }

    if (user.focusTime === undefined) return "กำลังโหลด";
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
    const restTime = user.restTime;

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

  return (
    <Base background={mainStore.mode === "focus" ? "#D33F49" : "#3F7CAC"}>
      <Container gap={20}>
        <TopBar />
        <Group justify="flex-start" align="center" width="90%" marginTop="10px">
          <Icon onClick={() => history.goBack()}>
            <BsArrowLeft size="2rem" />
          </Icon>
        </Group>
        <Card marginTop="20px">
          <ProfileName>
            <Text weight="600" size={2}>
              {username}
            </Text>
          </ProfileName>
          <Group justify="center" align="center" gap={20}>
            <Text weight="300">{getFocusTime()}</Text>
            <Text weight="300">{getRestTime()}</Text>
          </Group>
          <Divider />
        </Card>

        <Card height={250}>
          <ProgressHistory progress={progressHist} />
        </Card>
        {user.finishTask !== undefined && (
          <FinishTask task={user.finishTask} amount={user.finishTask.length} />
        )}
      </Container>
    </Base>
  );
});

export default Friend;
