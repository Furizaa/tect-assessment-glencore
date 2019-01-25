import { dictionaryReducer, dictionaryActions } from './Dictionaries';

const initialState = {
  list: [],
  selected: null,
};

describe('Dictionaries store', () => {
  describe('reducer', () => {
    it('adds dictionary', () => {
      const state = dictionaryReducer(
        initialState,
        dictionaryActions.add({ name: 'test', id: '1' })
      );
      expect(state.list.length).toBe(1);
      expect(state.list[0].name).toEqual('test');
      expect(state.list[0].id).toEqual('1');
    });

    it('selects added dictionary', () => {
      const state = dictionaryReducer(
        initialState,
        dictionaryActions.add({ name: 'test', id: '1' })
      );
      expect(state.selected).toEqual('1');
    });

    it('changes selection', () => {
      const state = dictionaryReducer(
        {
          list: [{ name: 'First', id: '1' }, { name: 'Second', id: '2' }],
          selected: '1',
        },
        dictionaryActions.select('2')
      );
      expect(state.selected).toEqual('2');
    });

    it('removed dictionary', () => {
      const state = dictionaryReducer(
        {
          list: [{ name: 'First', id: '1' }, { name: 'Second', id: '2' }],
          selected: '1',
        },
        dictionaryActions.remove('1')
      );
      expect(state.list.length).toBe(1);
      expect(state.list[0].id).toEqual('2');
    });

    it('deselects removed dictionary', () => {
      const state = dictionaryReducer(
        {
          list: [{ name: 'First', id: '1' }, { name: 'Second', id: '2' }],
          selected: '1',
        },
        dictionaryActions.remove('1')
      );
      expect(state.selected).toBeNull();
    });
  });
});
