import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import WorkoutLogScreen from './screens/WorkoutLogScreen';
import ExerciseLibraryScreen from './screens/ExerciseLibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { COLORS } from './data/mockData';

const Tab = createBottomTabNavigator();

// Custom tab bar icon with label
const TabIcon = ({ name, label, focused, color }) => (
	<View style={tabStyles.iconWrap}>
		<Ionicons name={name} size={22} color={color} />
		<Text style={[tabStyles.iconLabel, { color }]} numberOfLines={1}>
			{label}
		</Text>
		{focused && <View style={tabStyles.activeDot} />}
	</View>
);

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" />
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
		</NavigationContainer>
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
