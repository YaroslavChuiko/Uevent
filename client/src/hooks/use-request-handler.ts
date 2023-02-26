import useCustomToast from './use-custom-toast';

type HookType<T> = {
  f: (data: T) => any;
  successMsg?: string;
  successF?: () => void;
};

const useRequestHandler = <T>({ f, successMsg, successF }: HookType<T>) => {
  const { toast } = useCustomToast();

  const handler = async (data: T) => {
    try {
      await f(data).unwrap();
      successMsg && toast(successMsg, 'success');
      successF && successF();
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  return { handler };
};

export default useRequestHandler;
