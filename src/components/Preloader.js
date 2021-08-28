import React from "react";
import styled from "styled-components";
import { Text } from "../css/main";
import { VscLoading } from "react-icons/vsc";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 10px;
`;

const Icon = styled.div`
  animation: Loading 2.5s infinite ease-in-out;
  @keyframes Loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function Preloader() {
  return (
    <Modal>
      <Text color="white" weight="600" size={1.5}>
        <Loading>
          <Icon>
            <VscLoading size="3rem" color="#0F1108" />
          </Icon>
        </Loading>
      </Text>
    </Modal>
  );
}

export default Preloader;
