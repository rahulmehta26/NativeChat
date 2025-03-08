import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GradientBG from "@/components/GradientBG";
import { COLORS } from "@/constant/color";

const Users = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);

  return (
    <View style={styles.container}>
      <GradientBG />
      <View style={styles.userCard}>
        <Text style={styles.username}>{currentUser?.username}</Text>
        <Text style={styles.userId}>ID: {currentUser?.id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  username: {
    fontSize: 20,
    color: COLORS.darkGrey,
    marginBottom: 8,
    fontWeight:"900"
  },
  userId: {
    fontSize: 14,
    color: COLORS.darkGrey,
    fontWeight:"700"
  },
});

export default Users;
