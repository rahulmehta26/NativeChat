import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/chat.styles";
import ErrorMessage from "@/components/ErrorMessage";
import GradientBG from "@/components/GradientBG";
import { COLORS } from "@/constant/color";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setError, setLoading } from "@/store/slices/userSlice";
import { addMessage, setMessages } from "@/store/slices/chatSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Message {
  id: string;
  content: string;
  username: string;
  created_at: string;
}

interface SystemMessage {
  type: "system";
  content: string;
  timestamp: string;
}

type ChatMessage = Message | SystemMessage;

const Chat = () => {
  const { roomId, roomName } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState<string>("");
  const username = useSelector(
    (state: RootState) => state.user?.user?.username
  );
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const wsRef = useRef<WebSocket | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch<AppDispatch>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchMessages();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [roomId]);

  const fetchMessages = async () => {
    if (!roomId) return;

    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${API_URL}/chat/rooms/${roomId}/messages`
      );
      dispatch(setMessages(response.data.reverse()));
    } catch (err) {
      dispatch(setError("Failed to load messages"));
    }
  };

  const connectWebSocket = () => {
    if (!roomId || !username) return;

    const ws = new WebSocket(
      `ws://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");
      const systemMessage: SystemMessage = {
        type: "system",
        content: "Connected to chat",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(systemMessage));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "join" || data.event === "leave") {
        const systemMessage: SystemMessage = {
          type: "system",
          content: `${data.username} has ${data.event}ed the room`,
          timestamp: new Date().toISOString(),
        };
        dispatch(addMessage(systemMessage));
      } else if (data.event === "message") {
        const newMsg: Message = {
          id: Date.now().toString(),
          content: data.content,
          username: data.username,
          created_at: new Date().toISOString(),
        };
        dispatch(addMessage(newMsg));
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      dispatch(setError("Connection error. Please try again."));

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        if (ws.readyState === WebSocket.CLOSED) {
          connectWebSocket();
        }
      }, 3000);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };

    wsRef.current = ws;
  };

  const sendMessage = () => {
    if (
      !newMessage.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;

    const messageData = {
      event: "message",
      content: newMessage.trim(),
    };

    wsRef.current.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if ("type" in item && item.type === "system") {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.content}</Text>
        </View>
      );
    }

    const isOwnMessage = item.username === username;

    return (
      <View
        style={[
          styles.messageContainer,
          isOwnMessage ? styles.ownMessage : styles.otherMessage,
        ]}
      >
        {!isOwnMessage && <Text style={styles.username}>{item.username}</Text>}
        <View
          style={[
            styles.messageBubble,
            isOwnMessage ? styles.ownBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
            ]}
          >
            {item.content}
          </Text>
          <Text
            style={[
              styles.timestamp,
              isOwnMessage ? styles.ownTimestamp : styles.otherTimestamp,
            ]}
          >
            { new Date(item.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  if (error) {
    return <ErrorMessage error={error} onPress={fetchMessages} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <GradientBG />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => ("id" in item ? item.id : item.timestamp)}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons
            name="send"
            size={16}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
