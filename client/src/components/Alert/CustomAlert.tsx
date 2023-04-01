import { Alert, AlertDescription, AlertIcon, SystemStyleObject } from '@chakra-ui/react';

type PropsType = {
  status: 'error' | 'success' | 'warning';
  description: string;
  sx?: SystemStyleObject;
};

const CustomAlert = ({ status, description, ...props }: PropsType) => (
  <Alert status={status} {...props}>
    <AlertIcon />
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);

export default CustomAlert;
