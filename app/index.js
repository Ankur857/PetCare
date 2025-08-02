import { router } from "expo-router";
import { Image, Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";

export const options = {
  headerShown: false,
};

const { height, width } = Dimensions.get("window");

export default function Index() {
  const petAnim = useRef(null);

  useEffect(() => {
    petAnim.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/doc.png")}
        style={styles.bgImage}
      />

      {/* Pet Animation */}
      <LottieView
        ref={petAnim}
        source={require("../assets/animations/pet.json")}
        style={styles.petAnim}
        loop
        autoPlay
      />

      {/* Text Content */}
      <View style={styles.tcont}>
        <Text style={styles.ft}>Welcome to PetCare</Text>
        <Text style={styles.subText}>Your one-stop solution for pet appointments and care</Text>
      </View>

      {/* Button */}
      <Pressable style={styles.btn} onPress={() => router.push("first")}>
        <Text style={styles.btntext}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  bgImage: {
    width: "100%",
    height: "55%",
    resizeMode: "cover",
  },
  tcont: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  ft: {
    color: "#2e86de",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#2e86de",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 90,
    alignSelf: "center",
    marginTop: 90,
    width: "50%",
    elevation: 3,
  },
  btntext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  petAnim: {
    position: "absolute",
    bottom: 120,
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
