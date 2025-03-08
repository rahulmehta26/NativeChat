import { COLORS } from "@/constant/color";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

const Header = ({ title }: { title: string | undefined }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ options, route }) => <Header title={options.title} />,
        contentStyle: { backgroundColor: COLORS.primary },
      }}
    >
      <Stack.Screen
        name="CreateRoom"
        options={{
          title: "Create Room",
          headerBackVisible: true,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Chat"
        options={({ route }) => ({
          title: route.params?.roomName || "Chat",
          headerTitleAlign: "center",
        })}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.white,
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppLayout;
