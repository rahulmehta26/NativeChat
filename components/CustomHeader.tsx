import {
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constant/color";
import { router } from "expo-router";

const CustomHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const searchFadeAnim = useRef(new Animated.Value(1)).current;
  const searchBarAnim = useRef(new Animated.Value(-100)).current;

  const handleSearchToggle = () => {
    if (isOpen) {
      // Close search, reset everything
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchBarAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Open search, animate everything
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchBarAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Hide search icon after 3 seconds

      Animated.timing(searchFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Animated Title */}
      <Animated.Text
        style={{
          fontSize: 20,
          fontWeight: "900",
          textAlign: "center",
          transform: [{ translateX: slideAnim }], // Moves left
          opacity: fadeAnim, // Fades out
        }}
      >
        Chat Rooms
      </Animated.Text>

      {/* Animated Search Bar */}
      <Animated.View
        style={{
          position: "absolute",
          left: 15,
          right: 60,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.lightGrey,
          paddingHorizontal: 10,
          borderRadius: 10,
          height: 40,
          opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [{ translateX: searchBarAnim }],
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            paddingVertical: 5,
          }}
          placeholder="Search rooms..."
          placeholderTextColor={COLORS.darkGrey}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Close Button inside Search Bar */}
        <TouchableOpacity onPress={handleSearchToggle} activeOpacity={0.8}>
          <MaterialIcons name="close" size={24} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </Animated.View>

      {/* Header Actions */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          right: 15,
          columnGap: 15,
        }}
      >
        {/* Animated Search Icon */}
        <Animated.View style={{ opacity: searchFadeAnim }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSearchToggle}>
            <MaterialIcons name="search" size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Add Comment Button (Always Visible) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(app)/CreateRoom")}
        >
          <MaterialIcons name="add-comment" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomHeader;
