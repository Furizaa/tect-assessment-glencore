import * as React from 'react';
import { Card as BaseCard, CardProps } from 'rebass';

import { FormError as FormErrorText } from './Typography';

interface Props extends CardProps {
  children: string;
}

export default ({ children, ...rest }: Props) => (
  <BaseCard bg="warning" borderRadius={2} {...rest}>
    <FormErrorText p={2}>{children}</FormErrorText>
  </BaseCard>
);
