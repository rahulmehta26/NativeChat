import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Room {
  id: string;
  name: string;
  created_at: string;
}

interface Message {
  id: string;
  content: string;
  username: string;
  created_at: string;
}

interface ChatState {
  rooms: Room[];
  currentRoom: Room | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  rooms: [],
  currentRoom: null,
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.error = null;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearChat: (state) => {
      state.messages = [];
      state.currentRoom = null;
    },
  },
});

export const {
  setRooms,
  addRoom,
  setCurrentRoom,
  setMessages,
  addMessage,
  setLoading,
  setError,
  clearChat,
} = chatSlice.actions;
export default chatSlice.reducer;