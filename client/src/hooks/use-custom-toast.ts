import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import type { UseToastOptions } from '@chakra-ui/react';

const useCustomToast = () => {
  const createToast = useToast();

  const toast = useCallback(
    (description: string, status: UseToastOptions['status']) => {
      createToast({
        description,
        duration: 9000,
        isClosable: true,
        status,
      });
    },
    [createToast],
  );

  return { toast };
};

export default useCustomToast;
