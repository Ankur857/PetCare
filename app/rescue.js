import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

const NGOs = [
  {
    name: "Astradharini Foundation",
    address: "A-71, Subash Nagar, Nehru Vihar, Kalyanpur (East), Lucknow",
    phone: "06393943447",
  },
  {
    name: "IGSS Animals Care NGO",
    address: "1/22, Viram Khand 1, Gomti Nagar, Lucknow",
    phone: "09838222033",
  },
  {
    name: "Animal Rescue Lucknow",
    address: "Meena Market, Liberty Colony Park, Indira Nagar, Lucknow",
    phone: "09120696610",
  },
];

export default function Rescue() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync(loc.coords);
      const area = address[0]?.suburb || address[0]?.district || "Lucknow";
      setLocation(area);
    })();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image || !description) {
      Alert.alert("Missing Info", "Please add image and description.");
      return;
    }

    console.log("Submitted to all NGOs:");
    console.log("Location:", location);
    console.log("Description:", description);
    console.log("Image:", image);

    Alert.alert(
      "Report Submitted",
      "Your rescue request has been shared with all nearby NGOs."
    );

    setDescription("");
    setImage(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color="#333" />
          </TouchableOpacity>
          <Text style={styles.heading}>Report Animal Rescue</Text>
        </View>

        {/* Image Upload */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={{ color: "#666" }}>Click Photo</Text>
          )}
        </TouchableOpacity>

        {/* Description */}
        <TextInput
          style={styles.input}
          placeholder="Add a short description..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Location Info */}
        <Text style={styles.locText}>
          Location:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {location || "Fetching..."}
          </Text>
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>

        {/* NGO List */}
        <Text style={styles.ngoHeader}>NGOs Notified</Text>
        {NGOs.map((ngo, index) => (
          <View key={index} style={styles.ngoCard}>
            <Text style={styles.ngoName}>{ngo.name}</Text>
            <Text style={styles.ngoAddr}>{ngo.address}</Text>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${ngo.phone}`)}
            >
              <Ionicons name="call-outline" size={18} color="#fff" />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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

       <TouchableOpacity onPress={() => router.push("/appointmentRecords")}>
  <Ionicons name="document-text-outline" size={24} color="#fff" />
  <Text style={styles.navLabel}>Records</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
  },
  imagePicker: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  input: {
    backgroundColor: "#d5cfcfff",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  locText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  ngoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  ngoCard: {
    backgroundColor: "#f8f8ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  ngoName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  ngoAddr: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
  },
  callBtn: {
    flexDirection: "row",
    backgroundColor: "#6d48ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  callText: {
    color: "#fff",
    fontSize: 14,
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
    gap: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    alignSelf:'center',
  },
});
