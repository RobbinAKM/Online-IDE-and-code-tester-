import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { Cell } from "../cell";

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
const reducer = (
  state: CellState = initialState,
  action: Actions
): CellState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    default:
      return state;
  }
};

export default reducer;
