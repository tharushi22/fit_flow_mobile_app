import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Step = {
  id: number;
  badge: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 0,
    badge: 'SMART FITNESS COMPANION',
    title: 'Welcome to FitFlow',
    description: 'Your personal fitness companion designed for real, sustainable results.',
  },
  {
    id: 1,
    badge: 'SMART TRAINING',
    title: 'Personalized Workouts',
    description: 'Custom workout routines built precisely around your fitness level and goals.',
  },
  {
    id: 2,
    badge: 'STAY MOTIVATED',
    title: 'Track Nutrition & Progress',
    description: 'Effortlessly log meals, track calories, monitor milestones, and thrive with our active community.',
  },
];

export default function OnboardingFlow({ onFinish }: { onFinish: () => void }) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const step = steps[current];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.brandHeader}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.miniLogoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandHeaderText}>FitFlow</Text>
        </View>

        {current < steps.length - 1 ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipHeaderButton} activeOpacity={0.7}>
            <Text style={styles.skipHeaderText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Main Visual Illustration Area */}
      <View style={styles.visualContainer}>
        {/* Onboarding Screen 1: Welcome */}
        {current === 0 && (
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#EEE9FF', '#F8FAFF']}
              style={styles.heroGradientCircle}
            >
              <View style={styles.heroLogoBadge}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.heroLogoImage}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Onboarding Screen 2: Personalized Workouts */}
        {current === 1 && (
          <View style={styles.cardContainer}>
            <View style={styles.workoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.iconCircleSmall}>
                  <MaterialCommunityIcons name="run-fast" size={24} color="#6C4CF5" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.cardTitleText}>{"Today's Routine"}</Text>
                  <Text style={styles.cardSubText}>Hypertrophy & Core</Text>
                </View>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagBadgeText}>45 Mins</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="fire" size={20} color="#FF6B6B" />
                  <Text style={styles.statVal}>480 kcal</Text>
                  <Text style={styles.statLbl}>Burn Target</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="weight-lifter" size={20} color="#6C4CF5" />
                  <Text style={styles.statVal}>6 Sets</Text>
                  <Text style={styles.statLbl}>Intensity</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="lightning-bolt" size={20} color="#2D8CFF" />
                  <Text style={styles.statVal}>98%</Text>
                  <Text style={styles.statLbl}>Goal Match</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Onboarding Screen 3: Nutrition & Progress */}
        {current === 2 && (
          <View style={styles.cardContainer}>
            <View style={styles.workoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.iconCircleSmall, { backgroundColor: '#DCFCE7' }]}>
                  <MaterialCommunityIcons name="food-apple" size={24} color="#16A34A" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.cardTitleText}>Nutrition & Metrics</Text>
                  <Text style={styles.cardSubText}>Daily Target: 2,200 kcal</Text>
                </View>
                <View style={[styles.tagBadge, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={[styles.tagBadgeText, { color: '#16A34A' }]}>Balanced</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.macroPillsContainer}>
                {/* Protein Bar */}
                <View style={styles.macroPillCard}>
                  <View style={styles.macroPillHeader}>
                    <View style={[styles.macroPillDot, { backgroundColor: '#6C4CF5' }]} />
                    <Text style={styles.macroPillTitle}>Protein Goal (140g)</Text>
                    <Text style={styles.macroPillPercent}>85%</Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: '85%', backgroundColor: '#6C4CF5' }]} />
                  </View>
                </View>

                {/* Community Streak Badge */}
                <View style={styles.communityBox}>
                  <View style={styles.avatarRow}>
                    <View style={[styles.miniAvatar, { backgroundColor: '#6C4CF5' }]}>
                      <Text style={styles.avatarTxt}>JD</Text>
                    </View>
                    <View style={[styles.miniAvatar, { backgroundColor: '#2D8CFF', marginLeft: -8 }]}>
                      <Text style={styles.avatarTxt}>AK</Text>
                    </View>
                    <View style={[styles.miniAvatar, { backgroundColor: '#20C997', marginLeft: -8 }]}>
                      <Text style={styles.avatarTxt}>MR</Text>
                    </View>
                    <Text style={styles.communityTxt}>+ 2,400 members active today</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Description & Text Info */}
      <View style={styles.textSection}>
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>{step.badge}</Text>
        </View>

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>

      {/* Pagination & Footer CTA */}
      <View style={styles.footer}>
        {/* Progress Indicator Dots */}
        <View style={styles.progressContainer}>
          {steps.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === current ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={styles.primaryButtonWrapper}
        >
          <LinearGradient
            colors={['#6C4CF5', '#4C25ED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {current === steps.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <MaterialCommunityIcons
              name={current === steps.length - 1 ? 'rocket-launch' : 'arrow-right'}
              size={20}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    height: 56,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniLogoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  brandHeaderText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  skipHeaderButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#EEE9FF',
  },
  skipHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C4CF5',
  },
  visualContainer: {
    height: width * 0.72,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroGradientCircle: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogoBadge: {
    width: 130,
    height: 130,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    shadowColor: '#0C2340',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  heroLogoImage: {
    width: '100%',
    height: '100%',
  },
  workoutCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EEE9FF',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubText: {
    fontSize: 13,
    color: '#667085',
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#EEE9FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C4CF5',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  statLbl: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  macroPillsContainer: {
    marginTop: 4,
  },
  macroPillCard: {
    marginBottom: 10,
  },
  macroPillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  macroPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  macroPillTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  macroPillPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  progressBg: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  communityBox: {
    marginTop: 12,
    backgroundColor: '#F8FAFF',
    borderRadius: 14,
    padding: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarTxt: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  communityTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667085',
    marginLeft: 10,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginVertical: 12,
  },
  badgePill: {
    backgroundColor: '#EEE9FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C4CF5',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#667085',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#6C4CF5',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#E5E7EB',
  },
  primaryButtonWrapper: {
    borderRadius: 30,
    shadowColor: '#6C4CF5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
