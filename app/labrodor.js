import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Labrador() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Image Header */}
      <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons style={styles.arr} name="arrow-back" size={36} color="#333" />
    </TouchableOpacity>
      <Image
        style={styles.img}
        source={require("../assets/images/labra.png")}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Labrador Retriever</Text>

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
        <Text style={styles.text}>
          - Hip and elbow dysplasia{"\n"}
          - Obesity (watch their diet!){"\n"}
          - Progressive Retinal Atrophy (PRA){"\n"}
          - Ear infections due to floppy ears{"\n"}
          - Exercise-induced collapse (EIC)
        </Text>

        <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
        <Text style={styles.text}>
          - Limping or trouble standing (joint problems){"\n"}
          - Cloudy eyes or vision loss (PRA){"\n"}
          - Frequent scratching/shaking of head (ear infection){"\n"}
          - Sudden collapse after activity (EIC)
        </Text>

        <Text style={styles.sectionTitle}>🎂 Life Span</Text>
        <Text style={styles.text}>
          10 to 12 years on average with proper diet, exercise, and regular vet checkups.
        </Text>

        <Text style={styles.sectionTitle}>🍗 Ideal Diet</Text>
        <Text style={styles.text}>
          High-quality dog food with balanced protein and fat. Avoid overfeeding – Labradors are prone to weight gain.
        </Text>

        <Text style={styles.sectionTitle}>🩺 Vet Tips</Text>
        <Text style={styles.text}>
          - Regular vet visits every 6 months{"\n"}
          - Keep vaccinations and deworming up to date{"\n"}
          - Annual blood tests after 5 years of age{"\n"}
          - Maintain a healthy weight
        </Text>

        <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
        <Text style={styles.text}>
          Labradors are often used as guide dogs, search-and-rescue dogs, and therapy dogs due to their intelligence and calm behavior.
        </Text>

        <Text style={styles.footer}>🐶 Happy Pet Parenting!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: hp(30),
    height: hp(30),
    marginTop:60,
    borderRadius:10,
    alignSelf:'center',
    borderWidth:8,
    resizeMode: "cover",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor:'black',
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
  arr:{
     position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  }
});
