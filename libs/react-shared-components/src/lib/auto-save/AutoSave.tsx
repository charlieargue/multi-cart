/* eslint-disable no-extra-boolean-cast */
import { Box } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// thx: https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// thx: https://codesandbox.io/s/formik-autosave-example-wfcb6?file=/src/AutoSavingForm.tsx:124-242
// -------------------
export const AutoSave = ({ debounceMs = 500 }) => {
  const mounted = useRef(false);

  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(null);
  const [slowerIsSubmitting, setSlowerIsSubmitting] = useState(false);

  /* BEFORE:
  const debouncedSubmit = useCallback(
    debounce(() => {
      return formik.submitForm().then(() => setIsSaved(true as any));
    }, debounceMs),
    [formik.submitForm, debounceMs],
  );

  useEffect(() => debouncedSubmit() as any, [debouncedSubmit, formik.values]);
  */


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
    mounted.current = true; // Will set it to true on mount ...
    const unsubscribeDebounceSubmit = debouncedSubmit();
    return () => {
      // WIP
      // console.log('hmmm unsubscribeDebounceSubmit');
      // console.log(`🚀 ~ unsubscribeDebounceSubmit`, unsubscribeDebounceSubmit);
      // (unsubscribeDebounceSubmit)();
    };
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


  // TODO: port from bootstrap to Chakra:f <Fade in={slowerIsSubmitting} timeout={3000}></Fade>
  // TODO: make this a top-of-page LINE LOADING INDICATOR like I had
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
