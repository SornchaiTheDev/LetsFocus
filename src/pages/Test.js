import React, { useEffect, useContext, useState } from "react";
import { Text } from "../css/main";
import { StoreContext } from "../Store";

import { observer } from "mobx-react-lite";

const Test = observer(() => {
  const store = useContext(StoreContext);

  const [todo, setTodo] = useState("");

  return (
    <div>
      <Text>{store.todoCount} Todos Left!</Text>
      <ul>
        {store.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          store.addTodo(todo);
          setTodo("");
        }}
      >
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
      </form>
    </div>
  );
});
export default Test;
