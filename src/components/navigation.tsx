'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(254, 252, 248, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  padding: ${props => props.theme.spacing.md} 0;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const LeftNavLinks = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const RightNavLinks = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 400;
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const Logo = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-family: var(--font-dancing);
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: static;
    transform: none;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  outline: none;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
`;

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
};

export function Navigation() {
  return (
    <NavContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <NavContent>
        <LeftNavLinks
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NavLink
            onClick={() => smoothScrollTo('hero')}
            whileHover={{
              color: '#D4AF37',
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => smoothScrollTo('about')}
            whileHover={{
              color: '#D4AF37',
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => smoothScrollTo('travel')}
            whileHover={{
              color: '#D4AF37',
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Travel
          </NavLink>
        </LeftNavLinks>

        <Logo
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{
            scale: 1.05,
            transition: { type: 'spring', stiffness: 400, damping: 17 },
          }}
        >
          <motion.div
            whileHover={{
              rotate: 360,
              scale: 1.1,
              transition: { duration: 0.5 },
            }}
          >
            <LogoIcon>
              <Heart size={20} />
            </LogoIcon>
          </motion.div>
          Kaito x Timmy
        </Logo>

        <RightNavLinks
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NavLink
            onClick={() => smoothScrollTo('faq')}
            whileHover={{
              color: '#D4AF37',
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            FAQ
          </NavLink>
          <NavLink
            onClick={() => smoothScrollTo('gallery')}
            whileHover={{
              color: '#D4AF37',
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Photobook
          </NavLink>
        </RightNavLinks>

        <MobileMenuButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
}
