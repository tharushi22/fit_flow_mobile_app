import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EditExerciseModal from './EditExerciseModal';

type PlanScreenProps = {
  onNavigate: (tab: string) => void;
  onStartWorkout: (title: string) => void;
};

type ExerciseItem = {
  id: string;
  name: string;
  detail: string;
  icon: string;
};

export default function PlanScreen({ onNavigate, onStartWorkout }: PlanScreenProps) {
  const [goal, setGoal] = useState<'muscle' | 'cardio' | 'flexibility'>('muscle');
  const [duration, setDuration] = useState<'15m' | '30m' | '45m'>('30m');
  const [intensity, setIntensity] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [editingExercise, setEditingExercise] = useState<ExerciseItem | null>(null);

  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { id: '1', name: 'Push-ups', detail: '3 sets x 12 reps', icon: 'human-handsdown' },
    { id: '2', name: 'Dumbbell Rows', detail: '3 sets x 10 reps', icon: 'dumbbell' },
    { id: '3', name: 'Plank', detail: '3 sets x 45s', icon: 'yoga' },
  ]);

  const handleReplaceExercise = (id: string) => {
    const replacements: ExerciseItem[] = [
      { id: 'r1', name: 'Incline Bench Press', detail: '3 sets x 10 reps', icon: 'weight-lifter' },
      { id: 'r2', name: 'Pull-ups', detail: '3 sets x 8 reps', icon: 'human-handsup' },
      { id: 'r3', name: 'Mountain Climbers', detail: '3 sets x 30s', icon: 'run-fast' },
      { id: 'r4', name: 'Bodyweight Squats', detail: '3 sets x 15 reps', icon: 'human-female' },
    ];
    setExercises((prev) =>
      prev.map((ex, idx) => {
        if (ex.id === id) {
          const replacement = replacements[(idx + prev.length) % replacements.length];
          return { ...ex, name: replacement.name, detail: replacement.detail, icon: replacement.icon };
        }
        return ex;
      })
    );
  };

  const handleSaveExercise = (id: string, newName: string, newDetail: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, name: newName, detail: newDetail } : ex))
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Smart Workout Planner</Text>
            <Text style={styles.headerSub}>Get a personalized workout tailored to your goals.</Text>
          </View>

          {/* Profile Avatar Button -> Navigates to More screen */}
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

        {/* 1. Select Goal */}
        <View style={styles.section}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>1. Select Goal</Text>
            <Text style={styles.stepHint}>Choose what you want to focus on.</Text>
          </View>

          <View style={styles.goalsRow}>
            {/* Muscle */}
            <TouchableOpacity
              style={[styles.goalCard, goal === 'muscle' && styles.goalCardSelected]}
              activeOpacity={0.8}
              onPress={() => setGoal('muscle')}
            >
              {goal === 'muscle' && (
                <View style={styles.checkBadge}>
                  <MaterialCommunityIcons name="check" size={12} color="#FFF" />
                </View>
              )}
              <View style={[styles.goalIconCircle, goal === 'muscle' && styles.goalIconSelected]}>
                <MaterialCommunityIcons name="dumbbell" size={24} color={goal === 'muscle' ? '#2D8CFF' : '#6B7280'} />
              </View>
              <Text style={styles.goalName}>Muscle</Text>
              <Text style={styles.goalSub}>Build strength</Text>
            </TouchableOpacity>

            {/* Cardio */}
            <TouchableOpacity
              style={[styles.goalCard, goal === 'cardio' && styles.goalCardSelected]}
              activeOpacity={0.8}
              onPress={() => setGoal('cardio')}
            >
              {goal === 'cardio' && (
                <View style={styles.checkBadge}>
                  <MaterialCommunityIcons name="check" size={12} color="#FFF" />
                </View>
              )}
              <View style={[styles.goalIconCircle, goal === 'cardio' && styles.goalIconSelected]}>
                <MaterialCommunityIcons name="run" size={24} color={goal === 'cardio' ? '#2D8CFF' : '#6B7280'} />
              </View>
              <Text style={styles.goalName}>Cardio</Text>
              <Text style={styles.goalSub}>Boost endurance</Text>
            </TouchableOpacity>

            {/* Flexibility */}
            <TouchableOpacity
              style={[styles.goalCard, goal === 'flexibility' && styles.goalCardSelected]}
              activeOpacity={0.8}
              onPress={() => setGoal('flexibility')}
            >
              {goal === 'flexibility' && (
                <View style={styles.checkBadge}>
                  <MaterialCommunityIcons name="check" size={12} color="#FFF" />
                </View>
              )}
              <View style={[styles.goalIconCircle, goal === 'flexibility' && styles.goalIconSelected]}>
                <MaterialCommunityIcons name="human-handsup" size={24} color={goal === 'flexibility' ? '#2D8CFF' : '#6B7280'} />
              </View>
              <Text style={styles.goalName}>Flexibility</Text>
              <Text style={styles.goalSub}>Move better</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Duration */}
        <View style={styles.section}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>2. Duration</Text>
            <Text style={styles.stepHint}>How long do you want to work out?</Text>
          </View>

          <View style={styles.durationRow}>
            {(['15m', '30m', '45m'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.durationPill, duration === item && styles.durationPillSelected]}
                activeOpacity={0.8}
                onPress={() => setDuration(item)}
              >
                <Text style={[styles.durationText, duration === item && styles.durationTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. Intensity Level */}
        <View style={styles.section}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>3. Intensity Level</Text>
            <Text style={styles.stepHint}>Match it to your fitness level.</Text>
          </View>

          <View style={styles.intensityRow}>
            {(['beginner', 'intermediate', 'advanced'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.intensityPill, intensity === item && styles.intensityPillSelected]}
                activeOpacity={0.8}
                onPress={() => setIntensity(item)}
              >
                <Text style={[styles.intensityText, intensity === item && styles.intensityTextSelected]}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generated Plan Preview */}
        <View style={styles.previewSection}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.previewTitle}>Generated Plan Preview</Text>
              <Text style={styles.previewSub}>Based on your goal ({goal}) & duration ({duration}).</Text>
            </View>
            <View style={styles.aiBadge}>
              <MaterialCommunityIcons name="lightning-bolt" size={14} color="#6C4CF5" />
              <Text style={styles.aiBadgeText}>Personalized</Text>
            </View>
          </View>

          {/* Exercise Items */}
          {exercises.map((ex) => (
            <View key={ex.id} style={styles.exerciseCard}>
              <View style={styles.exerciseLeft}>
                <View style={styles.exerciseIconBg}>
                  <MaterialCommunityIcons name={ex.icon as any} size={24} color="#2D8CFF" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.exerciseDetail}>{ex.detail}</Text>
                </View>
              </View>

              <View style={styles.exerciseActions}>
                {/* Interactive Edit Action */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  activeOpacity={0.7}
                  onPress={() => setEditingExercise(ex)}
                >
                  <MaterialCommunityIcons name="pencil-outline" size={14} color="#4B5563" />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>

                {/* Replace Action */}
                <TouchableOpacity
                  style={[styles.actionBtn, { marginLeft: 6 }]}
                  activeOpacity={0.7}
                  onPress={() => handleReplaceExercise(ex.id)}
                >
                  <MaterialCommunityIcons name="swap-horizontal" size={14} color="#4B5563" />
                  <Text style={styles.actionBtnText}>Replace</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Start Workout Button */}
        <TouchableOpacity
          style={styles.ctaButtonWrapper}
          activeOpacity={0.85}
          onPress={() => onStartWorkout(`Custom ${goal.toUpperCase()} Workout (${duration})`)}
        >
          <LinearGradient
            colors={['#2D8CFF', '#6C4CF5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <MaterialCommunityIcons name="play" size={22} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.ctaText}>Start Workout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Exercise Modal */}
      <EditExerciseModal
        visible={!!editingExercise}
        exercise={editingExercise}
        onClose={() => setEditingExercise(null)}
        onSave={handleSaveExercise}
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
  section: {
    marginBottom: 20,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  stepHint: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    position: 'relative',
  },
  goalCardSelected: {
    borderColor: '#2D8CFF',
    backgroundColor: '#F0F7FF',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2D8CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  goalIconSelected: {
    backgroundColor: '#E0F2FE',
  },
  goalName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  goalSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  durationPillSelected: {
    borderColor: '#2D8CFF',
    backgroundColor: '#E0F2FE',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  durationTextSelected: {
    color: '#0284C7',
    fontWeight: '800',
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  intensityPillSelected: {
    borderColor: '#2D8CFF',
    backgroundColor: '#E0F2FE',
  },
  intensityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  intensityTextSelected: {
    color: '#0284C7',
    fontWeight: '800',
  },
  previewSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  previewSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE9FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C4CF5',
    marginLeft: 4,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  exerciseDetail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  ctaButtonWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#2D8CFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButton: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
