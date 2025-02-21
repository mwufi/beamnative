import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const questions = [
  { id: 1, text: "Hi, how are you?" },
  { id: 2, text: "What is your name?" },
  { id: 3, text: "What inspired you to try Ara?" },
  { id: 4, text: "How old are you?" },
  { id: 5, text: "Have you used an AI before?" },
  { id: 6, text: "Let's customize your Ara" },
];

export default function HomeScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Onboarding complete, navigate to search
      router.push('/(tabs)/search');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.questionNumber}>
          {currentQuestion + 1} / {questions.length}
        </Text>

        <Text style={styles.questionText}>
          {questions[currentQuestion].text}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
