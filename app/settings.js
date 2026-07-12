import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  // Load preferences from AsyncStorage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('setting_notifications');
        const storedDarkMode = await AsyncStorage.getItem('setting_darkmode');
        const storedBiometrics = await AsyncStorage.getItem('setting_biometrics');
        const storedSounds = await AsyncStorage.getItem('setting_sounds');

        if (storedNotifications !== null) setNotifications(JSON.parse(storedNotifications));
        if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode));
        if (storedBiometrics !== null) setBiometrics(JSON.parse(storedBiometrics));
        if (storedSounds !== null) setSoundEffects(JSON.parse(storedSounds));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Save specific settings helper
  const saveSetting = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error(`Error saving settings for ${key}:`, error);
    }
  };

  const toggleNotifications = (value) => {
    setNotifications(value);
    saveSetting('setting_notifications', value);
  };

  const toggleDarkMode = (value) => {
    setDarkMode(value);
    saveSetting('setting_darkmode', value);
    Alert.alert('Theme Settings', 'Dark Mode configuration saved. Reboot app to apply system-wide.');
  };

  const toggleBiometrics = (value) => {
    setBiometrics(value);
    saveSetting('setting_biometrics', value);
  };

  const toggleSounds = (value) => {
    setSoundEffects(value);
    saveSetting('setting_sounds', value);
  };

  const handleSupportPress = () => {
    Alert.alert(
      'Support & Feedback',
      'Need help with PetCare?\n\nContact us at:\nsupport@petcare-app.com\n+1 (800) 555-0199',
      [{ text: 'OK' }]
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      'About PetCare',
      'PetCare App\nVersion 1.0.0 (Production)\n\nDeveloped with ❤️ for pet health and rescue operations.',
      [{ text: 'Close' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Application Settings</Text>

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#eef2ff' }]}>
                <Ionicons name="notifications" size={20} color="#6d48ff" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Get alerts for vet visits & rescue status</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
              thumbColor={notifications ? '#6d48ff' : '#f3f4f6'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f5f3ff' }]}>
                <Ionicons name="moon" size={20} color="#8e44ad" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingSubtitle}>Reduce eye strain in low-light environments</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#d1d5db', true: '#c084fc' }}
              thumbColor={darkMode ? '#8e44ad' : '#f3f4f6'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#ecfdf5' }]}>
                <Ionicons name="finger-print" size={20} color="#10b981" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Biometric Sign In</Text>
                <Text style={styles.settingSubtitle}>Use FaceID or Fingerprint to unlock</Text>
              </View>
            </View>
            <Switch
              value={biometrics}
              onValueChange={toggleBiometrics}
              trackColor={{ false: '#d1d5db', true: '#6ee7b7' }}
              thumbColor={biometrics ? '#10b981' : '#f3f4f6'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#fff7ed' }]}>
                <Ionicons name="volume-medium" size={20} color="#f97316" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Sound Effects</Text>
                <Text style={styles.settingSubtitle}>Enable interactive audio feedback</Text>
              </View>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={toggleSounds}
              trackColor={{ false: '#d1d5db', true: '#ffedd5' }}
              thumbColor={soundEffects ? '#f97316' : '#f3f4f6'}
            />
          </View>
        </View>

        {/* Support Section */}
        <Text style={styles.sectionTitle}>Help & Support</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.actionRow} onPress={handleSupportPress}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#eff6ff' }]}>
                <Ionicons name="help-circle" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.actionLabel}>Contact Customer Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionRow} onPress={() => Alert.alert('Privacy Policy', 'PetCare is committed to protecting your personal data and the information of your pets. We never share details with unauthorized parties.')}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#fdf2f8' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#ec4899" />
              </View>
              <Text style={styles.actionLabel}>Privacy & Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionRow} onPress={handleAboutPress}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f0fdf4' }]}>
                <Ionicons name="information-circle" size={20} color="#22c55e" />
              </View>
              <Text style={styles.actionLabel}>About PetCare</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <Text style={styles.footerVersion}>PetCare Version 1.0.0 (Build 2407)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  footerVersion: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
});
