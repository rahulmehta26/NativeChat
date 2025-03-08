import { COLORS } from "@/constant/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10
  },
  createRoomContainer: {
    marginTop:10,
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    borderRadius:20,
    marginBottom:5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: COLORS.lightGrey,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 8,
    fontWeight:"900"
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.lightGrey,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.lightGrey,
    textAlign: "center",
  },
});
