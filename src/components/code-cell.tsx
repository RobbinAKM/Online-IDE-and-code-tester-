import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundler from "../bundler";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useAction } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [error, setError] = useState("");
  const [code, setcode] = useState("");
  const { update_cell } = useAction();
  useEffect(() => {
    var timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setcode(output.code);
      output.err && setError(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="verticle">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => update_cell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
