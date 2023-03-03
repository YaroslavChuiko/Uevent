import { Box, Flex, HStack, IconButton, Icon, Stack, useDisclosure, Heading } from '@chakra-ui/react';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { NAVBAR_COLOR } from '~/consts/components';
import styles from './navbar.styles';
import NavbarAuth from './NavbarAuth';

const links = [
  { href: '/', label: 'Browse Events' },
  { href: '/companies', label: 'Browse Companies' },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box sx={styles.navbar}>
      <Flex sx={styles.container} h="100%" align="center" justify="space-between">
        <IconButton
          size="md"
          bgColor={NAVBAR_COLOR}
          icon={<Icon as={isOpen ? FiX : FiAlignJustify} />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box>
          <Heading size="lg" color="secondary">
            uevent
          </Heading>
        </Box>
        <HStack align="center" spacing={6}>
          <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
            {links.map((l) => (
              <NavLink to={l.href} key={l.label}>
                {l.label}
              </NavLink>
            ))}
          </HStack>
          <NavbarAuth />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box bgColor={NAVBAR_COLOR} px={4} py={4} display={{ md: 'none' }}>
          <Stack spacing={4}>
            {links.map((l) => (
              <NavLink to={l.href} key={l.label}>
                {l.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
