import styled from "styled-components";

export const Text = styled.h1`
  font-size: ${(props) => (props.size ? props.size : 1.25)}rem;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#0F1108")};
  line-break: anywhere;
`;

export const Base = styled.div`
  background: ${(props) => (props.background ? props.background : "#eb3c27")};
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
`;

export const Container = styled.div`
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 928px) {
    width: 70%;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  // background : gold;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 200px;
  background: white;
  border: none;
  outline: none;
  color: black;
  @media (min-width: 928px) {
    cursor: pointer;
  }
`;

export const SetTimer = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 250px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SetTimerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 50%;
  width: 85%;
  height: 85%;
  background: ${(props) => (props.background ? props.background : "#eb3c27")};
  color: white;
`;

export const TimeInputSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled.button`
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  color: ${(props) => (props.color ? props.color : "white")};
`;
