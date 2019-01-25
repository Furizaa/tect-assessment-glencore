import * as React from 'react';
import uuid from 'uuid';

import { Header2, FormLabel, ButtonText } from '../base/Typography';
import { Button } from '../base/Button';
import TextInput from '../base/TextInput';
import FormError from '../base/FormError';
import { Flex, Box } from 'rebass';
import Modal from '../base/Modal';
import {
  IDictionary,
  DictionaryContext,
  TDictionaryContext,
  dictionaryActions,
} from '../../store/Dictionaries';

interface Props {
  open: boolean;
  dictionaryList: Array<IDictionary>;
  onClose: () => void;
}

export default ({ open, dictionaryList, onClose }: Props) => {
  const dispatch = React.useContext(DictionaryContext) as TDictionaryContext;
  const [name, setName] = React.useState('');

  const isValidName = !!name.trim().length;

  const isExistingName = !!dictionaryList.find(item => item.name === name);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isDisabled = !isValidName || isExistingName;

  const handleSubmit = () => {
    if (isValidName && !isExistingName) {
      dispatch(
        dictionaryActions.add({
          name,
          id: uuid.v4(),
        })
      );
      onClose();
      setName('');
    }
  };

  const handleCancel = () => {
    onClose();
    setName('');
  };

  return (
    <Modal open={open}>
      <>
        <Header2 p={3}>Create new dictionary</Header2>
        <Flex px={3} alignItems="center">
          <Box width={1 / 3}>
            <FormLabel>Dictionary Name:</FormLabel>
          </Box>
          <Box width={2 / 3}>
            <TextInput
              onChange={handleChangeName}
              value={name}
              placeholder="New Dictionary"
              maxLength="30"
            />
          </Box>
        </Flex>
        {isExistingName && (
          <Box px={3} py={3}>
            <FormError>{`A dictionary with the name "${name}" already exists!`}</FormError>
          </Box>
        )}
        <Flex px={3} pt={4} pb={1} justifyContent="flex-end">
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
              <ButtonText>Create Dictionary</ButtonText>
            </Button>
          </Box>
        </Flex>
      </>
    </Modal>
  );
};
