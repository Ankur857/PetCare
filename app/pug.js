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

export default function Pug() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={36} color="#333" />
      </TouchableOpacity>

      {/* Dog Image */}
     <View style={styles.imageWrapper}>
  <Image
    style={styles.img}
    source={require("../assets/images/pug.png")}
  />
</View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Pug</Text>

        <Text style={styles.sectionTitle}>🧬 Breed Overview</Text>
        <Text style={styles.text}>
          Pugs are charming, mischievous, and loving little dogs. Known for their wrinkled face and curly tail, they are excellent companion pets with a great sense of humor.
        </Text>

        <Text style={styles.sectionTitle}>🏋️‍♂️ Activity Level</Text>
        <Text style={styles.text}>
          Moderate. Pugs enjoy short walks and playtime but should not be over-exercised, especially in heat due to breathing issues.
        </Text>

        <Text style={styles.sectionTitle}>🧠 Temperament</Text>
        <Text style={styles.text}>
          Affectionate, playful, and great with kids. Pugs are people-oriented and love cuddling and human interaction.
        </Text>

        <Text style={styles.sectionTitle}>💊 Common Health Issues</Text>
        <Text style={styles.text}>
          - Brachycephalic syndrome (breathing difficulty){"\n"}
          - Obesity{"\n"}
          - Eye conditions (dry eye, ulcers){"\n"}
          - Hip dysplasia{"\n"}
          - Skin infections in wrinkles
        </Text>

        <Text style={styles.sectionTitle}>📋 Symptoms to Watch For</Text>
        <Text style={styles.text}>
          - Snorting or labored breathing{"\n"}
          - Eye redness, squinting, or discharge{"\n"}
          - Itching or odor in skin folds{"\n"}
          - Overeating or lethargy
        </Text>

        <Text style={styles.sectionTitle}>🎂 Life Span</Text>
        <Text style={styles.text}>
          12 to 15 years with proper care, a good diet, and weight management.
        </Text>

        <Text style={styles.sectionTitle}>🍗 Ideal Diet</Text>
        <Text style={styles.text}>
          Low-fat, high-quality kibble. Pugs are prone to weight gain, so portion control is essential. Avoid table scraps.
        </Text>

        <Text style={styles.sectionTitle}>🩺 Vet Tips</Text>
        <Text style={styles.text}>
          - Clean facial wrinkles daily{"\n"}
          - Avoid extreme heat and humidity{"\n"}
          - Annual dental cleaning{"\n"}
          - Regular eye checkups
        </Text>

        <Text style={styles.sectionTitle}>💡 Fun Fact</Text>
        <Text style={styles.text}>
          Pugs were once the companions of Chinese emperors and later became popular among European royalty.
        </Text>

        <Text style={styles.footer}>🐾 Tiny Body, Huge Heart!</Text>
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
  imageWrapper: {
  width: hp(30),
  height: hp(30),
  alignSelf: "center",
  marginTop: 50,
  borderRadius: 10,
  overflow: "hidden",
  borderWidth: 8,
  borderColor: "#ccc",
  backgroundColor: "#000",
},

img: {
  width: "85%",
  height: "100%",
  resizeMode: "cover",
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
