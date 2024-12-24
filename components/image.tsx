import {
    Image,
    StyleSheet
} from "react-native"

// function image atas
export const ImagesTop = (props: any) => {
    return (
        <Image
            style={styles.imgTop}
            source={props.src}
        />
    )
}

// function image bawah (menu login)
export const ImagesBot = (props: any) => {
    return (
        <Image
            style={styles.imgBot}
            source={props.src}
        />
    )
}


const styles = StyleSheet.create({
    imgTop: {
        width: 310,
        height: 187,
        marginBottom: 72,
    },

    imgBot: {
        position: 'absolute',
        bottom: -30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
})