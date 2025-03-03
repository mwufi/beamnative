import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from "@/util/instant";
import { useRouter } from 'expo-router';

function App() {
    const { isLoading, user, error } = db.useAuth();
    const router = useRouter();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Uh oh! {error.message}</Text>
            </View>
        );
    }

    if (user) {
        router.replace('/');
        return null;
    }

    return <Login />;
}

function Main({ user }: { user: any }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Hello {user.email}!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => db.auth.signOut()}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function Login() {
    const [sentEmail, setSentEmail] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {!sentEmail ? (
                        <EmailStep onSendEmail={setSentEmail} />
                    ) : (
                        <CodeStep sentEmail={sentEmail} />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        onSendEmail(email);
        db.auth.sendMagicCode({ email }).catch((err) => {
            alert("Uh oh: " + err.body?.message);
            onSendEmail("");
        });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.header}>Let's log you in</Text>
            <Text style={styles.description}>
                Enter your email, and we'll send you a verification code. We'll create
                an account for you too if you don't already have one.
            </Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Send Code</Text>
            </TouchableOpacity>
        </View>
    );
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
    const [code, setCode] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        db.auth.signInWithMagicCode({ email: sentEmail, code })
            .then(() => {
                router.replace('/');
            })
            .catch((err) => {
                setCode('');
                alert("Uh oh: " + err.body?.message);
            });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.header}>Enter your code</Text>
            <Text style={styles.description}>
                We sent an email to <Text style={styles.bold}>{sentEmail}</Text>. Check your email, and
                paste the code you see.
            </Text>
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                placeholder="123456..."
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                autoComplete="one-time-code"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 24,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        color: '#1f2937',
    },
    button: {
        backgroundColor: '#6366f1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default App; 