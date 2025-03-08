import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/setting.styles";
import { clearUser } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearChat } from "@/store/slices/chatSlice";
import { router } from "expo-router";
import GradientBG from "@/components/GradientBG";
import { COLORS } from "@/constant/color";

const Setting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector((state: RootState) => state.user.user?.username);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearChat());
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <GradientBG />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color={COLORS.red} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
