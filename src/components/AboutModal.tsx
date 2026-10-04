import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type AboutModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AboutModal({ visible, onClose }: AboutModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About FitFlow</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Top Logo Icon */}
          <View style={styles.iconCircle}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>FitFlow</Text>
          <Text style={styles.sub}>Version 1.0.0 • Smart Fitness Companion</Text>

          {/* Description Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>App Description</Text>
            <Text style={styles.bodyText}>
              FitFlow is an intuitive, all-in-one mobile fitness application designed to help users establish healthy habits. It features personalized workout generation, macro-nutrient and hydration tracking, 7-day progress analytics, and a social community feed.
            </Text>
          </View>

          {/* HCI Project Context Card */}
          <View style={styles.card}>
            <View style={styles.academicHeader}>
              <MaterialCommunityIcons name="school-outline" size={20} color="#6C4CF5" style={{ marginRight: 8 }} />
              <Text style={styles.cardHeading}>Academic Context</Text>
            </View>
            <Text style={styles.bodyText}>
              Developed for IT3060 Human-Computer Interaction Lab Exercise 06. Built with Expo SDK 57, React Native, and TypeScript.
            </Text>
          </View>

          {/* Highlights Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Key Capabilities</Text>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#6C4CF5" />
              <Text style={styles.featureText}>Personalized Workout Plans</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#6C4CF5" />
              <Text style={styles.featureText}>Nutrition & Daily Water Logger</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#6C4CF5" />
              <Text style={styles.featureText}>Weekly Progress Analytics</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#6C4CF5" />
              <Text style={styles.featureText}>Interactive Social Community Feed</Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity style={styles.primaryButtonWrapper} activeOpacity={0.85} onPress={onClose}>
            <LinearGradient colors={['#6C4CF5', '#2D8CFF']} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Close</Text>
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
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#0C2340',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  logoImage: {
    width: 68,
    height: 68,
  },
  title: {
    fontSize: 24,
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
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  academicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardHeading: {
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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '600',
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
