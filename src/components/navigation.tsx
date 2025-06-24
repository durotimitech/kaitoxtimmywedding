'use client';

import styled from 'styled-components';
import { Heart } from 'lucide-react';

const NavContainer = styled.nav`
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

const LeftNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const RightNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 400;
  font-size: 0.95rem;
  transition: color 0.2s;
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const Logo = styled.div`
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

const MobileMenuButton = styled.button`
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
    <NavContainer>
      <NavContent>
        <LeftNavLinks>
          <NavLink onClick={() => smoothScrollTo('hero')}>Home</NavLink>
          <NavLink onClick={() => smoothScrollTo('about')}>About</NavLink>
        </LeftNavLinks>

        <Logo>
          <LogoIcon>
            <Heart size={20} />
          </LogoIcon>
          Kaito x Timmy
        </Logo>

        <RightNavLinks>
          <NavLink onClick={() => smoothScrollTo('gallery')}>Photobook</NavLink>
        </RightNavLinks>

        <MobileMenuButton>
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
}
