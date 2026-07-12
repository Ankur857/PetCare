import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

export default function DoctorFeedback() {
  const { doctorName, doctor } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeDoctor = doctorName || doctor || "Doctor";

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select a star rating.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          doctor: activeDoctor,
          rating,
          review,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Failed to submit feedback.");
        setIsSubmitting(false);
        return;
      }

      Alert.alert("Thank You!", "Your feedback has been submitted successfully.");
      setIsSubmitting(false);
      router.back();
    } catch (error) {
      console.error("Error saving feedback:", error);
      setIsSubmitting(false);
      Alert.alert("Error", "Could not submit feedback. Please check connection.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback & Rating</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#6d48ff" />
          </View>
          <Text style={styles.doctorName}>{activeDoctor}</Text>
          <Text style={styles.subtitle}>How was your consultation experience?</Text>

          {/* Stars */}
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starTouch}>
                <Ionicons
                  name={i <= rating ? "star" : "star-outline"}
                  size={36}
                  color="#fbbf24"
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Write a Review</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your review details here..."
            placeholderTextColor="#9ca3af"
            value={review}
            onChangeText={setReview}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="paper-plane-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Submit Review</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  container: {
    padding: 24,
    justifyContent: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f3ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
    marginBottom: 20,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 24,
  },
  starTouch: {
    paddingHorizontal: 6,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    fontSize: 15,
    color: "#1f2937",
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6d48ff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
