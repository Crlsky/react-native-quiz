import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const questionsLib = [
  {id: 1, question: "Czy pies szczeka?", answers: [
    {title: "Tak", correct: 1},
    {title: "Nie", correct: 0}
  ]},
  {id: 2, question: "Czy kot szczeka?", answers: [
    {title: "Tak", correct: 0},
    {title: "Nie", correct: 1}
  ]},
  {id: 3, question: "Czy kot miałczy?", answers: [
    {title: "Tak", correct: 1},
    {title: "Nie", correct: 0}
  ]},
  {id: 4, question: "Czy pies miałczy?", answers: [
    {title: "Tak", correct: 0},
    {title: "Nie", correct: 1}
  ]},{}
]

let score = 0;

function ButtonProvider({questionNumber}) {

  return(
    <View>
      {questionsLib[questionNumber-1].answers.map(answer => (
        <Button
          title={answer.title}
          onPress={() => {
            navigation.push('Quizz', {
              questionNumber: questionNumber+1,
              answer: answer.correct
            })}}
        />
      ))}
    </View>
  );
}

function QuizzScreen({route, navigation}) {
  const { questionNumber, answer } = route.params;

  if(answer)
    score+=1;

  if(questionNumber==5)
    navigation.navigate('Score');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pytanie numer {questionNumber}</Text>
      <Text>{questionsLib[questionNumber-1].question}</Text>
      <ButtonProvider questionNumber={questionNumber} />
    </View>
  );
}

function ScoreScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Score is {score}</Text>
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