import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../data/mockData';
import Toast from 'react-native-toast-message';

export default function RegisterScreen({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }
    if (password.length < 8) {
      Toast.show({ type: 'error', text1: 'Password must be at least 8 characters' });
      return;
    }
    setSubmitting(true);
    const success = await register(username.trim(), email.trim(), password);
    setSubmitting(false);
    if (success) onSwitchToLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={COLORS.textFaint}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.textFaint}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min 8 characters)"
        placeholderTextColor={COLORS.textFaint}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={submitting}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToLogin}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { color: COLORS.accent, textAlign: 'center', marginTop: 20 },
});