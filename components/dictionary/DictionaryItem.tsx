import * as React from 'react';
import { Card } from 'rebass';
import { IDictionary } from '../../store/Dictionaries';

import Clickable from '../base/Clickable';
import { Header2, Muted } from '../base/Typography';

interface Props {
  item: IDictionary;
  isSelected: boolean;
  onClick: (item: IDictionary) => void;
}

export default ({ item, onClick, isSelected }: Props) => {
  const handleClick = () => {
    onClick(item);
  };

  return (
    <Clickable onClick={handleClick}>
      <Card
        bg={isSelected ? 'white' : 'near-white'}
        borderRadius={2}
        pl={2}
        mr={isSelected ? 0 : 2}
        py={2}
        mb={2}
      >
        <Header2 color={isSelected ? 'primary' : undefined}>
          {item.name}
        </Header2>
        <Muted pt={1}>{item.id}</Muted>
      </Card>
    </Clickable>
  );
};
