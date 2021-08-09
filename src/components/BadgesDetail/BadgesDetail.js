import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Colors from '../../res/Colors';
import Storage from '../../libs/storage';

//On this file are all the details of the badges

class BadgesDetail extends React.Component {
    state = {
        badge: {},
        isFavorite: false,
    };

    componentDidMount() {
        this.getBadge();
    }

    //This function calls the favorite badges
    getBadge = () => {
        const {item} = this.props.route.params;
        this.setState({badge: item}, () => {
            this.getFavorite();
        });
        this.props.navigation.setOptions({title: item.name})
    };

    //This function call the favorite badges
    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.badge._id}`;
            const favoriteStr = await Storage.instance.get(key);
            if (favoriteStr != null) {
                this.setState({ isFavorite: true })
            }
        } catch (err) {
            console.log('Get favorite err', err);
        }
    };

    //Here is where the favorite selected is checked
    toggleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    };

    //here we add new badges to favorites
    addFavorite = async () => {
        const badge = JSON.stringify(this.state.badge);
        const key = `favorite-${this.state.badge._id}`;

        const stored = await Storage.instance.store(key, badge);

        if (stored) {
            this.setState({ isFavorite: true });
        }
    };

    //on this function we remove the favorites
    removeFavorite = async () => {
        const key = `favorite-${this.state.badge._id}`;
        await Storage.instance.remove(key);
        this.setState({ isFavorite: false });
    };

    render() {
        const { badge, isFavorite } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Image
                        style={styles.header}
                        source={{ uri: `${badge.header_img_url}` }}
                    />
                    <Image
                        style={styles.profileImage}
                        source={{ uri: `${badge.profile_picture_url}` }}
                    />
                    <TouchableOpacity
                        style={styles.favorite}
                        onPress={this.toggleFavorite}>
                        <Image
                            source={
                                isFavorite
                                    ? require('../../assets/isFavorite.png')
                                    : require('../../assets/notFavorite.png')
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{badge.name}</Text>
                        <Text style={styles.age}>{badge.age}</Text>
                    </View>
                    <Text style={styles.city}>{badge.city}</Text>
                    <View style={styles.data}>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.followers || "0"}</Text>
                            <Text style={styles.smalltext}>Followers</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.likes || "0"}</Text>
                            <Text style={styles.smalltext}>Likes</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.videos || "0"}</Text>
                            <Text style={styles.smalltext}>Videos</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    badge: {
        flex: 1,
        margin: 20,
        width: '90%',
        height: '90%',
        backgroundColor: Colors.white,
        borderRadius: 25,
        marginTop: 45,
    },
    header: {
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    profileImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.BordGray,
        position: 'absolute',
        top: '20%',
        left: '22%',
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 110,
        justifyContent: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.blackPearl,
    },
    age: {
        fontSize: 28,
        marginLeft: 20,
        color: Colors.zircon,
    },
    city: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: Colors.zircon,
    },
    data: {
        padding: 20,
        marginTop: 30,
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: Colors.zircon,
    },
    dataColumns: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataInfo: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 20,
        color: Colors.charade,
    },
    smallText: {
        color: Colors.zircon,
    },
    favorite: {
        position: 'absolute',
        top: 320,
        right: 40,
    },
})

export default BadgesDetail;