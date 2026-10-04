import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CommentsModal, { Comment, Post } from './CommentsModal';

type SocialScreenProps = {
  onNavigate: (tab: string) => void;
};

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    avatar: 'SJ',
    avatarColor: '#6C4CF5',
    time: '2 hours ago',
    title: 'Just completed Morning Hiit Workout! 🔥',
    stats: '45 mins • 420 kcal burned',
    likes: 24,
    comments: 2,
  },
  {
    id: '2',
    author: 'Alex Rivera',
    avatar: 'AR',
    avatarColor: '#2D8CFF',
    time: '5 hours ago',
    title: 'Hit a new Personal Record on Deadlifts: 140kg! 💪',
    stats: 'Hypertrophy Day 4',
    likes: 42,
    comments: 2,
  },
  {
    id: '3',
    author: 'Elena Rostova',
    avatar: 'ER',
    avatarColor: '#16A34A',
    time: '1 day ago',
    title: '30-Day Fitness Streak achieved with FitFlow! 🏆',
    stats: '30 Days Consecutive',
    likes: 89,
    comments: 2,
  },
];

const INITIAL_COMMENTS: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      author: 'Marcus Vance',
      avatar: 'MV',
      avatarColor: '#10B981',
      text: 'Great job! Keep going 🔥',
      time: '1 hour ago',
    },
    {
      id: 'c2',
      author: 'Emma Watson',
      avatar: 'EW',
      avatarColor: '#F59E0B',
      text: 'Nice progress!',
      time: '30 mins ago',
    },
  ],
  '2': [
    {
      id: 'c3',
      author: 'David Kim',
      avatar: 'DK',
      avatarColor: '#8B5CF6',
      text: 'That workout looks intense 💪',
      time: '3 hours ago',
    },
    {
      id: 'c4',
      author: 'Sophia Lee',
      avatar: 'SL',
      avatarColor: '#EC4899',
      text: 'Inspiring numbers! Keep it up.',
      time: '2 hours ago',
    },
  ],
  '3': [
    {
      id: 'c5',
      author: 'Liam Turner',
      avatar: 'LT',
      avatarColor: '#3B82F6',
      text: 'Awesome consistency! 🔥',
      time: '5 hours ago',
    },
    {
      id: 'c6',
      author: 'Chloe Bennett',
      avatar: 'CB',
      avatarColor: '#10B981',
      text: 'Goals! 30 days is amazing.',
      time: '4 hours ago',
    },
  ],
};

export default function SocialScreen({ onNavigate }: SocialScreenProps) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(INITIAL_COMMENTS);
  const [activePostForComments, setActivePostForComments] = useState<Post | null>(null);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenComments = (post: Post) => {
    setActivePostForComments(post);
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YOU',
      avatarColor: '#6C4CF5',
      text,
      time: 'Just now',
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    );

    setActivePostForComments((prev) =>
      prev && prev.id === postId ? { ...prev, comments: prev.comments + 1 } : prev
    );
  };

  const handleShare = async (post: Post) => {
    try {
      await Share.share({
        message: `${post.author} completed "${post.title}" on FitFlow! 🔥`,
      });
    } catch {
      // User cancelled or share failed silently
    }
  };

  const handlePostMenu = (post: Post) => {
    Alert.alert('Post Options', `Choose an action for ${post.author}'s post:`, [
      {
        text: 'Save Post',
        onPress: () => Alert.alert('Saved', 'Post saved to your bookmarks.'),
      },
      {
        text: 'Report Post',
        onPress: () =>
          Alert.alert('Reported', 'Thank you for reporting. Our moderation team will review this.'),
        style: 'destructive',
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>FitFlow Community</Text>
            <Text style={styles.headerSub}>Connect, share & celebrate milestones</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.8}
            onPress={() => onNavigate('more')}
          >
            <View style={styles.avatarLogoCircle}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.avatarLogoImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Community Leaderboard Card */}
        <View style={styles.leaderboardCard}>
          <LinearGradient
            colors={['#6C4CF5', '#4C25ED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.leaderGradient}
          >
            <View style={styles.leaderLeft}>
              <View style={styles.leaderBadge}>
                <Text style={styles.leaderBadgeText}>WEEKLY LEADERBOARD</Text>
              </View>
              <Text style={styles.leaderTitle}>You are Ranked #4</Text>
              <Text style={styles.leaderSub}>Only 120 points behind #3! Keep pushing.</Text>
            </View>

            <TouchableOpacity style={styles.viewRankBtn} activeOpacity={0.8}>
              <Text style={styles.viewRankTxt}>View Rank</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Posts Feed */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          {posts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            return (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={[styles.avatarCircle, { backgroundColor: post.avatarColor }]}>
                    <Text style={styles.avatarTxt}>{post.avatar}</Text>
                  </View>
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.authorName}>{post.author}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => handlePostMenu(post)}>
                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.postContentTitle}>{post.title}</Text>

                <View style={styles.statsBadge}>
                  <MaterialCommunityIcons name="lightning-bolt" size={14} color="#6C4CF5" />
                  <Text style={styles.statsBadgeTxt}>{post.stats}</Text>
                </View>

                <View style={styles.postDivider} />

                <View style={styles.postFooterActions}>
                  <TouchableOpacity
                    style={styles.actionItem}
                    activeOpacity={0.7}
                    onPress={() => toggleLike(post.id)}
                  >
                    <MaterialCommunityIcons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={20}
                      color={isLiked ? '#EF4444' : '#6B7280'}
                    />
                    <Text style={[styles.actionTxt, isLiked && { color: '#EF4444', fontWeight: '700' }]}>
                      {post.likes + (isLiked ? 1 : 0)} Kudos
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionItem}
                    activeOpacity={0.7}
                    onPress={() => handleOpenComments(post)}
                  >
                    <MaterialCommunityIcons name="comment-outline" size={20} color="#6B7280" />
                    <Text style={styles.actionTxt}>{post.comments} Comments</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionItem}
                    activeOpacity={0.7}
                    onPress={() => handleShare(post)}
                  >
                    <MaterialCommunityIcons name="share-variant-outline" size={20} color="#6B7280" />
                    <Text style={styles.actionTxt}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Comments Modal */}
      <CommentsModal
        visible={!!activePostForComments}
        post={activePostForComments}
        commentsList={activePostForComments ? commentsMap[activePostForComments.id] || [] : []}
        onClose={() => setActivePostForComments(null)}
        onAddComment={handleAddComment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  avatarLogoImage: {
    width: 32,
    height: 32,
  },
  leaderboardCard: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  leaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  leaderLeft: {
    flex: 1,
    paddingRight: 10,
  },
  leaderBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 6,
  },
  leaderBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  leaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  leaderSub: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 2,
  },
  viewRankBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  viewRankTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C4CF5',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  postTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  postContentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 8,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE9FF',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  statsBadgeTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C4CF5',
    marginLeft: 4,
  },
  postDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  postFooterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionTxt: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 6,
  },
});
