import * as React from 'react';
import { Flex, Card, Box } from 'rebass';
import { Header2, Text } from '../base/Typography';

export default () => {
  return (
    <Flex justifyContent="center" m={5}>
      <Card bg="white" borderRadius={2} width={[1, 1 / 2, 1 / 2]}>
        <Header2 p={3}>No Dictionary Selected</Header2>
        <Box p={3}>
          <Text>
            Select one of the dictionaries to the right to get started.
          </Text>
        </Box>
      </Card>
    </Flex>
  );
};
