// D:/SimpleChatApp/app/static/ChatList.tsx

import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteChat } from '../core/module-1';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ChatList: undefined;
  Chat: { chatId: string };
};

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatList'>;

const ChatList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ChatListScreenNavigationProp>();
  const chats = useSelector((state: RootState) => state.chats);

  const handleDeleteChat = (chatId: string) => {
    dispatch(deleteChat(chatId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Text>{item.name}</Text>
            <Button title="Open" onPress={() => navigation.navigate('Chat', { chatId: item.id })} />
            <Button title="Delete" onPress={() => handleDeleteChat(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ChatList;