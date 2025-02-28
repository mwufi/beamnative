import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Animated, Pressable, StyleSheet, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Haptics } from '@/util/haptics';
import AraProfile from '@/components/AraProfile';

type AraInputProps = {
  placeholder?: string;
  onSend: (message: string) => void;
  expanded?: boolean;
  context?: string;
  showMic?: boolean;
  style?: any;
};

export default function AraInput({ 
  placeholder = "Message Ara...",
  onSend,
  expanded = false,
  context,
  showMic = true,
  style
}: AraInputProps) {
  const colorScheme = useColorScheme();
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(expanded);
  const inputRef = useRef<TextInput>(null);
  const animation = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const isWeb = Platform.OS === 'web';
  
  // Set up pulse animation
  useEffect(() => {
    // On web, use a different animation approach that doesn't conflict with transform animations
    if (isWeb) {
      // For web, use a simpler animation that doesn't use native driver
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          })
        ])
      );
      
      pulse.start();
      
      return () => {
        pulse.stop();
        pulseAnim.setValue(0);
      };
    } else {
      // For native platforms, use native driver
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          })
        ])
      );
      
      pulse.start();
      
      return () => {
        pulse.stop();
        pulseAnim.setValue(0);
      };
    }
  }, [isWeb]);
  
  // Handle keyboard dismiss
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // When keyboard is dismissed, collapse the input
        if (!expanded) {
          setIsExpanded(false);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [expanded]);

  // Expand/collapse animation
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded]);
  
  // Derived animated styles
  const containerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 120]
  });
  
  const inputOpacity = animation.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1]
  });
  
  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.8]
  });
  
  const handlePress = () => {
    if (!isExpanded) {
      Haptics.impact();
      setIsExpanded(true);
    }
  };
  
  const handleSend = () => {
    if (message.trim().length === 0) return;
    
    Haptics.impact();
    onSend(message);
    setMessage('');
    
    if (!expanded) {
      setIsExpanded(false);
    }
  };
  
  const handleMicPress = () => {
    Haptics.impact();
    // Voice recording would be implemented here
    console.log('Voice recording pressed');
  };
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { height: containerHeight, backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' },
        style
      ]}
    >
      {/* Gradient glow effect behind input */}
      <Animated.View style={[styles.glow, { opacity: isExpanded ? 0 : glowOpacity }]}>
        <LinearGradient
          colors={['rgba(79, 70, 229, 0.8)', 'rgba(147, 51, 234, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      
      {/* Main content */}
      <Pressable onPress={handlePress} style={styles.innerContainer}>
        {/* Top section - visible when collapsed or expanded */}
        <View style={styles.topSection}>
          <View style={styles.profileContainer}>
            <AraProfile size={36} />
          </View>
          
          <Animated.View 
            style={[
              styles.inputRow, 
              { opacity: isExpanded ? 1 : 0.9 }
            ]}
          >
            {!isExpanded ? (
              <ThemedText className="ml-2 flex-1 text-gray-500 dark:text-gray-400 font-medium">
                {placeholder}
              </ThemedText>
            ) : (
              <TextInput
                ref={inputRef}
                value={message}
                onChangeText={setMessage}
                placeholder={placeholder}
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                style={[
                  styles.input, 
                  { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }
                ]}
              />
            )}
            
            {isExpanded ? (
              <TouchableOpacity 
                onPress={handleSend}
                disabled={message.trim().length === 0}
                style={[
                  styles.sendButton,
                  { 
                    backgroundColor: message.trim().length > 0 
                      ? '#6366f1' 
                      : (colorScheme === 'dark' ? '#374151' : '#e5e7eb') 
                  }
                ]}
              >
                <Ionicons 
                  name="send" 
                  size={18} 
                  color={message.trim().length > 0 ? '#ffffff' : (colorScheme === 'dark' ? '#9ca3af' : '#6b7280')} 
                />
              </TouchableOpacity>
            ) : showMic ? (
              <TouchableOpacity 
                onPress={handleMicPress}
                style={[
                  styles.micButton,
                  { backgroundColor: colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.1)' }
                ]}
              >
                <Ionicons name="mic" size={20} color={colorScheme === 'dark' ? '#a5b4fc' : '#6366f1'} />
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        </View>
        
        {/* Context info - only visible when expanded */}
        {context && (
          <Animated.View 
            style={{ 
              opacity: inputOpacity,
              height: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 40]
              })
            }}
          >
            <View style={styles.contextContainer}>
              <Ionicons name="information-circle" size={16} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <ThemedText className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {context}
              </ThemedText>
            </View>
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  innerContainer: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 12,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  profileContainer: {
    width: 36,
    height: 36,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  }
});