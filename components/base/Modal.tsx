import styled from 'styled-components';

import { Card } from 'rebass';
import { ReactChild } from 'react';
import { createPortal } from 'react-dom';

import Overlay from './Overlay';

const ModalWrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 11;

  left: 50%;
  top: 50%;
  height: auto;
  transform: translate(-50%, -50%);
  max-width: 30em;
  max-height: calc(100% - ${p => p.theme.space[4]});
`;

const ModalBody = ({ children }: { children: ReactChild }) => (
  <Card width={1} bg="#f6f6ff" borderRadius={2} boxShadow="shadow">
    {children}
  </Card>
);

interface Props {
  open: boolean;
  children: ReactChild;
}

export default ({ open, children }: Props) => {
  if (open) {
    const outlet = document.getElementById('modal-root');
    if (outlet) {
      return createPortal(
        <>
          <Overlay />
          <ModalWrapper>
            <ModalBody>{children}</ModalBody>
          </ModalWrapper>
        </>,
        outlet
      );
    }
  }
  return null;
};
