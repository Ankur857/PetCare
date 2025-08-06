import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  Animated,
  ScrollView,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const doctorData = [
  { id: "1", name: "Dr. Diwakar Singh", specialty: "BVSc", image: require("../assets/images/doc.png") },
  { id: "2", name: "Dr. Saurabh Chaturvedi", specialty: "BVSc, MVSc", image: require("../assets/images/doc.png") },
  { id: "3", name: "Dr. Gopal Krishna Shukla", specialty: "BVSc, MVSc", image: require("../assets/images/doc.png") },
  { id: "4", name: "Dr. Rahul Chandra", specialty: "BVSc, MVSc", image: require("../assets/images/doc.png") },
];

const dogBreeds = [
  { id: "1", name: "Labrador", image: require("../assets/images/labra.webp") },
  { id: "2", name: "German Shepherd", image: require("../assets/images/GER.webp") },
  { id: "3", name: "Pug", image: require("../assets/images/pug.jpg") },
  { id: "4", name: "Golden Retriever", image: require("../assets/images/gol.webp") },
  { id: "5", name: "Beagle", image: require("../assets/images/be.jpg") },
  { id: "6", name: "Doberman Pinscher", image: require("../assets/images/dob.webp") },
];

const reasons = ["Vaccination", "Injury", "Regular Checkup", "Skin Issues", "Dental Problems", "Other"];

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

 const handleBooking = async () => {
  if (!selectedPet || !selectedDoctor || !selectedTime || !appointmentType || !selectedReason || (selectedReason === "Other" && !customReason.trim())) {
    Alert.alert("Missing Fields", "Please complete all required fields.");
    return;
  }

  const reasonToShow = selectedReason === "Other" ? customReason : selectedReason;

  const appointmentDetails = {
    pet: selectedPet.name,
    doctor: selectedDoctor.name,
    date: selectedDate,
    time: selectedTime,
    type: appointmentType,
    reason: reasonToShow,
    timestamp: new Date().toISOString()
  };

  try {
    const existing = await AsyncStorage.getItem("appointments");
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(appointmentDetails);
    await AsyncStorage.setItem("appointments", JSON.stringify(parsed));
    Alert.alert("Appointment Confirmed", `${appointmentDetails.pet} - ${appointmentDetails.date} at ${appointmentDetails.time}`);
  } catch (error) {
    Alert.alert("Error", "Could not save appointment.");
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Schedule Appointment</Text>
          </View>

          {/* Pet Selection */}
          <Text style={styles.heading}>Select Your Pet</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dogBreeds.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[styles.doctorCard, selectedPet?.id === pet.id && styles.selectedDoc]}
                onPress={() => setSelectedPet(pet)}
              >
                <Image source={pet.image} style={styles.docImage} />
                <Text style={styles.docName}>{pet.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Doctor Selection */}
          <Text style={styles.heading}>Select Doctor</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {doctorData.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={[styles.doctorCard, selectedDoctor?.id === doctor.id && styles.selectedDoc]}
                onPress={() => setSelectedDoctor(doctor)}
              >
                <Image source={doctor.image} style={styles.docImage} />
                <Text style={styles.docName}>{doctor.name}</Text>
                <Text style={styles.docSpec}>{doctor.specialty}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
            }}
          />

          {/* Time Selection */}
          <Text style={styles.heading}>Select Time</Text>
          <View style={styles.timeContainer}>
            {["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"].map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.timeBox, selectedTime === time && styles.selectedTimeBox]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Appointment Type */}
          <Text style={styles.heading}>Appointment Type</Text>
          <View style={styles.typeContainer}>
            {["At Home", "At Clinic", "Online", "Emergency"].map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.typeBox, appointmentType === type && styles.selectedTypeBox]}
                onPress={() => setAppointmentType(type)}
              >
                <Text style={[styles.typeText, appointmentType === type && styles.selectedTypeText]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reason to Visit */}
          <Text style={styles.heading}>Reason to Visit</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.typeBox, selectedReason === reason && styles.selectedTypeBox]}
                onPress={() => {
                  setSelectedReason(reason);
                  setCustomReason(""); // don't auto-fill input
                }}
              >
                <Text style={[styles.typeText, selectedReason === reason && styles.selectedTypeText]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedReason === "Other" && (
            <TextInput
              placeholder="Enter reason here..."
              style={styles.customReasonInput}
              value={customReason}
              onChangeText={setCustomReason}
              multiline
            />
          )}

          {/* Book Button */}
          <Pressable style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/first")}>
          <Entypo name="home" size={24} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/appointment")}>
          <Entypo name="calendar" size={24} color="#fff" />
          <Text style={styles.navLabel}>Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/rescue")}>
          <Ionicons name="paw-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Rescue</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/appointmentRecords")}>
  <Ionicons name="document-text-outline" size={24} color="#fff" />
  <Text style={styles.navLabel}>Records</Text>
</TouchableOpacity>

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
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
  heading: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 6,
  },
  doctorCard: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    width: 120,
  },
  selectedDoc: {
    backgroundColor: "#c8e6c9",
  },
  docImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  docName: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  docSpec: {
    fontSize: 11,
    textAlign: "center",
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 10,
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
    marginBottom: 10,
  },
  typeBox: {
    backgroundColor: "#ffe0e0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
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
  customReasonInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 20,
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
    position: "absolute",
    bottom: 10,
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
