import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todosFromStorage = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todosFromStorage);
  }, []);

  const handleAdd = () => {
    const newTodo = {
      id: uuidv4(),
      todo: todoText,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to local storage
  };

  const handleEdit = (e, id) => {
    const index = todos.findIndex((item) => item.id === id);

    if (index !== -1) {
      const todoToEdit = todos[index];
      setTodoText(todoToEdit.todo);
    } else {
      console.warn("Todo item with ID", id, "not found for editing");
    }

    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleRemove = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Update local storage
  };

  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const HandleCheck = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);

    if (index !== -1) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos)); // Update local storage
    }
  };

  useEffect(() => {
    // Optional: Log todos for debugging purposes
    console.log(todos);
  }, [todos]);

  return (
    <>
      <div className="main-container">
        <div className="heading-text">Add a Task</div>

        <div className="enter-task">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter The Task"
            onChange={handleChange}
            value={todoText}
          />
          <button className="add" onClick={handleAdd}>
            Add
          </button>
        </div>

        {todos.map((element) => (
          <div className="listTodos" key={element.id}>
            <div className="todoList">
              <input
                type="checkbox"
                name={element.id}
                id=""
                checked={element.isCompleted}
                onChange={HandleCheck}
              />
              <p
                className="saveTodo"
                style={{
                  textDecoration: element.isCompleted ? "line-through" : "none",
                }}
              >
                {element.todo}
              </p>
            </div>

            <div className="edit-btn">
              <button className="edit" onClick={(e) => handleEdit(e, element.id)}>
                Edit
              </button>
              <button className="remove" onClick={(e) => handleRemove(e, element.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;