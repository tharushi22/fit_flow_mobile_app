import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type WorkoutModalProps = {
  visible: boolean;
  workoutTitle: string;
  onClose: () => void;
};

export default function WorkoutModal({ visible, workoutTitle, onClose }: WorkoutModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (visible && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, isPaused]);

  const handleClose = () => {
    setSeconds(0);
    onClose();
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{workoutTitle || 'Full Body Strength'}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Workout Player Body */}
        <View style={styles.content}>
          <View style={styles.heroCircleOuter}>
            <LinearGradient colors={['#6C4CF5', '#2D8CFF']} style={styles.heroCircleInner}>
              <MaterialCommunityIcons name="weight-lifter" size={64} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.activeTag}>WORKOUT IN PROGRESS</Text>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <MaterialCommunityIcons name="fire" size={22} color="#EA580C" />
              <Text style={styles.metricVal}>{Math.floor(seconds * 0.15)} kcal</Text>
              <Text style={styles.metricLbl}>Burned</Text>
            </View>

            <View style={styles.metricItem}>
              <MaterialCommunityIcons name="heart-pulse" size={22} color="#DC2626" />
              <Text style={styles.metricVal}>142 bpm</Text>
              <Text style={styles.metricLbl}>Heart Rate</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.pauseBtn}
              activeOpacity={0.8}
              onPress={() => setIsPaused(!isPaused)}
            >
              <MaterialCommunityIcons name={isPaused ? 'play' : 'pause'} size={28} color="#6C4CF5" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.finishBtnWrapper}
              activeOpacity={0.85}
              onPress={handleClose}
            >
              <LinearGradient colors={['#20C997', '#0CA678']} style={styles.finishBtn}>
                <MaterialCommunityIcons name="check" size={22} color="#FFF" style={{ marginRight: 6 }} />
                <Text style={styles.finishBtnTxt}>Complete Workout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heroCircleOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroCircleInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTag: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6C4CF5',
    letterSpacing: 1,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 54,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 32,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 36,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginTop: 6,
  },
  metricLbl: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  pauseBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  finishBtnWrapper: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
  finishBtn: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
