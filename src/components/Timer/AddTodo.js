import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MainStore } from "../../store/MainStore";
import { v4 as uuid } from "uuid";
const TodoBox = styled.div`
  width: 95%;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 5px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 15px; //10px;
  display: flex;
  flex-diection: column;
  justify-content: space-between;
  align-items: center;
`;

const TextSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  background: none;
  border: none;
  color: #0f1108;
  width: 100%;
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  outline: none;
  padding: 6px;
  border-bottom: ${(props) => (props.empty ? "3px red solid" : "none")};
`;

const AddBtn = styled.button`
  cursor: pointer;
  color: #0f1108;
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  background: #85cb33;
  box-shadow: 2px 2px 1px 0.25px rgba(0, 0, 0, 0.25);
  padding: 7px 10px;
`;
const AddTodo = ({ hide }) => {
  const { todosStore } = useContext(MainStore);
  const [eventName, setEventName] = useState("");
  const [empty, setEmpty] = useState(false);

  const _addTodo = (e) => {
    e.preventDefault();
    if (eventName.length > 0) {
      todosStore.addTodo = {
        dated: Date.now(),
        id: uuid(),
        event: eventName,
        completed: false,
      };
      hide(false);
    } else {
      setEmpty(true);
    }
  };
  return (
    <TodoBox>
      <TextSection>
        <form style={{ width: "100%" }} onSubmit={_addTodo}>
          <TodoInput
            autoFocus
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="ใส่งานที่ต้องทำ"
            empty={empty}
          />
        </form>
      </TextSection>
      <AddBtn onClick={_addTodo}>เพิ่ม</AddBtn>
    </TodoBox>
  );
};

export default AddTodo;
