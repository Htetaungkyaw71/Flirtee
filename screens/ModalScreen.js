import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'


const ModalScreen = () => {
    const [image,setImage] = useState(null)
    const [job,setJob] = useState(null)
    const [age,setAge] = useState(null)
    const {user} = useAuth()
    const navigation = useNavigation()

    const incompleteProfile = !job || !image || !age;

    const updateUserProfile = ()=>{
        setDoc(doc(db,'users',user.uid),{
            id:user.uid,
            displayName:user.displayName,
            age,
            job,
            image,
            timestamp:serverTimestamp()
        }).then(()=>{
            navigation.navigate('Home')
        }).catch(error=>{
            console.log(error.message)
        })
    }
    

  return (
    <View className="p-10 bg-[#18171F] items-center flex-1 justify-between">
        <View className="mt-5">
        <View className="flex-row items-center justify-center">
            <Image source={require('../assets/logo.png')} className="w-12 h-12 rounded-full"/>
            <Text className="text-white ml-2 font-bold text-2xl">
                Flirtee
            </Text>
        </View>
        <View className="items-center text-center mt-4">
                <Text className="text-gray-300 text-center mb-5 font-bold text-lg">
                    Welcome {user.displayName}
                </Text>
                <Text className="text-[#A61A44] text-center mb-5 font-bold text-lg">
                    Step 1 Updated profile Pic
                </Text>
                <TextInput placeholder='Enter your profile pic url'
                    defaultValue={image}
                    onChangeText={setImage}                
                    placeholderTextColor="gray" 
                    className="p-2 bg-[#36353E] text-gray-300 mb-5 font-bold w-60 rounded-xl "
            />  
            <Text className="text-[#A61A44] text-center mb-5 font-bold text-lg">
                    Step 2 Updated your age
                </Text>
                <TextInput placeholder='Enter your age'
                    maxLength={2}
                    keyboardType='numberic'
                    defaultValue={age}
                    onChangeText={setAge}                
                    placeholderTextColor="gray" 
                    className="p-2 bg-[#36353E] text-gray-300 mb-5 font-bold  w-60  rounded-xl "
            /> 
            <Text className="text-[#A61A44] text-center mb-5 font-bold text-lg">
                    Step 1 Updated your job
                </Text>
                <TextInput placeholder='Enter your job'
                    defaultValue={job}
                    onChangeText={setJob}                
                    placeholderTextColor="gray" 
                    className="p-2 bg-[#36353E] text-gray-300 font-bold  w-60  rounded-xl "
            />  

        

        </View>
        </View>
   
      <TouchableOpacity
      onPress={updateUserProfile}
      disabled={incompleteProfile} 
      className={`mt-20 ${incompleteProfile ? 'bg-gray-500': 'bg-[#A61A44]' }   p-3 px-4 rounded-xl`}>
            <Text className="font-bold text-center text-white">
                Update Profile
            </Text>
        </TouchableOpacity>


  
    </View>
  )
}

export default ModalScreen