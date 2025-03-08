import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientBG = () => {
  return (
    <LinearGradient
      colors={["#6C63FF", "#3B3086"]}
      style={styles.gradientBackground}
    />
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default GradientBG;
