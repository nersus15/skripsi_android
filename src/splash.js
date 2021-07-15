
import React, { Component } from "react"
import { ImageBackground, Text, View } from "react-native"
import splash from '../assets/splash.jpeg'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_LEFT:
                this.props.navigation.replace("Form")
                break;
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={(direction) => this.onSwipe(direction)}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: this.state.backgroundColor
                }}
            >
                <ImageBackground onS style={{ justifyContent: 'flex-end', flex: 1 }} source={splash}>

                    <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 50, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black', marginBottom: 10, opacity: 0.7 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Kesehatan Mental</Text>
                    </View>
                    <Text style={{ marginBottom: 20, textAlign: 'center', color: '#FFD523', fontSize: 15 }}>Swipe ke kiri untuk lanjut</Text>
                </ImageBackground >
            </GestureRecognizer>
        );
    }
}

export default Splash