'use client';

import { useState, createContext, useContext } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import Image from 'next/image';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Flight,
  Build,
  Analytics,
  AccountTree,
  ModelTraining,
  Engineering,
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Settings,
  Security,
  Timeline,
  Warning,
  CheckCircle,
  Speed,
  Assessment,
  CloudDownload,
  Person,
  Notifications
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

// Create a context for drawer state
export const DrawerContext = createContext();

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within DrawerProvider');
  }
  return context;
};

const navigationItems = [
  { title: 'Control Tower', href: '/', icon: <Dashboard /> },
  { title: 'Fleet Management', href: '/visualize', icon: <Flight /> },
  { title: 'Predictive Maintenance', href: '/process-builder', icon: <Build /> },
  { title: 'Model Training', href: '/model-training', icon: <ModelTraining /> },
  { title: 'Maintenance Hub', href: '/expert-marketplace', icon: <Engineering /> }
];

export function DrawerProvider({ children }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer, mobileOpen, toggleMobileDrawer, drawerWidth }}>
      {children}
    </DrawerContext.Provider>
  );
}

export default function GlobalNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { open, toggleDrawer, mobileOpen, toggleMobileDrawer } = useDrawer();

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: open ? 'flex' : 'none', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            A
          </Box>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Boeing
          </Typography>
        </Box>
        {!isMobile && (
          <Tooltip title={open ? 'Collapse sidebar' : 'Expand sidebar'} placement="right">
            <IconButton 
              onClick={toggleDrawer} 
              size="small"
              sx={{
                ml: open ? 0 : 'auto',
                mr: open ? 0 : 'auto',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      {/* Main Navigation */}
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <Tooltip title={!open ? item.title : ''} placement="right" disableHoverListener={open}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: pathname === item.href ? '#000000' : '#FFFFFF',
                  '&.Mui-selected': {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    '& .MuiListItemIcon-root': {
                      color: '#000000'
                    }
                  },
                  '&:hover': {
                    backgroundColor: pathname === item.href ? '#F0F0F0' : 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: pathname === item.href ? '#000000' : '#FFFFFF'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  sx={{ 
                    opacity: open ? 1 : 0, 
                    display: open ? 'block' : 'none',
                    '& .MuiListItemText-primary': {
                      color: pathname === item.href ? '#000000' : '#FFFFFF'
                    }
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      {/* Quick Actions */}
      {open && (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, mb: 1, display: 'block' }}>
            QUICK ACTIONS
          </Typography>
          <List sx={{ p: 0 }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ 
                minHeight: 40, 
                px: 2,
                color: '#FFFFFF',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: '#FFFFFF' }}>
                  <Warning sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Critical Alerts" 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8rem',
                      color: '#FFFFFF'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ 
                minHeight: 40, 
                px: 2,
                color: '#FFFFFF',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: '#FFFFFF' }}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Maintenance Status" 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8rem',
                      color: '#FFFFFF'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ 
                minHeight: 40, 
                px: 2,
                color: '#FFFFFF',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: '#FFFFFF' }}>
                  <Speed sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Performance Metrics" 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8rem',
                      color: '#FFFFFF'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      {/* System Status */}
      {open && (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, mb: 1, display: 'block' }}>
            SYSTEM STATUS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50' }} />
            <Typography variant="caption" sx={{ color: '#FFFFFF', fontSize: '0.75rem' }}>
              All Systems Operational
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50' }} />
            <Typography variant="caption" sx={{ color: '#FFFFFF', fontSize: '0.75rem' }}>
              156 Aircraft Monitored
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleMobileDrawer}
          sx={{
            position: 'fixed',
            left: 16,
            top: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Box
        component="nav"
        sx={{ width: { md: open ? drawerWidth : 65 }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleMobileDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#000000',
              color: '#FFFFFF'
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: open ? drawerWidth : 65,
              borderRight: '1px solid',
              borderColor: 'divider',
              position: 'fixed',
              height: '100vh',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              backgroundColor: '#000000',
              color: '#FFFFFF'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
} 