import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';


import { firestore } from './connection/config'
import { doc, onSnapshot, collection, query } from 'firebase/firestore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [contato, setContato] = useState('');
  const [todosDocs, setTodosDocs] = useState([]); 

  useEffect(() => {
    async function getMessages() {
        const values = query(collection(firestore, 'Contatos'));
        onSnapshot(values, (snapshot) => setTodosDocs(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                key: doc.data().Data,
                nome: doc.data().Nome,
                whatsapp: doc.data().Whatsapp,
                mensagem: doc.data().Mensagem,
            })), schedulePushNotification(), 
            
        ));
        console.log(doc.data);
    }
    getMessages();
}, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{flex: 1,}}>
        <Text>nome: {contato.Nome}</Text>
        {todosDocs.map((doc)=>{
            return(
                <>
                    <Text>Data: {doc.key}</Text>
                    <Text>Nome: {doc.nome}</Text>
                    <Text>Whatsapp: {doc.whatsapp}</Text>
                    <Text>Mensagem: {doc.mensagem}</Text>

                </>
            )}
            )}
      <Button
        title="Testar Notificação"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Novo Contato pelo Portfolio",
      body: 'Vá falar com a pessoa, Daniel!!',
      data: { data: 'Adorei o seu portfolio. Vamos marcar uma conversa?' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#ffb900',
      sound: 'notification.wav',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}