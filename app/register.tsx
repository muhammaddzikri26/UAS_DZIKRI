import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ToastAndroid
} from "react-native";
import {
    Button,
    ImagesTop,
    Input,
    OtherLogin,
} from "@/components";
import React from "react";
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData, resetData } from '../store/reducer/loginReducer';

export default function Register() {

    const registerForm = useSelector((state) => state.login.loginInput);
    const dispatch = useDispatch();

    const onChangeValue = (payload: any) => {
        dispatch(setData({ ...registerForm, ...payload }));
    };

    const onRegist = async () => {
        try {
            if (!email.includes("@gmail.com")) {
                setErrorMsg("Please enter a valid email!");
            } if (registerForm.password !== registerForm.confirm_password) {
                ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
                return;
            } else {
                const { data } = await CApi.post('/register', registerForm, {
                    headers: { 'Content-Type': 'text/plain' }
                });

                ToastAndroid.show("Register Success", ToastAndroid.SHORT);
                // console.log('registrasi berhasil', data)

                dispatch(resetData());
                router.push('/login')
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
            // console.log(msg)
        }
    };

    const loginPage = () => {
        router.push('/');
    }

    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <View style={styles.imgTop}>
                    <ImagesTop
                        src={require('./assets/image/gambar2.png')}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.title}>Register Account</Text>
                    <Input
                        placeholder='Full Name'
                        change={(val: any) => onChangeValue({ name: val })}
                        value={registerForm.name}
                    />

                    <Input
                        placeholder='Email'
                        change={(val: any) => onChangeValue({ email: val })}
                        value={registerForm.email}
                        errorMsg={errorMsg}
                    />
                    {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

                    <Input
                        placeholder='Password'
                        change={(val: any) => onChangeValue({ password: val })}
                        value={registerForm.password}
                        secure={true}
                    />

                    <Input
                        placeholder='Confirm Password'
                        change={(val: any) => onChangeValue({ confirm_password: val })}
                        value={registerForm.confirm_password}
                        secure={true}
                    />

                    <Button
                        title="Login"
                        onPress={onRegist}
                    />

                    <View style={styles.break}>
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
                        <OtherLogin
                            onPress={loginPage}
                            name="google"
                        />
                        <OtherLogin
                            onPress={loginPage}
                            name="facebook"
                        />
                        <OtherLogin
                            onPress={loginPage}
                            name="apple"
                        />
                    </View>
                </View>
            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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

    errorMsg: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    }
});
