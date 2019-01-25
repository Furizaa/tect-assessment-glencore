import * as React from 'react';
import { createAction } from './actionHelper';
import { TDictionaryId } from './Dictionaries';

export type TTransformId = string;

export interface ITransform {
  readonly id: TTransformId;
  readonly dictionaryId: TDictionaryId;
  readonly from: Array<string>;
  readonly to: string;
}

export interface ITransformState {
  list: Array<ITransform>;
  selectedId: TTransformId | null;
}

export type TTransformActions = Global.TActionsUnion<typeof transformActions>;

export type TTransformContext = React.Dispatch<TTransformActions>;

export interface ITransformRenderProp {
  readonly transforms: Array<ITransform>;
  readonly selectedTransform: ITransform | null;
  readonly dispatch: TTransformContext;
}

export interface ITransformProviderProps {
  children: Global.TRenderProp<ITransformRenderProp>;
  dictionaryId: TDictionaryId;
}

const TRANS_ADD = 'TRANS.ADD';
const TRANS_REMOVE = 'TRANS.REMOVE';
const TRANS_SELECT = 'TRANS.SELECT';

export const transformActions = {
  add: (item: ITransform) => createAction(TRANS_ADD, item),
  remove: (id: TTransformId) => createAction(TRANS_REMOVE, id),
  select: (id: TTransformId) => createAction(TRANS_SELECT, id),
};

export const TransformContext = React.createContext({});

export const transformReducer: React.Reducer<
  ITransformState,
  TTransformActions
> = (state, action) => {
  switch (action.type) {
    case TRANS_ADD:
      // Check if the `to` value already exists in one of the transforms of the
      // current dictionary id.
      const existingTo = state.list.find(
        transform =>
          transform.to === action.payload.to &&
          transform.dictionaryId === action.payload.dictionaryId
      );
      // If so (see above), then replace the transform with a copy of itself
      // which has the new `from` values concatinated to itself.
      if (existingTo) {
        return {
          ...state,
          list: [
            ...state.list.filter(transform => transform.id !== existingTo.id),
            {
              ...existingTo,
              from: [...existingTo.from, ...action.payload.from],
            },
          ],
        };
      }
      // `to` doesn't exists so add the new transfom to the list as-is.
      return { ...state, list: [...state.list, action.payload] };

    case TRANS_REMOVE:
      return {
        selectedId: null,
        list: state.list.filter(transform => transform.id !== action.payload),
      };

    case TRANS_SELECT:
      return {
        ...state,
        selectedId: action.payload,
      };

    default:
      return state;
  }
};

export const TransformProvider = ({
  children,
  dictionaryId,
}: ITransformProviderProps) => {
  const [state, dispatch] = React.useReducer(transformReducer, {
    selectedId: null,
    list: [],
  });
  const transforms = state.list.filter(
    transform => transform.dictionaryId === dictionaryId
  );

  // Find the selected transform by its id - only if the dictionary id also matches.
  const selectedTransform = state.selectedId
    ? state.list.find(
        transform =>
          transform.id === state.selectedId &&
          transform.dictionaryId === dictionaryId
      ) || null
    : null;

  return (
    <TransformContext.Provider value={dispatch}>
      {children({ transforms, selectedTransform, dispatch })}
    </TransformContext.Provider>
  );
};
