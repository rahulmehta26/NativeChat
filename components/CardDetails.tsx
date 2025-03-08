import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constant/color";

interface Room {
  id: string;
  name: string;
  created_at: string;
}

interface CardDetails {
  item: Room;
  onPress: () => void;
}

const CardDetails: React.FC<CardDetails> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.roomItem}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <MaterialIcons name="account-circle" size={36} color={COLORS.blue} />

      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDate}>
          Created {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roomItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    borderRadius: 10,
    marginVertical: 5,
  },
  roomInfo: {
    marginLeft: 12,
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    color: COLORS.darkGrey,
    fontWeight: "900",
  },
  roomDate: {
    fontSize: 14,
    color: COLORS.darkGrey,
    marginTop: 4,
  },
});

export default CardDetails;
