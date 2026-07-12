import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
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
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const cardData = [
  {
    id: "1",
    title: "Find Your Ideal Dog",
    subtitle: "Explore breeds that suit your home, lifestyle, and energy level",
    image: require("../assets/images/dog1.png"),
  },
  {
    id: "2",
    title: "Be a Responsible Owner",
    subtitle: "Dogs need love, care, and regular veterinary checkups",
    image: require("../assets/images/dog2.png"),
  },
  {
    id: "3",
    title: "Adopt, Don’t Shop 🐾",
    subtitle: "Give a homeless pet a second chance to live and love",
    image: require("../assets/images/dog3.png"),
  },
];

const categories = [
  { id: "1", name: "Labrador", image: require("../assets/images/labra.webp") },
  { id: "2", name: "German Shepherd", image: require("../assets/images/GER.webp") },
  { id: "3", name: "Pug", image: require("../assets/images/pug.jpg") },
  { id: "4", name: "Golden Retriever", image: require("../assets/images/gol.webp") },
  { id: "5", name: "Beagle", image: require("../assets/images/be.jpg") },
  { id: "6", name: "Doberman", image: require("../assets/images/dob.webp") },
];

const doctorData = [
  {
    id: "1",
    name: "Dr. Diwakar Singh",
    specialty: "BVSc & AH (Senior Vet)",
    rating: "4.9",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "2",
    name: "Dr. Saurabh Chaturvedi",
    specialty: "BVSc, MVSc (Surgeon)",
    rating: "4.8",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "3",
    name: "Dr. Gopal K. Shukla",
    specialty: "BVSc, MVSc (Pediatrician)",
    rating: "4.9",
    image: require("../assets/images/doc.png"),
  },
  {
    id: "4",
    name: "Dr. Rahul Chandra",
    specialty: "BVSc, MVSc (Dermatology)",
    rating: "4.7",
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
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <Image source={image} style={styles.cardImage} />
  </LinearGradient>
);

export default function First() {
  const flatListRef = useRef(null);
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

  const getInitials = (userName) => {
    if (!userName) return 'U';
    return userName.trim().substring(0, 1).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerUserInfo}>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => setShowProfileMenu((prev) => !prev)}
          >
            <LinearGradient
              colors={["#6d48ff", "#8e44ad"]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>{getInitials(currentUser?.name)}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.welcomeText}>Hello, {currentUser?.name || 'Guest'} 👋</Text>
            <Text style={styles.subWelcome}>How is your pet doing today?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notifyIcon} onPress={() => Alert.alert("Notifications", "You have no new notifications.")}>
          <View style={styles.bellWrapper}>
            <Ionicons name="notifications-outline" size={26} color="#1f2937" />
            <View style={styles.activeDot} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Menu Dropdown */}
      {showProfileMenu && (
        <View style={styles.profileMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/profile");
            }}
          >
            <AntDesign name="user" size={18} color="#4b5563" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/appointmentRecords");
            }}
          >
            <Entypo name="calendar" size={18} color="#4b5563" style={styles.menuIcon} />
            <Text style={styles.menuText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/settings");
            }}
          >
            <Entypo name="cog" size={18} color="#4b5563" style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
            <AntDesign name="logout" size={18} color="#ef4444" style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: "#ef4444", fontWeight: '600' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Scrollable Dashboard Body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Promotional Slide Cards */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={cardData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.carouselSlide}>
                <Card
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                />
              </View>
            )}
          />
        </View>

        {/* Dog Breeds Categories */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Explore Dog Breeds</Text>
        </View>

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
                    style={styles.breedCircle}
                    onPress={() => {
                      let route = "";
                      if (category.name === "Labrador") route = "/labrodor";
                      else if (category.name === "German Shepherd") route = "/german";
                      else if (category.name === "Pug") route = "/pug";
                      else {
                        Alert.alert("Breed Info", `${category.name} detailed profile is coming soon!`);
                        return;
                      }
                      router.push({
                        pathname: route,
                        params: { id: category.id, name: category.name },
                      });
                    }}
                  >
                    <Image source={category.image} style={styles.breedImg} />
                  </TouchableOpacity>
                  <Text style={styles.categoryLabel}>{category.name}</Text>
                </View>
              ))}
            </View>
          )}
        />

        {/* Best Doctors Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Best Doctors</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorsScroll}
        >
          {doctorData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.doctorCard} onPress={() => router.push("/appointment")}>
              <View style={styles.doctorImageContainer}>
                <Image source={item.image} style={styles.doctorImage} />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#fff" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.doctorName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.doctorSpecialty} numberOfLines={1}>{item.specialty}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/first")}
        >
          <Entypo name="home" size={22} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/appointment")}
        >
          <Entypo name="calendar" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLabel}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/rescue")}
        >
          <Ionicons name="paw-outline" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLabel}>Rescue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/appointmentRecords")}
        >
          <Ionicons name="document-text-outline" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLabel}>Records</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileBtn: {
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarGradient: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  subWelcome: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  bellWrapper: {
    position: "relative",
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  activeDot: {
    position: "absolute",
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
  },
  profileMenu: {
    position: "absolute",
    top: 76,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 100,
    width: 180,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  carouselContainer: {
    height: hp(24),
    marginTop: 10,
  },
  carouselSlide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    width: width - 40,
    height: hp(20),
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 12,
    lineHeight: 16,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2937",
  },
  categoryPage: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryItem: {
    width: (width - 64) / 3,
    alignItems: "center",
  },
  breedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#6d48ff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  breedImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryLabel: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 8,
  },
  doctorsScroll: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    width: 140,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  doctorImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  ratingBadge: {
    position: "absolute",
    bottom: -2,
    right: -4,
    backgroundColor: "#fbbf24",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 2,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    color: "#1f2937",
    width: "100%",
  },
  doctorSpecialty: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    width: "100%",
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
