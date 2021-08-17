import React, { useContext, useEffect } from "react";
import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
import TodoBoxComp from "./TodoBox";
import styled from "styled-components";
import { Text } from "../css/main";
import { FaPlus } from "react-icons/fa";
import { v4 as uuid } from "uuid";

const TodoGroup = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const AddTodo = styled.button`
  outline: none;
  background: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoList = observer(() => {
  const { todosStore } = useContext(MainStore);

  return (
    <>
      <TodoGroup>
        <TopGroup>
          <Text color="white" weight="600" size={1.5}>
            กำลังทำ ({todosStore.TodosLength})
          </Text>
          <AddTodo
            onClick={() =>
              todosStore.addTodos({
                id: uuid(),
                lastModified: new Date().getTime(),
                event: uuid(),
                completed: false,
              })
            }
          >
            <FaPlus size="1rem" />
          </AddTodo>
        </TopGroup>
        {todosStore.todos.map((todo, index) => (
          <TodoBoxComp
            key={index}
            id={todo.id}
            event={todo.event}
            completed={todo.completed}
          />
        ))}
      </TodoGroup>
    </>
  );
});

export default TodoList;
