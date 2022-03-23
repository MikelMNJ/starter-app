import { useEffect, useReducer, useRef } from 'react';
import { useStore } from 'store';
import { isArray, isEmpty, isObject } from 'lodash';
import { objectTypeError, objectKeyError, targetError } from 'errors/stateErrors';

export const actionCreator = (type, payload, meta) => {
  const action = { type, payload };

  if (meta) {
    action.meta = meta;
  }

  return action;
};

export const useSelector = selector => {
  const { state } = useStore();
  if (selector) return selector(state);
};

export const useDispatch = () => {
  const { dispatch } = useStore();
  return dispatch;
};

export const useReducerWithWares = args => {
  const { rootReducer, initialState, middlewares, afterwares } = args;
  const [ state, dispatch ] = useReducer(rootReducer, initialState);
  const actionRef = useRef();

  const dispatchWithMiddleware = action => {
    middlewares?.forEach(middleware => middleware(dispatch, action, state));
    actionRef.current = action;
  };

  useEffect(() => {
    if (!actionRef.current) return;
    afterwares?.forEach(afterware => afterware(dispatch, actionRef.current, state));
    actionRef.current = null;
  }, [afterwares, state]);

  return [ state, dispatchWithMiddleware ];
};

export const makeInitialState = reducers => (
  Object.keys(reducers).reduce((prevState, key) => {
    const reducer = reducers[key];
    const reducerState = reducer();
    const combinedState = { ...prevState, [key]: reducerState };
    return combinedState;
  }, {})
);


export const combineReducers = reducers => (initialState, action) => (
  Object.keys(reducers).reduce((prevState, key) => {
    const reducer = reducers[key];
    const reducerInitialState = prevState[key];
    const reducerState = reducer(reducerInitialState, action);
    const combinedState = { ...prevState, [key]: reducerState };
    return combinedState;
  }, initialState)
);

class StateManager {
  constructor(initialState, action) {
    this.initialState = initialState;
    this.action = action;
  };

  get(stateKey, stringOrIndex) {
    const target = this.initialState[stateKey];
    const isArr = isArray(target);
    const isObj = isObject(target);
    const targetValid = target || target === "" || target === null;

    if (!targetValid) {
      console.warn("Could not get value from state, provided state key name does not exist.");
    }

    if (targetValid && (isArr || isObj)) {
      const validStringIndex = target[stringOrIndex];

      if (stringOrIndex && !validStringIndex) {
        isArr ? objectKeyError(true, stringOrIndex, target) : targetError("get");
        return target[stringOrIndex];
      }

      if (validStringIndex) return target[stringOrIndex];
    }

    return target;
  };

  addArr(stateKey, payload) {
    const target = this.initialState[stateKey];
    const updatedArr = [ ...target, payload ];

    return {
      ...this.initialState,
      [stateKey]: updatedArr,
    };
  };

  addObj(stateKey, payload) {
    const target = this.initialState[stateKey];

    if (isObject(payload) && !isArray(payload)) {
      if (isEmpty(payload)) {
        console.warn("Empty object, state unchanged.");
        return { ...this.initialState };
      }

      return {
        ...this.initialState,
        [stateKey]: {
          ...this.initialState[stateKey],
          ...payload,
        }
      };
    }

    objectTypeError(payload, target);
    return { ...this.initialState };
  };

  add(stateKey, payload) {
    const workingState = { ...this.initialState };
    let target = workingState[stateKey];
    const isArr = isArray(target);
    const isObj = isObject(target);
    const payloadValid = payload || payload === "" || payload === null;

    if (stateKey && payloadValid) {
      if (isArr) return this.addArr(stateKey, payload);
      if (isObj) return this.addObj(stateKey, payload);

      return {
        ...this.initialState,
        [stateKey]: payload,
      };
    }

    return { ...this.initialState };
  };

  updateArr(stateKey, payload, stringOrIndex) {
    const target = this.initialState[stateKey];
    const isArr = isArray(target);
    const index = stringOrIndex;
    const indexValid = stringOrIndex >= 0 && stringOrIndex <= target?.length;

    if (indexValid) {
      const updatedArr = target.map((item, i) => {
        if (i === index) return payload;
        return item;
      });

      return {
        ...this.initialState,
        [stateKey]: updatedArr,
      };
    }

    if (!indexValid && index === undefined) {
      return {
        ...this.initialState,
        [stateKey]: payload,
      }
    }

    objectKeyError(isArr, index, target);
    return { ...this.initialState };
  };

  updateObj(stateKey, payload, stringOrIndex) {
    const target = this.initialState[stateKey];
    const isArr = isArray(target);
    const key = stringOrIndex;
    const validKey = typeof key === "string" && target[key];

    if (validKey) {
      return {
        ...this.initialState,
        [stateKey]: {
          ...this.initialState[stateKey],
          [key]: payload
        }
      };
    }

    if (!key) {
      return {
        ...this.initialState,
        [stateKey]: payload
      };
    }

    objectKeyError(isArr, key, target);
    return { ...this.initialState };
  };

  update(stateKey, payload, stringOrIndex) {
    const workingState = { ...this.initialState };
    let target = workingState[stateKey];
    const isArr = isArray(target);
    const isObj = isObject(target);
    const payloadValid = payload || payload === "" || payload === null;

    if (stateKey && payloadValid) {
      if (!target) return this.add(stateKey, payload);
      if (isArr) return this.updateArr(stateKey, payload, stringOrIndex);
      if (isObj) return this.updateObj(stateKey, payload, stringOrIndex);


      return {
        ...this.initialState,
        [stateKey]: payload,
      };
    }

    return { ...this.initialState };
  };

  removeArr(stateKey, stringOrIndex, rest) {
    const target = this.initialState[stateKey];
    const isArr = isArray(target);
    const index = stringOrIndex;
    const indexValid = stringOrIndex >= 0 && stringOrIndex <= target?.length;

    if (indexValid) {
      const updatedArr = target.filter((item, i) => i !== index);

      return {
        ...this.initialState,
        [stateKey]: updatedArr,
      };
    }

    if (!indexValid && index === undefined) return { ...rest };

    objectKeyError(isArr, index, target);
    return { ...this.initialState };
  };

  removeObj(stateKey, stringOrIndex, rest) {
    const target = this.initialState[stateKey];
    const isArr = isArray(target);
    const key = stringOrIndex;
    const validKey = typeof key === "string" && target[key];

    if (validKey) {
      const { [key]: value, ...localRest } = target;

      return {
        ...this.initialState,
        [stateKey]: { ...localRest },
      };
    }

    if (!key) return { ...rest };

    objectKeyError(isArr, key, target);
    return { ...this.initialState };
  };

  remove(stateKey, stringOrIndex) {
    const workingState = { ...this.initialState };
    let target = workingState[stateKey];
    const isArr = isArray(target);
    const isObj = isObject(target);

    if (stateKey) {
      const { [stateKey]: value, ...rest } = this.initialState;

      if (!target) targetError('remove');
      if (isArr) return this.removeArr(stateKey, stringOrIndex, rest);
      if (isObj) return this.removeObj(stateKey, stringOrIndex, rest);

      return { ...rest };
    }

    return { ...this.initialState };
  };
};

export default StateManager;