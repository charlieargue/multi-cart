import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect } from 'react';

export const AutoSave = ({ debounceMs = 500 }) => {
  const formik = useFormikContext();

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
