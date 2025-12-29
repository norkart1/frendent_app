import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function Index() {
  const prayerFeatures = [
    { name: "Kalma", icon: "hand-right" },
    { name: "Al Qur'an", icon: "book-open-variant" },
    { name: "Al Hadith", icon: "book-open-page-variant" },
    { name: "Asma Ul Husna", icon: "allah", },
    { name: "Tasbih", icon: "circle-multiple" },
    { name: "Qibla Compass", icon: "compass" },
    { name: "Siyam Timing", icon: "moon-waning-crescent" },
    { name: "Dua for everyday", icon: "hands-together" },
    { name: "Hajj & Umrah", icon: "kaaba" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Green Header Section */}
        <View style={styles.headerSection}>
          {/* Date and Location */}
          <View style={styles.topBar}>
            <Text style={styles.dateText}>09 Muharram, 1444</Text>
            <View style={styles.locationBadge}>
              <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.primaryLight} />
              <Text style={styles.locationText}>Sylhet</Text>
            </View>
          </View>

          {/* Prayer Info */}
          <View style={styles.prayerCard}>
            <Text style={styles.prayerName}>ISHA</Text>
            <Text style={styles.prayerSubtitle}>Current Prayer</Text>

            {/* Prayer Times */}
            <View style={styles.timesContainer}>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>START</Text>
                <Text style={styles.timeValue}>07:50 PM</Text>
              </View>
              <View style={styles.moonIcon}>
                <MaterialCommunityIcons name="moon-waning-crescent" size={32} color={COLORS.primaryLight} />
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>END</Text>
                <Text style={styles.timeValue}>09:50 PM</Text>
              </View>
            </View>

            {/* Mosque Silhouette */}
            <View style={styles.mosqueSilhouette}>
              <MaterialCommunityIcons name="kaaba" size={60} color={COLORS.primaryLight} opacity={0.3} />
            </View>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <View style={styles.featureGrid}>
            {prayerFeatures.map((feature, index) => (
              <TouchableOpacity key={index} style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <MaterialCommunityIcons 
                    name={feature.icon} 
                    size={28} 
                    color={COLORS.primaryLight} 
                  />
                </View>
                <Text style={styles.featureLabel}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.paginationDots}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="home" size={24} color={COLORS.primaryLight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="prayer-times" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="compass" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="cog" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: COLORS.primaryLight,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  dateText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  locationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  prayerCard: {
    alignItems: "center",
    marginBottom: 40,
  },
  prayerName: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  prayerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 24,
  },
  timesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
    gap: 16,
  },
  timeBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  timeLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  timeValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  moonIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  mosqueSilhouette: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: "100%",
  },
  featuresCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureItem: {
    width: "31%",
    alignItems: "center",
    marginBottom: 24,
  },
  featureIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#E8F8F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DDD",
  },
  paginationDotActive: {
    backgroundColor: COLORS.primaryLight,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
});