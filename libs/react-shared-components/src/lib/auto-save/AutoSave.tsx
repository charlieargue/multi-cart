/* eslint-disable no-extra-boolean-cast */
import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect, useState } from 'react';

// TODO: put this in it's own custom hook! see `react-debounce-over-rendering.ISSUE.md`

// thx: https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// thx: https://codesandbox.io/s/formik-autosave-example-wfcb6?file=/src/AutoSavingForm.tsx:124-242
// -------------------
export const AutoSave = ({ debounceMs = 500 }) => {
  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(null);
  const [slowerIsSubmitting, setSlowerIsSubmitting] = useState(false);

  // -------------------
  const debouncedSubmit = useCallback(() => {
    const unsubscribeDebounceSubmit = debounce(() => {
      return formik.submitForm().then(() => setIsSaved(true));
    }, debounceMs);
    return unsubscribeDebounceSubmit();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik.submitForm, debounceMs],
  );

  // -------------------
  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);


  // ------------------- CULPRIT!
  useEffect(() => {
    // NOTE: don't forget to unsubscribe, or get ERROR: To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    if (!!formik.isSubmitting) {
      setSlowerIsSubmitting(formik.isSubmitting);
    } else {
      const timeout = setTimeout(() => {
        setSlowerIsSubmitting(formik.isSubmitting);
      }, 1000);
      return () => clearInterval(timeout);
    }
    // slow it down on the falses!
  }, [formik.isSubmitting]);


  // TODO: ✅ NO, use a global context, and dispatch an event, that shows some indicator (top of page LINE or 3 dot next to logo etc...)
  // -------------------
  return (<Box></Box>);
  // <p className="text-success w-100 floatingSave">
  //   {!!formik.isSubmitting
  //     ? 'Saving...'
  //     : isSaved
  //       ? 'Saved!'
  //       : null}
  // </p>
};
