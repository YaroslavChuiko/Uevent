import { Validate } from 'react-hook-form';

export type FormValues = { files: FileList };

export const validate: Validate<FileList, FormValues> = (value: FileList) => {
  if (value.length < 1) {
    return 'A new image is required';
  }
};
