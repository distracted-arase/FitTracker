
import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){
 const [count,setCount]=useState(0);

 useEffect(()=>{
  AsyncStorage.getItem("count").then(v=>{
   if(v) setCount(parseInt(v));
  });
 },[]);

 useEffect(()=>{
  AsyncStorage.setItem("count", count.toString());
 },[count]);

 return (
  <View style={{marginTop:50}}>
   <Text>Workouts stored locally: {count}</Text>
  </View>
 );
}
