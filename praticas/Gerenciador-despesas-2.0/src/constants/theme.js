export const COLORS = {
  light: {
    background: '#f2f2f7',
    card: '#ffffff',
    text: '#1c1c1e',
    textSecondary: '#6b6b70',
    border: '#c7c7cc',
    primary: '#3b6fd4',
    onPrimary: '#ffffff',
    danger: '#d32f2f',
    tag: '#e8e8ee',
    tagText: '#444444',
    summary: '#a9a9a9',
  },
  dark: {
    background: '#000000',
    card: '#1c1c1e',
    text: '#f2f2f7',
    textSecondary: '#a1a1a6',
    border: '#48484a',
    primary: '#6b97f0',
    onPrimary: '#0b0b0c',
    danger: '#ff6b6b',
    tag: '#2c2c2e',
    tagText: '#d1d1d6',
    summary: '#2c2c2e',
  },
};

export function getColors(scheme) {
  return scheme === 'dark' ? COLORS.dark : COLORS.light;
}
