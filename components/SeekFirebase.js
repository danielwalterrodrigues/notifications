import React,{useState, useEffect} from "react";
import { Text } from "react-native";
import { firestore } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore';

const SeekFirebase = () => {
    const [contato, setContato] = useState('')

    useEffect(() => {
        const contatosRef = doc(firestore, 'Contatos', 'primeiroContato');
        const contatosListner = onSnapshot(contatosRef, (querySnapshot) => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data()
            setContato(data)
            // AQUI ENTRA A AÇÃO QUE FAZ A NOTIFICATION
          } else {
            console.log("No such document!");
          }
        })
        return () => contatosListner()
      }, []);

    
    return(
        <>
            <Text>
                {contato.Nome}
            </Text>
        </>
    )
}
export default SeekFirebase;