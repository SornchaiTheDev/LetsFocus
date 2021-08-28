import React from "react";
import { Base, Container, Text } from "../css/main";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Center = styled.div`
  background: #d33f49;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function FouroFour() {
  return (
    <Center>
      <Text color="white" weight="600">
        ไม่น่ามีคนชื่อนี้น้า จำชื่อผิดอ้ะป่าว
      </Text>
      <Link to="/">กลับไปหน้าหลัก</Link>
    </Center>
  );
}

export default FouroFour;
