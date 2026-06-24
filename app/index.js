import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export const options = {
  headerShown: false,
};

const { height, width } = Dimensions.get("window");

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/vetclinic_02.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.1 }}
    >
      <View style={styles.container}>
        <Image source={require("../assets/images/image.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome to PetCare</Text>
        <Text style={styles.subtitle}>Your trusted partner in pet health and happiness</Text>

        <LinearGradient
          colors={["#6d48ff", "#8e44ad"]}
          style={styles.getStartedBtn}
        >
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 17,
    color: "#666",
    textAlign: "center",
    marginBottom: 60,
    lineHeight: 24,
  },
  getStartedBtn: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
