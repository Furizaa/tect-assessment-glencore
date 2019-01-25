import * as React from 'react';
import { Flex } from 'rebass';
import { Button } from '../base/Button';
import { ButtonText } from '../base/Typography';

interface Props {
  onClick: Global.TFunctionType;
}

export default ({ onClick }: Props) => {
  // @ts-ignore
  return (
    <Flex justifyContent="center">
      <Button onClick={onClick} variant="primary-outline">
        <ButtonText color="text-primary-invert">New Dictionary</ButtonText>
      </Button>
    </Flex>
  );
};
