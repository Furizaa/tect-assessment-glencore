import { transformReducer, transformActions } from './Transforms';

const initialState = {
  list: [],
  selectedId: null,
};

const mockTransform = {
  from: ['a'],
  to: '1',
  id: '1',
  dictionaryId: '1',
};

describe('Transform store', () => {
  describe('reducer', () => {
    it('adds transformation', () => {
      const state = transformReducer(
        initialState,
        transformActions.add(mockTransform)
      );
      expect(state.list.length).toBe(1);
      expect(state.list[0]).toMatchSnapshot();
    });

    it('doesnt select a default transform', () => {
      const state = transformReducer(
        initialState,
        transformActions.add(mockTransform)
      );
      expect(state.selectedId).toBeNull();
    });

    it('selects a transform', () => {
      const state = transformReducer(
        {
          list: [mockTransform],
          selectedId: null,
        },
        transformActions.select('1')
      );
      expect(state.selectedId).toBe('1');
    });

    it('merges transforms with the same TO value and dictionary', () => {
      const state = transformReducer(
        {
          list: [mockTransform],
          selectedId: null,
        },
        transformActions.add({
          from: ['b'],
          to: '1',
          id: '2',
          dictionaryId: '1',
        })
      );
      expect(state.list[0].from).toEqual(['a', 'b']);
    });

    it('doesnt merges transforms with the same TO value and different dictionaries', () => {
      const state = transformReducer(
        {
          list: [mockTransform],
          selectedId: null,
        },
        transformActions.add({
          from: ['b'],
          to: '1',
          id: '2',
          dictionaryId: '2',
        })
      );
      expect(state.list[0].from).toEqual(['a']);
      expect(state.list[1].from).toEqual(['b']);
    });

    it('removes transforms', () => {
      const state = transformReducer(
        {
          list: [mockTransform],
          selectedId: null,
        },
        transformActions.remove('1')
      );
      expect(state.list.length).toBe(0);
    });
  });
});
