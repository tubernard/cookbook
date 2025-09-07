import { createTheme } from '@mantine/core';

const themeColors = {
  'brand-blue': [
    '#e6f7ff',
    '#bae7ff',
    '#91d5ff',
    '#69c0ff',
    '#40a9ff',
    '#1890ff',
    '#096dd9',
    '#0050b3',
    '#003a8c',
    '#002766',
  ],
  'brand-violet': [
    '#f3e6ff',
    '#d9bae7',
    '#c08ddb',
    '#a761cf',
    '#8f34c3',
    '#7c1ab8',
    '#690aa2',
    '#560689',
    '#43046f',
    '#310256',
  ],
};

export const theme = createTheme({
  fontFamily: "'Manrope', sans-serif",
  primaryColor: 'brand-blue',
  colors: themeColors,

  other: {
    gradient: 'linear-gradient(45deg, #096dd9 0%, #690aa2 100%)',
  },

  components: {
    Button: {
      defaultProps: {
        variant: 'gradient',
        gradient: { from: 'brand-blue.6', to: 'brand-violet.6' },
      },
    },
    Paper: {
      defaultProps: {
        bg: 'rgba(255, 255, 255, 0.6)',
        shadow: 'md',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    Title: {
      styles: (theme) => ({
        root: {
          background: theme.other.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }),
    },

    TextInput: {
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    PasswordInput: {
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    NumberInput: {
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    Textarea: {
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    FileInput: {
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});
