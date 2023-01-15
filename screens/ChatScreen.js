import { View, Text, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ChatList from '../components/ChatList'


const ChatScreen = () => {

  return (
    <View className="pt-12 flex-1 bg-[#18171F] ">
     <Header title="chat"/>
      <ChatList/>
    </View>
  )
}

export default ChatScreen