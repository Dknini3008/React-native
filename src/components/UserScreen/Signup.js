import React from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
} from 'react-native';
import Loader from '../Generics/Loader';
import styles from './styles';
import UserSession from '../../libs/sessions';

const imageBackground = {
    uri: 'https://r1.ilikewallpaper.net/iphone-12-pro-pro-max-wallpapers/download-111375/Avatar-Appa-Album-on-Imgur.jpg'
};

class Signup extends React.Component {
    state = {
        loading: false,
        error: false,
        errors: undefined,
        user: undefined,
        isPasswordVisible: true,
        isPasswordConfVisible: true,
        form: {},
    };

    //here we signup and we can create a user
    handleSubmit = async () => {
        try {
            this.setState({loading: true, user: undefined});
            let response = await UserSession.instance.signup(this.state.form);
            console.log(response);

            if (typeof response === 'object') {
                let errors = [];
                let cont =0;

                for(let error in response){
                    let key = error;

                    if (error === 'non_field_errors'){
                        error = 'password';
                    }
                    errors.push(
                        <View key={cont}>
                            <Text style={styles.errorMsg}>
                                {`${error} : ${response[key][0]}`}
                            </Text>
                        </View>
                    ); 
                    cont++;
                }
                this.setState({loading: false, user: undefined, errors: errors});
            } else {
                this.setState({
                    loading: false, 
                    user: response, 
                    errors: undefined,
                });
                if(this.state.user){
                    this.props.navigation.navigate('Login');
                }
            }
        } catch (err) {
            console.log('Sign up error',err);
            throw Error(err);
        }
    };

    //the same to see or not the password
    ToggleisPasswordVisible = () => {
        if (this.state.isPasswordVisible) {
            this.setState({isPasswordVisible : false});
        } else {
            this.setState({isPasswordVisible: true});
        }
    };

    //here we confirm the password
    ToggleisPasswordConfVisible = () => {
        if (this.state.isPasswordConfVisible) {
            this.setState({isPasswordConfVisible : false});
        } else {
            this.setState({isPasswordConfVisible: true});
        }
    };

    render() {
        const {isPasswordVisible, isPasswordConfVisible, loading, errors} = 
        this.state;

        if (loading === true ) {
            return <Loader />
        }

        return(
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="transparent" translucent={true} />
                    <ImageBackground source={imageBackground} style={styles.image}>
                        <View style={styles.layerColor}>
                            <View style={styles.scrollForm}>
                                <Text style={[styles.title, {marginTop: 80}]}>Sign up</Text>
                                {errors ? (
                                    <View style={styles.errorContainer}>{errors}</View>
                                ) : null}
                                <View style={styles.formgroup}>
                                    <Text style={styles.inputText}>Username: </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'username'}
                                        keyboardAppearance="dark"
                                        onChangeText={text => {
                                            this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.username = text;
                                                return {form};
                                            });
                                        }}
                                    />
                                    <Text style={styles.inputText}>Email: </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'email'}
                                        keyboardAppearance="dark"
                                        keyboardType="email-address"
                                        onChangeText={text => {
                                            this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.email = text;
                                                return {form};
                                            });
                                        }}
                                    />
                                    <Text style={styles.inputText}>Password: </Text>
                                    <View style={styles.password}>
                                    <TextInput
                                        style={styles.inputPassword}
                                        secureTextEntry={isPasswordVisible}
                                        placeholder={'password'}
                                        keyboardAppearance="dark"
                                        onChangeText={text => {
                                            this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.password = text;
                                                return {form};
                                            });
                                        }}
                                    />
                                    <TouchableOpacity onPress={this.ToggleisPasswordVisible}>
                                        <Image 
                                            style={{marginRight: 10}}
                                            source={
                                                isPasswordVisible
                                                ? require('../../assets/show.png')
                                                : require('../../assets/hide.png')
                                            }
                                        />
                                    </TouchableOpacity>
                                    </View>
                                    <Text style={styles.inputText}>Confirm password: </Text>
                                    <View style={styles.password}>
                                    <TextInput
                                        style={styles.inputPassword}
                                        secureTextEntry={isPasswordConfVisible}
                                        placeholder={'confirm password'}
                                        keyboardAppearance="dark"
                                        onChangeText={text => {
                                            this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.password_confirmation = text;
                                                return {form};
                                            });
                                        }}
                                    />
                                    <TouchableOpacity onPress={this.ToggleisPasswordConfVisible}>
                                        <Image 
                                            style={{marginRight: 10}}
                                            source={
                                                isPasswordConfVisible
                                                ? require('../../assets/show.png')
                                                : require('../../assets/hide.png')
                                            }
                                        />
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={[styles.submit, {marginVertical: 60}]}
                                    onPress={this.handleSubmit}>
                                        <Text style={styles.submitText}>Sign up</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        );
    }
}

export default Signup;