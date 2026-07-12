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
  Modal,
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
    subtitle: "Explore breeds that suit your lifestyle, home, and energy level.",
    image: require("../assets/images/dog1.png"),
  },
  {
    id: "2",
    title: "Be a Responsible Owner",
    subtitle: "Dogs need love, care, and regular veterinary checkups.",
    image: require("../assets/images/dog2.png"),
  },
  {
    id: "3",
    title: "Adopt, Don’t Shop 🐾",
    subtitle: "Give a homeless pet a second chance to live and love again.",
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

export default function First() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);
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

  const handleConsultDoctor = (docId) => {
    setSelectedDoctorModal(null);
    router.push({
      pathname: "/appointment",
      params: { doctorId: docId },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfoRow}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => setShowProfileMenu((prev) => !prev)}
          >
            <LinearGradient
              colors={["#6d48ff", "#8e44ad"]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>{getInitials(currentUser?.name)}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.userTextContainer}>
            <Text style={styles.welcomeText}>Hello, {currentUser?.name || 'Guest'} 👋</Text>
            <Text style={styles.subWelcomeText}>Your pets are in safe hands</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.bellButton} 
          onPress={() => Alert.alert("Notifications", "All set! No new notifications.")}
        >
          <View style={styles.bellBadgeContainer}>
            <Ionicons name="notifications-outline" size={24} color="#1f2937" />
            <View style={styles.notificationDot} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Dropdown Profile Menu */}
      {showProfileMenu && (
        <View style={styles.profileMenuDropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/profile");
            }}
          >
            <AntDesign name="user" size={18} color="#4b5563" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/appointmentRecords");
            }}
          >
            <Entypo name="calendar" size={18} color="#4b5563" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setShowProfileMenu(false);
              router.push("/settings");
            }}
          >
            <Entypo name="cog" size={18} color="#4b5563" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dropdownItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
            <AntDesign name="logout" size={18} color="#ef4444" style={styles.dropdownIcon} />
            <Text style={[styles.dropdownText, { color: "#ef4444", fontWeight: '700' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Dashboard Scrollable View */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* Promotional Slide Banner */}
        <View style={styles.sliderContainer}>
          <FlatList
            data={cardData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={(e) => {
              const slideIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
              setActiveSlide(slideIndex);
            }}
            renderItem={({ item }) => (
              <LinearGradient
                colors={["#6d48ff", "#8e44ad"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.promoCard}
              >
                <View style={styles.promoTextCol}>
                  <Text style={styles.promoTitle}>{item.title}</Text>
                  <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
                </View>
                <Image source={item.image} style={styles.promoImage} />
              </LinearGradient>
            )}
            contentContainerStyle={styles.sliderContent}
          />
          {/* Slide Indicator Dots */}
          <View style={styles.dotsRow}>
            {cardData.map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.dot, 
                  activeSlide === idx ? styles.activeDot : styles.inactiveDot
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Categories Section (Dog Breeds) */}
        <Text style={styles.sectionHeader}>Explore Dog Breeds</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <TouchableOpacity
                style={styles.categoryImageWrapper}
                onPress={() => {
                  let route = "";
                  if (category.name === "Labrador") route = "/labrodor";
                  else if (category.name === "German Shepherd") route = "/german";
                  else if (category.name === "Pug") route = "/pug";
                  else {
                    Alert.alert("Breed Profile", `${category.name} details are coming soon!`);
                    return;
                  }
                  router.push({
                    pathname: route,
                    params: { id: category.id, name: category.name },
                  });
                }}
              >
                <Image source={category.image} style={styles.categoryImage} />
              </TouchableOpacity>
              <Text style={styles.categoryName} numberOfLines={1}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Doctor List Section */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeader}>Top Veterinarians</Text>
          <TouchableOpacity onPress={() => router.push("/appointment")}>
            <Text style={styles.seeAllText}>Book appointment</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorsScroll}
        >
          {doctorData.map((doc) => (
            <TouchableOpacity 
              key={doc.id} 
              style={styles.doctorItemCard} 
              onPress={() => setSelectedDoctorModal(doc)}
            >
              <View style={styles.doctorAvatarContainer}>
                <Image source={doc.image} style={styles.doctorAvatar} />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#fff" style={{ marginRight: 2 }} />
                  <Text style={styles.ratingText}>{doc.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.doctorCardName} numberOfLines={1}>{doc.name}</Text>
              <Text style={styles.doctorCardSpec} numberOfLines={1}>{doc.specialty}</Text>
              <Text style={styles.doctorCardExp}>{doc.experience} exp</Text>

              <TouchableOpacity 
                style={styles.consultBtn}
                onPress={() => setSelectedDoctorModal(doc)}
              >
                <Text style={styles.consultBtnText}>Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Doctor Profile Details Modal */}
      {selectedDoctorModal && (
        <Modal
          visible={selectedDoctorModal !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedDoctorModal(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {/* Close Button */}
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setSelectedDoctorModal(null)}
              >
                <Ionicons name="close" size={22} color="#475569" />
              </TouchableOpacity>

              {/* Photo & Basic Info */}
              <Image source={selectedDoctorModal.image} style={styles.modalDoctorAvatar} />
              <Text style={styles.modalDoctorName}>{selectedDoctorModal.name}</Text>
              <Text style={styles.modalDoctorSpec}>{selectedDoctorModal.specialty}</Text>

              <View style={styles.modalRatingRow}>
                <Ionicons name="star" size={16} color="#fbbf24" style={{ marginRight: 4 }} />
                <Text style={styles.modalRatingText}>{selectedDoctorModal.rating} rating</Text>
              </View>

              {/* Doctor Stats Grid */}
              <View style={styles.statsCardGrid}>
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>Fee</Text>
                  <Text style={styles.statValue}>{selectedDoctorModal.fee}</Text>
                </View>
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>Experience</Text>
                  <Text style={styles.statValue}>{selectedDoctorModal.experience}</Text>
                </View>
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>Patients</Text>
                  <Text style={styles.statValue}>{selectedDoctorModal.patients}</Text>
                </View>
              </View>

              {/* Hospital Location */}
              <View style={styles.detailItemRow}>
                <Ionicons name="location-sharp" size={18} color="#ef4444" style={{ marginRight: 8 }} />
                <Text style={styles.detailItemText} numberOfLines={2}>
                  {selectedDoctorModal.location}
                </Text>
              </View>

              {/* Doctor Bio */}
              <View style={styles.bioBox}>
                <Text style={styles.bioHeading}>About Doctor</Text>
                <Text style={styles.bioText}>{selectedDoctorModal.bio}</Text>
              </View>

              {/* Book Appointment CTA */}
              <TouchableOpacity
                style={styles.modalBookBtn}
                onPress={() => handleConsultDoctor(selectedDoctorModal.id)}
              >
                <Ionicons name="calendar-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.modalBookBtnText}>Book Consultation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Glassmorphic Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navLink} onPress={() => router.push("/first")}>
          <Entypo name="home" size={22} color="#fff" />
          <Text style={styles.navLinkLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navLink} onPress={() => router.push("/appointment")}>
          <Entypo name="calendar" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLinkLabel}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navLink} onPress={() => router.push("/rescue")}>
          <Ionicons name="paw-outline" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLinkLabel}>Rescue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navLink} onPress={() => router.push("/appointmentRecords")}>
          <Ionicons name="document-text-outline" size={22} color="#fff" style={{ opacity: 0.8 }} />
          <Text style={styles.navLinkLabel}>Records</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrapper: {
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  userTextContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
  },
  subWelcomeText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  bellButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  bellBadgeContainer: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 1,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ef4444",
  },
  profileMenuDropdown: {
    position: "absolute",
    top: 76,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 100,
    width: 170,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
  },
  scrollContainer: {
    paddingBottom: 130,
  },
  sliderContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  sliderContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    marginRight: 16,
    borderRadius: 24,
    padding: 20,
    height: 140,
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  promoTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  promoTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  promoSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 12,
    lineHeight: 16,
  },
  promoImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 16,
    backgroundColor: "#6d48ff",
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "#cbd5e1",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 14,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 8,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 76,
  },
  categoryImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
    width: "100%",
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    marginTop: 18,
  },
  seeAllText: {
    fontSize: 13,
    color: "#6d48ff",
    fontWeight: "700",
  },
  doctorsScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 12,
  },
  doctorItemCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    width: 140,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorAvatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  ratingBadge: {
    position: "absolute",
    bottom: -4,
    right: -6,
    backgroundColor: "#fbbf24",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  ratingText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  doctorCardName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
    width: "100%",
  },
  doctorCardSpec: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "center",
    marginTop: 3,
    width: "100%",
  },
  doctorCardExp: {
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 2,
    fontWeight: "600",
  },
  consultBtn: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  consultBtnText: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 28,
    width: "100%",
    padding: 24,
    alignItems: "center",
    position: "relative",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  modalDoctorAvatar: {
    width: 90,
    height: 90,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    marginBottom: 16,
  },
  modalDoctorName: {
    fontSize: 20,
    fontWeight: "850",
    color: "#1e293b",
    textAlign: "center",
  },
  modalDoctorSpec: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 4,
  },
  modalRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  modalRatingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  statsCardGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 20,
  },
  statColumn: {
    alignItems: "center",
    width: "30%",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#6d48ff",
    marginTop: 4,
  },
  detailItemRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  detailItemText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    flex: 1,
  },
  bioBox: {
    width: "100%",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  bioHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  bioText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
  modalBookBtn: {
    flexDirection: "row",
    backgroundColor: "#6d48ff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#6d48ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  modalBookBtnText: {
    color: "#fff",
    fontSize: 16,
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
  navLink: {
    alignItems: "center",
  },
  navLinkLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
});
