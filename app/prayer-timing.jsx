import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Coordinates, CalculationMethod, PrayerTimes, SunTimes } from 'adhan';
import COLORS from '../constants/colors';

export default function PrayerTiming() {
  const router = useRouter();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [sunTimes, setSunTimes] = useState(null);
  const [locationName, setLocationName] = useState('Sylhet');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchPrayerTimes(24.8949, 91.8687); // Default to Sylhet
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchPrayerTimes(location.coords.latitude, location.coords.longitude);
      
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if (reverseGeocode.length > 0) {
        setLocationName(reverseGeocode[0].city || reverseGeocode[0].region || 'Your Location');
      }
    })();
  }, [selectedDate]);

  const fetchPrayerTimes = (lat, lon) => {
    const coords = new Coordinates(lat, lon);
    const params = CalculationMethod.IslamicSocietyOfNorthAmerica();
    const times = new PrayerTimes(coords, selectedDate, params);
    const sun = new SunTimes(coords, selectedDate);
    setPrayerTimes(times);
    setSunTimes(sun);
  };

  const formatTime = (time) => {
    if (!time) return '--:--';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const prayers = prayerTimes ? [
    { name: 'Imsak', time: formatTime(prayerTimes.fajr), type: 'fajr' }, // Adhan lib uses fajr for imsak offset usually
    { name: 'Fajr', time: formatTime(prayerTimes.fajr), type: 'fajr' },
    { name: 'Sunrise', time: formatTime(prayerTimes.sunrise), type: 'sunrise' },
    { name: 'Duhr', time: formatTime(prayerTimes.dhuhr), type: 'dhuhr' },
    { name: 'Asr', time: formatTime(prayerTimes.asr), type: 'asr' },
    { name: 'Maghrib', time: formatTime(prayerTimes.maghrib), type: 'maghrib' },
    { name: 'Isha', time: formatTime(prayerTimes.isha), type: 'isha' },
  ] : [];

  const currentPrayer = prayerTimes ? prayerTimes.currentPrayer() : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prayer Timing</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.mosqueContainer}>
           <MaterialCommunityIcons name="mosque" size={100} color="rgba(255,255,255,0.2)" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getTime() - 86400000))}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.dateTextContainer}>
            <Text style={styles.todayText}>Today</Text>
            <Text style={styles.fullDateText}>{selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
          </View>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getTime() + 86400000))}>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.prayerListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {prayers.map((prayer, index) => {
              const isActive = currentPrayer === prayer.name.toLowerCase();
              return (
                <View key={index} style={[styles.prayerItem, index === prayers.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={styles.prayerNameContainer}>
                    <View style={[styles.statusDot, isActive && styles.statusDotActive]} />
                    <Text style={[styles.prayerName, isActive && styles.prayerTextActive]}>{prayer.name}</Text>
                  </View>
                  <View style={styles.prayerTimeContainer}>
                    <Text style={[styles.prayerTime, isActive && styles.prayerTextActive]}>{prayer.time}</Text>
                    <Text style={styles.separator}>|</Text>
                    <TouchableOpacity>
                      <MaterialCommunityIcons 
                        name={isActive ? "bell" : "bell-outline"} 
                        size={20} 
                        color={isActive ? COLORS.primaryLight : "#CCC"} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
          <MaterialCommunityIcons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="mosque" size={24} color={COLORS.primaryLight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="book-open-variant" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3',
  },
  header: {
    backgroundColor: COLORS.primaryLight,
    height: 220,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  mosqueContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    marginTop: -40,
    paddingHorizontal: 20,
  },
  dateSelector: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dateTextContainer: {
    alignItems: 'center',
  },
  todayText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  fullDateText: {
    fontSize: 18,
    color: COLORS.primaryLight,
    fontWeight: '700',
    marginTop: 4,
  },
  prayerListContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    flex: 1,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  prayerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  prayerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  statusDotActive: {
    backgroundColor: COLORS.primaryLight,
  },
  prayerName: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },
  prayerTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerTime: {
    fontSize: 16,
    color: '#777',
    fontWeight: '600',
  },
  prayerTextActive: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  separator: {
    marginHorizontal: 10,
    color: '#DDD',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});