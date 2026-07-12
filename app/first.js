import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useRef, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const cardData = [
  {
    id: "1",
    title: "Find Your Ideal Dog",
    subtitle: "Explore breeds that suit\nyour home, lifestyle, and energy",
    image: require("../assets/images/dog1.png"),
  },
  {
    id: "2",
    title: "Be a Responsible Owner",
    subtitle: "Dogs need love, care,\nand regular vet visits",
    image: require("../assets/images/dog2.png"),
  },
  {
    id: "3",
    title: "Adopt, Don’t Shop 🐾",
    subtitle: "Give a homeless pet a chance\nto live and love again",
    image: require("../assets/images/dog3.png"),
  },
];

const categories = [
  { id: "1", name: "Labrador", image: require("../assets/images/labra.webp") },
  { id: "2", name: "German Shepherd", image: require("../assets/images/GER.webp") },
  { id: "3", name: "Pug", image: require("../assets/images/pug.jpg") },
  { id: "4", name: "Golden Retriever", image: require("../assets/images/gol.webp") },
  { id: "5", name: "Beagle", image: require("../assets/images/be.jpg") },
  { id: "6", name: "Doberman Pinscher", image: require("../assets/images/dob.webp") },
];

const doctorData = [
  {
    id: "1",
    name: "Dr. Diwakar Singh",
    specialty: "BVSc",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "2",
    name: "Dr. Saurabh Chaturvedi",
    specialty: "BVSc, MVSc",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "3",
    name: "Dr. Gopal Krishna Shukla",
    specialty: "BVSc, MVSc",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "4",
    name: "Dr. Rahul Chandra",
    specialty: "BVSc, MVSc",
    image: require("../assets/images/doc.png"),
  },
];

const chunkArray = (array, size) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
};

const categoryPages = chunkArray(categories, 3);

const Card = ({ title, subtitle, image }) => (
  <LinearGradient
    colors={["#6d48ff", "#8e44ad"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.card}
  >
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Image source={image} style={styles.image} />
  </LinearGradient>
);

export default function First() {
  const flatListRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    };
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.removeItem('currentUser');
            await AsyncStorage.removeItem('token');
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setShowProfileMenu((prev) => !prev)}
          >
            <AntDesign name="user" size={34} color="#fff" />
          </TouchableOpacity>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.welcomeText}>Hello, {currentUser?.name || 'Guest'}!</Text>
            <Text style={styles.subWelcome}>How can we help today?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notifyIcon}>
          <Ionicons name="notifications-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Menu */}
      {showProfileMenu && (
        <View style={styles.profileMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/profile");
            }}
          >
            <AntDesign name="user" size={20} color="#555" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/appointmentRecords");
            }}
          >
            <Entypo name="calendar" size={20} color="#555" style={styles.menuIcon} />
            <Text style={styles.menuText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/settings");
            }}
          >
            <Entypo name="cog" size={20} color="#555" style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <AntDesign name="logout" size={20} color="#ff6b6b" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: "#ff6b6b" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Auto-scrolling cards */}
      <View style={{ height: hp(24) }}>
        <FlatList
          ref={flatListRef}
          data={cardData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentCardIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={{ width: width, alignItems: "center" }}>
              <Card
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
              />
            </View>
          )}
        />
      </View>

      {/* Breeds Section */}
      <Text style={styles.opt}>Dog Breeds</Text>
      <FlatList
        data={categoryPages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryPage}>
            {item.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <TouchableOpacity
                  onPress={() => {
                    let route = "";
                    if (category.name === "Labrador") route = "/labrodor";
                    else if (category.name === "German Shepherd") route = "/german";
                    else if (category.name === "Pug") route = "/pug";
                    router.push({
                      pathname: route,
                      params: { id: category.id, name: category.name },
                    });
                  }}
                >
                  <Image source={category.image} style={styles.breedimg} />
                </TouchableOpacity>
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Doctors Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Doctors</Text>
      </View>
      <FlatList
        data={doctorData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <Image source={item.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          </View>
        )}
      />

      {/* Bottom Nav */}
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
    flex: 1,
    backgroundColor: "#f8f9ff",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  iconBox: {
    backgroundColor: "#6d48ff",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subWelcome: {
    fontSize: 14,
    color: "#666",
  },
  notifyIcon: {
    marginRight: 10,
  },
  profileMenu: {
    position: "absolute",
    top: 120,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
    width: 200,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 15,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(6),
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    width: "85%",
    minHeight: hp(2),
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: wp(4.8),
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#f0f0f0",
    fontSize: wp(3.6),
  },
  image: {
    width: hp(12),
    height: hp(13),
    resizeMode: "contain",
    marginLeft: wp(3),
  },
  opt: {
    fontSize: 22,
    color: "#333",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  categoryPage: {
    width: width - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  categoryItem: {
    width: (width - 80) / 3,
    alignItems: "center",
  },
  breedimg: {
    width: 90,
    height: 90,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#6d48ff",
  },
  categoryLabel: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: 200,
    marginRight: 15,
    height: 200,
    marginBottom: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "contain",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#6d48ff",
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
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
