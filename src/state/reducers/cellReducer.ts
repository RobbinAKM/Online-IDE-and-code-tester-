import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { Cell } from "../cell";
import produce from "immer";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
/*example state

loading:false,
error:null,
data:{
  'assqs':{
  id: 'sadr';
  type: 'code';
  content: 'var a=2';
},
'34ewdsd':{
id: 'sadrsd';
type: 'text';
content: 'my code';
}
}
*/
const reducer = produce((state: CellState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      state.data[action.payload.id].content = action.payload.content;
      return state;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: "",
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;

    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};
export default reducer;
