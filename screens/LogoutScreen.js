import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'


const LogoutScreen = () => {
    const {logOut} = useAuth()
    return (
        <View className="flex-1 justify-center items-center bg-[#18171F]">
            <Image source={require("../assets/logo.png")} className="w-32 h-32 rounded-full"/>
            <TouchableOpacity onPress={logOut} className="bg-[#A61A44] p-3 mt-4 rounded">
                <Text className="text-white font-bold text-lg">
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogoutScreen