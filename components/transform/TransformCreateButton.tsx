import * as React from 'react';
import { Button } from '../base/Button';
import { ButtonText } from '../base/Typography';

interface Props {
  onClick: Global.TFunctionType;
}

export default ({ onClick }: Props) => {
  return (
    <Button variant="primary" onClick={onClick}>
      <ButtonText>Add New Transform</ButtonText>
    </Button>
  );
};
