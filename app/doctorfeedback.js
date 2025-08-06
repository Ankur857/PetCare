import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorFeedback() {
  const { doctorName, appointmentId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select a star rating.");
      return;
    }

    const newFeedback = {
      doctor: doctorName,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    };

    try {
      const stored = await AsyncStorage.getItem("feedbacks");
      const feedbacks = stored ? JSON.parse(stored) : [];
      feedbacks.push(newFeedback);
      await AsyncStorage.setItem("feedbacks", JSON.stringify(feedbacks));

      Alert.alert("Thank You!", "Your feedback has been submitted.");
      router.back();
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Doctor Feedback</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Doctor: {doctorName}</Text>
        <Text style={styles.label}>Rate your experience:</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Ionicons
                name={i <= rating ? "star" : "star-outline"}
                size={32}
                color="#FFD700"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Leave a Review:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={review}
          onChangeText={setReview}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3436",
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "600",
  },
  stars: {
    flexDirection: "row",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA726",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
