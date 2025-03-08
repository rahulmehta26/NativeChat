import { COLORS } from "@/constant/color";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const common = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },

  imageLogo: {
    width: width * 0.25,
    height: width * 0.25,
  },
});
