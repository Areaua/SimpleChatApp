import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './core/module-1/';

// Определение интерфейса для чата
export interface Chat {
  id: string;
  name: string;
  messages: string[];
}

// Определение типа для корневого состояния
export interface RootState {
  chats: Chat[];
}

// Создание хранилища
export const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
});

// Типы для диспатча и состояния
export type AppDispatch = typeof store.dispatch;
