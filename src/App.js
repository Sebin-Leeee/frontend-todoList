import "./styles.css";
import TodoList from "./components/TodoList";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <div className="App">
      <TopBar />
      <TodoList />
    </div>
  );
}
