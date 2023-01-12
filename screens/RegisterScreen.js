import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {createUserWithEmailAndPassword,getAuth} from "firebase/auth"



const RegisterScreen = () => {
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let navigation = useNavigation()
    
 

    const handleRegister = ()=>{
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email)
        })
        .catch((error) => {
          alert(error.message)
        });
    }
  return (
    <View className="flex-1 px-6 justify-around bg-[#18171F]">
      <View></View>
      <View>
      <View className=" justify-center items-center mb-10">
        <Image source={require('../assets/logo.png')} className="w-20 h-20 text-center"/>
        </View>
        <Text className="mb-2 text-3xl font-bold text-white">Let's sign you up.</Text>
        <Text className="mb-2 text-3xl font-bold text-gray-300">Welcome Back.</Text>
        <Text className="mb-10 text-3xl font-bold text-gray-300">You've been missed.</Text>
      <TextInput placeholder='Email'
          onChangeText={newText => setEmail(newText)}
          defaultValue={email}
          placeholderTextColor="gray" 
          className="p-3 bg-[#36353E] border-[#5A5A64] text-gray-300 border-2 text-lg  font-bold w-full rounded-xl px-2 "
          />      
        <TextInput placeholder='Password'
        onChangeText={newText => setPassword(newText)}
        placeholderTextColor="gray" 
        className="p-3 bg-[#36353E] border-[#5A5A64] text-gray-300 border-2 text-lg font-bold w-full rounded-xl mt-3 px-2 mb-5"
        defaultValue={password} 
        />
      </View>
      

      <View>
      <View className="flex-row justify-center mb-3 text-center space-x-2">
              <Text className="text-gray-400">If you have already account. Please</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                  <Text className="text-white">Sign In</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-white p-3 rounded-xl text-center" onPress={handleRegister}>
            <Text className="text-center font-bold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
    
          
      </View>
    
    </View>
  )
}

export default RegisterScreen