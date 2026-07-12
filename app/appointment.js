import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

const doctorData = [
  {
    id: "1",
    name: "Dr. Diwakar Singh",
    specialty: "BVSc & AH (Senior Vet)",
    rating: "4.9",
    experience: "12 Years",
    patients: "1,800+ Pets",
    fee: "$25",
    location: "Paws & Claws Clinic, Lucknow",
    bio: "Dr. Diwakar is a passionate veterinarian dedicated to small animal wellness. He specializes in canine diagnostics and preventative care.",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "2",
    name: "Dr. Saurabh Chaturvedi",
    specialty: "BVSc, MVSc (Surgeon)",
    rating: "4.8",
    experience: "8 Years",
    patients: "1,200+ Pets",
    fee: "$35",
    location: "Metro Pet Hospital, Lucknow",
    bio: "Dr. Saurabh specializes in orthopedic and soft-tissue animal surgeries. He is committed to providing high-quality operative treatments.",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "3",
    name: "Dr. Gopal K. Shukla",
    specialty: "BVSc, MVSc (Pediatrician)",
    rating: "4.9",
    experience: "15 Years",
    patients: "2,500+ Pets",
    fee: "$30",
    location: "Pet Care Medical Center, Lucknow",
    bio: "Dr. Gopal is an expert in puppy growth stages and feline pediatric medicine. He aims to make vet visits stress-free for young pets.",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "4",
    name: "Dr. Rahul Chandra",
    specialty: "BVSc, MVSc (Dermatology)",
    rating: "4.7",
    experience: "6 Years",
    patients: "900+ Pets",
    fee: "$28",
    location: "Fur & Skin Specialty Clinic, Lucknow",
    bio: "Dr. Rahul treats complicated pet skin conditions, allergies, and ear infections. He utilizes advanced diagnostic skin testing methods.",
    image: require("../assets/images/doc.png"),
  },
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
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Deep-link auto-select doctor if passed from dashboard
  useEffect(() => {
    if (params?.doctorId) {
      const doc = doctorData.find((d) => d.id === params.doctorId);
      if (doc) {
        setSelectedDoctor(doc);
      }
    }
  }, [params?.doctorId]);

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
    };

    setIsBooking(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(appointmentDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not schedule appointment.");
        setIsBooking(false);
        return;
      }

      Alert.alert("Appointment Confirmed", `${appointmentDetails.pet} - ${appointmentDetails.date} at ${appointmentDetails.time}`);
      setIsBooking(false);
      router.replace("/first");
    } catch (error) {
      console.error("Booking error:", error);
      setIsBooking(false);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Book Appointment</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Pet Selection */}
          <Text style={styles.heading}>Select Your Pet Breed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {dogBreeds.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[styles.cardItem, selectedPet?.id === pet.id && styles.selectedItem]}
                onPress={() => setSelectedPet(pet)}
              >
                <Image source={pet.image} style={styles.cardImage} />
                <Text style={styles.cardName}>{pet.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Doctor Selection */}
          <Text style={styles.heading}>Select Doctor</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {doctorData.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={[styles.cardItem, { width: 140 }, selectedDoctor?.id === doctor.id && styles.selectedItem]}
                onPress={() => setSelectedDoctor(doctor)}
              >
                <Image source={doctor.image} style={styles.cardImage} />
                <Text style={styles.cardName}>{doctor.name}</Text>
                <Text style={styles.cardSpec}>{doctor.specialty}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Selected Doctor Summary Profile Details */}
          {selectedDoctor && (
            <View style={styles.doctorSummaryBox}>
              <Text style={styles.summaryTitle}>Doctor Information</Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryCol}>
                  <Text style={styles.summaryLabel}>Consultation Fee</Text>
                  <Text style={styles.summaryVal}>{selectedDoctor.fee}</Text>
                </View>
                <View style={styles.summaryCol}>
                  <Text style={styles.summaryLabel}>Experience</Text>
                  <Text style={styles.summaryVal}>{selectedDoctor.experience}</Text>
                </View>
                <View style={styles.summaryCol}>
                  <Text style={styles.summaryLabel}>Patients Served</Text>
                  <Text style={styles.summaryVal}>{selectedDoctor.patients}</Text>
                </View>
              </View>
              <Text style={styles.summaryLabel}>Clinic Location</Text>
              <Text style={styles.summaryLocationText}>{selectedDoctor.location}</Text>
              <Text style={styles.summaryLabel}>About Doctor</Text>
              <Text style={styles.summaryBioText}>{selectedDoctor.bio}</Text>
            </View>
          )}

          {/* Calendar */}
          <Text style={styles.heading}>Select Date</Text>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setSelectedTime(null);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#6d48ff",
                selectedTextColor: "#fff",
              },
            }}
            style={styles.calendar}
            theme={{
              arrowColor: "#6d48ff",
              todayTextColor: "#6d48ff",
              selectedDayBackgroundColor: "#6d48ff",
              selectedDayTextColor: "#fff",
              monthTextColor: "#1f2937",
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
            }}
          />

          {/* Time Selection */}
          <Text style={styles.heading}>Select Time Slot</Text>
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
            {["At Clinic", "At Home", "Online Consultation", "Emergency"].map((type, index) => (
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.typeBox, selectedReason === reason && styles.selectedTypeBox]}
                onPress={() => {
                  setSelectedReason(reason);
                  setCustomReason("");
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
              placeholder="Please describe the reason..."
              placeholderTextColor="#9ca3af"
              style={styles.customReasonInput}
              value={customReason}
              onChangeText={setCustomReason}
              multiline
            />
          )}

          {/* Book Button */}
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={isBooking}>
            {isBooking ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/first")}>
          <Entypo name="home" size={22} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/appointment")}>
          <Entypo name="calendar" size={22} color="#fff" style={{ opacity: 0.9 }} />
          <Text style={styles.navLabel}>Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/rescue")}>
          <Ionicons name="paw-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Rescue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/appointmentRecords")}>
          <Ionicons name="document-text-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Records</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  heading: {
    fontWeight: "700",
    color: "#374151",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  cardItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 12,
    width: 110,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedItem: {
    borderColor: "#6d48ff",
    borderWidth: 2,
    backgroundColor: "#eff6ff",
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  cardName: {
    fontWeight: "700",
    fontSize: 13,
    color: "#1f2937",
    textAlign: "center",
  },
  cardSpec: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 2,
  },
  doctorSummaryBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginTop: 10,
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryCol: {
    width: "30%",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: "800",
    color: "#6d48ff",
  },
  summaryLocationText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryBioText: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 18,
  },
  calendar: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeBox: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedTimeBox: {
    backgroundColor: "#6d48ff",
    borderColor: "#6d48ff",
  },
  timeText: {
    color: "#4b5563",
    fontWeight: "600",
    fontSize: 13,
  },
  selectedTimeText: {
    color: "#fff",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  typeBox: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedTypeBox: {
    backgroundColor: "#6d48ff",
    borderColor: "#6d48ff",
  },
  typeText: {
    color: "#4b5563",
    fontWeight: "600",
    fontSize: 13,
  },
  selectedTypeText: {
    color: "#fff",
  },
  customReasonInput: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    fontSize: 15,
    color: '#1f2937',
    minHeight: 80,
    textAlignVertical: 'top',
    marginTop: 6,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: "#6d48ff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6d48ff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
});
