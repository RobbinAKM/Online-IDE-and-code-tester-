import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useAction } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { update_cell, bundle } = useAction();
  const bundleResult = useTypedSelector((state) => state.bundles[cell.id]);
  useEffect(() => {
    if (!bundleResult) {
      bundle(cell.id, cell.content);
      return;
    }

    var timer = setTimeout(() => {
      bundle(cell.id, cell.content);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, bundle]);

  return (
    <Resizable direction="verticle">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => update_cell(cell.id, value)}
          />
        </Resizable>
        {!bundleResult || bundleResult.loading ? (
          "...loading"
        ) : (
          <Preview code={bundleResult.code} bundlingStatus={bundleResult.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
