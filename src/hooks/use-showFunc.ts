import { useTypedSelector } from "./use-typed-selector";

export const useShowFunc = (cellId: String) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cell;
    const cells = order.map((id) => data[id]);
    const combinedCodes = [];
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    const root =document.querySelector("#root")
    var show=(value)=>{

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
    `;
    const showFuncNoOps = `var show=()=>{}`;

    for (let c of cells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          combinedCodes.push(showFunc);
        } else {
          combinedCodes.push(showFuncNoOps);
        }
        combinedCodes.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return combinedCodes;
  });
};
