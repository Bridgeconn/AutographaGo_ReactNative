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
  //   await new USFMParser().parseFile('01-GEN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('02-EXO.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('03-LEV.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('04-NUM.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('05-DEU.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('06-JOS.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('07-JDG.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('08-RUT.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('09-1SA.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('10-2SA.usfm', "UDB", "Unlocked Dynamic Bible");

  //   await new USFMParser().parseFile('11-1KI.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('12-2KI.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('13-1CH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('14-2CH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('15-EZR.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('16-NEH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('17-EST.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('18-JOB.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('19-PSA.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('20-PRO.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('21-ECC.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('22-SNG.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('23-ISA.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('24-JER.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('25-LAM.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('26-EZK.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('27-DAN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('28-HOS.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('29-JOL.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('30-AMO.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('31-OBA.usfm', "UDB", "Unlocked Dynamic Bible");
    
  //   await new USFMParser().parseFile('32-JON.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('33-MIC.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('34-NAM.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('35-HAB.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('36-ZEP.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('37-HAG.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('38-ZEC.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('39-MAL.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('41-MAT.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('42-MRK.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('43-LUK.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('44-JHN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('45-ACT.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('46-ROM.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('47-1CO.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('48-2CO.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('49-GAL.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('50-EPH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('51-PHP.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('52-COL.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('53-1TH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('54-2TH.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('55-1TI.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('56-2TI.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('57-TIT.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('58-PHM.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('59-HEB.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('60-JAS.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('61-1PE.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('62-2PE.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('63-1JN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('64-2JN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('65-3JN.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('66-JUD.usfm', "UDB", "Unlocked Dynamic Bible");
  //   await new USFMParser().parseFile('67-REV.usfm', "UDB", "Unlocked Dynamic Bible");
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
