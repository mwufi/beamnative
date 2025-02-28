import { Platform } from 'react-native';
import * as ExpoHaptics from 'expo-haptics';

// Safe haptics utility that doesn't break on web
export const Haptics = {
  impact: (style: ExpoHaptics.ImpactFeedbackStyle = ExpoHaptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== 'web') {
      ExpoHaptics.impactAsync(style).catch(() => {
        // Silently fail if haptics are not available
      });
    }
  },
  
  selection: () => {
    if (Platform.OS !== 'web') {
      ExpoHaptics.selectionAsync().catch(() => {
        // Silently fail if haptics are not available
      });
    }
  },
  
  notification: (type: ExpoHaptics.NotificationFeedbackType = ExpoHaptics.NotificationFeedbackType.Success) => {
    if (Platform.OS !== 'web') {
      ExpoHaptics.notificationAsync(type).catch(() => {
        // Silently fail if haptics are not available
      });
    }
  }
};