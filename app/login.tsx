import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ToastAndroid,
} from "react-native";
import {
    Button,
    ImagesTop,
    Input,
    OtherLogin,
    ImagesBot,
} from "@/components";
import React from "react";
import { router, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import CApi from "@/lib/CApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    // function untuk routetombol login
    const route = () => {
        router.push('/')
    }

    // function untuk route tombol login with
    const googleApp = () => {
        router.push('/')
    }
    const facebookApp = () => {
        router.push('/')
    }
    const appleApp = () => {
        router.push('/')
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        const email = username;

        if (!email || !password) {
            ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
            return;
        }

        try {
            const request = {
                email: username,
                password: password,
            };

            const { data } = await CApi.post('/login', request, {
                headers: { 'Content-Type': 'text/plain' }
            });

            console.log('Login berhasil:', data);
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userEmail', data.data.email);
            await AsyncStorage.setItem('userName', data.data.name);

            router.push('/home')
        } catch (err) {
            console.log('Login gagal:', err);
            const msg = err?.response?.data?.message || 'Terjadi kesalahan';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };


    return (
        <ScrollView style={styles.scrolling}>
            <View style={styles.container}>
                <View style={styles.imgTop}>
                    {/* component ImageTop */}
                    <ImagesTop
                        src={require('./assets/image/gambar1.png')}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.title}>Login Details</Text>
                    {/* component Input */}
                    <Input
                        placeholder='Username , email & phone number'
                        change={setUsername}
                        value={username}
                    />
                    <Input
                        placeholder='Password'
                        change={setPassword}
                        value={password}
                        secure={true}
                    />

                    <Text style={styles.forgot}>Forgot Password ?</Text>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                    />

                    <View style={styles.break}>
                        {/* linear gradient package */}
                        <LinearGradient
                            colors={['#0B6EFE', '#C4C4C400']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.breakRow}
                        />
                        <Text style={styles.signup}>Or sign up with</Text>
                        <LinearGradient
                            colors={['#0B6EFE', '#C4C4C400']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.breakRow}
                        />
                    </View>
                    <View style={styles.apps}>
                        {/* sign with app */}
                        <OtherLogin
                            onPress={googleApp}
                            name="google"
                        />
                        <OtherLogin
                            onPress={facebookApp}
                            name="facebook"
                        />
                        <OtherLogin
                            onPress={appleApp}
                            name="apple"
                        />
                    </View>
                </View>
                {/* component ImageBot */}
                <ImagesBot
                    src={require('./assets/image/vector.png')}
                />
                {/* link ke menu register */}
                <View style={styles.apps}>
                    <Link href='/register' style={styles.signup}>Register Account</Link>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrolling: {
        backgroundColor: "#FFFFFF",
    },

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingBottom: 50,
    },

    imgTop: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },

    form: {
        display: 'flex',
        marginLeft: 30,
        marginRight: 30,
        top: -40
    },

    title: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '600',
    },

    forgot: {
        textAlign: 'right',
        marginTop: 8,
        color: '#635C5C',
        fontWeight: '600',
    },

    break: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 34
    },

    breakRow: {
        width: '30%',
        height: 3,
        marginHorizontal: 8,
    },

    apps: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    signup: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555252',
    },
})
