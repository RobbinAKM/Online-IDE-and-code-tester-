import { ActionType } from "../action-types";
import { CellType } from "../cell";

export type Direction = "up" | "down";
export interface UPDATE_CELL {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DELETE_CELL {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface INSERT_CELL_BEFORE {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellType;
  };
}

export interface MOVE_CELL {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export type Actions =
  | UPDATE_CELL
  | DELETE_CELL
  | INSERT_CELL_BEFORE
  | MOVE_CELL;
