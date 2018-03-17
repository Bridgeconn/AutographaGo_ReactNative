import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DbQueries from '../utils/dbQueries'

import USFMParser from '../utils/USFMParser';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        modelData: []
    }

    this.showRows = this.showRows.bind(this);
  }

  // async componentWillMount() {
  //   let models = await DbQueries.getSomeDataFromModel()
  //   if (models) {
  //     this.setState({modelData: models})
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        Hello there
        </Text>
        <Text>
        {this.state.modelData.length}
        </Text>
        <Button
          onPress={this.addRow}
          title="Add"
          color="#841584"
        />
        <Button
          onPress={this.showRows}
          title="Show"
          color="#841584"
        />
        <Button
          onPress={this.showBooks}
          title="Book Show"
          color="#841584"
        />
        <Button
          onPress={this.addBook}
          title="Book Add"
          color="#841584"
        />
      </View>
    );
  }

  async showRows() {
    let models = await DbQueries.getSomeDataFromModel();
    for (i=0; i<models.length; i++) {
      console.log("models : " + i + " == "+models[i].chapterNumber);
      console.log("models : " + i + " == "+models[i].bookOwner.length);
      for (j=0;j<models[i].bookOwner.length; j++) {
      console.log("models : " + i + " == "+models[i].bookOwner[j].bookName);
      }
    }
    if (models) {
      this.setState({modelData: models})
    }
  }

  addRow() {
    var value = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 12}
    DbQueries.addSpecificLinking();
  }

  addBook() {
    var value1 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 10}
    var value2 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 11}
    var value3 = [];
    value3.push(value1)
    value3.push(value2)
    var value4 = {bookId: 'BO2', bookName: 'Book 2', bookNumber: 2, section: 'OT', chapterModels: value3}
    DbQueries.addNewBook(value4)
  }

  showBooks() {
    DbQueries.getLinks();
  }

  // async startParse() {
    // await new USFMParser().parseFile('01-GEN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('02-EXO.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('03-LEV.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('04-NUM.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('05-DEU.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('06-JOS.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('07-JDG.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('08-RUT.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('09-1SA.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('10-2SA.usfm', "ULB", "Unlocked Literal Bible");

    // await new USFMParser().parseFile('11-1KI.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('12-2KI.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('13-1CH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('14-2CH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('15-EZR.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('16-NEH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('17-EST.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('18-JOB.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('19-PSA.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('20-PRO.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('21-ECC.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('22-SNG.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('23-ISA.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('24-JER.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('25-LAM.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('26-EZK.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('27-DAN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('28-HOS.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('29-JOL.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('30-AMO.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('31-OBA.usfm', "ULB", "Unlocked Literal Bible");
    
    // await new USFMParser().parseFile('32-JON.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('33-MIC.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('34-NAM.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('35-HAB.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('36-ZEP.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('37-HAG.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('38-ZEC.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('39-MAL.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('41-MAT.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('42-MRK.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('43-LUK.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('44-JHN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('45-ACT.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('46-ROM.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('47-1CO.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('48-2CO.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('49-GAL.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('50-EPH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('51-PHP.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('52-COL.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('53-1TH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('54-2TH.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('55-1TI.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('56-2TI.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('57-TIT.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('58-PHM.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('59-HEB.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('60-JAS.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('61-1PE.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('62-2PE.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('63-1JN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('64-2JN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('65-3JN.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('66-JUD.usfm', "ULB", "Unlocked Literal Bible");
    // await new USFMParser().parseFile('67-REV.usfm', "ULB", "Unlocked Literal Bible");
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
