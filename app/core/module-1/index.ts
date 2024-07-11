import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Chat {
  id: string;
  name: string;
  messages: string[];
}

const initialState: Chat[] = [];

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      return state.filter(chat => chat.id !== action.payload);
    },
    addMessage: (state, action: PayloadAction<{ chatId: string, message: string }>) => {
      const chat = state.find(c => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
      }
    },
    deleteMessage: (state, action: PayloadAction<{ chatId: string, messageIndex: number }>) => {
      const chat = state.find(c => c.id === action.payload.chatId);
      if (chat && chat.messages[action.payload.messageIndex]) {
        chat.messages.splice(action.payload.messageIndex, 1);
      }
    },
  },
});

export const { addChat, deleteChat, addMessage, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;