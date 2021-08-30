import React, { useContext } from "react";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../firebase";
import { MainStore } from "../../store/MainStore";

const LogoutBtn = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  box-shadow: 2px 2px 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
function LogoutBtnComp() {
  const mainStore = useContext(MainStore);
  const onSignOut = async () => {
    await auth().signOut();
    mainStore.clearStore();
  };
  return (
    <LogoutBtn onClick={onSignOut}>
      <FiLogOut />
    </LogoutBtn>
  );
}

export default LogoutBtnComp;
