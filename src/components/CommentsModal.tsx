import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Comment = {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  text: string;
  time: string;
};

export type Post = {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  time: string;
  title: string;
  stats: string;
  likes: number;
  comments: number;
};

type CommentsModalProps = {
  visible: boolean;
  post: Post | null;
  commentsList: Comment[];
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
};

export default function CommentsModal({
  visible,
  post,
  commentsList,
  onClose,
  onAddComment,
}: CommentsModalProps) {
  const [inputText, setInputText] = useState('');

  if (!post) return null;

  const handlePost = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onAddComment(post.id, trimmed);
    setInputText('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdropTouch} activeOpacity={1} onPress={onClose} />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          <View style={styles.sheetContainer}>
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Comments</Text>
                <Text style={styles.headerSubtitle}>{commentsList.length} comments on this post</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
                <MaterialCommunityIcons name="close" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Selected Post Summary */}
            <View style={styles.postSummaryCard}>
              <View style={styles.summaryHeader}>
                <View style={[styles.avatarCircleSmall, { backgroundColor: post.avatarColor }]}>
                  <Text style={styles.avatarTxtSmall}>{post.avatar}</Text>
                </View>
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={styles.summaryAuthor}>{post.author}</Text>
                  <Text style={styles.summaryTime}>{post.time}</Text>
                </View>
              </View>
              <Text style={styles.summaryTitle} numberOfLines={2}>
                {post.title}
              </Text>
            </View>

            {/* Comments List */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.commentsListContent}
              keyboardShouldPersistTaps="handled"
            >
              {commentsList.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="comment-outline" size={36} color="#9CA3AF" />
                  <Text style={styles.emptyTxt}>No comments yet. Be the first to comment!</Text>
                </View>
              ) : (
                commentsList.map((item) => (
                  <View key={item.id} style={styles.commentItem}>
                    <View style={[styles.commentAvatar, { backgroundColor: item.avatarColor }]}>
                      <Text style={styles.commentAvatarTxt}>{item.avatar}</Text>
                    </View>
                    <View style={styles.commentBubble}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentAuthor}>{item.author}</Text>
                        <Text style={styles.commentTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Write Comment Bar */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Write a comment..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={handlePost}
              />
              <TouchableOpacity
                style={[
                  styles.postButton,
                  !inputText.trim() && styles.postButtonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handlePost}
                disabled={!inputText.trim()}
              >
                <Text style={styles.postButtonTxt}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  keyboardContainer: {
    maxHeight: '85%',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    maxHeight: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postSummaryCard: {
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEF2FF',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarCircleSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxtSmall: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  summaryAuthor: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  summaryTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  commentsListContent: {
    paddingVertical: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyTxt: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 8,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  commentAvatarTxt: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  commentTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#6C4CF5',
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#C7D2FE',
  },
  postButtonTxt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
