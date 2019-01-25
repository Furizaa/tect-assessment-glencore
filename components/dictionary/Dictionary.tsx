import * as React from 'react';

import { Header1 } from '../base/Typography';

import { IDictionary, TDictionaryId } from '../../store/Dictionaries';

import DictionaryCreateModal from './DictionaryCreateModal';
import DictionaryList from './DictionaryList';
import DictionaryEmpty from './DictionaryEmpty';

interface Props {
  dictionaryList: Array<IDictionary>;
  selectedItemId: TDictionaryId | null;
}

export default ({ dictionaryList, selectedItemId }: Props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleStartCreateDictionary = () => {
    setModalOpen(true);
  };

  const handleCloseCreateDictionary = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header1 color="text-invert" p={2}>
        Dictionaries
      </Header1>
      {dictionaryList.length ? (
        <DictionaryList
          selectedItemId={selectedItemId}
          items={dictionaryList}
          onClickCreate={handleStartCreateDictionary}
        />
      ) : (
        <DictionaryEmpty onClickCreate={handleStartCreateDictionary} />
      )}
      <DictionaryCreateModal
        open={isModalOpen}
        dictionaryList={dictionaryList}
        onClose={handleCloseCreateDictionary}
      />
    </>
  );
};
