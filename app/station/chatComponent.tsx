
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, doc, setDoc } from '@firebase/firestore';
const db = getFirestore();

function ChatScreen({ station_id }) {
  const { user } = useSnapshot(store)
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const messagesCollection = collection(db, 'chats/station_id_' + station_id + '/messages');

  useEffect(() => {
    console.log('ChatScreen useEffect', user);
    
    const unsubscribe = onSnapshot(query(messagesCollection, orderBy('timestamp')), snapshot => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setText('');
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (text && station_id) {
      addDoc(messagesCollection, {
        text,
        uid: user.uid,
        timestamp: new Date().toISOString(),
      })
      .then(() => {
      })
    }
  };

  return (
    <View style={{ flex: 1, margin: 12, padding: 12, borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: '#ffffff', }}>
      <ScrollView style={{}}>
        {messages.map((message, index) => (
          index === messages.length-1 && message.uid !== user.uid && (
            <View key={message.id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
              <Text>{message.text}</Text>
            </View>
          )
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, borderRadius: 5, padding: 10 }}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

import React, { useState, useEffect } from 'react';

import { ScrollView, Text, TextInput, Button, View } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

export default ChatScreen;
