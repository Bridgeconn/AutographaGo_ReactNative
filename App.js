/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Book from './app/screens/Book'
import RV from './app/screens/RecyclerView'

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
        <Book />
    );
  }

}