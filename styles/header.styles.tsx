import { COLORS } from "@/constant/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: 60,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      borderBottomColor: COLORS.lightGrey,
      backgroundColor: COLORS.white,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    clearContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
    },
    clearButton: {
      paddingHorizontal: 16,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      paddingVertical: 5,
    },
    clearText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: "700",
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      right: 15,
      columnGap: 15,
    },
  });