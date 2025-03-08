import {
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constant/color";
import { router } from "expo-router";
import { styles } from "@/styles/header.styles";

interface CustomHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
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

        <View style={styles.clearContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSearchToggle} activeOpacity={0.8}>
            <MaterialIcons name="close" size={24} color={COLORS.darkGrey} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Header Actions */}
      <View style={styles.iconContainer}>
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

export default CustomHeader;
