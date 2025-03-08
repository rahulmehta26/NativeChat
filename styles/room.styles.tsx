import { COLORS } from "@/constant/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent:"center"
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 8,
    fontWeight:"900"
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
  },
 
});
