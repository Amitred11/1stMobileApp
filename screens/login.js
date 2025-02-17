import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUser, signInUser } from '../firebase/firebase';  // Import the functions
import { Ionicons } from '@expo/vector-icons';  // To use the back icon

const AuthScreen = ({ navigation }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleForm = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsRegister(!isRegister);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }
    if (isRegister && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    setLoading(true);

    const authAction = isRegister
      ? createUser(email, password)
      : signInUser(email, password);

    authAction
      .then(() => {
        Alert.alert('Success', isRegister ? 'Account created successfully!' : 'Logged in successfully!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>{isRegister ? 'Sign Up' : 'Login'}</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleText}>{isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,  // Added padding for a bit more space from the top
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  button: {
    backgroundColor: '#ff4757',
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 15, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 25,
    fontSize: 16,
    color: '#ff4757',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
