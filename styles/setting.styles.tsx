import { COLORS } from "@/constant/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightGrey,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      color: COLORS.white,
      marginBottom: 8,
      marginLeft: 4,
      fontWeight:'900'
    },
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      overflow: "hidden",
    },
    username: {
      fontSize: 16,
      color: COLORS.darkGrey,
      padding: 16,
      fontWeight:'900'
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGrey,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingText: {
      fontSize: 16,
      color: COLORS.lightGrey,
      marginLeft: 12,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white,
      padding: 16,
      borderRadius: 12,
      marginTop: "auto",
    },
    logoutText: {
      fontSize: 16,
      color: COLORS.red,
      marginLeft: 8,
      fontWeight:"900"
    },
  })