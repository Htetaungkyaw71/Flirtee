import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const Header = ({title}) => {
    const navigation = useNavigation()
  return (
    <View className="flex-row items-center px-4">
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeftIcon size={23} color="#A61A44"/>
        </TouchableOpacity>
      <Text className='font-bold text-2xl ml-4 text-white'>{title}</Text>
    </View>
  )
}

export default Header