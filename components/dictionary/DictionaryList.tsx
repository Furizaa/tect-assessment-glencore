import * as React from 'react';
import { Box } from 'rebass';

import {
  IDictionary,
  DictionaryContext,
  TDictionaryContext,
  dictionaryActions,
  TDictionaryId,
} from '../../store/Dictionaries';
import DictionaryItem from './DictionaryItem';
import DictionaryCreateButton from './DictionaryCreateButton';

interface Props {
  items: Array<IDictionary>;
  selectedItemId: TDictionaryId | null;
  onClickCreate: () => void;
}

export default ({ items, onClickCreate, selectedItemId }: Props) => {
  const dispatch = React.useContext(DictionaryContext) as TDictionaryContext;

  const handleItemClick = (item: IDictionary) => {
    dispatch(dictionaryActions.select(item.id));
  };

  return (
    <>
      <Box px={2} pb={4}>
        {items.map(item => (
          <DictionaryItem
            key={item.id}
            item={item}
            onClick={handleItemClick}
            isSelected={!!selectedItemId && item.id === selectedItemId}
          />
        ))}
      </Box>

      <DictionaryCreateButton onClick={onClickCreate} />
    </>
  );
};
