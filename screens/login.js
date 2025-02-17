import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUser, signInUser } from '../firebase/firebase';  // Assuming these functions are defined
import { Ionicons } from '@expo/vector-icons';

const AuthScreen = ({ navigation }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
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
    if (isRegister) {
      if (!username) {
        Alert.alert('Error', 'Username is required!');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }
    }

    setLoading(true);
    const authAction = isRegister ? createUser(email, password, username) : signInUser(email, password);

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
        {/* Register/Login Form */}
        <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>

        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ddd"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={isRegister ? 'Email' : 'Email or Username'}
          placeholderTextColor="#ddd"
          autoCapitalize="none"
          value={isRegister ? email : username}
          onChangeText={text => (isRegister ? setEmail(text) : setUsername(text))}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {isRegister && (
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#ddd"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>{isRegister ? 'Sign Up' : 'Login'}</Text>}
        </TouchableOpacity>


        <TouchableOpacity onPress={() => toggleForm()}>
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
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 15,
  },
  button: {
    backgroundColor: '#ff4757',
    paddingVertical: 16,
    borderRadius: 12,
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
    textAlign: 'center',
  },
});
