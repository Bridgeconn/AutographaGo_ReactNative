import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Letter } from './Letter'

const spacingForLetterIndex = (letters, index, spacing) => (letters.length - 1 === index) ? 0 : spacing

export const TextWithLetterSpacing = (props) => {
  const { children, spacing, viewStyle, textStyle } = props
  const letters = children.split('')

  return (
  // <View style={[styles.container, viewStyle]}>
    <Text>
    {letters.map((letter, index) =>
      <Letter key={index} spacing={spacingForLetterIndex(letters, index, spacing)} textStyle={textStyle}>
        {letter}
      </Letter>
    )}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})