import React,{useState, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import setaOn from '../assets/seta1.png';
import setaOff from '../assets/seta2.png';
import * as Clipboard from 'expo-clipboard';
import {bdfirestore} from '../conexoes/configuracoes';
import { doc, onSnapshot, collection, query } from 'firebase/firestore';

const Bloco = (props) => {
  const [lido, setLido] = useState(false);

  function Msglida() {
    setLido(true);  
    Clipboard.setStringAsync(props.whatsapp);
    //bdfirestore.collection("Contatos").doc(doc.id).update({foo: "bar"});
  }

        return(
      <>
      <View style={lido ? styles.balaoOff : styles.balao}>
      <TouchableOpacity onPress={Msglida}>
        <Text style={{color: lido ? '#555555' : '#c0ff00', fontSize: 12, marginBottom: 10}}>
          {props.whatsapp}
          <Text style={{fontSize:10, color: lido ? '#444444' : '#999999'}}> ~ {props.nome}{props.id}</Text>
        </Text>
        
          <Text style={{color: lido ? '#444444' : '#999999'}}>{props.mensagem}</Text>
        </TouchableOpacity>
    </View>
    <View><Image source={lido ? setaOff : setaOn} style={lido ? styles.setaOff : styles.setaOn}></Image></View>
    </>
    )
}
const styles = StyleSheet.create({
  balao: {
    margin: 10,
    borderWidth: 3,
    borderColor: '#ff8c00',
    width: 300,
    float: 'left',
    padding: 15,
  },
  balaoOff: {
    margin: 10,
    marginLeft:40,
    borderWidth: 3,
    borderColor: '#333333',
    width: 300,
    float: 'right',
    padding: 15,
  },
  texto: {
    color: '#999999',
  },
  logo: {
    width: 310,
    height: 49,
    margin:15,
  },
  setaOn: {
    width: 12,
    height: 7,
    marginTop:-11,
    marginLeft: 280,
    marginBottom: 10,
  },
  setaOff: {
    width: 12,
    height: 7,
    marginTop:-11,
    marginLeft: 60,
    marginBottom: 10,
  },
});

export default Bloco;