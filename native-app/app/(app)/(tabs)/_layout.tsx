import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable, useColorScheme} from 'react-native';

import Colors from '../../../constants/Colors';
import { Button } from '../../../components/Themed';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from '../../../constants';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {setAuth} = useContext(AuthContext);

  const logOut = () => {
    AsyncStorage.removeItem(AUTH_TOKEN);
    setAuth({isLoggedIn: false, token: ''});
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerRight: () => <Button onPress={logOut} style={{marginRight: 10}} text="Logout"></Button>
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Machine State',
          tabBarIcon: ({color}) => <TabBarIcon name='list-ul' color={color} />,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Log Part',
          tabBarIcon: ({color}) => <TabBarIcon name='edit' color={color} />,
        }}
      />
    </Tabs>
  );
}
