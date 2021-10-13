import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
