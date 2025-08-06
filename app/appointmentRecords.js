import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentRecords() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("appointments");
      if (data) {
        setAppointments(JSON.parse(data).reverse()); // most recent first
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Appointments</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {appointments.length === 0 ? (
          <Text style={{ marginTop: 30, fontSize: 16, color: "gray" }}>No appointments found.</Text>
        ) : (
          appointments.map((item, index) => (
         <View key={index} style={{ marginBottom: 20 }}>
  <View style={styles.card}>
    <Text style={styles.label}>🐶 Pet: <Text style={styles.value}>{item.pet}</Text></Text>
    <Text style={styles.label}>👨‍⚕️ Doctor: <Text style={styles.value}>{item.doctor}</Text></Text>
    <Text style={styles.label}>📅 Date: <Text style={styles.value}>{item.date}</Text></Text>
    <Text style={styles.label}>⏰ Time: <Text style={styles.value}>{item.time}</Text></Text>
    <Text style={styles.label}>📍 Type: <Text style={styles.value}>{item.type}</Text></Text>
    <Text style={styles.label}>📝 Reason: <Text style={styles.value}>{item.reason}</Text></Text>
  </View>

  {/* Button outside the card */}
  {new Date(item.date) < new Date() && (
    <TouchableOpacity
      style={styles.feedbackButton}
      onPress={() =>
        router.push({
          pathname: "/doctorfeedback",
          params: {
            doctor: item.doctor,
            pet: item.pet,
            date: item.date,
          },
        })
      }
    >
      <Text style={styles.feedbackButtonText}>Give Feedback</Text>
    </TouchableOpacity>
  )}
</View>


          ))
        )}
      </ScrollView>
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
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  value: {
    fontWeight: "normal",
    color: "#000",
  },
  feedbackButton: {
  backgroundColor: "#8e44ad", // Purple color
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignSelf: "center",
  marginTop: 6,
  elevation: 2,
},
feedbackButtonText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
},

});
