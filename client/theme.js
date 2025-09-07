import { createTheme } from '@mantine/core';

const themeColors = {
  'brand-orange': [
    '#fff4e6',
    '#ffe0c2',
    '#ffc99b',
    '#ffb172',
    '#ff994a',
    '#ff8a30',
    '#f07928',
    '#d66820',
    '#bf5b1b',
    '#a84e15',
  ],

  'brand-red': [
    '#ffeae6',
    '#ffd0c2',
    '#ffb39b',
    '#ff9572',
    '#ff774a',
    '#ff6530',
    '#f05a28',
    '#d64d20',
    '#bf431b',
    '#a83915',
  ],
};

export const theme = createTheme({
  fontFamily: "'Manrope', sans-serif",
  primaryColor: 'brand-orange',
  colors: themeColors,

  other: {
    gradient: 'linear-gradient(45deg, #ff8a30 0%, #d64d20 100%)',
  },

  components: {
    Button: {
      defaultProps: {
        variant: 'gradient',

        gradient: { from: 'brand-orange.5', to: 'brand-red.6' },
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

    Modal: {
      styles: {
        content: {
          backgroundColor: 'rgba(92, 138, 77, 0.6)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
        },
        header: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
