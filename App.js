import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutDown, BounceIn } from 'react-native-reanimated';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import OtpScreen from './screens/otp';

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <Animated.View entering={BounceIn.duration(800)} style={styles.logoContainer}>
      <Image source={require('./assets/work-victory.png')} style={styles.logo} />
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(800)} exiting={FadeOutDown.duration(500)} style={styles.content}>
        <Text style={styles.title}>Welcome to the App</Text>
        <Text style={styles.subtitle}>Experience the best features designed just for you.</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="otp" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
