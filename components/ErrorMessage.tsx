import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import GradientBG from "./GradientBG";
import { COLORS } from "@/constant/color";

interface ErrorMessage {
  error: string;
  onPress: () => void;
}

const ErrorMessage = ({ error, onPress }: ErrorMessage) => {
  return (
    <View style={styles.centered}>
      <GradientBG />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onPress}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    color: COLORS.red,
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "700",
  },
  retryButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },
});

export default ErrorMessage;
