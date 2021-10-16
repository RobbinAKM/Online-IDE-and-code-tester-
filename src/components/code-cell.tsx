import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useAction } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import "./code-cell.css";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { update_cell, bundle } = useAction();
  const bundleResult = useTypedSelector((state) => state.bundles[cell.id]);

  const combinedCodes = useTypedSelector((state) => {
    const { order, data } = state.cell;
    const cells = order.map((id) => data[id]);
    const combinedCodes = [
      `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      const root =document.querySelector("#root")
      const show=(value)=>{

        if (typeof value ==='object'){
          if(value.$$typeof && value.props){
            _ReactDOM.render(value,root)
          }else{
            root.innerHTML=JSON.stringify(value);
          }
        }else{
          root.innerHTML=value
        }
      };
      `,
    ];
    for (let c of cells) {
      if (c.type === "code") {
        combinedCodes.push(c.content);
      }
      if (c.type === cell.id) {
        break;
      }
    }
    return combinedCodes;
  });

  useEffect(() => {
    if (!bundleResult) {
      bundle(cell.id, combinedCodes.join("\n"));
      return;
    }

    var timer = setTimeout(() => {
      bundle(cell.id, combinedCodes.join("\n"));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, combinedCodes.join("\n"), bundle]);

  return (
    <Resizable direction="verticle">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => update_cell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundleResult || bundleResult.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                loading...
              </progress>
            </div>
          ) : (
            <Preview
              code={bundleResult.code}
              bundlingStatus={bundleResult.err}
            />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
