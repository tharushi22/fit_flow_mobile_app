import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import PlanScreen from './PlanScreen';
import StatsScreen from './StatsScreen';
import SocialScreen from './SocialScreen';
import NutritionScreen from './NutritionScreen';
import MoreScreen from './MoreScreen';
import WorkoutModal from './WorkoutModal';
import ScanMealModal from './ScanMealModal';

export type TabType = 'home' | 'plan' | 'stats' | 'social' | 'nutrition' | 'more';

export default function AppTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [workoutTitle, setWorkoutTitle] = useState<string | null>(null);
  const [scanMealVisible, setScanMealVisible] = useState(false);

  const handleStartWorkout = (title: string) => {
    setWorkoutTitle(title);
  };

  return (
    <View style={styles.container}>
      {/* Active Tab Screen */}
      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={(tab) => setActiveTab(tab as TabType)}
            onStartWorkout={handleStartWorkout}
          />
        )}
        {activeTab === 'plan' && (
          <PlanScreen
            onNavigate={(tab) => setActiveTab(tab as TabType)}
            onStartWorkout={handleStartWorkout}
          />
        )}
        {activeTab === 'stats' && (
          <StatsScreen onNavigate={(tab) => setActiveTab(tab as TabType)} />
        )}
        {activeTab === 'social' && (
          <SocialScreen onNavigate={(tab) => setActiveTab(tab as TabType)} />
        )}
        {activeTab === 'nutrition' && (
          <NutritionScreen
            onNavigate={(tab) => setActiveTab(tab as TabType)}
            onScanMeal={() => setScanMealVisible(true)}
          />
        )}
        {activeTab === 'more' && (
          <MoreScreen onNavigate={(tab) => setActiveTab(tab as TabType)} />
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNavBar}>
          {/* 1. Home */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab('home')}
          >
            <MaterialCommunityIcons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={24}
              color={activeTab === 'home' ? '#2D8CFF' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>
              Home
            </Text>
            {activeTab === 'home' && <View style={styles.activeDot} />}
          </TouchableOpacity>

          {/* 2. Plan */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab('plan')}
          >
            <MaterialCommunityIcons
              name={activeTab === 'plan' ? 'calendar-month' : 'calendar-month-outline'}
              size={24}
              color={activeTab === 'plan' ? '#2D8CFF' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, activeTab === 'plan' && styles.navLabelActive]}>
              Plan
            </Text>
            {activeTab === 'plan' && <View style={styles.activeDot} />}
          </TouchableOpacity>

          {/* 3. Stats */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab('stats')}
          >
            <MaterialCommunityIcons
              name={activeTab === 'stats' ? 'chart-bar' : 'chart-bar-stacked'}
              size={24}
              color={activeTab === 'stats' ? '#2D8CFF' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, activeTab === 'stats' && styles.navLabelActive]}>
              Stats
            </Text>
            {activeTab === 'stats' && <View style={styles.activeDot} />}
          </TouchableOpacity>

          {/* 4. Social */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab('social')}
          >
            <MaterialCommunityIcons
              name={activeTab === 'social' ? 'account-group' : 'account-group-outline'}
              size={24}
              color={activeTab === 'social' ? '#2D8CFF' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, activeTab === 'social' && styles.navLabelActive]}>
              Social
            </Text>
            {activeTab === 'social' && <View style={styles.activeDot} />}
          </TouchableOpacity>

          {/* 5. More */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab('more')}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={activeTab === 'more' || activeTab === 'nutrition' ? '#2D8CFF' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, (activeTab === 'more' || activeTab === 'nutrition') && styles.navLabelActive]}>
              More
            </Text>
            {(activeTab === 'more' || activeTab === 'nutrition') && <View style={styles.activeDot} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Interactive Workout Timer Modal */}
      <WorkoutModal
        visible={!!workoutTitle}
        workoutTitle={workoutTitle || ''}
        onClose={() => setWorkoutTitle(null)}
      />

      {/* Interactive Scan Meal Modal */}
      <ScanMealModal
        visible={scanMealVisible}
        onClose={() => setScanMealVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  screenContainer: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 6,
    position: 'relative',
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#2D8CFF',
    fontWeight: '800',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2D8CFF',
  },
});
