import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import Colors from '../../res/Colors'

const imageBackground = {
    uri: 'https://wallpapercave.com/wp/wp4943499.png',
};

class BadgeLanding extends React.Component {

    handlePress = () => {
        this.props.navigation.replace('BadgesTabNavigator');
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <Text style={styles.title}>
                            Welcome {'\n'}to my {'\n'}binnacle
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    layerColor: {
        flex: 2,
        backgroundColor: '#453DE760',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        margin: 30,
        fontSize: 80,
        fontWeight: 'bold',
        textShadowColor: Colors.white,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        color: '#F75429',
    },
    button: {
        padding: 15,
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: '#121212cc',
        borderColor: Colors.Orange,
        borderWidth: 1,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 25,
        color: Colors.white,
    },
});

export default BadgeLanding;