import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import COLORS from "../constants/colors";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Blue Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            {/* Illustration */}
            <Image
              source={require("../assets/images/i.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
            
            {/* Pagination Dots */}
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            {/* Get Started Button */}
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity style={styles.getStartedButton}>
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/(auth)" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  heroSection: {
    backgroundColor: COLORS.primaryLight,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    minHeight: "85%",
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 280,
    height: 280,
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dotActive: {
    backgroundColor: COLORS.white,
    width: 24,
  },
  getStartedButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  getStartedText: {
    color: COLORS.primaryLight,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
  loginText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});