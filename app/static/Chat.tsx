import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WebSocketService from '../service/WebSocketService';
import { addMessage, deleteMessage, deleteChat } from '../core/module-1';
import { RootState } from '../store';
import { RouteProp, useRoute } from '@react-navigation/native';

type ChatRouteProp = RouteProp<{ params: { chatId: string } }, 'params'>;

const Chat = () => {
  const dispatch = useDispatch();
  const route = useRoute<ChatRouteProp>();
  const { chatId } = route.params;
  const chat = useSelector((state: RootState) => state.chats.find(c => c.id === chatId));

  const [message, setMessage] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [messages, setMessages] = useState<{ text: string }[]>([]);

  const wsService = useRef<WebSocketService | null>(null);

  useEffect(() => {
    wsService.current = new WebSocketService('ws://192.168.1.173:8080');
  
    wsService.current.setOnMessageCallback((newMessage: { text: string }) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    return () => {
      if (wsService.current) {
        wsService.current.close();
      }
    };
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() && wsService.current) {
      dispatch(addMessage({ chatId, message }));
      wsService.current.sendMessage({ chatId, message });
      setMessage('');
    }
  };

  const handleDeleteMessages = () => {
    selectedMessages.forEach(index => {
      dispatch(deleteMessage({ chatId, messageIndex: index }));
    });
    setSelectedMessages([]);
    setIsSelectionMode(false);
  };

  const handleDeleteChat = () => {
    dispatch(deleteChat(chatId));
  };

  const handleMessagePress = (index: number) => {
    if (isSelectionMode) {
      if (selectedMessages.includes(index)) {
        setSelectedMessages(selectedMessages.filter(i => i !== index));
      } else {
        setSelectedMessages([...selectedMessages, index]);
      }
    }
  };

  const handleLongPress = (index: number) => {
    setIsSelectionMode(true);
    handleMessagePress(index);
  };

  const handleCancelSelection = () => {
    setSelectedMessages([]);
    setIsSelectionMode(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>≡</Text>
      </TouchableOpacity>
      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handleDeleteChat} style={styles.menuItem}>
            <Text>Delete Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.menuItem}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(index)} onPress={() => handleMessagePress(index)}>
            <View style={[styles.messageContainer, selectedMessages.includes(index) && styles.selectedMessageContainer]}>
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {isSelectionMode && (
        <View style={styles.selectionBar}>
          <Button title="Delete" onPress={handleDeleteMessages} />
          <Button title="Cancel" onPress={handleCancelSelection} />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={styles.textInput}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  menuButtonText: {
    fontSize: 24,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMessageContainer: {
    backgroundColor: '#e0e0e0',
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
});

export default Chat;
