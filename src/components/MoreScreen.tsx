import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsConditionsModal from './TermsConditionsModal';
import WhatsNewModal from './WhatsNewModal';
import AboutModal from './AboutModal';
import SupportModal from './SupportModal';
import EditProfileModal from './EditProfileModal';

type MoreScreenProps = {
  onNavigate: (tab: string) => void;
};

export default function MoreScreen({ onNavigate }: MoreScreenProps) {
  const [profileName, setProfileName] = useState('FitFlow User');
  const [profileEmail, setProfileEmail] = useState('user@fitflow.app');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Modal Visibility States
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [whatsNewModalVisible, setWhatsNewModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [supportModalVisible, setSupportModalVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const handleAddAccount = () => {
    Alert.alert(
      'Add Account',
      'Select account option:',
      [
        { text: 'Create New Account', onPress: () => Alert.alert('Notice', 'New account registration ready.') },
        { text: 'Switch Account', onPress: () => Alert.alert('Notice', 'Account switcher enabled.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this profile and reset your local data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProfileName('FitFlow User');
            setProfileEmail('user@fitflow.app');
            Alert.alert('Account Reset', 'Your profile and data have been reset.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Account & Options</Text>
            <Text style={styles.headerSub}>Manage your settings and preferences</Text>
          </View>
        </View>

        {/* Profile Card with Edit, Add & Delete options */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <LinearGradient colors={['#6C4CF5', '#2D8CFF']} style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>
                {profileName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'FF'}
              </Text>
            </LinearGradient>
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={styles.profileName}>{profileName}</Text>
              <Text style={styles.profileEmail}>{profileEmail}</Text>
              <View style={styles.userBadge}>
                <MaterialCommunityIcons name="account-check-outline" size={12} color="#6C4CF5" />
                <Text style={styles.userBadgeText}>FITFLOW ACCOUNT</Text>
              </View>
            </View>
          </View>

          {/* Profile Action Buttons */}
          <View style={styles.profileActionsRow}>
            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.profileActionBtn}
              activeOpacity={0.7}
              onPress={() => setEditProfileVisible(true)}
            >
              <MaterialCommunityIcons name="pencil-outline" size={16} color="#6C4CF5" />
              <Text style={styles.profileActionText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Add Account */}
            <TouchableOpacity
              style={styles.profileActionBtn}
              activeOpacity={0.7}
              onPress={handleAddAccount}
            >
              <MaterialCommunityIcons name="account-plus-outline" size={16} color="#2D8CFF" />
              <Text style={[styles.profileActionText, { color: '#2D8CFF' }]}>Add Account</Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity
              style={[styles.profileActionBtn, { borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }]}
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={16} color="#EF4444" />
              <Text style={[styles.profileActionText, { color: '#EF4444' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Tools Shortcuts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>

          {/* Workout Planner */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => onNavigate('plan')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <MaterialCommunityIcons name="dumbbell" size={20} color="#0284C7" />
            </View>
            <Text style={styles.menuTitle}>Workout Planner</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Nutrition Logger */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => onNavigate('nutrition')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#16A34A" />
            </View>
            <Text style={styles.menuTitle}>Nutrition Logger</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Progress & Analytics */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => onNavigate('stats')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <MaterialCommunityIcons name="chart-box" size={20} color="#9333EA" />
            </View>
            <Text style={styles.menuTitle}>Progress & Analytics</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Daily Reminders */}
          <View style={styles.menuRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <MaterialCommunityIcons name="bell-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.menuTitle}>Daily Workout Reminders</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#6C4CF5' }}
            />
          </View>

          {/* Health App Sync */}
          <View style={styles.menuRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="heart-pulse" size={20} color="#9CA3AF" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.menuTitle, { marginLeft: 0, color: '#6B7280' }]}>
                Health App Sync
              </Text>
            </View>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>COMING SOON</Text>
            </View>
          </View>
        </View>

        {/* Privacy & Support */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacy & Support</Text>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setPrivacyModalVisible(true)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#EEE9FF' }]}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#6C4CF5" />
            </View>
            <Text style={styles.menuTitle}>Privacy Policy</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setTermsModalVisible(true)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <MaterialCommunityIcons name="file-document-outline" size={20} color="#0284C7" />
            </View>
            <Text style={styles.menuTitle}>Terms & Conditions</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Support / Contact Us */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setSupportModalVisible(true)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MaterialCommunityIcons name="headphones" size={20} color="#16A34A" />
            </View>
            <Text style={styles.menuTitle}>Support / Contact Us</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Release Notes / What's New */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setWhatsNewModalVisible(true)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <MaterialCommunityIcons name="rocket-launch-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.menuTitle}>{"Release Notes / What's New"}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* About FitFlow */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setAboutModalVisible(true)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' }]}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.menuTitle, { marginLeft: 0 }]}>About FitFlow</Text>
              <Text style={styles.versionSubText}>App Version 1.0.0</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={editProfileVisible}
        currentName={profileName}
        currentEmail={profileEmail}
        onClose={() => setEditProfileVisible(false)}
        onSave={(newName, newEmail) => {
          setProfileName(newName);
          setProfileEmail(newEmail);
        }}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        visible={privacyModalVisible}
        onClose={() => setPrivacyModalVisible(false)}
      />

      {/* Terms & Conditions Modal */}
      <TermsConditionsModal
        visible={termsModalVisible}
        onClose={() => setTermsModalVisible(false)}
      />

      {/* What's New Modal */}
      <WhatsNewModal
        visible={whatsNewModalVisible}
        onClose={() => setWhatsNewModalVisible(false)}
      />

      {/* About FitFlow Modal */}
      <AboutModal
        visible={aboutModalVisible}
        onClose={() => setAboutModalVisible(false)}
      />

      {/* Support / Contact Us Modal */}
      <SupportModal
        visible={supportModalVisible}
        onClose={() => setSupportModalVisible(false)}
        onOpenPrivacy={() => setPrivacyModalVisible(true)}
        onOpenTerms={() => setTermsModalVisible(true)}
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE9FF',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 6,
  },
  userBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C4CF5',
    marginLeft: 4,
  },
  profileActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  profileActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE9FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  profileActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C4CF5',
    marginLeft: 4,
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
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  versionSubText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  comingSoonBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
  },
});
