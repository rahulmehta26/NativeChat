import { router } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/login.styles";
import { COLORS } from "@/constant/color";
import { AppDispatch, RootState } from "@/store/store";
import { setError, setLoading, setUser } from "@/store/slices/userSlice";
import axios from "axios";
import { common } from "@/styles/common.styles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { loading, error } = useSelector((state: RootState) => state.user);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      setLocalError("Please enter a username")
      return
    }

    setLocalError("")
    dispatch(setLoading(true))

    try {
      const response = await axios.post(`${API_URL}/chat/username`, { username })
      dispatch(setUser({ username: response.data.username, id: response.data.id }))
      router.replace("/(tabs)/Room")
      dispatch(setLoading(false));
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "An error occurred. Please try again."
      setLocalError(errorMessage)
      dispatch(setError(errorMessage))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#6C63FF", "#3B3086"]}
        style={styles.gradientBackground}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={common.logoBackground}>
          <Image
            source={require("../assets/images/logo.png")}
            resizeMode="cover"
            style={common.imageLogo}
          />
        </View>
        <Text style={styles.appName}>NativeChat</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Enter your username to get started</Text>

        <TouchableOpacity
          style={styles.inputContainer}
          activeOpacity={0.8}
          onPress={focusInput}
        >
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />

          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9E9E9E"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (localError) setLocalError("");
            }}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </TouchableOpacity>

        {localError ? (
          <Animated.Text
            style={[styles.error, { transform: [{ translateX: slideAnim }] }]}
          >
            {localError}
          </Animated.Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.buttonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Login;
