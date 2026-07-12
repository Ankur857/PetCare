import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Labrador() {
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
            source={require("../assets/images/labra.png")}
          />
        </View>

        <Text style={styles.title}>Labrador Retriever</Text>
        <Text style={styles.subtitle}>Friendly, Active & Outgoing</Text>

        {/* Quick Stats badges */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color="#6d48ff" />
            <Text style={styles.statVal}>10-12 yrs</Text>
            <Text style={styles.statLabel}>Lifespan</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="fitness-outline" size={20} color="#10b981" />
            <Text style={styles.statVal}>Very High</Text>
            <Text style={styles.statLabel}>Activity</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="nutrition-outline" size={20} color="#f59e0b" />
            <Text style={styles.statVal}>Balanced</Text>
            <Text style={styles.statLabel}>Diet</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧬 Breed Overview</Text>
          <Text style={styles.text}>
            Labradors are friendly, active, and outgoing dogs. They are one of the most popular breeds in the world, known for their loyalty and intelligence. They make great family pets and are excellent with children.
          </Text>

          <Text style={styles.sectionTitle}>🏋️‍♂️ Activity Level</Text>
          <Text style={styles.text}>
            Very high. Labradors need regular exercise such as running, swimming, or playing fetch. They are not suited for a sedentary lifestyle.
          </Text>

          <Text style={styles.sectionTitle}>🧠 Temperament</Text>
          <Text style={styles.text}>
            Friendly, eager to please, intelligent, and sociable. Labradors are highly trainable and love being part of a family.
          </Text>

          <Text style={styles.sectionTitle}>💊 Common Health Issues</Text>
          <Text style={styles.bulletText}>• Hip and elbow dysplasia</Text>
          <Text style={styles.bulletText}>• Obesity (watch their diet!)</Text>
          <Text style={styles.bulletText}>• Progressive Retinal Atrophy (PRA)</Text>
          <Text style={styles.bulletText}>• Ear infections due to floppy ears</Text>
          <Text style={styles.bulletText}>• Exercise-induced collapse (EIC)</Text>

          <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
          <Text style={styles.bulletText}>• Limping or trouble standing (joint problems)</Text>
          <Text style={styles.bulletText}>• Cloudy eyes or vision loss (PRA)</Text>
          <Text style={styles.bulletText}>• Frequent scratching/shaking of head (ear infection)</Text>
          <Text style={styles.bulletText}>• Sudden collapse after activity (EIC)</Text>

          <Text style={styles.sectionTitle}>🩺 Veterinary Tips</Text>
          <Text style={styles.bulletText}>• Regular vet visits every 6 months</Text>
          <Text style={styles.bulletText}>• Keep vaccinations and deworming up to date</Text>
          <Text style={styles.bulletText}>• Annual blood tests after 5 years of age</Text>
          <Text style={styles.bulletText}>• Maintain a healthy weight and portions</Text>

          <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
          <Text style={styles.text}>
            Labradors are often used as guide dogs, search-and-rescue dogs, and therapy dogs due to their intelligence and calm behavior.
          </Text>

          <Text style={styles.footer}>🐾 Happy Pet Parenting!</Text>
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
