import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation state
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedEmail = await AsyncStorage.getItem('userEmail');

                if (!token || !storedEmail) {
                    ToastAndroid.show('User data not found', ToastAndroid.SHORT);
                    return;
                }
                const name = await AsyncStorage.getItem('userName');
                setUserData({
                    name: name || '',
                    email: storedEmail
                });

            } catch (err) {
                console.log('Error fetching user data:', err);
                ToastAndroid.show('Failed to fetch user data', ToastAndroid.SHORT);
            }
        };

        fetchUserData();

        // Trigger fade-in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
            router.replace('/login');
        } catch (err) {
            console.log('Error during logout:', err);
            ToastAndroid.show('Failed to logout', ToastAndroid.SHORT);
        }
    };

    return (
        <LinearGradient colors={['#1E90FF', '#FFFFFF']} style={styles.container}>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                <Image 
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                    style={styles.profileIcon} 
                />
                <Text style={styles.welcomeMessage}>👋 Hello, Welcome Back!</Text>
                <Text style={styles.title}>Welcome, {userData.name}!</Text>
                <Text style={styles.subtitle}>Email: {userData.email}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                <Text style={styles.footer}>Have a great day! 🌟</Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    welcomeMessage: {
        fontSize: 20,
        color: '#4B5368',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#4B5368',
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#FF4D4D',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
        fontSize: 14,
        color: '#1E90FF',
        fontStyle: 'italic',
    },
});