import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../../store/MainStore";
import { Base, Container, Text, Card } from "../../css/main";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";

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

export const LoginCard = styled.div`
  @media (min-width: 320px) {
    width: 50%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }
  height: ${(props) => (props.height ? props.height + "px" : "100%")};
  background: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

function LoginBox() {
  const googleSignIn = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().currentUser.linkWithRedirect(provider);
  };
  return (
    <>
      {/* <LoginCard> */}
      <Text weight="400" size={1}>
        เข้าสู่ระบบเพื่อบันทึกข้อมูลของคุณ
      </Text>
      <GoogleSignInBtn onClick={googleSignIn}>
        <FcGoogle size="1rem" />
        <Text size={1} weight="600">
          เข้าสู่ระบบด้วยกูเกิ้ล
        </Text>
      </GoogleSignInBtn>
      {/* </LoginCard> */}
    </>
  );
}

export default LoginBox;
