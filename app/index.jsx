import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import COLORS from "../constants/colors";

export default function Index() {
  const router = useRouter();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [locationName, setLocationName] = useState("Sylhet");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        updatePrayerTimes(24.8949, 91.8687); // Default to Sylhet
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      updatePrayerTimes(location.coords.latitude, location.coords.longitude);
      
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if (reverseGeocode.length > 0) {
        setLocationName(reverseGeocode[0].city || reverseGeocode[0].region || "Your Location");
      }
    })();
  }, []);

  const updatePrayerTimes = (lat, lon) => {
    const coords = new Coordinates(lat, lon);
    const params = CalculationMethod.NorthAmerica();
    const times = new PrayerTimes(coords, new Date(), params);
    setPrayerTimes(times);
  };

  const formatTime = (time) => {
    if (!time) return "--:--";
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getNextPrayer = () => {
    if (!prayerTimes) return { name: "LOADING...", start: null, end: null };
    const next = prayerTimes.nextPrayer();
    const current = prayerTimes.currentPrayer();
    
    let prayerName = "ISHA";
    let startTime = prayerTimes.isha;
    let endTime = "Night";

    if (current !== 'none') {
      prayerName = current.toUpperCase();
      startTime = prayerTimes[current];
      // Roughly find end time (next prayer)
      const nextP = prayerTimes.timeForPrayer(prayerTimes.nextPrayer());
      endTime = nextP ? formatTime(nextP) : "Night";
    }

    return {
      name: prayerName,
      start: formatTime(startTime),
      end: endTime
    };
  };

  const prayerInfo = getNextPrayer();

  const prayerFeatures = [
    { name: "Kalma", icon: "script-text-outline" },
    { name: "Al Qur'an", icon: "book-open-variant" },
    { name: "Al Hadith", icon: "book-open-page-variant" },
    { name: "Asma Ul Husna", icon: "star-crescent", },
    { name: "Tasbih", icon: "circle-multiple" },
    { name: "Qibla Compass", icon: "compass" },
    { name: "Siyam Timing", icon: "moon-waning-crescent" },
    { name: "Calculator", icon: "calculator-variant" },
    { name: "Dua for everyday", icon: "hands-pray" },
    { name: "Hajj & Umrah", icon: "kaaba", useFA5: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Green Header Section */}
        <View style={styles.headerSection}>
          {/* Date and Location */}
          <View style={styles.topBar}>
            <Text style={styles.dateText}>
              {currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </Text>
            <View style={styles.locationBadge}>
              <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.primaryLight} />
              <Text style={styles.locationText}>{locationName}</Text>
            </View>
          </View>

          {/* Prayer Info */}
          <View style={styles.prayerCard}>
            <Text style={styles.prayerName}>{prayerInfo.name}</Text>
            <Text style={styles.prayerSubtitle}>Current Prayer</Text>

            {/* Prayer Times */}
            <View style={styles.timesContainer}>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>START</Text>
                <Text style={styles.timeValue}>{prayerInfo.start}</Text>
              </View>
              <View style={styles.moonIcon}>
                <MaterialCommunityIcons name="moon-waning-crescent" size={32} color={COLORS.primaryLight} />
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>END</Text>
                <Text style={styles.timeValue}>{prayerInfo.end}</Text>
              </View>
            </View>

            {/* Mosque Silhouette */}
            <View style={styles.mosqueSilhouette}>
              <FontAwesome5 name="kaaba" size={60} color={COLORS.primaryLight} style={{ opacity: 0.3 }} />
            </View>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <View style={styles.featureGrid}>
            {prayerFeatures.map((feature, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.featureItem}
                onPress={() => {
                  if (feature.name === "Siyam Timing") router.push('/prayer-timing');
                  if (feature.name === "Calculator") router.push('/calculator');
                }}
              >
                <View style={styles.featureIconBox}>
                  {feature.useFA5 ? (
                    <FontAwesome5 
                      name={feature.icon} 
                      size={24} 
                      color={COLORS.primaryLight} 
                    />
                  ) : (
                    <MaterialCommunityIcons 
                      name={feature.icon} 
                      size={28} 
                      color={COLORS.primaryLight} 
                    />
                  )}
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
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/prayer-timing')}>
          <MaterialCommunityIcons name="clock-outline" size={24} color="#999" />
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