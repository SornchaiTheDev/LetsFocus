import styled from "styled-components";

export const Text = styled.h1`
  font-size: ${(props) => (props.size ? props.size : 1.25)}rem;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Container = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
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
  background: #eb3c27;
  color: white;
`;

export const TimeInputSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled.button`
  @media (min-width: 928px) {
    cursor: pointer;
  }
  outline: none;
  background: none;
  border: none;
  color: ${(props) => (props.color ? props.color : "white")};
`;
