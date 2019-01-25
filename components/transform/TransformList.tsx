import * as React from 'react';
import { Flex, Card, Box } from 'rebass';

import TransformCreateButton from './TransformCreateButton';
import TransformItem from './TransformItem';
import {
  ITransform,
  TransformContext,
  TTransformContext,
  TTransformId,
  transformActions,
} from '../../store/Transforms';
import TransformDeleteButton from './TransformDeleteButton';
import { Muted } from '../base/Typography';

interface Props {
  items: Array<ITransform>;
  onClickCreate: () => void;
  selectedItem: ITransform | null;
}

export default ({ items, onClickCreate, selectedItem }: Props) => {
  const dispatch = React.useContext(TransformContext) as TTransformContext;

  const handleItemClick = (itemId: TTransformId) => {
    dispatch(transformActions.select(itemId));
  };

  const handleItemDelete = () => {
    if (selectedItem) {
      dispatch(transformActions.remove(selectedItem.id));
    }
  };

  return (
    <>
      <Flex justifyContent="center" m={5}>
        <Card bg="white" borderRadius={2} width={[1, 1 / 2, 1 / 2]}>
          <Box p={3}>
            {items.map(item => (
              <TransformItem
                key={item.id}
                item={item}
                onClick={handleItemClick}
                isSelected={!!selectedItem && selectedItem.id === item.id}
              />
            ))}
          </Box>
          <Box p={3}>
            <Muted>
              Select a transform by clicking on it for further options.
            </Muted>
          </Box>
          <Flex p={3} justifyContent="flex-end">
            {selectedItem && (
              <Box pr={1}>
                <TransformDeleteButton onClick={handleItemDelete} />
              </Box>
            )}
            <TransformCreateButton onClick={onClickCreate} />
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
