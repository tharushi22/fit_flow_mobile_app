import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ScanMealModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ScanMealModal({ visible, onClose }: ScanMealModalProps) {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let timer: any = null;
    if (visible) {
      timer = setTimeout(() => {
        setScanning(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible]);

  const handleClose = () => {
    setScanning(true);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7} onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Smart Meal Scanner</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Viewfinder simulation */}
        <View style={styles.content}>
          <View style={styles.viewfinder}>
            <LinearGradient
              colors={['#E0F2FE', '#F0F9FF']}
              style={styles.viewfinderInner}
            >
              <MaterialCommunityIcons
                name={scanning ? 'line-scan' : 'food-turkey'}
                size={80}
                color="#2D8CFF"
              />

              {scanning ? (
                <Text style={styles.scanningText}>Scanning ingredients...</Text>
              ) : (
                <View style={styles.resultBox}>
                  <View style={styles.successBadge}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#16A34A" />
                    <Text style={styles.successText}>Meal Detected</Text>
                  </View>
                  <Text style={styles.mealTitleText}>Grilled Chicken & Quinoa</Text>
                  <Text style={styles.mealMetaText}>480 kcal • 42g Protein • 12g Fat</Text>
                </View>
              )}
            </LinearGradient>
          </View>

          {!scanning && (
            <TouchableOpacity
              style={styles.logButtonWrapper}
              activeOpacity={0.85}
              onPress={handleClose}
            >
              <LinearGradient colors={['#2D8CFF', '#6C4CF5']} style={styles.logButton}>
                <Text style={styles.logButtonText}>Log Meal To Daily Summary</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinder: {
    width: '100%',
    height: 320,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2D8CFF',
    marginBottom: 30,
  },
  viewfinderInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanningText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0284C7',
    marginTop: 16,
  },
  resultBox: {
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    width: '100%',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  successText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
    marginLeft: 4,
  },
  mealTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  mealMetaText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  logButtonWrapper: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
  },
  logButton: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
