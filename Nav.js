import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ModalScreen from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';
import MessageScreen from './screens/MessageScreen';
import LogoutScreen from './screens/LogoutScreen';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot,doc } from 'firebase/firestore';
import { db } from './firebase';


const Nav = () => {
    const Stack = createNativeStackNavigator();
    let [profile,setProfile] = useState(null)
    const {user} = useAuth()
    if(user){
      onSnapshot(doc(db,'users',user.uid),snapshot=>{
        if(!snapshot.exists()){
            setProfile(null)
        }else{
          setProfile(true)
        }
    })
    }
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {user && profile ? (
              <>
                <Stack.Group>  
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                  <Stack.Screen name="Message" component={MessageScreen} />
                  <Stack.Screen name="Logout" component={LogoutScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{presentation:"modal"}}>  
                <Stack.Screen name="Modal" component={ModalScreen} />
              </Stack.Group>
                <Stack.Group screenOptions={{presentation:"transparentModal"}}>  
                  <Stack.Screen name="Match" component={MatchScreen} />
                </Stack.Group>
              </>
         
            )    
            :
            <>
            {user ?(
              <Stack.Group screenOptions={{presentation:"modal"}}>  
                <Stack.Screen name="Modal" component={ModalScreen} />
              </Stack.Group>
            ):
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
   
             }
               
         
            </>
           
        }
        
    </Stack.Navigator>
  )
}

export default Nav