import ReactDOM from "react-dom";
import "bulmaswatch/slate/bulmaswatch.min.css";
import CodeCell from "./components/code-cell";
const App = () => {
  return <CodeCell />;
};
ReactDOM.render(<App />, document.querySelector("#root"));
