import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, TextInput} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config'


export default class WriteStoryScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory = ()=>{
        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            storytext: this.state.storyText,

        })
        this.setState({
            title: '',
            author: '',
            storyText: ''
        })
        ToastAndroid.show('Your story has been submitted', ToastAndroid.SHORT)
    }

    render(){
        return(
            <KeyboardAvoidingView style={StyleSheet.container} behaviour="padding" enabled>
                <Header
                    backgroundColor = {'orange'}
                    centerComponent = {{
                        text: 'Bed Time Stories',
                        style: {color: 'yellow', fontSize: 20}
                    }}
                />
                <TextInput
                    placeholder="Story Title"
                    onChangeText = {(text)=>{
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={StyleSheet.title}/>
                <TextInput
                    placeholder="Author"
                    onChangeText = {(text)=>{
                        this.setState({
                            author: text
                        })
                    }}
                    value={this.state.author}
                    style={StyleSheet.author} />
                <TextInput
                    placeholder="Write your story"
                    onChangeText = {(text)=>{
                        this.setState({
                            storyText: text
                        })
                    }}
                    value={this.state.storyText}
                    style={StyleSheet.storyText}
                    multiline={true}/>
                
                <TouchableOpacity
                    style={StyleSheet.submitButton}
                    onPress={this.submitStory}
                >
                    <Text style={StyleSheet.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ffff',
    },
    title: {
        height: 40,
        borderWidth: 2,
        marginTop: 40,
        padding: 10,
        margin: 10
    },
    author: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        margin: 10
    },
    storyText: {
        height: 250,
        borderWidth: 2,
        margin: 10,
        padding: 10
    },
    submitButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'orange',
        width: 80,
        height: 40
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});