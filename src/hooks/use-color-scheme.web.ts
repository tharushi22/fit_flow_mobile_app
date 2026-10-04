import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Hook to get the color scheme. For web, we directly return the RN color scheme.
 */
export function useColorScheme() {
  return useRNColorScheme();
}
