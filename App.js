import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const questionsLib = [
  {id: 1, question: "Czy pies szczeka?", answers: 1},
  {id: 2, question: "Czy kot szczeka?", correct: 0},
  {id: 3, question: "Czy kot miałczy?", correct: 1},
  {id: 4, question: "czy pies miałczy?", correct: 0},
]

let score = 0;

function QuizzScreen({route, navigation}) {
  const { questionNumber, answer } = route.params;
  console.log(questionNumber,answer);

  if(questionNumber<=4 && answer && questionsLib[questionNumber-1].correct == answer)
    score+=1;

  if(questionNumber==5)
    navigation.navigate('Score');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Question number {questionNumber}</Text>
      <Text></Text>
      <Button
          title="Tak"
          onPress={() => {
            navigation.push('Quizz', {
              questionNumber: questionNumber+1,
              answer: 1
            })}}
        />
      <Button
        title="Nie"
        onPress={() => {
          navigation.push('Quizz', {
            questionNumber: questionNumber+1,
            answer: 0
          })}}
      />
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