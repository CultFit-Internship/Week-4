import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../data/mockData';

export default function LoginScreen({ onSwitchToRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password) return;
    setSubmitting(true);
    await login(username.trim(), password);
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CultCoach</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor={COLORS.textFaint}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.textFaint}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={submitting}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToRegister}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.textFaint, textAlign: 'center', marginBottom: 32 },
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