import { View, Text,Keyboard, KeyboardAvoidingView, TextInput, Button, Platform, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import getMatch from '../lib/getMatch'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'



const MessageScreen = () => {
    const {user} = useAuth()
    const {params} = useRoute()
    const {detailMatch} = params;
    let [input,setInput] = useState('')
    let [messages,setMessages] = useState([])

    const name = getMatch(detailMatch.users,user.uid).displayName;

    useEffect(()=>{
        onSnapshot(
            query(
                collection(db,'likes',detailMatch.id,'messages'),
                orderBy('timestamp','desc')
                ),snapshot=>setMessages(snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                })))
            )
    },[detailMatch,db])

    const sendMessage = ()=>{
        addDoc(collection(db,'likes',detailMatch.id,'messages'),{
            timestamp:serverTimestamp(),
            userId:user.uid,
            displayName:user.displayName,
            image:detailMatch.users[user.uid].image,
            message:input
        })

        setInput('');
    }

  return (
    <View className="pt-12 flex-1 bg-[#18171F] ">

        <Header title={name}/>

        <KeyboardAvoidingView className="flex-1"
            keyboardVerticalOffset={10} 
            behavior={Platform.OS === 'ios' ?'padding':'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                    data={messages}
                    inverted={-1}
                    className="pl-3"
                    keyExtractor={(item)=>item.id}
                    renderItem={({item:message})=>
                        message.userId === user.uid ? (
                            <SenderMessage key={message.id} message={message}/>
                        ):
                        (
                            <ReceiverMessage key={message.id} message={message}/>
                        )
                    }
                />
                </TouchableWithoutFeedback>
            
            <View className="flex-row items-center space-x-2 pb-3 mt-3 mx-4">
            <View className="flex-row items-center justify-between rounded px-3 flex-1 bg-[#36353E] space-x-2">
            
                <TextInput 
                value={input} 
                onChangeText={setInput} 
                placeholder='send message...' 
                onSubmitEditing={sendMessage}
                className="p-2 text-lg text-white"
                />

             
                <TouchableOpacity onPress={sendMessage} className="p-1" >
                    <Text className="text-[#A61A44] font-bold">Send</Text>
                </TouchableOpacity>
             
            </View> 
              
          
            
           
         
        </View>
     
      

        </KeyboardAvoidingView>
   </View>
  )
}

export default MessageScreen