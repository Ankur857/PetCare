import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

const NGOs = [
  {
    name: "Astradharini Foundation",
    address: "A-71, Subash Nagar, Nehru Vihar, Kalyanpur (East), Lucknow",
    phone: "06393943447",
  },
  {
    name: "IGSS Animals Care NGO",
    address: "1/22, Viram Khand 1, Gomti Nagar, Lucknow",
    phone: "09838222033",
  },
  {
    name: "Animal Rescue Lucknow",
    address: "Meena Market, Liberty Colony Park, Indira Nagar, Lucknow",
    phone: "09120696610",
  },
];

export default function Rescue() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLocating(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to fetch nearby animal rescue alerts.");
        setIsLocating(false);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync(loc.coords);
        const area = address[0]?.suburb || address[0]?.district || "Lucknow";
        setLocation(area);
      } catch (err) {
        console.error("Location error:", err);
        setLocation("Lucknow");
      } finally {
        setIsLocating(false);
      }
    })();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required to capture rescue photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(`data:image/jpeg;base64,${asset.base64}`);
    }
  };

  const handleSubmit = async () => {
    if (!image || !description) {
      Alert.alert("Missing Info", "Please capture a photo and write a short description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/rescue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          image,
          description,
          location: location || "Lucknow",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Submission Failed", data.message || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      Alert.alert(
        "Report Submitted",
        "Your rescue request has been saved and shared with nearby NGOs."
      );

      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Rescue submit error:", error);
      Alert.alert("Error", "Could not submit report. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={styles.heading}>Animal Rescue Alert</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Image Upload Area */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.retakeBadge}>
                  <Ionicons name="camera" size={16} color="#fff" style={{ marginRight: 4 }} />
                  <Text style={styles.retakeText}>Retake Photo</Text>
                </View>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <View style={styles.uploadIconCircle}>
                  <Ionicons name="camera-outline" size={32} color="#6d48ff" />
                </View>
                <Text style={styles.uploadText}>Capture Photo of Pet</Text>
                <Text style={styles.uploadSubtext}>Tap to open camera and snap a photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Description */}
          <Text style={styles.sectionLabel}>Add Details / Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Write a brief description of the animal, its condition, and exact landmarks..."
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Location Info */}
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#ff4d4d" />
            <Text style={styles.locText}>
              Estimated Location:{" "}
              {isLocating ? (
                <Text style={{ fontStyle: "italic", color: '#6b7280' }}>Fetching location...</Text>
              ) : (
                <Text style={{ fontWeight: "700", color: '#1f2937' }}>
                  {location || "Lucknow"}
                </Text>
              )}
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="megaphone-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.submitText}>Broadcast Rescue Alert</Text>
              </>
            )}
          </TouchableOpacity>

          {/* NGO List */}
          <Text style={styles.ngoHeader}>Rescue Partners Near Lucknow</Text>
          {NGOs.map((ngo, index) => (
            <View key={index} style={styles.ngoCard}>
              <View style={styles.ngoInfo}>
                <Text style={styles.ngoName}>{ngo.name}</Text>
                <Text style={styles.ngoAddr}>{ngo.address}</Text>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => Linking.openURL(`tel:${ngo.phone}`)}
              >
                <Ionicons name="call" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.callText}>Call Partner</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/first")}>
          <Entypo name="home" size={22} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/appointment")}>
          <Entypo name="calendar" size={22} color="#fff" />
          <Text style={styles.navLabel}>Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/rescue")}>
          <Ionicons name="paw-outline" size={22} color="#fff" style={{ opacity: 0.9 }} />
          <Text style={styles.navLabel}>Rescue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/appointmentRecords")}>
          <Ionicons name="document-text-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Records</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  imagePicker: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  retakeBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(31, 41, 55, 0.75)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  retakeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  uploadPlaceholder: {
    alignItems: "center",
    padding: 20,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f5f3ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4b5563",
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    fontSize: 15,
    color: "#1f2937",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  locText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 10,
    fontWeight: "500",
  },
  submitBtn: {
    flexDirection: "row",
    backgroundColor: "#ff4d4d",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff4d4d",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 32,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  ngoHeader: {
    fontSize: 16,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 16,
  },
  ngoCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  ngoInfo: {
    marginBottom: 12,
  },
  ngoName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  ngoAddr: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
    lineHeight: 18,
  },
  callBtn: {
    flexDirection: "row",
    backgroundColor: "#6d48ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  callText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6d48ff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
});
