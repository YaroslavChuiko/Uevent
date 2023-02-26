import { SyntheticEvent, useRef, useState } from 'react';
import { Avatar, InputGroup } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type PropsType = {
  register: UseFormRegisterReturn;
  avatar: string;
};

const FileUpload = ({ register, avatar }: PropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, onChange, ...rest } = register;
  const [preview, setPreview] = useState('');

  const setFile: React.ChangeEventHandler<HTMLInputElement> = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;
    const photo = (files as FileList)[0];
    const file = URL.createObjectURL(photo);
    setPreview(file);
    onChange(e);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        hidden
        accept="image/*"
        onChange={setFile}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <Avatar size="2xl" src={preview || avatar} cursor="pointer" />
    </InputGroup>
  );
};

export default FileUpload;
