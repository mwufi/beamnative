import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export interface Attachment {
    id: string;
    type: 'image' | 'file';
    uri: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
}

interface AttachmentPreviewProps {
    attachments: Attachment[];
    onRemoveAttachment: (id: string) => void;
    onClearAllAttachments: () => void;
    formatFileSize: (bytes?: number) => string;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
    attachments,
    onRemoveAttachment,
    onClearAllAttachments,
    formatFileSize
}) => {
    if (attachments.length === 0) return null;

    return (
        <BlurView intensity={20} tint="dark" style={styles.attachmentPreviewContainer}>
            {attachments.length > 1 && (
                <View style={styles.attachmentActions}>
                    <View style={styles.attachmentCountBadge}>
                        <Text style={styles.attachmentCountText}>
                            {attachments.length} files
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.clearAllButton}
                        onPress={onClearAllAttachments}
                    >
                        <Text style={styles.clearAllText}>Clear all</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.attachmentsScrollContent,
                    attachments.length > 1 ? { paddingTop: 40 } : {}
                ]}
            >
                {attachments.map(attachment => (
                    <View key={attachment.id} style={styles.attachmentPreview}>
                        {attachment.type === 'image' ? (
                            <>
                                <Image
                                    source={{ uri: attachment.uri }}
                                    style={styles.attachmentThumbnail}
                                />
                                <Text style={styles.attachmentText}>Image</Text>
                            </>
                        ) : (
                            <>
                                <Ionicons name="document" size={24} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.attachmentText} numberOfLines={1}>
                                    {attachment.fileName}
                                </Text>
                                <Text style={styles.attachmentSize}>
                                    {formatFileSize(attachment.fileSize)}
                                </Text>
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.removeAttachmentButton}
                            onPress={() => onRemoveAttachment(attachment.id)}
                        >
                            <Ionicons name="close-circle" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    attachmentPreviewContainer: {
        width: '100%',
        padding: 8,
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    attachmentsScrollContent: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    attachmentPreview: {
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        padding: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
        minWidth: 120,
        maxWidth: 200,
    },
    attachmentThumbnail: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    attachmentText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        marginRight: 8,
    },
    attachmentSize: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        marginRight: 8,
    },
    removeAttachmentButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachmentActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 8,
        right: 12,
        left: 12,
        zIndex: 1,
    },
    attachmentCountBadge: {
        backgroundColor: '#8e44ad',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    attachmentCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    clearAllButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    clearAllText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default AttachmentPreview; 