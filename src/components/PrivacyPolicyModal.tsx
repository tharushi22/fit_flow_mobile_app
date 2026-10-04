import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type PrivacyPolicyModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PrivacyPolicyModal({ visible, onClose }: PrivacyPolicyModalProps) {
  const publicUrlPlaceholder = 'https://fitflow.app/privacy';

  const handleOpenPublicUrl = () => {
    Linking.openURL(publicUrlPlaceholder).catch(() => {});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="shield-check" size={40} color="#6C4CF5" />
          </View>

          <Text style={styles.title}>FitFlow Privacy Commitment</Text>
          <Text style={styles.sub}>Last updated: October 1, 2026 • Version 1.0.0</Text>

          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>1. Data Collection & Privacy</Text>
            <Text style={styles.bodyText}>
              FitFlow respects your personal health and fitness privacy. Workout logs, nutrition entries, and progress stats created in the app are stored locally on your device for fast performance.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>2. Data Processing & Personalization</Text>
            <Text style={styles.bodyText}>
              Workout and nutrition recommendation algorithms process input data locally or via anonymized requests. Personal identity details are never sold or disclosed to third parties.
            </Text>
          </View>

          {/* Section 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>3. Social & Community Features</Text>
            <Text style={styles.bodyText}>
              Community posts, likes, comments, and shared workout activity may be visible to other app users when social community features are actively used.
            </Text>
          </View>

          {/* Section 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>4. User Rights & Data Control</Text>
            <Text style={styles.bodyText}>
              Users can request access, correction, or deletion of their stored personal data where applicable through local app profile management or support requests.
            </Text>
          </View>

          {/* Section 5 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>5. Data Security & Retention</Text>
            <Text style={styles.bodyText}>
              For this application prototype, local state and mock data structures are utilized where appropriate. Advanced cloud sync or enterprise server encryption mechanisms are not currently implemented.
            </Text>
          </View>

          {/* Section 6 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>6. Privacy & Regulatory Considerations</Text>
            <Text style={styles.bodyText}>
              FitFlow is designed with privacy and health-data protection principles in mind. Please note that FitFlow is an academic prototype and is not officially certified under GDPR or HIPAA standards.
            </Text>
          </View>

          {/* Section 7 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>7. Fitness & Health Disclaimer</Text>
            <Text style={styles.bodyText}>
              FitFlow provides fitness and wellness information for general guidance only and is not a substitute for professional medical advice. Always consult a qualified physician before starting a new exercise regimen.
            </Text>
          </View>

          {/* Section 8 */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>8. Support Contact</Text>
            <Text style={styles.bodyText}>
              For privacy inquiries, feedback, or data requests, please contact our support team at:
            </Text>
            <Text style={styles.contactEmail}>support@fitflow.app (Placeholder Email)</Text>
          </View>

          {/* Section 9 - Public URL */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>9. Hosted Public Privacy Policy</Text>
            <Text style={styles.bodyText}>
              For IT3060 Lab Exercise 06 store compliance, our official hosted policy placeholder link is:
            </Text>

            <TouchableOpacity style={styles.urlCard} activeOpacity={0.8} onPress={handleOpenPublicUrl}>
              <MaterialCommunityIcons name="link-variant" size={20} color="#0284C7" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.urlText}>{publicUrlPlaceholder}</Text>
                <Text style={styles.placeholderLabel}>(Placeholder Link - Not Live)</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.acceptButtonWrapper} activeOpacity={0.85} onPress={onClose}>
            <LinearGradient colors={['#6C4CF5', '#2D8CFF']} style={styles.acceptButton}>
              <Text style={styles.acceptText}>Done</Text>
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
  section: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
  contactEmail: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C4CF5',
    marginTop: 6,
  },
  urlCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  urlText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284C7',
  },
  placeholderLabel: {
    fontSize: 11,
    color: '#0369A1',
    marginTop: 2,
  },
  acceptButtonWrapper: {
    width: '100%',
    borderRadius: 26,
    overflow: 'hidden',
    marginTop: 12,
  },
  acceptButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
