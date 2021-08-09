import React from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    StatusBar,
} from 'react-native';
import Colors from '../../res/Colors';
import UserSession from '../../libs/sessions';
import styles from './styles';
import Loader from '../Generics/Loader';

const imageBackground = {
    uri: 'https://r1.ilikewallpaper.net/iphone-12-pro-pro-max-wallpapers/download-111375/Avatar-Appa-Album-on-Imgur.jpg'
};

class Login extends React.Component {
    state = {
        loading: false,
        error: null,
        user: undefined,
        isPasswordVisible: true,
        form: {},
    };

    componentDidMount = () => {
        this.deleteTokens();
    };
    //here we logout deleting the tokens
    deleteTokens = async () => {
        await UserSession.instance.logout();
    };
    //login to the app checking different errors
    handleSubmit = async () => {
        try {
            this.setState({ loading: true, error: null, user: undefined });
            let response = await UserSession.instance.login(this.state.form);

            if (typeof response === 'object') {
                console.log(response);
                if (response['405']) {
                    var message = 'Account is not verified';
                } else {
                    var message = 'Invalid Username or password. Try again';
                }
                this.setState({ loading: false, error: message, user: undefined });
            } else {
                this.setState({ loading: false, error: null, user: response });
            }
        } catch (err) {
            this.setState({ loading: false, error: err });
        }
        if (this.state.user) {
            this.props.navigation.replace('BadgesTabNavigator');
        }
    };
    //here we configure if we can see the password
    ToggleisPasswordVisible = () => {
        if (this.state.isPasswordVisible) {
            this.setState({ isPasswordVisible: false });
        } else {
            this.setState({ isPasswordVisible: true });
        }
    };
    //button to go to the sign up
    handleSignup = () => {
        this.props.navigation.navigate('Signup');
    };

    render() {
        const { isPasswordVisible, loading, error, user } = this.state;

        if (loading === true && !user) {
            return <Loader />
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Log in</Text>
                            {error ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorMsg}>
                                        {'Invalid username or Pasword'}
                                    </Text>
                                </View>
                            ) : null}
                            <View style={styles.formgroup}>
                                <Text style={styles.inputText}>Username</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Username'}
                                    keyboardAppearance="dark"
                                    onChangeText={text => {
                                        this.setState(prevState => {
                                            let form = Object.assign({}, prevState.form);
                                            form.username = text;
                                            return { form };
                                        });
                                    }}
                                />
                                <Text style={styles.inputText}>Password</Text>
                                <View style={styles.password}>
                                    <TextInput
                                        style={styles.inputPassword}
                                        secureTextEntry={isPasswordVisible}
                                        placeholder={'Password'}
                                        keyboardAppearance="dark"
                                        onChangeText={text => {
                                            this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.password = text;
                                                return { form };
                                            });
                                        }}
                                    />
                                    <TouchableOpacity onPress={this.ToggleisPasswordVisible}>
                                        <Image
                                            style={{ marginRight: 10 }}
                                            source={
                                                isPasswordVisible
                                                    ? require('../../assets/show.png')
                                                    : require('../../assets/hide.png')
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.submit}
                                onPress={this.handleSubmit}>
                                <Text style={styles.submitText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.signUpTouchable}
                                onPress={this.handleSignup}>
                                <Text>{"Create account. "}</Text>
                                <Text style={styles.signUpBoldText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Login;