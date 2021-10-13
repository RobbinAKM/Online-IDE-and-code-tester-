import { Actions } from "../actions";
import { ActionType } from "../action-types";
import produce from "immer";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialBundleState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialBundleState, action: Actions) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.id] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
