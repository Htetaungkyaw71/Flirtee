import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'


const ChatScreen = () => {
  const {logOut} = useAuth()
  return (
    <View className="pt-10">
     
     <Button title='Logout' onPress={logOut}></Button>
    </View>
  )
}

export default ChatScreen