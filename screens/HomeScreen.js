import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Swiper from 'react-native-deck-swiper';
import { ChatBubbleLeftRightIcon,XMarkIcon,HeartIcon } from "react-native-heroicons/outline";
import { doc, onSnapshot, collection, setDoc, getDocs,getDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import generate from '../lib/generate';





const HomeScreen = () => {
    const {user} = useAuth()
    const navigation = useNavigation()
    const [profiles,setprofiles] = useState([]) 
    const [userProfile, setuserProfile] = useState(null)
    const swipeRef = useRef(null)


    useLayoutEffect(()=>{
        const unsub = onSnapshot(doc(db,'users',user.uid),snapshot=>{
            if(!snapshot.exists()){
                navigation.navigate('Modal')
            }
        })
        return unsub;
    },[])

    useEffect(()=>{
        let unsub;
        
        const fetchCards = async()=>{
            const passes = await getDocs(collection(db,'users',user.uid,'passes'))
            .then(snapshot=>snapshot.docs.map((doc)=>doc.id))

            const match = await getDocs(collection(db,'users',user.uid,'match'))
            .then(snapshot=>snapshot.docs.map((doc)=>doc.id))

            let passesIds = passes.length > 0 ? passes : ["test"];
            let matchIds = match.length > 0 ? match : ["test"];
            unsub = onSnapshot(        
                query(
                    collection(db,'users'),
                    where('id','not-in',[...passesIds,...matchIds])
                ),
                snapshot=>{
                    setprofiles(snapshot.docs.filter(doc=>doc.id !== user.uid).map(doc=>({
                    id: doc.id,
                    ...doc.data()
                })
                ))
                setuserProfile(snapshot.docs.filter(doc=>doc.id === user.uid).map(doc=>({
                    id: doc.id,
                    ...doc.data()
                })
                ))
            })
        }
        fetchCards()
        return unsub
    },[])

    const swipeTop = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;
        let userPassed = profiles[cardIndex]
        setDoc(doc(db,'users',user.uid,'passes',userPassed.id),userPassed)
    }

    const swipeBottom = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;
        let userMatch = profiles[cardIndex]
        let loggedInUser = userProfile[0]

        console.log("bottom")
        setDoc(doc(db,'users',user.uid,'match',userMatch.id),userMatch)

        // getDoc(db,'users',userMatch.id,'match',user.uid).then(snapshot=>{
        //     if(snapshot.exists()){
        //         console.log("Match")
        //         console.log("Log",loggedInUser)
        //         console.log("Mtach",userMatch)
        //         setDoc(doc(db,'users',user.uid,'match',userMatch.id),userMatch)
        //         setDoc(doc(db,'likes',generate(user.uid,userMatch.id)),{
        //             users:{
        //                 [user.uid]:loggedInUser,
        //                 [userMatch.id]:userMatch
        //             },
        //             userMatches:[user.uid,userMatch.id],
        //             timestamp:serverTimestamp()
        //         })
        //         navigation.navigate('Match',{
        //             loggedInUser,userMatch
        //         })

        //     }else{
        //         setDoc(doc(db,'users',user.uid,'match',userMatch.id),userMatch)
        //     }
        // })

    }
    
    
    return (
        <View className="flex-1 bg-[#18171F]">
            {/* Header */}
            <View className="flex-row items-center justify-between  p-4 mt-10">
                <TouchableOpacity>
                    <Image source={{uri:userProfile && userProfile[0].image ? userProfile[0].image :"https://thispersondoesnotexist.com/image"}} className="w-10 h-10 rounded-full"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Modal')}>
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
                cards={profiles}
                renderCard={(card) => card ?
                     (
                            <View key={card.id} className="relative bg-white h-3/4 rounded-xl">
                                <Image source={{uri:card.image}} className="absolute top-0 w-full h-full rounded-xl" />     
                                    <View style={styles.glass} className="absolute bottom-0 border-0 w-full h-20 px-6 py-2 rounded-b-xl ">
                                        <Text className="font-bold text-2xl text-white">
                                                {card.displayName}, {card.age}
                                        </Text>   
                                        <Text className="text-lg text-white">
                                                {card.job}
                                        </Text>         
                                    </View>
                            </View>         
                    ):
                        (
                        <View className="justify-center items-center bg-white h-3/4 rounded-xl">
                                <Text className="text-2xl text-black">
                                        No more profiles
                                </Text>  
                        </View>        
                        )
                    
                
                }
         
                    horizontalSwipe = {false} 
                    animateCardOpacity
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}
                    stackSize= {5}
                    onSwipedTop={(cardIndex)=>swipeTop(cardIndex)}
                    onSwipedBottom={(cardIndex)=>swipeBottom(cardIndex)}
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

        </View>
    );
}


const styles = StyleSheet.create({
    glass:{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    }
})


export default HomeScreen
