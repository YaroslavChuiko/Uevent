import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Avatar, InputGroup, Image, Flex } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type PropsType = {
  register: UseFormRegisterReturn;
  avatar: string;
  name: string;
  isPoster?: boolean;
};

const FileUpload = ({ register, avatar, name, isPoster = false }: PropsType) => {
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

  useEffect(() => {
    if (!avatar && preview) {
      URL.revokeObjectURL(preview);
      setPreview('');
    }
  }, [avatar]);

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
      {isPoster ? (
        <Flex
          maxWidth={{ base: 'none', md: 'sm' }}
          h="155px"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={preview || avatar}
            fallbackSrc="https://via.placeholder.com/668x400?text=Poster"
            alt={name}
            cursor="pointer"
            objectFit="cover"
          />
        </Flex>
      ) : (
        <Avatar size="2xl" name={name} src={preview || avatar} bgColor="secondary" cursor="pointer" />
      )}
    </InputGroup>
  );
};

export default FileUpload;
