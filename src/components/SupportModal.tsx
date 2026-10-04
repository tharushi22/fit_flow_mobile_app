import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type SupportModalProps = {
  visible: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
};

export default function SupportModal({
  visible,
  onClose,
  onOpenPrivacy,
  onOpenTerms,
}: SupportModalProps) {
  const handleReportIssue = () => {
    Alert.alert(
      'Report an Issue',
      'Describe the issue you encountered:\n\nThank you for helping us improve FitFlow. Your feedback has been noted for our development team.',
      [{ text: 'OK' }]
    );
  };

  const handleContactEmail = () => {
    Alert.alert(
      'Support Contact',
      'You can reach out to our team at:\n\nsupport@fitflow.app\n\n(Response time: within 24-48 hours)',
      [{ text: 'OK' }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Support & Assistance</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Top Icon */}
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="headphones" size={36} color="#6C4CF5" />
          </View>

          <Text style={styles.title}>How can we help?</Text>
          <Text style={styles.sub}>FitFlow Customer Support & Resources</Text>

          {/* Contact Support Card */}
          <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleContactEmail}>
            <View style={styles.row}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#EEE9FF' }]}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#6C4CF5" />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.cardTitle}>Contact Support</Text>
                <Text style={styles.cardSub}>Email us at support@fitflow.app</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Report an Issue */}
          <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleReportIssue}>
            <View style={styles.row}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#FEE2E2' }]}>
                <MaterialCommunityIcons name="alert-circle-outline" size={22} color="#EF4444" />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.cardTitle}>Report an Issue</Text>
                <Text style={styles.cardSub}>Found a bug? Send us details</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              onClose();
              onOpenPrivacy();
            }}
          >
            <View style={styles.row}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <MaterialCommunityIcons name="shield-check-outline" size={22} color="#0284C7" />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.cardTitle}>Privacy Policy</Text>
                <Text style={styles.cardSub}>Read data collection and protection terms</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              onClose();
              onOpenTerms();
            }}
          >
            <View style={styles.row}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#FEF3C7' }]}>
                <MaterialCommunityIcons name="file-document-outline" size={22} color="#D97706" />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.cardTitle}>Terms & Conditions</Text>
                <Text style={styles.cardSub}>Review app terms of service</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

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
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  cardSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
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
