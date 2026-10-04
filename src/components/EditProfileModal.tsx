import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type EditProfileModalProps = {
  visible: boolean;
  currentName: string;
  currentEmail: string;
  onClose: () => void;
  onSave: (newName: string, newEmail: string) => void;
};

export default function EditProfileModal({
  visible,
  currentName,
  currentEmail,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  const handleSave = () => {
    const finalName = (name || currentName).trim();
    const finalEmail = (email || currentEmail).trim();
    if (finalName && finalEmail) {
      onSave(finalName, finalEmail);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
                <MaterialCommunityIcons name="close" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Input Form */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                style={styles.input}
                defaultValue={currentName}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                defaultValue={currentEmail}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Actions */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtnWrapper} activeOpacity={0.85} onPress={handleSave}>
                <LinearGradient colors={['#2D8CFF', '#6C4CF5']} style={styles.saveBtn}>
                  <Text style={styles.saveText}>Save Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveBtnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
