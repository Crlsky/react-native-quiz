import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import react from 'react';

let score = 0;

class QuizzScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'navigation': props.navigation,
      'questionNumber': props.route.params.questionNumber, 
      'questionsLib':[
        {id: 1, question: "Is dog barking?", correct: 'yes'},
        {id: 2, question: "Is cat barking?", correct: 'no'},
        {id: 3, question: "Is cat meows?", correct: 'yes'},
        {id: 4, question: "Is dog meows?", correct: 'no'},
      ]
    };
    this.QuizzValidator = this.QuizzValidator.bind(this);
  }

  QuizzValidator(event){
    if(this.state.questionsLib[this.state.questionNumber-1].correct == event)
      score +=1;
  
    if(this.state.questionNumber<=4)
      this.state.navigation.push('Quizz', {
        questionNumber: this.state.questionNumber+1,
      })
  }

  render(){
    const state = {...this.state};
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { state.questionsLib[state.questionNumber-1] != undefined ?
        <View>
          <Text style={{textAlignVertical:'top'}}>Question number {state.questionsLib[state.questionNumber-1].id}</Text>
          <Text style={{fontSize: 20, fontWeight:'bold'}}>{state.questionsLib[state.questionNumber-1].question}</Text>
          <Button
              id="yes"
              title="Yes"
              onPress={()=>this.QuizzValidator('yes')}
            />
          <Button
            id="no"
            title="No"
            onPress={()=>this.QuizzValidator('no')}
          />
        </View>
        :
        <View>
          <Text style={{fontSize: 20, fontWeight:'bold'}}>Quizz is over, check your score</Text>
          <Button
            title="Score"
            onPress={()=>{this.state.navigation.push('Score')}}
          />
        </View>
        }
      </View>
    );
  }
}

function ScoreScreen({navigation}) {
  const finalScore = score;
  score = 0;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Score is {finalScore}</Text>
      <Button
        title="Try again..."
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quizz">
        <Stack.Screen 
          name="Quizz" 
          component={QuizzScreen}
          initialParams={{ questionNumber: 1 }}
        />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;