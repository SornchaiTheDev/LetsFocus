import React from "react";
import styled from "styled-components";
import { Text } from "../css/main";
import { AiFillAlert } from "react-icons/ai";

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
  gap: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 10px;
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
  background: ${(props) => (props.background ? props.background : "#D33F49")};
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
function Alert({ title, msg, btn = [] }) {
  return (
    <AlertContainer>
      <AlertBox>
        <AlertIcon>
          <AiFillAlert color="white" size="2rem" />
        </AlertIcon>
        <TextSection>
          <Text weight="900">แจ้งเตือน</Text>
          <Text weight="400">{title}</Text>
          <Text weight="400">{msg}</Text>
        </TextSection>
        <ButtonGroup>
          {btn.map(({ title, onClick, background }, index) => (
            <AcceptBtn background={background} onClick={onClick} key={index}>
              <Text size={1} weight="500" color="white">
                {title}
              </Text>
            </AcceptBtn>
          ))}
        </ButtonGroup>
      </AlertBox>
    </AlertContainer>
  );
}

export default Alert;
