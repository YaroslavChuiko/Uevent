import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { FormValues } from '~/validation/avatar';

type HookType = {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  requestHandler: (data: FormData) => Promise<any>;
  reset: UseFormReset<any>;
};

const useFileSubmit = ({ handleSubmit, requestHandler, reset }: HookType) => {
  const onSubmit = handleSubmit(async ({ files }) => {
    const form = new FormData();
    form.append('avatar', files[0]);
    await requestHandler(form);
    reset();
  });

  return { onSubmit };
};

export default useFileSubmit;
