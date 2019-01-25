import * as React from 'react';
import styled from 'styled-components';

const Base = styled('div')`
  cursor: pointer;
`;

interface Props {
  children: React.ReactChild;
  onClick: Global.TFunctionType;
}

export default ({ children, onClick }: Props) => (
  <Base onClick={onClick}>{children}</Base>
);
