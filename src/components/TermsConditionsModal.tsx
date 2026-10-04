import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type TermsConditionsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function TermsConditionsModal({ visible, onClose }: TermsConditionsModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Top Icon */}
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="file-document-outline" size={36} color="#6C4CF5" />
          </View>

          <Text style={styles.title}>FitFlow Terms of Service</Text>
          <Text style={styles.sub}>Last updated: October 1, 2026 • Version 1.0.0</Text>

          {/* Section 1 */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>1. Use of FitFlow</Text>
            <Text style={styles.bodyText}>
              FitFlow provides workout planning, nutrition logging, and progress tracking for personal wellness purposes. By using this application, you agree to use it responsibly for your individual fitness journey.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>2. Fitness & Health Disclaimer</Text>
            <Text style={styles.bodyText}>
              FitFlow recommendations and workout plans are provided for general guidance only. FitFlow does not provide professional medical advice, diagnosis, or treatment. Always consult a qualified physician before undertaking new physical exercises.
            </Text>
          </View>

          {/* Section 3 */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>3. User Responsibilities</Text>
            <Text style={styles.bodyText}>
              You are responsible for ensuring that your physical condition is suitable for exercise. You agree to exercise safely, listen to your body, and refrain from engaging in physical activities that exceed your limits.
            </Text>
          </View>

          {/* Section 4 */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>4. Privacy & Data Handling</Text>
            <Text style={styles.bodyText}>
              FitFlow stores your workout logs, nutrition history, and profile data locally on your device. We respect user privacy and do not sell personal data to external advertisers.
            </Text>
          </View>

          {/* Section 5 */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>5. Version & Project Context</Text>
            <Text style={styles.bodyText}>
              This terms document applies to FitFlow Version 1.0.0, developed as an academic project for IT3060 Human-Computer Interaction Lab Exercise 06.
            </Text>
          </View>

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
  sectionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
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
