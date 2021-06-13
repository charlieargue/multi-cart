/* eslint-disable no-extra-boolean-cast */
import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect, useState } from 'react';

// thx: https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// thx: https://codesandbox.io/s/formik-autosave-example-wfcb6?file=/src/AutoSavingForm.tsx:124-242
// -------------------
export const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();

  // TODO: not sure about this, was getting error: React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), debounceMs),
    [debounceMs, formik.submitForm]
  );

  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  return (<Box hidden></Box>);
};
