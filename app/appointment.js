import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);

  const availableTimes = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
  ];

  const appointmentTypes = ["At Home", "At Clinic", "Online", "Emergency"];

  const handleBooking = () => {
    if (!selectedTime || !appointmentType) {
      Alert.alert("Missing Fields", "Please select time and appointment type.");
      return;
    }

    Alert.alert(
      "Appointment Confirmed",
      `Date: ${selectedDate}\nTime: ${selectedTime}\nType: ${appointmentType}`
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Schedule Appointment</Text>
        </View>

        {/* Calendar */}
        <Calendar
          current={selectedDate}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setSelectedTime(null);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#FF6B6B",
              selectedTextColor: "#fff",
            },
          }}
          style={styles.calendar}
          theme={{
            arrowColor: "#9B59B6",
            todayTextColor: "#9B59B6",
            selectedDayBackgroundColor: "#FF6B6B",
            selectedDayTextColor: "#fff",
            monthTextColor: "#2D3436",
            textMonthFontWeight: "bold",
            textMonthFontSize: 16,
            textDayFontSize: 14,
            textDayHeaderFontSize: 12,
          }}
        />

        {/* Time Selection */}
        <Text style={styles.heading}>Time</Text>
        <View style={styles.timeContainer}>
          {availableTimes.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeBox,
                selectedTime === time && styles.selectedTimeBox,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Type Selection */}
        <Text style={styles.heading}>Type</Text>
        <View style={styles.typeContainer}>
          {appointmentTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.typeBox,
                appointmentType === type && styles.selectedTypeBox,
              ]}
              onPress={() => setAppointmentType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  appointmentType === type && styles.selectedTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Button */}
        <Pressable style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>

      {/* Bottom Navigation */}
       <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/first")}
        >
          <Entypo name="home" size={24} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/appointment")}
        >
          <Entypo name="calendar" size={24} color="#fff" />
          <Text style={styles.navLabel}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/rescue")}
        >
          <Ionicons name="paw-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Rescue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Entypo name="cog" size={24} color="#fff" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3436",
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 10,
  },
  heading: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeBox: {
    backgroundColor: "#e0e0ff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
  },
  selectedTimeBox: {
    backgroundColor: "#FFA726",
  },
  timeText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  selectedTimeText: {
    color: "#fff",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  typeBox: {
    backgroundColor: "#ffe0e0",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "45%",
    alignItems: "center",
  },
  selectedTypeBox: {
    backgroundColor: "#ff7675",
  },
  typeText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  selectedTypeText: {
    color: "#fff",
  },
  bookButton: {
    backgroundColor: "#FFA726",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6d48ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
