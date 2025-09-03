'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import AppBar from '@/components/AppBar';
import GlobalNavigation, { DrawerProvider, useDrawer } from '@/components/GlobalNavigation';

function Layout({ children }) {
  const { open, drawerWidth } = useDrawer();
  const collapsedWidth = 65;
  const pathname = usePathname();
  
  // Hide navbar on first page (/) and process builder page (/process-builder)
  const shouldHideNavbar = pathname === '/' || pathname === '/process-builder';
  
  return (
    <Box sx={{ display: 'flex' }}>
      {!shouldHideNavbar && <GlobalNavigation />}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: { xs: 0, md: shouldHideNavbar ? 0 : 0 },
        width: { xs: '100%', md: shouldHideNavbar ? '100%' : `calc(100% - ${open ? drawerWidth : collapsedWidth}px)` },
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })
      }}>
        {!shouldHideNavbar && <AppBar />}
        <main style={{ flexGrow: 1, padding: shouldHideNavbar ? '0' : '24px' }}>
          {children}
        </main>
      </Box>
    </Box>
  );
}

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const shouldHideNavbar = pathname === '/' || pathname === '/process-builder';
  
  // Always wrap with DrawerProvider to ensure context is available
  return (
    <DrawerProvider>
      {shouldHideNavbar ? (
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <main style={{ flexGrow: 1, padding: '0' }}>
              {children}
            </main>
          </Box>
        </Box>
      ) : (
        <Layout>{children}</Layout>
      )}
    </DrawerProvider>
  );
} 