import * as React from 'react';

import { theme } from '../components/theme';
import { Normalize } from 'styled-normalize';

import { DictionaryProvider } from '../store/Dictionaries';
import Layout from '../components/base/Layout';
import Dictionary from '../components/dictionary/Dictionary';
import Transforms from '../components/transform/Transform';

import { ThemeProvider } from 'styled-components';

export default () => {
  return (
    <>
      <Normalize />
      <ThemeProvider theme={theme}>
        <DictionaryProvider>
          {({ list, selected, selectedItem }) => (
            <Layout
              leftComponent={
                <Dictionary dictionaryList={list} selectedItemId={selected} />
              }
              rightComponent={
                <Transforms
                  dictionaryList={list}
                  selectedDictionary={selectedItem}
                />
              }
            />
          )}
        </DictionaryProvider>
      </ThemeProvider>
    </>
  );
};
