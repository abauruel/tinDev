import React from 'react';
import { Text, View, StyleSheet, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from './routes';

export default function App() {
  return <Routes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20,
  },
});
