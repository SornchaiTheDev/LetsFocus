import React from "react";
import styled from "styled-components";
import { Text } from "../../css/main";
import { GiMeditation } from "react-icons/gi";

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
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const AcceptBtn = styled.button`
  cursor: pointer;
  padding: 10px 40px;
  border-radius: 20px;
  background: ${(props) => (props.background ? props.background : "#eb3c27")};
  box-shadow: 2px 4px 1px 0.5px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const BadgeIcon = styled.div`
  display: flex;
  justify-content: center;
  padding: 70px;
  align-items: center;
  position: relative;
`;

const BadgeBG = styled.div`
  width: 100px;
  height: 100px;
  background: gold;
  padding: 16px;
  border-radius: 100px;
  position: absolute;
  transform: scale(1);
  z-index: 1;
  animation: InOut 2s infinite alternate ease-in-out;
  @keyframes InOut {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
`;

const IconAni = styled.div`
  position: absolute;
  z-index: 999;
  transform: scale(1.25);
  animation: InOutIcon 3s 1 alternate ease-in-out;
  @keyframes InOutIcon {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1.25);
    }
  }
`;

function BadgeReceive({ title, msg, btn, onClick }) {
  return (
    <AlertContainer>
      <AlertBox>
        <Text weight="900">ปลดล็อครางวัล</Text>
        <BadgeIcon>
          <BadgeBG />
          {/* <IconAni> */}

          <GiMeditation style={{ zIndex: 999 }} size="3rem" color="black" />
          {/* </IconAni> */}
        </BadgeIcon>
        <TextSection>
          <Text weight="600">คุณโฟกัสเกิน 1 ชั่วโมง</Text>
          <Text weight="400" size={1}>
            รางวัลที่ปลดล็อคจะอยู่ในเมนูฉัน
          </Text>
        </TextSection>
        <ButtonGroup>
          <AcceptBtn background="#85CB33" onClick={onClick}>
            <Text size={1} weight="500" color="white">
              รับ
            </Text>
          </AcceptBtn>
        </ButtonGroup>
      </AlertBox>
    </AlertContainer>
  );
}

export default BadgeReceive;
