import { Box, Flex, Heading, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ReactRouterLink, NavLink, useNavigate } from 'react-router-dom';
import styles from './header.styles';
import NavbarAuth from './NavbarAuth';

const links = [
  { href: '/', label: 'Browse Events' },
  { href: '/companies', label: 'Browse Companies' },
];

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.navbar}>
      <Flex sx={styles.container} h="100%" align="center" justify="space-between">
        <Box sx={{ display: { md: 'none' } }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<Icon boxSize={6} as={isOpen ? FiX : FiMenu} />}
                ></MenuButton>
                <MenuList>
                  {links.map((l, i) => (
                    <MenuItem key={i} color="secondary" px={4} py={2} onClick={() => navigate(l.href)}>
                      {l.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <Box>
          <ReactRouterLink to="/">
            <Heading size="lg" color="secondary">
              uevent
            </Heading>
          </ReactRouterLink>
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
    </Box>
  );
};

export default Header;
