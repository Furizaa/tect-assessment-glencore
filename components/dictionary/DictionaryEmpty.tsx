import * as React from 'react';
import { Text } from '../base/Typography';

import DictionaryCreateButton from './DictionaryCreateButton';

interface Props {
  onClickCreate: () => void;
}

export default ({ onClickCreate }: Props) => {
  return (
    <>
      <Text color="text-muted-invert" px={2} pt={3} pb={4}>
        There is currently nothing here. Get started by adding a first
        dictionary!
      </Text>
      <DictionaryCreateButton onClick={onClickCreate} />
    </>
  );
};
