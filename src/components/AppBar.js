'use client';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import NextImage from 'next/image';

export default function StyledAppBar() {
  return (
    <AppBar
    position='sticky'
    sx={{
      borderBottom: '1px solid #EBEBEB',
    }}
    elevation={0}
  >
    <Toolbar sx={{ backgroundColor: 'background.paper' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ width: '100%' }}
      >
        <NextImage
          src='/inv-workplace.svg'
          alt='Invisible Workplace'
          width={200}
          height={40}
        />
        </Stack>
    </Toolbar>
  </AppBar>
  );
} 