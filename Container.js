import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context as AuthContext } from './src/context/AuthContext';

import {
  AccountScreen,
  LoginScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen,
  ResolveAuthScreen,
} from './src/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Track List" component={TrackListScreen} />
      <Stack.Screen name="Track Detail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

export default function Container() {
  const {
    state: { token },
  } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {token ? (
          <BottomTab.Navigator>
            <BottomTab.Screen
              name="Track"
              component={Stacks}
              options={{ headerShown: false }}
            />
            <BottomTab.Screen
              name="Track Create"
              component={TrackCreateScreen}
            />
            <BottomTab.Screen name="Account" component={AccountScreen} />
          </BottomTab.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="resolve"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="resolve" component={ResolveAuthScreen} />
            <Stack.Screen name="登录" component={LoginScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
