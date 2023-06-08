import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  AccountScreen,
  LoginScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen,
} from './src/screens';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const getIsSignedIn = () => {
  return false;
};
function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Track List" component={TrackListScreen} />
      <Stack.Screen name="Track Detail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const isSignedIn = getIsSignedIn();

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <BottomTab.Navigator>
          <BottomTab.Screen
            name="Track"
            component={Stacks}
            options={{ headerShown: false }}
          />
          <BottomTab.Screen name="Track Create" component={TrackCreateScreen} />
          <BottomTab.Screen name="Account" component={AccountScreen} />
        </BottomTab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="登录">
          <Stack.Screen name="登录" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
