import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "@/constant/color";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    position:"absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Loader;
