import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AraInput from '@/components/ui/AraInput';

const GlobalAraInput = () => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const isWeb = Platform.OS === 'web';
  const { width, height } = Dimensions.get('window');
  
  // Reset input when route changes
  useEffect(() => {
    setExpanded(false);
    Keyboard.dismiss();
  }, [pathname]);

  // Control visibility based on route
  useEffect(() => {
    // Determine if we should show the input on this screen
    const shouldShowInput = 
      !pathname.includes('/chat') && 
      !pathname.includes('/newchat');
    
    Animated.timing(opacityAnim, {
      toValue: shouldShowInput ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(shouldShowInput);
    });
  }, [pathname]);

  const handleSend = (message: string) => {
    console.log('Global message sent:', message);
    // Hide keyboard after sending
    Keyboard.dismiss();
    // Here you would trigger your chat logic
  };

  if (!visible) return null;

  // For web, we'll use a simpler positioning approach
  if (isWeb) {
    return (
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 10 }}>
        <View 
          style={{ 
            paddingBottom: insets.bottom + 70,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Animated.View
            style={[
              styles.container,
              { opacity: opacityAnim }
            ]}
          >
            <View style={styles.inputContainer}>
              <AraInput
                placeholder="Ask Ara anything..."
                onSend={handleSend}
                context="This chat appears on all screens"
                style={styles.input}
                expanded={expanded}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  // For native platforms, use KeyboardAvoidingView
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 10 }}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.bottom + 10}
        pointerEvents="box-none"
      >
        <View style={{ paddingBottom: insets.bottom + 20 }}>
          <Animated.View
            style={[
              styles.container,
              { opacity: opacityAnim }
            ]}
          >
            <View style={styles.inputContainer}>
              <AraInput
                placeholder="Ask Ara anything..."
                onSend={handleSend}
                context="This chat appears on all screens"
                style={styles.input}
                expanded={expanded}
              />
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  webPositioner: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  keyboardAvoidingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  container: {
    position: 'relative',
    zIndex: 1000,
    paddingHorizontal: 16,
    pointerEvents: 'box-none',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
  },
  input: {
    width: '100%',
  },
});

export default GlobalAraInput;