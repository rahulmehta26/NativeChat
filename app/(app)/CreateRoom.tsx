import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import { styles } from "@/styles/create-room.styles";
import ErrorMessage from "@/components/ErrorMessage";
import Notification from "@/components/Notification";
import { COLORS } from "@/constant/color";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GradientBG from "@/components/GradientBG";
import { common } from "@/styles/common.styles";
import { Image } from "react-native";
import CardDetails from "@/components/CardDetails";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Room {
  id: string;
  name: string;
  created_at: string;
}

const CreateRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [creatingRoom, setCreatingRoom] = useState<boolean>(false);
  const username = useSelector(
    (state: RootState) => state.user?.user?.username
  );

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/chat/rooms`);
      if (!response.ok) return <Notification message="Failed to fetch rooms" />;
      const data = await response.json();
      setRooms(data);
      setError("");
    } catch (err) {
      <Notification message="Failed to load rooms" />;
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) {
      <Notification message="Please enter a room name" />;
      return;
    }

    setCreatingRoom(true);
    try {
      const response = await fetch(`${API_URL}/chat/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newRoomName }),
      });

      if (!response.ok) <Notification message="Failed to create room" />;

      const newRoom = await response.json();

      setRooms([...rooms, newRoom]);
      setNewRoomName("");
      router.push(`/Chat?roomId=${newRoom.id}&roomName=${newRoom.name}`);
    } catch (err) {
      <Notification message="Failed to create room" />;
    } finally {
      setCreatingRoom(false);
    }
  };

  const joinRoom = (room: Room) => {
    router.push(`/Chat?roomId=${room.id}&roomName=${room.name}`);
  };

  if (error) {
    return <ErrorMessage error={error} onPress={fetchRooms} />;
  }

  return (
    <View style={styles.container}>
      <GradientBG />
      <View style={styles.createRoomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter room name"
          value={newRoomName}
          onChangeText={setNewRoomName}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={createRoom}
          disabled={creatingRoom}
        >
          {creatingRoom ? (
            <Loader />
          ) : (
            <>
              <Ionicons
                name="chatbox-ellipses"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.createButtonText}>Create Room</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <CardDetails item={item} onPress={() => joinRoom(item)} />
          </>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rooms available</Text>
            <Text style={styles.emptySubtext}>
              Create a new room to get started
            </Text>

            <View style={[common.logoBackground]}>
              <Image
                source={require("../../assets/images/logo.png")}
                resizeMode="cover"
                style={common.imageLogo}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default CreateRoom;
