import * as React from 'react';
import uuid from 'uuid';

import { Header2, FormLabel, ButtonText } from '../base/Typography';
import { Button } from '../base/Button';
import TextInput from '../base/TextInput';
import FormError from '../base/FormError';
import { Flex, Box } from 'rebass';
import Modal from '../base/Modal';
import {
  ITransform,
  TransformContext,
  TTransformContext,
  transformActions,
} from '../../store/Transforms';
import { IDictionary } from '../../store/Dictionaries';

interface Props {
  open: boolean;
  transformList: Array<ITransform>;
  selectedDictionary: IDictionary;
  onClose: () => void;
}

export default ({
  open,
  transformList,
  selectedDictionary,
  onClose,
}: Props) => {
  const dispatch = React.useContext(TransformContext) as TTransformContext;
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');

  const isValidFrom = !!from.length;
  const isValidTo = !!to.length;

  const existingFromTransform = transformList.find(
    item => !!item.from.find(itemFrom => itemFrom === from)
  );

  const isDisabled = !isValidFrom || !isValidTo || !!existingFromTransform;

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const handleSubmit = () => {
    if (isValidFrom && isValidTo && !existingFromTransform) {
      dispatch(
        transformActions.add({
          id: uuid.v4(),
          from: [from],
          to,
          dictionaryId: selectedDictionary.id,
        })
      );
      onClose();
      setFrom('');
      setTo('');
    }
  };

  const handleCancel = () => {
    onClose();
    setFrom('');
    setTo('');
  };

  return (
    <Modal open={open}>
      <>
        <Header2 p={3}>
          {`Create new transform in dictionary ${selectedDictionary.name}.`}
        </Header2>
        <Flex px={3} alignItems="center">
          <Box width={1 / 3}>
            <FormLabel>Match text (from):</FormLabel>
          </Box>
          <Box width={2 / 3}>
            <TextInput
              onChange={handleChangeFrom}
              value={from}
              placeholder="Jet Black, Rose Gold"
              maxLength="30"
            />
          </Box>
        </Flex>
        <Flex px={3} pt={1} alignItems="center">
          <Box width={1 / 3}>
            <FormLabel>Transform (to):</FormLabel>
          </Box>
          <Box width={2 / 3}>
            <TextInput
              onChange={handleChangeTo}
              value={to}
              placeholder="Black, Gold"
              maxLength="30"
            />
          </Box>
        </Flex>
        {existingFromTransform && (
          <Box px={3} py={3}>
            <FormError>{`The "from" attribute "${from}" is ambiguous. It already exists in another transform in this dictionary.`}</FormError>
          </Box>
        )}
        <Flex px={3} pt={4} pb={2} justifyContent="flex-end">
          <Box>
            <Button variant="secondary-outline" onClick={handleCancel}>
              <ButtonText color="near-black">Cancel</ButtonText>
            </Button>
          </Box>
          <Box pl={1}>
            {/* 
             // @ts-ignore */}
            <Button
              variant={isDisabled ? 'disabled' : 'primary'}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              <ButtonText>Create Transform</ButtonText>
            </Button>
          </Box>
        </Flex>
      </>
    </Modal>
  );
};
