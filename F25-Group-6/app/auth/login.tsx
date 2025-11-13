import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // the login logic
    const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
     })
  
      if (error) {
        alert(`Sign-up failed: ${error.message}`);
        console.error('Error:', error);
        return;
      }
  
      console.log('Login successful:', data);
      // Redirect to your main app screen after successful login
      router.replace('/(tabs)'); // Adjust this to your main screen route
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Log In' }} />
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.inner}>
          <ThemedText type="title" style={styles.title}>
            Welcome Back
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={styles.linkText}>
              Don’t have an account? Sign up
            </Text>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inner: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    marginTop: 16,
    fontSize: 14,
    color: '#007AFF',
  },
});