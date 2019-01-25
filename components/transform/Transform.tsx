import * as React from 'react';

import { IDictionary } from '../../store/Dictionaries';
import { TransformProvider } from '../../store/Transforms';

import Logo from '../base/Logo';

import TransformCreateModal from './TransformCreateModal';
import TransformEmpty from './TransformEmpty';
import TransformDisabled from './TransformDisabled';
import TransformList from './TransformList';

interface Props {
  dictionaryList: Array<IDictionary>;
  selectedDictionary: IDictionary | null;
}

export default ({ dictionaryList, selectedDictionary }: Props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleStartCreateTransform = () => {
    setModalOpen(true);
  };

  const handleCloseCreateTransform = () => {
    setModalOpen(false);
  };

  return (
    <>
      {selectedDictionary ? (
        <TransformProvider dictionaryId={selectedDictionary.id}>
          {({ transforms, selectedTransform }) => (
            <>
              {transforms.length ? (
                <TransformList
                  items={transforms}
                  onClickCreate={handleStartCreateTransform}
                  selectedItem={selectedTransform}
                />
              ) : (
                <TransformEmpty onClickCreate={handleStartCreateTransform} />
              )}
              {selectedDictionary && (
                <TransformCreateModal
                  open={isModalOpen}
                  selectedDictionary={selectedDictionary}
                  transformList={transforms}
                  onClose={handleCloseCreateTransform}
                />
              )}
            </>
          )}
        </TransformProvider>
      ) : dictionaryList.length ? (
        <TransformDisabled />
      ) : (
        <Logo width={[1 / 2]} mx="auto" pt={5} />
      )}
    </>
  );
};
