/* eslint-disable no-extra-boolean-cast */
import { useFormikContext } from 'formik';
import debounce from 'just-debounce-it';
import React, { useCallback, useEffect, useState } from 'react';
import { Fade } from 'react-bootstrap';

// thx: https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// thx: https://codesandbox.io/s/formik-autosave-example-wfcb6?file=/src/AutoSavingForm.tsx:124-242
// -------------------
export const AutoSave = ({ debounceMs = 500 }) => {

  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(null);
  const [slowerIsSubmitting, setSlowerIsSubmitting] = useState(false);
  const debouncedSubmit = useCallback(
    debounce(() => {
      return formik.submitForm().then(() => setIsSaved(true as any));
    }, debounceMs),
    [formik.submitForm, debounceMs],
  );

  useEffect(() => debouncedSubmit() as any, [debouncedSubmit, formik.values]);
  useEffect(() => {
    // slow it down on the falses!
    !!formik.isSubmitting ?
      setSlowerIsSubmitting(formik.isSubmitting) :
      setTimeout(() => {
        setSlowerIsSubmitting(formik.isSubmitting);
      }, 1000);

  }, [formik.isSubmitting]);


  return (
    <Fade in={slowerIsSubmitting} timeout={3000}>
      <p className="text-success w-100 floatingSave">
        {!!formik.isSubmitting
          ? 'Saving...'
          : isSaved
            ? 'Saved!'
            : null}
      </p>
    </Fade>

  );
};
