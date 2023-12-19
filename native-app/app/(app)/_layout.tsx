import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../../providers/AuthProvider';

export default function AppLayout() {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return <Text>Loading</Text>
  }

  if (!auth.isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{headerShown: false}}/>;
}