import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { db } from '../firebase'
import ChatRow from './ChatRow'


const ChatList = () => {
    const {user} = useAuth()
    const [matches,setMatches] = useState([])

    useEffect(()=>{
        onSnapshot(query(collection(db,'likes'),where('userMatches','array-contains',user.uid)),
        (snapshot)=>{
            setMatches(snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            })

            ))
        }
        )
    },[user])


  return (
    matches.length > 0 ? (
    <FlatList
        className="h-full"
        data={matches}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><ChatRow detailMatch={item}/>}
    />
    ):(
        <Text className="p-5 text-white">
            No Matches
        </Text>
    )
  )
}

export default ChatList