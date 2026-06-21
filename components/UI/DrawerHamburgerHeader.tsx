import { useDrawerStatus } from '@react-navigation/drawer';
import React from 'react';
import { AnimatedHamburger } from './AnimatedHamburger';

export function DrawerHamburgerHeader() {
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === 'open';

  return <AnimatedHamburger isDrawerOpen={isDrawerOpen} />;
}