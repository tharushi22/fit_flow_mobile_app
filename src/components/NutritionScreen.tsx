import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type NutritionScreenProps = {
  onNavigate: (tab: string) => void;
  onScanMeal: () => void;
};

export default function NutritionScreen({ onNavigate, onScanMeal }: NutritionScreenProps) {
  const [waterCups, setWaterCups] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedCalories, setLoggedCalories] = useState(1240);

  const [meals] = useState([
    { id: '1', name: 'Oatmeal & Berries', category: 'Breakfast • 10:30 AM', cal: 340, icon: 'food-variant' },
    { id: '2', name: 'Grilled Chicken Salad', category: 'Lunch • 1:15 PM', cal: 420, icon: 'food-apple-outline' },
    { id: '3', name: 'Almonds (1 oz)', category: 'Snack • Yesterday', cal: 164, icon: 'seed-outline' },
  ]);

  const handleAddMeal = (cal: number) => {
    setLoggedCalories((prev) => prev + cal);
  };

  const handleWaterClick = (index: number) => {
    setWaterCups(index + 1);
  };

  const filteredMeals = meals.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Nutrition Logger</Text>
            <Text style={styles.headerSub}>Track your daily meals & hydration</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.8}
            onPress={() => onNavigate('more')}
          >
            <View style={styles.avatarLogoCircle}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.avatarLogoImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Scan Meal Hero Card */}
        <View style={styles.scanCard}>
          <LinearGradient
            colors={['#E0F2FE', '#F0F9FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scanGradient}
          >
            <View style={styles.scanLeft}>
              <View style={styles.scanBadge}>
                <Text style={styles.scanBadgeText}>SCAN MEAL</Text>
              </View>
              <Text style={styles.scanTitle}>Use Camera to Log Your Meal</Text>
              <Text style={styles.scanSub}>
                Use camera to auto-detect ingredients and estimate nutrition instantly.
              </Text>
              <TouchableOpacity
                style={styles.scanButton}
                activeOpacity={0.85}
                onPress={onScanMeal}
              >
                <LinearGradient
                  colors={['#2D8CFF', '#6C4CF5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.scanButtonGradient}
                >
                  <MaterialCommunityIcons name="camera-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.scanButtonText}>Scan Meal</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.scanRightGraphic}>
              <View style={styles.cameraFrame}>
                <MaterialCommunityIcons name="camera" size={32} color="#2D8CFF" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Add Search Bar */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <View style={styles.searchBarRow}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search foods, brands, or meals..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.barcodeButton} activeOpacity={0.7} onPress={onScanMeal}>
              <MaterialCommunityIcons name="barcode-scan" size={20} color="#2D8CFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Meals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Meals</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All ›</Text>
            </TouchableOpacity>
          </View>

          {filteredMeals.map((item) => (
            <View key={item.id} style={styles.mealCard}>
              <View style={styles.mealLeft}>
                <View style={styles.mealIconCircle}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color="#6C4CF5" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.mealName}>{item.name}</Text>
                  <Text style={styles.mealCat}>{item.category}</Text>
                </View>
              </View>

              <View style={styles.mealRight}>
                <Text style={styles.mealCal}>{item.cal} kcal</Text>
                <TouchableOpacity
                  style={styles.plusButton}
                  activeOpacity={0.7}
                  onPress={() => handleAddMeal(item.cal)}
                >
                  <MaterialCommunityIcons name="plus" size={18} color="#2D8CFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Daily Summary */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Daily Summary</Text>
            <View style={styles.keepBadge}>
              <MaterialCommunityIcons name="weather-sunny" size={14} color="#D97706" />
              <Text style={styles.keepText}>Keep it up!</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.calTargetRow}>
              <Text style={styles.calTargetVal}>
                {loggedCalories.toLocaleString()} <Text style={styles.calTargetMax}>/ 2,000 kcal</Text>
              </Text>
              <Text style={styles.calLeftVal}>{Math.max(0, 2000 - loggedCalories)} kcal left</Text>
            </View>

            {/* Main Calorie Progress Bar */}
            <View style={styles.calProgressBg}>
              <View style={[styles.calProgressFill, { width: `${Math.min(100, (loggedCalories / 2000) * 100)}%` }]} />
            </View>

            {/* Macros Breakdown */}
            <View style={styles.macrosRow}>
              {/* Protein */}
              <View style={styles.macroCol}>
                <View style={styles.macroHeader}>
                  <MaterialCommunityIcons name="leaf" size={14} color="#16A34A" />
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <Text style={styles.macroVal}>64g <Text style={styles.macroSub}>/ 120g</Text></Text>
                <View style={styles.macroProgressBg}>
                  <View style={[styles.macroProgressFill, { width: '53%', backgroundColor: '#16A34A' }]} />
                </View>
              </View>

              {/* Carbs */}
              <View style={styles.macroCol}>
                <View style={styles.macroHeader}>
                  <MaterialCommunityIcons name="seed" size={14} color="#9333EA" />
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <Text style={styles.macroVal}>140g <Text style={styles.macroSub}>/ 220g</Text></Text>
                <View style={styles.macroProgressBg}>
                  <View style={[styles.macroProgressFill, { width: '63%', backgroundColor: '#9333EA' }]} />
                </View>
              </View>

              {/* Fat */}
              <View style={styles.macroCol}>
                <View style={styles.macroHeader}>
                  <MaterialCommunityIcons name="fire" size={14} color="#EA580C" />
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
                <Text style={styles.macroVal}>45g <Text style={styles.macroSub}>/ 65g</Text></Text>
                <View style={styles.macroProgressBg}>
                  <View style={[styles.macroProgressFill, { width: '69%', backgroundColor: '#EA580C' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Water Intake Tracker */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Water Intake</Text>
            <Text style={styles.waterCountText}>{waterCups} / 8 glasses ›</Text>
          </View>

          <View style={styles.waterCard}>
            <View style={styles.cupsRow}>
              {[...Array(8)].map((_, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => handleWaterClick(i)}
                  style={styles.cupItem}
                >
                  <MaterialCommunityIcons
                    name="cup-water"
                    size={28}
                    color={i < waterCups ? '#2D8CFF' : '#D1D5DB'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.tipBox}>
              <MaterialCommunityIcons name="information-outline" size={16} color="#0284C7" />
              <Text style={styles.tipText}>
                {"You're doing great! Stay hydrated for more energy and better results."}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  avatarLogoImage: {
    width: 32,
    height: 32,
  },
  scanCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  scanGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  scanLeft: {
    flex: 1,
    paddingRight: 12,
  },
  scanBadge: {
    backgroundColor: '#BAE6FD',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  scanBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 0.6,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 6,
  },
  scanSub: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 14,
  },
  scanButton: {
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scanRightGraphic: {
    width: 70,
    alignItems: 'center',
  },
  cameraFrame: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D8CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  searchSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  barcodeButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D8CFF',
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  mealLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  mealCat: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  mealRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginRight: 10,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  keepText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  calTargetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  calTargetVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  calTargetMax: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  calLeftVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D8CFF',
  },
  calProgressBg: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  calProgressFill: {
    height: '100%',
    backgroundColor: '#2D8CFF',
    borderRadius: 5,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroCol: {
    flex: 1,
    marginHorizontal: 2,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 4,
  },
  macroVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  macroSub: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  macroProgressBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  waterCountText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D8CFF',
  },
  waterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cupsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 14,
  },
  cupItem: {
    padding: 4,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 14,
    padding: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#0369A1',
    marginLeft: 6,
    flex: 1,
  },
});
