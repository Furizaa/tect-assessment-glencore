// From https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

import * as React from 'react';
import { createAction } from './actionHelper';

export type TDictionaryId = string;

export interface IDictionary {
  readonly id: TDictionaryId;
  readonly name: string;
}

export interface IDictionaryState {
  readonly list: Array<IDictionary>;
  readonly selected: TDictionaryId | null;
}

export type TDictionaryActions = Global.TActionsUnion<typeof dictionaryActions>;

export type TDictionaryContext = React.Dispatch<TDictionaryActions>;

export interface IDictionaryRenderProp extends IDictionaryState {
  readonly selectedItem: IDictionary | null;
  readonly dispatch: TDictionaryContext;
}

const DICT_ADD = 'DICT.ADD';
const DICT_REMOVE = 'DICT.REMOVE';
const DICT_SELECT = 'DICT.SELECT';

export const dictionaryActions = {
  add: (item: IDictionary) => createAction(DICT_ADD, item),
  remove: (id: TDictionaryId) => createAction(DICT_REMOVE, id),
  select: (id: TDictionaryId) => createAction(DICT_SELECT, id),
};

export const DictionaryContext = React.createContext({});

export const dictionaryReducer: React.Reducer<
  IDictionaryState,
  TDictionaryActions
> = (state, action) => {
  switch (action.type) {
    case DICT_ADD:
      return {
        list: [...state.list, action.payload],
        selected: action.payload.id,
      };
      break;

    case DICT_REMOVE:
      return {
        list: state.list.filter(item => item.id !== action.payload),
        selected: state.selected === action.payload ? null : state.selected,
      };

    case DICT_SELECT:
      return {
        ...state,
        selected: action.payload,
      };

    default:
      break;
  }
  return state;
};

export const DictionaryProvider = ({
  children,
}: {
  children: Global.TRenderProp<IDictionaryRenderProp>;
}) => {
  const [state, dispatch] = React.useReducer(dictionaryReducer, {
    list: [],
    selected: null,
  });
  const selectedItem = state.selected
    ? state.list.find(item => item.id === state.selected) || null
    : null;

  return (
    <DictionaryContext.Provider value={dispatch}>
      {children({ ...state, selectedItem, dispatch })}
    </DictionaryContext.Provider>
  );
};
