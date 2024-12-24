import {
    TouchableHighlight,
    Text,
    StyleSheet
} from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// function tombol biasa
export const Button = (props: any) => {
    return (
        <TouchableHighlight
            onPress={props.onPress}
            style={styles.button}>
            <Text style={styles.title}> {props.title} </Text>
        </TouchableHighlight>
    )
}

// function tombol login with app
export const OtherLogin = (props: any) => {
    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={'#F89AEE'}
            style={styles.buttonOther}>
            <FontAwesome5 name={props.name} size={24} color="black" />
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B6EFE',
        width: 300,
        height: 60,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },

    buttonOther: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECE9EC',
        padding: 10,
        borderRadius: 52,
        borderColor: '#F89AEE',
        borderWidth: 0.4,
        width: 52,
        height: 52,
        marginTop: 32,
        marginRight: 16,
    },
})