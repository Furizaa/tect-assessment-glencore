import * as React from 'react';
import { Text } from '../base/Typography';
import { Flex, Box } from 'rebass';
import { ITransform, TTransformId } from '../../store/Transforms';
import Clickable from '../base/Clickable';

interface Props {
  item: ITransform;
  onClick: (id: TTransformId) => void;
  isSelected: boolean;
}

export default ({ item, onClick, isSelected }: Props) => {
  const handleOnClick = () => {
    onClick(item.id);
  };

  return (
    <Clickable onClick={handleOnClick}>
      <Flex p={2} bg={isSelected ? 'selection' : 'transparent'}>
        <Box width={4.5 / 10}>
          <Text fontSize={2}>{item.from.join(', ')}</Text>
        </Box>
        <Box width={1 / 10}>
          <Text fontWeight="2">to</Text>
        </Box>
        <Box width={4.5 / 10}>
          <Text fontSize={2}>{item.to}</Text>
        </Box>
      </Flex>
    </Clickable>
  );
};
