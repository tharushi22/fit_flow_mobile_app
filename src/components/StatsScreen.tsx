import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type StatsScreenProps = {
  onNavigate: (tab: string) => void;
};

export default function StatsScreen({ onNavigate }: StatsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Progress Tracking</Text>
            <Text style={styles.headerSub}>Track your journey. Celebrate your progress.</Text>
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

        {/* Activity Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Activity</Text>

          <View style={styles.activityCard}>
            <View style={styles.activityTopRow}>
              <View>
                <Text style={styles.thisWeekLabel}>THIS WEEK</Text>
                <Text style={styles.activityHoursVal}>4.2 hrs</Text>
              </View>
              <View style={styles.trendBadge}>
                <MaterialCommunityIcons name="arrow-up-right" size={14} color="#16A34A" />
                <Text style={styles.trendBadgeText}>+12% from last week</Text>
              </View>
            </View>

            {/* 7-Day Bar Chart */}
            <View style={styles.chartBody}>
              <View style={styles.chartYAxis}>
                <Text style={styles.chartYText}>60m</Text>
                <Text style={styles.chartYText}>30m</Text>
                <Text style={styles.chartYText}>0m</Text>
              </View>

              <View style={styles.chartBarsContainer}>
                <View style={[styles.chartGridLine, { top: 0 }]} />
                <View style={[styles.chartGridLine, { top: '50%' }]} />
                <View style={[styles.chartGridLine, { bottom: 0 }]} />

                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '65%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>M</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '85%', backgroundColor: '#2D8CFF' }]} />
                  <Text style={styles.barLabel}>T</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '60%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>W</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '30%', backgroundColor: '#E5E7EB' }]} />
                  <Text style={styles.barLabel}>T</Text>
                </View>
                <View style={styles.barItem}>
                  <LinearGradient
                    colors={['#2D8CFF', '#6C4CF5']}
                    style={[styles.barFill, { height: '100%' }]}
                  />
                  <Text style={[styles.barLabel, { fontWeight: '800', color: '#6C4CF5' }]}>F</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '25%', backgroundColor: '#E5E7EB' }]} />
                  <Text style={styles.barLabel}>S</Text>
                </View>
                <View style={styles.barItem}>
                  <View style={[styles.barFill, { height: '55%', backgroundColor: '#60A5FA' }]} />
                  <Text style={styles.barLabel}>S</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Current Streak Card */}
        <View style={styles.streakCardContainer}>
          <LinearGradient
            colors={['#0F172A', '#1E1B4B', '#312E81']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.streakGradient}
          >
            <View style={styles.streakLeft}>
              <Text style={styles.streakTag}>CURRENT STREAK</Text>
              <Text style={styles.streakTitle}>7 Days</Text>
            </View>

            <View style={styles.streakFireCircle}>
              <MaterialCommunityIcons name="fire" size={36} color="#F97316" />
            </View>
          </LinearGradient>
        </View>

        {/* Recent Workouts */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All ›</Text>
            </TouchableOpacity>
          </View>

          {/* Item 1 */}
          <TouchableOpacity style={styles.workoutRow} activeOpacity={0.7}>
            <View style={styles.workoutLeft}>
              <View style={[styles.workoutIconCircle, { backgroundColor: '#DCFCE7' }]}>
                <MaterialCommunityIcons name="run" size={22} color="#16A34A" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.workoutName}>Morning Run</Text>
                <Text style={styles.workoutSub}>Today • 45 min</Text>
              </View>
            </View>
            <View style={styles.workoutRight}>
              <Text style={styles.workoutStat}>4.2 mi</Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Item 2 */}
          <TouchableOpacity style={styles.workoutRow} activeOpacity={0.7}>
            <View style={styles.workoutLeft}>
              <View style={[styles.workoutIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <MaterialCommunityIcons name="dumbbell" size={22} color="#0284C7" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.workoutName}>Upper Body Strength</Text>
                <Text style={styles.workoutSub}>Yesterday • 60 min</Text>
              </View>
            </View>
            <View style={styles.workoutRight}>
              <Text style={styles.workoutStat}>320 cal</Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Item 3 */}
          <TouchableOpacity style={styles.workoutRow} activeOpacity={0.7}>
            <View style={styles.workoutLeft}>
              <View style={[styles.workoutIconCircle, { backgroundColor: '#F3E8FF' }]}>
                <MaterialCommunityIcons name="yoga" size={22} color="#9333EA" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.workoutName}>Recovery Yoga</Text>
                <Text style={styles.workoutSub}>Tue • 30 min</Text>
              </View>
            </View>
            <View style={styles.workoutRight}>
              <Text style={styles.workoutStat}>150 cal</Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Milestones */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Milestones</Text>

          <View style={styles.milestonesGrid}>
            {/* 10k Steps */}
            <View style={styles.milestoneCard}>
              <View style={styles.milestoneIconCircle}>
                <MaterialCommunityIcons name="shoe-print" size={22} color="#16A34A" />
              </View>
              <Text style={styles.milestoneName}>10k Steps</Text>
              <Text style={styles.milestoneSub}>Hit daily goal</Text>
              <View style={styles.milestoneProgressBg}>
                <View style={[styles.milestoneProgressFill, { width: '100%', backgroundColor: '#16A34A' }]} />
              </View>
            </View>

            {/* Level Up */}
            <View style={styles.milestoneCard}>
              <View style={[styles.milestoneIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <MaterialCommunityIcons name="trophy" size={22} color="#0284C7" />
              </View>
              <Text style={styles.milestoneName}>Level Up</Text>
              <Text style={styles.milestoneSub}>Rank: Intermediate</Text>
              <View style={styles.milestoneProgressBg}>
                <View style={[styles.milestoneProgressFill, { width: '70%', backgroundColor: '#0284C7' }]} />
              </View>
            </View>
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activityTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  thisWeekLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D8CFF',
    letterSpacing: 0.6,
  },
  activityHoursVal: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  trendBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
    marginLeft: 4,
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
  streakCardContainer: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  streakGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  streakLeft: {
    flex: 1,
  },
  streakTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  streakTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  streakFireCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D8CFF',
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  workoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  workoutSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  workoutRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStat: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginRight: 6,
  },
  milestonesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  milestoneIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  milestoneSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 10,
  },
  milestoneProgressBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  milestoneProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
