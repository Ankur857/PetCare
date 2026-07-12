import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function GermanShepherd() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breed Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Dog Image Section */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../assets/images/german.png")}
          />
        </View>

        <Text style={styles.title}>German Shepherd</Text>
        <Text style={styles.subtitle}>Confident, Courageous & Intelligent</Text>

        {/* Quick Stats badges */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color="#6d48ff" />
            <Text style={styles.statVal}>9-13 yrs</Text>
            <Text style={styles.statLabel}>Lifespan</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="fitness-outline" size={20} color="#10b981" />
            <Text style={styles.statVal}>Very High</Text>
            <Text style={styles.statLabel}>Activity</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="nutrition-outline" size={20} color="#f59e0b" />
            <Text style={styles.statVal}>Protein Diet</Text>
            <Text style={styles.statLabel}>Diet</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧬 Breed Overview</Text>
          <Text style={styles.text}>
            German Shepherds are confident, courageous, and smart. They are known for their loyalty and protective nature. Originally bred for herding, they are now widely used in police, military, and search & rescue operations.
          </Text>

          <Text style={styles.sectionTitle}>🏋️‍♂️ Activity Level</Text>
          <Text style={styles.text}>
            Very high. They need daily exercise, mental stimulation, and structural training activities like running, tracking, and obedience courses.
          </Text>

          <Text style={styles.sectionTitle}>🧠 Temperament</Text>
          <Text style={styles.text}>
            Intelligent, loyal, alert, and highly protective. They are incredibly quick learners and responsive to consistent training.
          </Text>

          <Text style={styles.sectionTitle}>💊 Common Health Issues</Text>
          <Text style={styles.bulletText}>• Hip & elbow dysplasia</Text>
          <Text style={styles.bulletText}>• Degenerative myelopathy</Text>
          <Text style={styles.bulletText}>• Skin allergies and irritations</Text>
          <Text style={styles.bulletText}>• Bloat (gastric torsion)</Text>

          <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
          <Text style={styles.bulletText}>• Lameness or stiffness during movement (joints)</Text>
          <Text style={styles.bulletText}>• Excessive scratching or hair loss (skin concerns)</Text>
          <Text style={styles.bulletText}>• Weakness in hind legs</Text>
          <Text style={styles.bulletText}>• Distended belly or excessive drooling</Text>

          <Text style={styles.sectionTitle}>🩺 Veterinary Tips</Text>
          <Text style={styles.bulletText}>• Regular hip, joint, and spine assessments</Text>
          <Text style={styles.bulletText}>• Keep ears clean and trim nails regularly</Text>
          <Text style={styles.bulletText}>• Brush their thick coat twice a week</Text>
          <Text style={styles.bulletText}>• Socialize them early to build confidence</Text>

          <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
          <Text style={styles.text}>
            German Shepherds are the 2nd most popular dog breed in the world and are often featured in movies, TV shows, and space/military missions.
          </Text>

          <Text style={styles.footer}>🐾 Loyal Guardian & Loving Friend!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  img: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    width: "30%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  statVal: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 2,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6d48ff",
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
  },
  bulletText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
    paddingLeft: 8,
    marginBottom: 2,
  },
  footer: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 32,
    color: "#6d48ff",
    fontWeight: "800",
  },
});
