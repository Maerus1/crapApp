import React from 'react';
import { Text, SafeAreaView, SectionList, StatusBar, View, ActivityIndicator } from 'react-native';
import styles from './styles/styles';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
    }
  }

  readNorris = () => {
    fetch(`http://api.icndb.com/jokes/random/30`)
      .then(response => {
        response.json().then(data => {
          data.value.forEach(item => {
            this.setState(prevState => ({
              dataSource: [...prevState.dataSource, {title: item.id, data: [{joke: item.joke}]}]
            }))
          })
        })
      })
  }

  componentWillMount() {
    this.readNorris();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
        <SectionList
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <Text>{item.joke}</Text>
          </View>
        }
          keyExtractor={({item, index}) => item + index}
          sections={this.state.dataSource}
          onEndReached={() => {
            this.readNorris();
          }
          }
          onEndReachedThreshold={0.1}
          renderSectionFooter={() => {
            <View>
              <ActivityIndicator size="small" color="#F00"/>
            </View>
          }}
          
        />
      </SafeAreaView>
    );
  }
}

