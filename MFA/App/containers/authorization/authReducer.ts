import {Action} from 'redux';
import {isType} from 'typescript-fsa';
import {somethingHappened} from './authActions';

type State = {bar: string};

export const reducer = (state: State, action: Action): State => {
  if (isType(action, somethingHappened)) {
    // action.payload is inferred as {foo: string};

    action.payload.bar;  // error

    return {bar: action.payload.foo};
  }

  if (isType(action, somethingAsync.started)) {
    return {bar: action.payload.foo};
  }

  if (isType(action, somethingAsync.done)) {
    return {bar: action.payload.result.bar};
  }

  return state;
};