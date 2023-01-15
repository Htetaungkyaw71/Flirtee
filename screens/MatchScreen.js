import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchScreen = () => {
  const navigation = useNavigation()
  const {params} = useRoute()
  const {loggedInUser,userMatch} = params;
  return (
    <View className="flex-1 h-full bg-red-500 opacity-80 pt-20">
      <View className="text-center justify-center items-center">
        <Image source={require('../assets/match1.png')} className="w-60 h-60 text-center justify-center items-center" />
        <Text className="text-white font-bold mb-5 -mt-16 text-center">
            You and {userMatch.displayName} have liked each other.
        </Text>
      </View>
      <View className="flex-row justify-around mt-5">
        <Image source={{uri:loggedInUser.image}} className="w-20 h-20 rounded-full"/>
        <Image source={{uri:userMatch.image}} className="w-20 h-20 rounded-full"/>
      </View>
      <TouchableOpacity onPress={()=>{navigation.goBack();navigation.navigate('Chat')}} className="bg-white p-4 mx-12 rounded-xl mt-10 items-center justify-center">
        <Text className="font-bold" >
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MatchScreen