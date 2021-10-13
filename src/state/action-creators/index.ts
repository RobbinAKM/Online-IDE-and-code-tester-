import { Direction } from "../actions";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  UPDATE_CELL,
  DELETE_CELL,
  MOVE_CELL,
  INSERT_CELL_BEFORE,
  Actions,
} from "../actions";
import { CellType } from "../cell";
import bundler from "../../bundler";

export const update_cell = (id: string, content: string): UPDATE_CELL => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const delete_cell = (id: string): DELETE_CELL => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insert_cell_before = (
  id: string | null,
  cellType: CellType
): INSERT_CELL_BEFORE => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const move_cell = (id: string, direction: Direction): MOVE_CELL => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const bundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      },
    });
    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: result,
      },
    });
  };
};
