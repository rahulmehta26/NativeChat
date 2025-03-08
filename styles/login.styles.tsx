import { COLORS } from "@/constant/color";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
    marginTop: 16,
    textShadowColor: COLORS.darkGrey,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkGrey,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderWidth: 1.5,
    borderColor: COLORS.lightGrey,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGrey,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkGrey,
    marginLeft: 10,
    height: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  error: {
    color: COLORS.brightRed,
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "500",
  },
  terms: {
    fontSize: 12,
    color: COLORS.darkGrey,
    textAlign: "center",
    marginTop: 20,
  },
});
