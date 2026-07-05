import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import WorkoutLogScreen from './screens/WorkoutLogScreen';
import ExerciseLibraryScreen from './screens/ExerciseLibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { COLORS } from './data/mockData';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, label, focused, color }) => (
	<View style={tabStyles.iconWrap}>
		<Ionicons name={name} size={22} color={color} />
		<Text style={[tabStyles.iconLabel, { color }]} numberOfLines={1}>
			{label}
		</Text>
		{focused && <View style={tabStyles.activeDot} />}
	</View>
);

function MainTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: COLORS.surface,
					borderTopColor: COLORS.border,
					borderTopWidth: 1,
					height: 72,
					paddingBottom: 10,
					paddingTop: 6,
				},
				tabBarActiveTintColor: COLORS.accent,
				tabBarInactiveTintColor: COLORS.textFaint,
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabIcon name={focused ? 'home' : 'home-outline'} label="Home" focused={focused} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="WorkoutLog"
				component={WorkoutLogScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabIcon name={focused ? 'calendar' : 'calendar-outline'} label="Log" focused={focused} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="ExerciseLibrary"
				component={ExerciseLibraryScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabIcon name={focused ? 'barbell' : 'barbell-outline'} label="Exercises" focused={focused} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabIcon name={focused ? 'person' : 'person-outline'} label="Profile" focused={focused} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

function RootNavigator() {
	const { user, loading } = useAuth();
	const [showRegister, setShowRegister] = useState(false);

	if (loading) {
		return (
			<View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={COLORS.accent} />
			</View>
		);
	}

	if (!user) {
		return showRegister ? (
			<RegisterScreen onSwitchToLogin={() => setShowRegister(false)} />
		) : (
			<LoginScreen onSwitchToRegister={() => setShowRegister(true)} />
		);
	}

	return <MainTabs />;
}

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<StatusBar style="light" />
				<RootNavigator />
			</NavigationContainer>
			<Toast />
		</AuthProvider>
	);
}

const tabStyles = StyleSheet.create({
	iconWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 2,
		width: 64,
	},
	iconLabel: {
		fontSize: 10,
		fontWeight: '600',
		marginTop: 3,
	},
	activeDot: {
		position: 'absolute',
		bottom: -8,
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: COLORS.accent,
	},
});