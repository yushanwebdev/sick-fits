import { ChangeEvent, useState } from 'react';

export default function useForm<T = Record<string, string>>(initial: T) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name, type } = e.target;
    let localValue: string | number | File = value;

    if (type === 'number') {
      localValue = parseInt(value);
    }

    if (type === 'file') {
      [localValue] = (e.target as HTMLInputElement).files;
    }

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: localValue,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).reduce((acc, [key]) => {
      acc[key] = '';
      return acc;
    }, {} as T);

    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
