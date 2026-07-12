import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "./config";

export default function AppointmentRecords() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/appointments`, {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isPastAppointment = (dateString) => {
    return new Date(dateString) < new Date();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Appointments</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6d48ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {appointments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={64} color="#d1d5db" />
              <Text style={styles.emptyText}>No appointments found.</Text>
            </View>
          ) : (
            appointments.map((item, index) => {
              const isPast = isPastAppointment(item.date);
              return (
                <View key={index} style={styles.cardContainer}>
                  <View style={styles.card}>
                    {/* Status Badge */}
                    <View style={styles.statusRow}>
                      <View style={[styles.statusBadge, { backgroundColor: isPast ? '#f3f4f6' : '#ecfdf5' }]}>
                        <Text style={[styles.statusText, { color: isPast ? '#6b7280' : '#10b981' }]}>
                          {isPast ? 'Completed' : 'Upcoming'}
                        </Text>
                      </View>
                      <Ionicons name="paw" size={20} color="#6d48ff" style={{ opacity: 0.8 }} />
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="heart-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Pet: <Text style={styles.value}>{item.pet}</Text></Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="person-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Doctor: <Text style={styles.value}>{item.doctor}</Text></Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="calendar-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Date: <Text style={styles.value}>{item.date}</Text></Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Time: <Text style={styles.value}>{item.time}</Text></Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="location-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Type: <Text style={styles.value}>{item.type}</Text></Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="chatbox-ellipses-outline" size={16} color="#6d48ff" style={styles.infoIcon} />
                      <Text style={styles.label}>Reason: <Text style={styles.value}>{item.reason}</Text></Text>
                    </View>
                  </View>

                  {/* Give Feedback Button */}
                  {isPast && (
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
                      <Ionicons name="star" size={16} color="#fff" style={{ marginRight: 6 }} />
                      <Text style={styles.feedbackButtonText}>Leave Feedback</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#9ca3af",
    fontWeight: "600",
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 3,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
    width: 20,
  },
  label: {
    fontWeight: "600",
    color: "#4b5563",
    fontSize: 14,
  },
  value: {
    fontWeight: "400",
    color: "#1f2937",
  },
  feedbackButton: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignSelf: "center",
    alignItems: "center",
    marginTop: -10,
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
