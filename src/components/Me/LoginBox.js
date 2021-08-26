import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStore } from "../../store/MainStore";
import { Base, Container, Text, Card } from "../../css/main";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineSmile } from "react-icons/ai";
import { auth } from "../../firebase";

const GoogleSignInBtn = styled.button`
  cursor: pointer;
  @media (min-width: 320px) {
    width: 70%;
  }
  @media (min-width: 980px) {
    width: 50%;
  }

  height: 50px;
  padding: 10px;
  background: white;
  outline: none;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

function LoginBox({ type, text, onClick }) {
  return (
    <GoogleSignInBtn onClick={onClick}>
      {type === "google" && <FcGoogle size="1.5rem" />}

      <Text size={0.9} weight="600">
        {text}
      </Text>
    </GoogleSignInBtn>
  );
}

export default LoginBox;
