import { View, TextInput, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AraProfile from '@/components/AraProfile';

interface StreamingConversationProps {
    chatId: string;
}

export default function StreamingConversation({ chatId }: StreamingConversationProps) {
    const flatListRef = useRef<FlatList>(null);

    const { messages, error, handleInputChange, input, handleSubmit } = useChat({
        fetch: expoFetch as unknown as typeof globalThis.fetch,
        api: generateAPIUrl('/api/chat'),
        onError: error => console.error(error, 'ERROR'),
        id: chatId,
        maxSteps: 5
    });

    if (error) return <Text>{error.message}</Text>;

    const formattedMessages = messages.map(m => ({
        id: m.id,
        text: m.content,
        toolInvocations: m.toolInvocations,
        isUser: m.role === 'user',
        timestamp: new Date(),
    }));

    const handleSend = (e: any) => {
        handleSubmit(e);
        e.preventDefault();
    };

    const renderMessageContent = (item: typeof formattedMessages[0]) => {
        if (item.toolInvocations?.length) {
            return (
                <View className="space-y-2">
                    {item.toolInvocations.map((tool, index) => {
                        // Handle both partial calls and results
                        const toolData = 'state' in tool ?
                            (tool.state === 'result' ? tool : null) :
                            tool;

                        if (!toolData) return null;

                        return (
                            <View key={index} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                                <Text className="text-sm font-medium text-gray-700">
                                    Tool Call
                                </Text>
                                <Text className="text-xs text-gray-500 mt-1">
                                    {JSON.stringify(toolData, null, 2)}
                                </Text>
                            </View>
                        );
                    })}
                    {item.text && (
                        <Text className={`text-base leading-5 ${item.isUser ? 'text-white' : 'text-gray-800'}`}>
                            {item.text}
                        </Text>
                    )}
                </View>
            );
        }

        return (
            <Text className={`text-base leading-5 ${item.isUser ? 'text-white' : 'text-gray-800'}`}>
                {item.text}
            </Text>
        );
    };

    return (
        <View className="flex-1">
            <FlatList
                ref={flatListRef}
                data={formattedMessages}
                renderItem={({ item }) => (
                    <View className={`flex-row mb-4 items-end ${item.isUser ? 'justify-end' : 'justify-start'}`}>
                        {!item.isUser && (
                            <View className="mr-2 mb-1">
                                <AraProfile />
                            </View>
                        )}
                        <View
                            className={`max-w-[75%] rounded-2xl p-3 
                                ${item.isUser
                                    ? 'bg-indigo-500 rounded-br-sm'
                                    : 'bg-gray-100 rounded-bl-sm'}`}
                        >
                            {renderMessageContent(item)}
                            <Text className="text-xs text-gray-400 mt-1 self-end">
                                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
                className="p-4"
                contentContainerStyle={{ gap: 16 }}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="flex-row p-3 border-t border-gray-200 bg-white items-center">
                    <TextInput
                        className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 pr-11 text-base text-gray-800 min-h-[40px] max-h-[120px]"
                        value={input}
                        onChangeText={(text) =>
                            handleInputChange({
                                target: { value: text },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }
                        placeholder="Message Ara..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        maxLength={1000}
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity
                        className={`absolute right-5 w-8 h-8 rounded-full justify-center items-center
                            ${input.trim() ? 'bg-indigo-500' : 'bg-gray-200'}`}
                        onPress={handleSend}
                        disabled={!input.trim()}
                    >
                        <Ionicons
                            name="send"
                            size={20}
                            color={input.trim() ? '#ffffff' : '#9ca3af'}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
} 