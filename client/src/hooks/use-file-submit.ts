import { UseFormHandleSubmit } from 'react-hook-form';
import { FormValues } from '~/validation/avatar';

type HookType = {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  requestHandler: (data: FormData) => Promise<any>;
};

const useFileSubmit = ({ handleSubmit, requestHandler }: HookType) => {
  const onSubmit = handleSubmit(async ({ files }) => {
    const form = new FormData();
    form.append('avatar', files[0]);
    await requestHandler(form);
  });

  return { onSubmit };
};

export default useFileSubmit;
