import GradientBG from "@/components/GradientBG";
import { COLORS } from "@/constant/color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <GradientBG />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.lightGrey,
            height: 50,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="Room"
          options={{
            title: "Chat Rooms",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="chat" size={size} color={color} />
            ),
            tabBarItemStyle: {
              marginTop: 8,
            },
          }}
        />
        <Tabs.Screen
          name="Users"
          options={{
            title: "Users",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
            tabBarItemStyle: {
              marginTop: 8,
            },
          }}
        />
        <Tabs.Screen
          name="Setting"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            tabBarItemStyle: {
              marginTop: 8,
            },
          }}
        />
      </Tabs>
    </>
  );
}
