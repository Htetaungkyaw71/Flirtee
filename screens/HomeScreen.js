import { View, Text, Button,StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Swiper from 'react-native-deck-swiper';
import { ChatBubbleLeftRightIcon,XMarkIcon,HeartIcon } from "react-native-heroicons/outline";



let data = [
    {
        id:1,
        name:"Kyaw",
        age:23,
        image:"https://thispersondoesnotexist.com/image",
        job:"Software enginner"
    },
    {
        id:2,
        name:"Htet",
        age:21,
        image:"https://thispersondoesnotexist.com/image",
        job:"Software enginner"
    },
    {
        id:3,
        name:"Chan",
        age:20,
        image:"https://thispersondoesnotexist.com/image",
        job:"Software enginner"
    },
    {
        id:4,
        name:"Hla",
        age:19,
        image:"https://thispersondoesnotexist.com/image",
        job:"Software enginner"
    },

]

const HomeScreen = () => {
    const navigation = useNavigation()
    // const { logOut } = useAuth()
    const swipeRef = useRef(null)
    
    return (
        <View className="flex-1 bg-[#18171F]">
            {/* Header */}
            <View className="flex-row items-center justify-between  p-4 mt-10">
                <TouchableOpacity>
                    <Image source={{uri:"https://thispersondoesnotexist.com/image"}} className="w-10 h-10 rounded-full"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require("../assets/logo.png")} className="w-10 h-10 rounded-full"/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate('Chat')}>
                    <ChatBubbleLeftRightIcon size={35} fill="#18171F" color="#A61A44"/>
                </TouchableOpacity>
            </View>
            {/* End of Header */}

            <View className="flex-1 -mt-6">
            <Swiper
                ref={swipeRef}
                containerStyle={{backgroundColor:"transparent"}}
                cards={data}
                renderCard={(card) => {
                    return (
                            <View key={card.id} className="relative bg-white h-3/4 rounded-xl">
                                <Image source={{uri:card.image}} className="absolute top-0 w-full h-full rounded-xl" />     
                                    <View style={styles.glass} className="absolute bottom-0 border-0 w-full h-20 px-6 py-2 rounded-b-xl ">
                                        <Text className="font-bold text-2xl text-white">
                                                {card.name}, {card.age}
                                        </Text>   
                                        <Text className="text-lg text-white">
                                                {card.job}
                                        </Text>         
                                    </View>
                            </View>         
                        )
                    }}
         
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    horizontalSwipe = {false} 
                    animateCardOpacity
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}
                    stackSize= {5}
                    onSwipedTop={()=>console.log("Nope")}
                    onSwipedBottom={()=>console.log("Match")}
                    overlayLabels={{
                        top:{
                            title:"Nope",
                            style:{
                                label:{
                                    color:"red",
                                    textAlign:"center",
                                }
                            }
                        },
                        bottom:{
                            title:"Match",
                            style:{
                                label:{
                                    color:"green",
                                    textAlign:"center"
        
                                }
                            }
                        }
                    }}
                    
                    >
            </Swiper>
            </View>

            <View className="flex-row justify-around bottom-10">
                <TouchableOpacity className="rounded-full bg-white p-2" onPress={()=>swipeRef.current.swipeTop()}>
                    <XMarkIcon size={35} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity  className="rounded-full bg-[#A61A44] p-2" onPress={()=>swipeRef.current.swipeBottom()}>
                    <HeartIcon size={35} color="white" fill="white"/>
                </TouchableOpacity>

            </View>


          {/* <Text>Hello world</Text>
          <Button title='Chat' onPress={()=>navigation.navigate('Chat')}></Button>
          <Button title='Logout' onPress={logOut}></Button> */}
        </View>
    );
}


const styles = StyleSheet.create({
    glass:{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    }
})


export default HomeScreen
