import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type WhatsNewModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function WhatsNewModal({ visible, onClose }: WhatsNewModalProps) {
  const features = [
    {
      icon: 'target',
      title: 'Personalized Workout Planning',
      desc: 'Customized workout routines tailored precisely to your goals, duration, and intensity level.',
    },
    {
      icon: 'silverware-fork-knife',
      title: 'Nutrition & Water Tracking',
      desc: 'Effortlessly log meals, monitor macro targets (Protein, Carbs, Fats), and log daily water intake.',
    },
    {
      icon: 'chart-line',
      title: 'Progress Tracking & Analytics',
      desc: 'Interactive 7-day progress charts, active workout streak counters, and health metrics.',
    },
    {
      icon: 'account-group',
      title: 'Community & Social Features',
      desc: 'Connect with active members, give kudos, comment on activities, and check weekly leaderboards.',
    },
    {
      icon: 'cellphone-check',
      title: 'Improved Navigation & Onboarding',
      desc: 'Clean 3-step onboarding flow with instant bottom navigation across all core app screens.',
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Release Notes</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Top Icon */}
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="star-shooting-outline" size={36} color="#6C4CF5" />
          </View>

          <Text style={styles.title}>{"What's New in FitFlow"}</Text>
          <Text style={styles.sub}>Version 1.0.0 Release Notes</Text>

          {/* Features List */}
          {features.map((item, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={styles.featureIconCircle}>
                <MaterialCommunityIcons name={item.icon as any} size={22} color="#6C4CF5" />
              </View>
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}

          {/* Primary Action Button */}
          <TouchableOpacity style={styles.primaryButtonWrapper} activeOpacity={0.85} onPress={onClose}>
            <LinearGradient colors={['#6C4CF5', '#2D8CFF']} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Done</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  sub: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  featureCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  featureIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  featureDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 16,
  },
  primaryButtonWrapper: {
    width: '100%',
    borderRadius: 26,
    overflow: 'hidden',
    marginTop: 12,
  },
  primaryButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
