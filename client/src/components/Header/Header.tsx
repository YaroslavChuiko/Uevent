import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ReactRouterLink, NavLink, useNavigate } from 'react-router-dom';
import { LOGO_FONT } from '~/consts/components';
import styles from './header.styles';
import NavbarAuth from './NavbarAuth';

const links = [
  { href: '/', label: 'Events' },
  { href: '/companies', label: 'Companies' },
];

const Header = () => {
  const navigate = useNavigate();

  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!header.current) return;

      if (window.scrollY >= 1) {
        header.current.style.boxShadow = '0px 0 10px rgba(0,0,0,.3)';
      } else {
        header.current.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <Box sx={styles.navbar} ref={header}>
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
            <Heading size="xl" color="secondary" fontFamily={LOGO_FONT} lineHeight="1">
              Uevent
            </Heading>
          </ReactRouterLink>
        </Box>
        <HStack align="center" spacing={6}>
          <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }} mr="50px">
            {links.map((l) => (
              <Link as={NavLink} to={l.href} key={l.label} fontWeight="bold" _hover={{ color: 'blue.500' }}>
                {l.label}
              </Link>
            ))}
          </HStack>
          <NavbarAuth />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
