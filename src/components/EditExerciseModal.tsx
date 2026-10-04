import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ExerciseItem = {
  id: string;
  name: string;
  detail: string;
  icon: string;
};

type EditExerciseModalProps = {
  visible: boolean;
  exercise: ExerciseItem | null;
  onClose: () => void;
  onSave: (id: string, newName: string, newDetail: string) => void;
};

export default function EditExerciseModal({
  visible,
  exercise,
  onClose,
  onSave,
}: EditExerciseModalProps) {
  const [name, setName] = useState(exercise?.name ?? '');
  const [detail, setDetail] = useState(exercise?.detail ?? '');

  // Reset form when modal opens
  const exerciseId = exercise?.id;
  const currentName = exercise?.name ?? '';
  const currentDetail = exercise?.detail ?? '';

  const handleSave = () => {
    if (exerciseId && (name || currentName) && (detail || currentDetail)) {
      onSave(exerciseId, (name || currentName).trim(), (detail || currentDetail).trim());
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
              <Text style={styles.headerTitle}>Edit Exercise</Text>
              <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={onClose}>
                <MaterialCommunityIcons name="close" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Input Form */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Exercise Name</Text>
              <TextInput
                style={styles.input}
                defaultValue={currentName}
                onChangeText={setName}
                placeholder="e.g. Push-ups"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Sets & Reps / Duration</Text>
              <TextInput
                style={styles.input}
                defaultValue={currentDetail}
                onChangeText={setDetail}
                placeholder="e.g. 3 sets x 12 reps"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Actions */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtnWrapper} activeOpacity={0.85} onPress={handleSave}>
                <LinearGradient colors={['#2D8CFF', '#6C4CF5']} style={styles.saveBtn}>
                  <Text style={styles.saveText}>Save Changes</Text>
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
