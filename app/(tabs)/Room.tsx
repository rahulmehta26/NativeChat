import { View, Text, FlatList } from "react-native";
import React, { useEffect,  } from "react";
import { setError, setLoading, setRooms } from "@/store/slices/chatSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { styles } from "@/styles/room.styles";
import ErrorMessage from "@/components/ErrorMessage";
import GradientBG from "@/components/GradientBG";
import { router } from "expo-router";
import CardDetails from "@/components/CardDetails";
import CustomHeader from "@/components/CustomHeader";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const Room = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const username = useSelector((state: RootState) => state.user.user?.username);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_URL}/chat/rooms`);
      dispatch(setRooms(response.data));
    } catch (err) {
      dispatch(setError("Failed to load rooms"));
    }
  };

  if (error) {
    return <ErrorMessage error={error} onPress={fetchRooms} />;
  }

  return (
    <View style={styles.container}>
      <GradientBG />
      <CustomHeader />
      <FlatList
        data={rooms}
        style={{
          marginTop: 60,
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <CardDetails
              item={item}
              onPress={() =>
                router.push(`/Chat?roomId=${item.id}&roomName=${item.name}`)
              }
            />
          </>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rooms available</Text>
            <Text style={styles.emptySubtext}>
              Create a new room to get started
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Room;
