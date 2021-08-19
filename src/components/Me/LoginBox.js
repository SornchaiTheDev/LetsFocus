import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../../store/MainStore";
import { Base, Container, Text } from "../../css/main";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const LoginCard = styled.div`
  @media (min-width: 320px) {
    width: 80%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }
  background: white;
  border-radius: 10px;
  height: 300px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.25);
`;

const GoogleSignInBtn = styled.button`
  cursor: pointer;

  height: 50px;
  padding: 10px 30px;
  background: white;
  outline: none;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
`;

function LoginBox() {
  return (
    <LoginCard>
      <Text weight="400" size={1}>
        เข้าสู่ระบบ / สมัครสมาชิก
      </Text>
      <GoogleSignInBtn>
        <FcGoogle size="1rem" />
        <Text size={1} weight="600">
          เข้าสู่ระบบด้วยกูเกิ้ล
        </Text>
      </GoogleSignInBtn>
    </LoginCard>
  );
}

export default LoginBox;
