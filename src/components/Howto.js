import React, { useContext } from "react";
import styled from "styled-components";
import { Text, Group } from "../css/main";
import { MainStore } from "../store/MainStore";

const AlertContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
`;
const HowtoBox = styled.div`
  width: 350px;
  min-height: 450px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;

const Paragraph = styled.p`
  font-size: ${(props) => (props.size ? props.size : 1)}rem;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#0F1108")};
  line-break: anywhere;
  text-align: ${(props) => (props.align ? props.align : "left")};
  line-height: ${(props) => (props.height ? props.height : "30px")};
`;

const Button = styled.button`
  cursor: pointer;
  padding: 10px 40px;
  border-radius: 20px;
  background: ${(props) => (props.background ? props.background : "#eb3c27")};
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
`;

function Howto() {
  const mainStore = useContext(MainStore);
  return (
    <AlertContainer>
      <HowtoBox>
        <Text weight="900">วิธีใช้</Text>

        <Paragraph weight="300" size={1.15} align="center" height="40px">
          เราใช้เทคนิค Pomodoro ในการจับเวลา
          <br />
          คือจะแบ่งเวลาออกเป็น 2 ช่วง <b>ช่วงโฟกัส</b>{" "}
          เป็นช่วงที่เราทำงานรึว่าอ่านหนังสือ ส่วน <b>ช่วงพัก</b>{" "}
          เป็นช่วงที่ให้เราพักผ่อนให้หายเครียด
          เทคนิคนี้เค้าบอกว่ามันจะช่วยให้ทำอะไรๆได้นานขึ้น
        </Paragraph>

        <Text weight="900">ที่สำคัญเลย !</Text>
        <Paragraph weight="300" align="center" size={1.15} height="40px">
          ตอนจับเวลาพยายามอย่าใช้แอพอื่นไปด้วย <br />
          ระวังระบบจะไม่บันทึกเวลาให้น้า
        </Paragraph>
        <Text size={1} weight="600">
          ขอบคุณทุกคนที่เข้ามาใช้กันนะครับผม 🙏🏻
        </Text>
        <Button background="#85CB33" onClick={() => mainStore.hideHowto()}>
          <Text size={1} color="white" weight="600">
            ไปเริ่มใช้กันเล้ย{" "}
          </Text>
        </Button>
      </HowtoBox>
    </AlertContainer>
  );
}

export default Howto;
