import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type HomeScreenProps = {
  onNavigate: (tab: string) => void;
  onStartWorkout: (workoutName: string) => void;
};

export default function HomeScreen({ onNavigate, onStartWorkout }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Good morning 👋</Text>
            <Text style={styles.headerTitle}>Welcome to FitFlow</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="bell-outline" size={22} color="#111827" />
              <View style={styles.bellDot} />
            </TouchableOpacity>

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
        </View>

        {/* Promotional / Feature Banner */}
        <TouchableOpacity
          style={styles.promoBannerCard}
          activeOpacity={0.88}
          onPress={() => onNavigate('plan')}
        >
          <Image
            source={require('../../assets/images/banner.png')}
            style={styles.promoBannerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Hero Section: Today's Flow */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#EBF3FF', '#F4F0FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContentLeft}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{"TODAY'S FLOW"}</Text>
              </View>

              <Text style={styles.heroTitle}>Full Body Strength</Text>

              <View style={styles.heroTagsRow}>
                <View style={[styles.heroTag, { backgroundColor: '#FFF3BF' }]}>
                  <MaterialCommunityIcons name="lightning-bolt" size={14} color="#D97706" />
                  <Text style={[styles.heroTagText, { color: '#B45309' }]}>High Intensity</Text>
                </View>

                <View style={[styles.heroTag, { backgroundColor: '#E0F2FE' }]}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color="#0284C7" />
                  <Text style={[styles.heroTagText, { color: '#0369A1' }]}>30 min</Text>
                </View>
              </View>

              <Text style={styles.heroSubtitle}>
                Build strength, boost energy, and keep your momentum.
              </Text>

              <TouchableOpacity
                style={styles.startNowButton}
                activeOpacity={0.85}
                onPress={() => onStartWorkout('Full Body Strength')}
              >
                <LinearGradient
                  colors={['#2D8CFF', '#6C4CF5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.startNowGradient}
                >
                  <MaterialCommunityIcons name="play" size={18} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.startNowText}>Start Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.heroGraphicRight}>
              <View style={styles.heroGraphicCircle}>
                <MaterialCommunityIcons name="weight-lifter" size={54} color="#6C4CF5" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Today's Summary */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{"Today's Summary"}</Text>
            <View style={styles.keepItUpBadge}>
              <MaterialCommunityIcons name="weather-sunny" size={14} color="#D97706" />
              <Text style={styles.keepItUpText}>Keep it up!</Text>
            </View>
          </View>

          <View style={styles.summaryGrid}>
            {/* Active Time */}
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIconCircle, { backgroundColor: '#DCFCE7' }]}>
                <MaterialCommunityIcons name="run" size={20} color="#16A34A" />
              </View>
              <Text style={styles.summaryLabel}>Active Time</Text>
              <Text style={styles.summaryVal}>45 min</Text>
              <View style={styles.trendRow}>
                <MaterialCommunityIcons name="arrow-up-right" size={14} color="#16A34A" />
                <Text style={[styles.trendText, { color: '#16A34A' }]}>+12% vs. avg</Text>
              </View>
            </View>

            {/* Calories Burned */}
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIconCircle, { backgroundColor: '#FFEDD5' }]}>
                <MaterialCommunityIcons name="fire" size={20} color="#EA580C" />
              </View>
              <Text style={styles.summaryLabel}>Calories Burned</Text>
              <Text style={styles.summaryVal}>320 kcal</Text>
              <View style={styles.trendRow}>
                <MaterialCommunityIcons name="arrow-up-right" size={14} color="#16A34A" />
                <Text style={[styles.trendText, { color: '#16A34A' }]}>+8% vs. avg</Text>
              </View>
            </View>

            {/* Heart Rate */}
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIconCircle, { backgroundColor: '#FEE2E2' }]}>
                <MaterialCommunityIcons name="heart-pulse" size={20} color="#DC2626" />
              </View>
              <Text style={styles.summaryLabel}>Heart Rate Avg</Text>
              <Text style={styles.summaryVal}>145 bpm</Text>
              <View style={styles.trendRow}>
                <MaterialCommunityIcons name="arrow-down-right" size={14} color="#16A34A" />
                <Text style={[styles.trendText, { color: '#16A34A' }]}>-5% vs. avg</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <TouchableOpacity
              style={styles.linkHeaderRow}
              activeOpacity={0.7}
              onPress={() => onNavigate('stats')}
            >
              <Text style={styles.linkHeaderText}>This Week</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color="#6C4CF5" />
            </TouchableOpacity>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartBody}>
              {/* Y-Axis Labels */}
              <View style={styles.chartYAxis}>
                <Text style={styles.chartYText}>60m</Text>
                <Text style={styles.chartYText}>30m</Text>
                <Text style={styles.chartYText}>0m</Text>
              </View>

              {/* Bars */}
              <View style={styles.chartBarsContainer}>
                {/* Horizontal Guide Lines */}
                <View style={[styles.chartGridLine, { top: 0 }]} />
                <View style={[styles.chartGridLine, { top: '50%' }]} />
                <View style={[styles.chartGridLine, { bottom: 0 }]} />

                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '65%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>M</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '85%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>T</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '60%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>W</Text>
                </View>
                {/* Highlighted Thursday */}
                <View style={styles.barItem}>
                  <LinearGradient
                    colors={['#2D8CFF', '#6C4CF5']}
                    style={[styles.barFill, { height: '100%' }]}
                  />
                  <Text style={[styles.barLabel, { fontWeight: '800', color: '#6C4CF5' }]}>T</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '30%', backgroundColor: '#E5E7EB' }]} />
                  <Text style={styles.barLabel}>F</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '25%', backgroundColor: '#E5E7EB' }]} />
                  <Text style={styles.barLabel}>S</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '35%', backgroundColor: '#E5E7EB' }]} />
                  <Text style={styles.barLabel}>S</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Access Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.quickGrid}>
            {/* Workout */}
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.7}
              onPress={() => onNavigate('plan')}
            >
              <View style={[styles.quickIconCircle, { backgroundColor: '#EBF5FF' }]}>
                <MaterialCommunityIcons name="dumbbell" size={22} color="#2D8CFF" />
              </View>
              <View style={styles.quickTextContainer}>
                <Text style={styles.quickTitle}>Workout Plans</Text>
                <Text style={styles.quickSub}>Customized routines</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Nutrition */}
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.7}
              onPress={() => onNavigate('nutrition')}
            >
              <View style={[styles.quickIconCircle, { backgroundColor: '#DCFCE7' }]}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={22} color="#16A34A" />
              </View>
              <View style={styles.quickTextContainer}>
                <Text style={styles.quickTitle}>Nutrition</Text>
                <Text style={styles.quickSub}>Track your meals</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Progress */}
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.7}
              onPress={() => onNavigate('stats')}
            >
              <View style={[styles.quickIconCircle, { backgroundColor: '#F3E8FF' }]}>
                <MaterialCommunityIcons name="chart-box" size={22} color="#9333EA" />
              </View>
              <View style={styles.quickTextContainer}>
                <Text style={styles.quickTitle}>Progress</Text>
                <Text style={styles.quickSub}>See your stats</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Community */}
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.7}
              onPress={() => onNavigate('social')}
            >
              <View style={[styles.quickIconCircle, { backgroundColor: '#FFEDD5' }]}>
                <MaterialCommunityIcons name="account-group" size={22} color="#EA580C" />
              </View>
              <View style={styles.quickTextContainer}>
                <Text style={styles.quickTitle}>Community</Text>
                <Text style={styles.quickSub}>Connect & inspire</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Workout Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>

          <View style={styles.recCard}>
            <View style={styles.recLeft}>
              <View style={styles.recIconBadge}>
                <MaterialCommunityIcons name="human-handsup" size={26} color="#6C4CF5" />
              </View>
              <View style={{ marginLeft: 14 }}>
                <Text style={styles.recTitle}>Full Body Strength</Text>
                <Text style={styles.recMeta}>Beginner • 30 min • 280 kcal</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.recStartButton}
              activeOpacity={0.8}
              onPress={() => onStartWorkout('Full Body Strength (Beginner)')}
            >
              <Text style={styles.recStartText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  greetingText: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.4,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
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
  promoBannerCard: {
    width: '100%',
    aspectRatio: 1080 / 500,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#0B0F1A',
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  heroContentLeft: {
    flex: 1,
    paddingRight: 8,
  },
  heroBadge: {
    backgroundColor: '#E0E7FF',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D8CFF',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  heroTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 6,
  },
  heroTagText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 16,
  },
  startNowButton: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  startNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  startNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  heroGraphicRight: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGraphicCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  keepItUpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  keepItUpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  summaryVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  linkHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C4CF5',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  chartBody: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
  },
  chartYAxis: {
    height: '100%',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingBottom: 20,
  },
  chartYText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  chartBarsContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    paddingBottom: 20,
  },
  chartGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: 14,
    borderRadius: 7,
    marginBottom: 6,
  },
  barLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    position: 'absolute',
    bottom: -18,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  quickSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  recCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  recMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  recStartButton: {
    backgroundColor: '#6C4CF5',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  recStartText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
