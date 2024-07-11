// D:/SimpleChatApp/app/static/Home.tsx

import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addChat } from '../core/module-1';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ChatList: undefined; // Добавьте этот экран в ваш навигатор
  Chat: { chatId?: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCreateChat = () => {
    const newChat = { id: Date.now().toString(), name: 'New Chat', messages: [] };
    dispatch(addChat(newChat));
    navigation.navigate('Chat', { chatId: newChat.id });
  };

  return (
    <View>
      <Button title="Создать чат" onPress={handleCreateChat} />
      <Button title="Перейти к чатам" onPress={() => navigation.navigate('ChatList')} />
    </View>
  );
};

export default Home;