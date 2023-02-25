import useCustomToast from './use-custom-toast';

type HookType<T> = {
  f: (data: T) => any;
};

const useRequestHandler = <T>({ f }: HookType<T>) => {
  const { toast } = useCustomToast();

  const handler = async (data: T) => {
    try {
      await f(data).unwrap();
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  return { handler };
};

export default useRequestHandler;
