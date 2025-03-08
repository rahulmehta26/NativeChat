import GradientBG from "@/components/GradientBG";
import { COLORS } from "@/constant/color";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <GradientBG />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.white,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },

  linkText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
});

export default NotFoundScreen;
