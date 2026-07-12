import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function Index() {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("currentUser");
        if (token && user) {
          router.replace("/first");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLogin();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#f0f4ff", "#e0e7ff", "#c7d2fe"]}
        style={styles.gradientContainer}
      >
        <View style={styles.container}>
          {/* Paw illustration background icon/pattern mock */}
          <View style={styles.pawBackdrop}>
            <Image
              source={require("../assets/images/image.png")}
              style={styles.logo}
            />
          </View>

          <Text style={styles.title}>PetCare</Text>
          <Text style={styles.subtitle}>
            Your reliable companion for veterinary care, dog adoption insights, and quick animal rescue reporting.
          </Text>

          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={["#6d48ff", "#8e44ad"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.getStartedBtn}
            >
              <Pressable
                onPress={() => router.push("/login")}
                style={({ pressed }) => [
                  styles.pressable,
                  pressed && { opacity: 0.95 }
                ]}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  pawBackdrop: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 64,
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  getStartedBtn: {
    width: "100%",
    borderRadius: 20,
  },
  pressable: {
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
