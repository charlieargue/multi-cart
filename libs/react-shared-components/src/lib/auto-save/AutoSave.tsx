/* eslint-disable no-extra-boolean-cast */
import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect, useState } from 'react';

// TODO: put this in it's own custom hook! see `react-debounce-over-rendering.ISSUE.md` does NOT need to be a component

// thx: https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// thx: https://codesandbox.io/s/formik-autosave-example-wfcb6?file=/src/AutoSavingForm.tsx:124-242
// -------------------
export const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();
  const [, setIsSaved] = useState(null);

  const debouncedSubmit = useCallback(
    debounce(
      () =>
        formik.submitForm().then(() => setIsSaved(true)),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  );

  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  return (<Box hidden></Box>);
};
