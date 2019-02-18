import { Dispatch, Action } from "redux";
import { AnyAction } from "typescript-fsa";

export type AppDispatch<T extends Action = AnyAction> = Dispatch<T>;