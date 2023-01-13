import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ModalScreen from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';


const Nav = () => {
    const Stack = createNativeStackNavigator();
    const {user} = useAuth()
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {user ? (
              <>
                <Stack.Group>  
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
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
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            </>
           
        }
        
    </Stack.Navigator>
  )
}

export default Nav