import * as React from 'react';
import { Flex, Card, Box } from 'rebass';
import { Header2, Text } from '../base/Typography';

import TransformCreateButton from './TransformCreateButton';

interface Props {
  onClickCreate: () => void;
}

export default ({ onClickCreate }: Props) => {
  return (
    <Flex justifyContent="center" m={5}>
      <Card bg="white" borderRadius={2} width={[1, 1 / 2, 1 / 2]}>
        <Header2 p={3}>Empty Dictionary</Header2>
        <Box p={3}>
          <Text>
            There are currently no transforms in this dictionary. Click the
            button to add a first transform.
          </Text>
        </Box>
        <Flex p={3} justifyContent="flex-end">
          <TransformCreateButton onClick={onClickCreate} />
        </Flex>
      </Card>
    </Flex>
  );
};
