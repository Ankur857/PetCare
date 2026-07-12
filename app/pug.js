import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Pug() {
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
            source={require("../assets/images/pug.png")}
          />
        </View>

        <Text style={styles.title}>Pug</Text>
        <Text style={styles.subtitle}>Charming, Mischievous & Loving</Text>

        {/* Quick Stats badges */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color="#6d48ff" />
            <Text style={styles.statVal}>12-15 yrs</Text>
            <Text style={styles.statLabel}>Lifespan</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="fitness-outline" size={20} color="#10b981" />
            <Text style={styles.statVal}>Moderate</Text>
            <Text style={styles.statLabel}>Activity</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="nutrition-outline" size={20} color="#f59e0b" />
            <Text style={styles.statVal}>Low Fat</Text>
            <Text style={styles.statLabel}>Diet</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧬 Breed Overview</Text>
          <Text style={styles.text}>
            Pugs are charming, mischievous, and loving little dogs. Known for their wrinkled faces and curly tails, they are excellent companion pets with a great sense of humor and personality.
          </Text>

          <Text style={styles.sectionTitle}>🏋️‍♂️ Activity Level</Text>
          <Text style={styles.text}>
            Moderate. Pugs enjoy short walks and playtime but should not be over-exercised, especially in hot or humid weather due to potential breathing issues.
          </Text>

          <Text style={styles.sectionTitle}>🧠 Temperament</Text>
          <Text style={styles.text}>
            Affectionate, playful, and great with kids. Pugs are people-oriented, love cuddling, and thrive on human interaction and companionship.
          </Text>

          <Text style={styles.sectionTitle}>💊 Common Health Issues</Text>
          <Text style={styles.bulletText}>• Brachycephalic syndrome (breathing difficulty)</Text>
          <Text style={styles.bulletText}>• Obesity (prone to weight gain)</Text>
          <Text style={styles.bulletText}>• Eye conditions (dry eye, ulcers)</Text>
          <Text style={styles.bulletText}>• Hip dysplasia</Text>
          <Text style={styles.bulletText}>• Skin fold infections</Text>

          <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
          <Text style={styles.bulletText}>• Snorting, snoring, or labored breathing</Text>
          <Text style={styles.bulletText}>• Eye redness, squinting, or discharge</Text>
          <Text style={styles.bulletText}>• Itching or unpleasant odor in skin folds</Text>
          <Text style={styles.bulletText}>• Overeating or severe lethargy</Text>

          <Text style={styles.sectionTitle}>🩺 Veterinary Tips</Text>
          <Text style={styles.bulletText}>• Clean facial wrinkles daily with a damp cloth</Text>
          <Text style={styles.bulletText}>• Avoid extreme heat and humidity</Text>
          <Text style={styles.bulletText}>• Schedule annual dental cleanings</Text>
          <Text style={styles.bulletText}>• Perform regular eye checkups</Text>

          <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
          <Text style={styles.text}>
            Pugs were once the prized companions of Chinese emperors and later became very popular among European royalty, including Queen Victoria.
          </Text>

          <Text style={styles.footer}>🐾 Tiny Body, Huge Heart!</Text>
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
