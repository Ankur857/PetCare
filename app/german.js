import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function GermanShepherd() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={36} color="#333" />
      </TouchableOpacity>

      {/* Dog Image */}
      <Image
        style={styles.img}
        source={require("../assets/images/german.png")}
      />

      {/* Scrollable Breed Info */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>German Shepherd</Text>

        <Text style={styles.sectionTitle}>🧬 Breed Overview</Text>
        <Text style={styles.text}>
          German Shepherds are confident, courageous, and smart. They are known
          for their loyalty and protective nature. Originally bred for herding,
          they are now used in police, military, and search & rescue roles.
        </Text>

        <Text style={styles.sectionTitle}>🏋️‍♂️ Activity Level</Text>
        <Text style={styles.text}>
          Very high. They need daily exercise, mental stimulation, and
          activities like running, obedience training, or agility courses.
        </Text>

        <Text style={styles.sectionTitle}>🧠 Temperament</Text>
        <Text style={styles.text}>
          Intelligent, loyal, alert, and protective. They are quick learners and
          very obedient when properly trained.
        </Text>

        <Text style={styles.sectionTitle}>💊 Common Health Issues</Text>
        <Text style={styles.text}>
          - Hip & elbow dysplasia{"\n"}
          - Degenerative myelopathy{"\n"}
          - Allergies (skin issues){"\n"}
          - Bloat (gastric torsion)
        </Text>

        <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
        <Text style={styles.text}>
          - Lameness or stiffness (joint issues){"\n"}
          - Excessive scratching or hair loss (allergies){"\n"}
          - Weak hind legs (myelopathy){"\n"}
          - Distended belly or drooling (bloat)
        </Text>

        <Text style={styles.sectionTitle}>🎂 Life Span</Text>
        <Text style={styles.text}>9 to 13 years with proper care.</Text>

        <Text style={styles.sectionTitle}>🍗 Ideal Diet</Text>
        <Text style={styles.text}>
          High-protein, moderate-fat diet with joint supplements like glucosamine.
          Avoid overfeeding and give fresh water always.
        </Text>

        <Text style={styles.sectionTitle}>🩺 Vet Tips</Text>
        <Text style={styles.text}>
          - Get regular hip and spine checkups{"\n"}
          - Keep their ears clean and nails trimmed{"\n"}
          - Brush their coat twice a week{"\n"}
          - Socialize them early
        </Text>

        <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
        <Text style={styles.text}>
          German Shepherds are the 2nd most popular dog breed in the world and
          are featured in many movies and military missions.
        </Text>

        <Text style={styles.footer}>🐾 Loyal Guardian & Loving Friend!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
   position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  img: {
    width: hp(30),
    height: hp(30),
    marginTop: 50,
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 8,
    resizeMode: "cover",
    borderColor: "#ccc",
    backgroundColor: "black",
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  footer: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    color: "#6d48ff",
    fontWeight: "bold",
  },
});
