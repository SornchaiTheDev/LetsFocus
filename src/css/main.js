import styled from "styled-components";

export const Text = styled.h1`
  font-size: ${(props) => (props.size ? props.size : 1.25)}rem;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#0F1108")};
  line-break: anywhere;
  text-align: ${(props) => (props.align ? props.align : "left")};
  line-height: ${(props) => (props.height ? props.height : "30px")};
`;

export const Base = styled.div`
  background: ${(props) => (props.background ? props.background : "#D33F49")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  user-select: none;
`;

export const Group = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  align-items: ${(props) => (props.align ? props.align : "flex-start")};
  flex-wrap: ${(props) => (props.wrap ? props.wrap : "no-wrap")};
  gap: ${(props) => (props.gap ? props.gap : 0)}px;
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

  gap: ${(props) => (props.gap ? props.gap : 50)}px;
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

export const Card = styled.div`
  @media (min-width: 320px) {
    width: 80%;
  }
  @media (min-width: 928px) {
    width: 50%;
  }
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  height: ${(props) => (props.height ? props.height + "px" : "100%")};
  background: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  gap: 20px;
  margin-bottom: 30px;
  overflow-x: ${(props) => (props.overflow ? props.overflow : "visible")};
`;

// Skeletons
export const TextSkeleton = styled.div`
  width: ${(props) => (props.width ? props.width : "40%")};
  height: ${(props) => (props.height ? props.height : "1.25rem")};
  border-radius: 1rem;
  background: hsl(50, 20%, 90%);
  animation: loading 1s infinite alternate;
  @keyframes loading {
    from {
      background: hsl(356, 20%, 90%);
    }
    to {
      background: hsl(356, 20%, 70%);
    }
  }
`;
