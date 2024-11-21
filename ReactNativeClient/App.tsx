/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  class: {
    backgroundColor: '#F5FCFF'
  }
});

export default class App extends React.Component
{
  render()
  {
    return(
    <>
      <Text style={{fontSize: 20, color: 'green'}}>IT5007 Issue Tracker</Text>
      <IssueList/> 
    </>);

  }
}

