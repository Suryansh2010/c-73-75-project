import React from 'react';
import {StyleSheet, Text, View, Flatlist, ScrollView, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config'




export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories:[],
            dataSource: [],
            search: ''
        }
    }
    componentDidMount(){
        this.retriveStories()
    }

    updateSearch = search =>{
        this.setState({ search });
    };


    retriveStories=()=>{
        try{
            var allStories = []
            var stories = db.collection("stories")
            .get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{


                    allStories.push(doc.data())
                    console.log('these are the stories', allStories)
                })
                this.setState({allStories})
            })
        }
        catch(error){
            console.log(error);
        }
    };


    SearchFilterFunction(text){

        const newData = this.state.allStories.filter((item)=>{

            const itemData = item.title ? item.title.toUpperCase(): ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indefOf(textData) > -1;
        });
        this.setState({


            dataSource: newData,
            search: text,
        });
    }

    render(){
        return(
            <View styles={styles.container}>
                <Header
                    backgroundColor = {'orange'}
                    centerComponent = {{
                        text: 'Bed Time Stories',
                        styles: {color: 'white', fontSize: 20}
                    }}
                />
                <View styles = {{height: 20, width: '100%'}}>
                    <SearchBar
                    placeholder="Type Here..."
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    value={this.state.search}
                    />
                </View>

                <FlatList
                    data={this.state.search === "" ? this.state.allStories: this.state.dataSource}
                    renderItem={({ item }) =>(
                        <View styles={styles.itemContainer}>
                            <Text> Title: {item.title}</Text>
                            <Text> Author: {item.author}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00ffff',
    },
    item: {
        backgroundColor: 'orange',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'orange',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});