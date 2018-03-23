import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        modelData: []
    }

    this.showRows = this.showRows.bind(this);
  }

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
          onPress={this.queryLanguage}
          title="queryLanguage"
          color="#841584"
        />
        <Button
          onPress={this.queryLanguageWithCode}
          title="queryLanguageWithCode"
          color="#841584"
        />
        <Button
          onPress={this.queryVersionWithCode}
          title="queryVersionWithCode"
          color="#841584"
        />
        <Button
          onPress={this.queryBooksWithCode}
          title="queryBooksWithCode"
          color="#841584"
        />
        <Button
          onPress={this.queryBookWithId}
          title="queryBookWithId"
          color="#841584"
        />
        <Button
          onPress={this.querySearchBookWithName}
          title="querySearchBookWithName"
          color="#841584"
        />
        {/* <Button
          onPress={this.querySearchVerse}
          title="querySearchVerse"
          color="#841584"
        /> */}
        <Button
          onPress={this.querySearchBookWithName}
          title="querySearchBookWithName"
          color="#841584"
        />
        <Button
          onPress={this.querySearchBookWithName}
          title="querySearchBookWithName"
          color="#841584"
        />
        <Button
          onPress={this.querySearchBookWithName}
          title="querySearchBookWithName"
          color="#841584"
        />
        {/* <Button
          onPress={this.showRows}
          title="Show"
          color="#841584"
        /> */}
      </View>
    );
  }

  async queryLanguage() {
    let models = await DbQueries.queryLanguages();
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].languageCode + "  vers = " + models[i].versionModels.length)
    }
  }
  async queryLanguageWithCode() {
    let models = await DbQueries.queryLanguageWithCode("ENG");
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].languageName + "  vers = " + models[i].versionModels.length)
    }
  }
  async queryVersionWithCode() {
    let models = await DbQueries.queryVersionWithCode("UDB", "ENG");
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].versionName + "  vers = " + models[i].bookModels.length)
    }
  }
  async queryBooksWithCode() {
    let models = await DbQueries.queryBooksWithCode("UDB", "ENG");
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].bookName + "  vers = " + models[i].chapterModels.length)
    }
  }
  async queryBookWithId() {
    let models = await DbQueries.queryBookWithId("GEN", "UDB", "ENG");
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].bookName + "  vers = " + models[i].chapterModels.length)
    }
  }
  async querySearchBookWithName() {
    let models = await DbQueries.querySearchBookWithName("El", "UDB", "ENG");
    console.log("Num = " + models.length)
    for (i=0; i<models.length; i++) {
      console.log("code " + i + " = " + models[i].bookName + "  vers = " + models[i].chapterModels.length)
    }
  }
  // async querySearchVerse() {
  //   let models = await DbQueries.querySearchVerse("god", "UDB", "ENG");
  //   console.log("Num = " + models.length)
  //   for (i=0; i<models.length; i++) {
  //     console.log("code " + i + " = " + models[i].verseNumber + "  vers = " + models[i].type)
  //   }
  // }

  async showRows() {
    let models = await DbQueries.getSomeDataFromModel();
    if (models) {
      this.setState({modelData: models})
    }
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
