import { View, Text, Image } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View  className="bg-red-400 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 ml-16 self-start">
       <Image className="h-12 w-12 rounded-full absolute top-0 -left-14" source={{uri:message.image}} />
      <Text className="text-white">{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage