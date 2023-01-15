import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatch from '../lib/getMatch'
import { db } from '../firebase'
import { onSnapshot,query,collection,orderBy } from 'firebase/firestore'


const ChatRow = ({detailMatch}) => {
    const navigation = useNavigation()
    const [matchUser, setmatchUser] = useState(null)
    const [lastMessage,setLastMessage] = useState('')
    const { user } = useAuth()

    useEffect(()=>{
        setmatchUser(getMatch(detailMatch.users,user.uid))
    },[setmatchUser,user])

    useEffect(()=>{
      onSnapshot(
          query(
              collection(db,'likes',detailMatch.id,'messages'),
              orderBy('timestamp','desc')
              ),snapshot=>setLastMessage(snapshot.docs[0]?.data()?.message)
          )
  },[detailMatch,db])

  return (
    <TouchableOpacity className="flex-row items-center bg-[#36353E] p-2 mx-4 mt-5 rounded-xl" onPress={()=>navigation.navigate('Message',{
        detailMatch
    })}>
        <Image
        source={{uri:matchUser?.image}}
        className="mr-4 rounded-full w-12 h-12"
        />
        <View>
        <Text className="text-gray-100">{matchUser?.displayName}</Text>
      <Text className="text-gray-300">{lastMessage || 'Say Hi!'}</Text>
        </View>

    </TouchableOpacity>
  )
}

export default ChatRow