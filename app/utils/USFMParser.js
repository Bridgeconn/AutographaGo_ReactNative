var RNFS = require('react-native-fs');
import Realm from 'realm'
import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'
import DbQueries from './dbQueries'
import id_name_map from '../assets/mappings.json'
const Constants = require('./constants')

export default class USFMParser {

    constructor() {
        this.bookId = null;
        this.chapterList = [];
        this.verseList = [];
        this.mappingData = id_name_map;
        this.languageCode = "ENG";
        this.languageName = "English";
        this.versionCode = "";
        this.versionName = "";
        this.source = "BridgeConn";
        this.year = 2017;
        this.license = "CCSA";
    }

    parseFile(path, vCode, vName) {
        this.versionCode = vCode;
        this.versionName = vName;

        RNFS.readFileAssets(path)
            .then((result)=>{
                this.parseFileContents(result);
            });
    }

    parseFileContents(result) {
        try {
            var lines = result.split('\n');
            for(var i = 0; i < lines.length; i++) {
                //code here using lines[i] which will give you each line
                if (!this.processLine(lines[i])) {
                    return false;
                }
            }
            this.addComponentsToChapter();
            this.addBookToContainer();
        } catch(exception) {
            console.log("error in parsing file : " + exception)
        }
    }

    processLine(line) {
        var splitString = line.split(" ");
        if (splitString.length == 0) {
            return true;
        }
        switch (splitString[0]) {
            case Constants.MarkerConstants.MARKER_BOOK_NAME: {
                if (!this.addBook(splitString[1])) {
                    console.log("Skip book, already exist in db, " + splitString[1]);
                    return false;
                }
                break;
            }
            case Constants.MarkerConstants.MARKER_CHAPTER_NUMBER: {
                this.addChapter(splitString[1]);
                break;
            }
            case Constants.MarkerConstants.MARKER_NEW_PARAGRAPH: {
                this.addParagraph(splitString, line);
                break;
            }
            case Constants.MarkerConstants.MARKER_VERSE_NUMBER: {
                this.addVerse(splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_SECTION_HEADING: {
                this.addSection(Constants.MarkerTypes.SECTION_HEADING_ONE, line, splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_SECTION_HEADING_ONE: {
                this.addSection(Constants.MarkerTypes.SECTION_HEADING_ONE, line, splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_SECTION_HEADING_TWO: {
                this.addSection(Constants.MarkerTypes.SECTION_HEADING_TWO, line, splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_SECTION_HEADING_THREE: {
                this.addSection(Constants.MarkerTypes.SECTION_HEADING_THREE, line, splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_SECTION_HEADING_FOUR: {
                this.addSection(Constants.MarkerTypes.SECTION_HEADING_FOUR, line, splitString);
                break;
            }
            case Constants.MarkerConstants.MARKER_CHUNK: {
                this.addChunk();
                break;
            }
            case "": {
                break;
            }
            default: {
                if (splitString.length == 1) {
                    // add this to the next coming verse
                    this.addFormattingToNextVerse(line);
                } else {
                    // add this to the last verse
                    this.addFormattingToLastVerse(line);
                }
            }
        }
        return true;
    }

    addBook(value) {
        this.bookId = value;
        // todo check if book already exists in db and return ! present??
        return true;
    }

    addChapter(num) {
        this.addComponentsToChapter();
        var number = parseInt(num , 10);
        var chapterModel = {chapterNumber: number, numberOfVerses: 0, verseComponentsModels: []};
        this.chapterList.push(chapterModel);
    }

    addChunk() {
        var verseComponentsModel = {type: Constants.MarkerTypes.CHUNK, verseNumber: null, 
            text: null, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addSection(markerType, line, splitString) {
        var res = "";
        if (splitString.length > 1) {
            var res = line.slice(4);
        }
        var verseComponentsModel = {type: markerType, verseNumber: null, 
            text: res, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addParagraph(splitString, line) {
        var res = "";
        if (splitString.length > 1) {
            res = line.slice(3);
        }
        var verseComponentsModel = {type: Constants.MarkerTypes.PARAGRAPH, verseNumber: null, 
            text: res, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addVerse(splitString) {
        var chapterId = null;
        if (this.chapterList.length > 0) {
            chapterId = this.bookId + "_" + this.chapterList[this.chapterList.length - 1].chapterNumber;
        }
        var tempRes = [];
        for (var i=0; i<this.verseList.length; i++) {
            var verseModel = this.verseList[i];
            if (!verseModel.added) {
                tempRes.push(verseModel.text);
            }
        }
        var res = tempRes.join("");
        var j = this.verseList.length;
        while (j--) {
            if (!this.verseList[j].added) {
                this.verseList.splice(j, 1);
            }
        }
        var verseNum = splitString[1];
        var intString = verseNum.replace(/[^0-9]/g, "");
        var notIntString = verseNum.replace(/[0-9]/g, "");
        if (intString == "") {
            return;
        }
        if (!(notIntString == "" || notIntString == "-")) {
            return;
        }
        tempRes = [];
        for (var i=2; i<splitString.length; i++) {
            tempRes.push(splitString[i]);
        }
        var result = res + tempRes.join(" ");
        var verseComponentsModel = {type: Constants.MarkerTypes.VERSE, verseNumber: splitString[1], 
            text: result, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addComponentsToChapter() {
        if (this.chapterList.length > 0) {
            if (this.verseList.length > 0) {
                for (var i=0; i<this.verseList.length; i++) {
                    if (this.verseList[i].verseNumber != null) {
                        this.chapterList[this.chapterList.length - 1].verseComponentsModels.push(this.verseList[i]);
                    }
                }
                var size = 0;
                for (var i=0; i< this.verseList.length; i++) {
                    if (this.verseList[i].verseNumber != null) {
                        if (i == 0 || this.verseList[i].verseNumber != this.verseList[i-1].verseNumber) {
                            size = size + 1;
                        }
                    }
                }
                this.chapterList[this.chapterList.length - 1].numberOfVerses = size;
                var j = this.verseList.length;
                while (j--) {
                    if (this.verseList[j].verseNumber != null) {
                        this.verseList.splice(j, 1);
                    }
                }
            }
        }
    }

    getBookNameFromMapping(bookId) {
        var obj = this.mappingData.id_name_map;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key == bookId) {
                    var val = obj[key];
                    return val;
                }
            }
        }
        return null;
    }

    addBookToContainer() {
        var mapResult = this.getBookNameFromMapping(this.bookId);
        if (mapResult == null) {
            return;
        }
        var bookModel = {bookId: this.bookId, bookName: mapResult.book_name, bookNumber: mapResult.number, 
            section: mapResult.section, chapterModels: this.chapterList}
        var versionModel = {versionName: this.versionName, versionCode: this.versionCode, bookModels: [],
            source: this.source, license: this.license, year: this.year}
        versionModel.bookModels.push(bookModel);
        var languageModel = {languageCode: this.languageCode, languageName: this.languageName, versionModels: []}
        languageModel.versionModels.push(versionModel);
        
        this.insertLanguage('LanguageModel', bookModel, versionModel, languageModel);

        // realm.write(() => {
        //     realm.create('Book', {id: 1, title: 'Recipes', price: 35});
        //     // Update book with new price keyed off the id
        //     realm.create('Book', {id: 1, price: 55}, true);
        //   });
        //   let hondas = realm.objects('Car').filtered('make = "Honda"');
        //     realm.write(() => {
        //     realm.create('Car', {make: 'Honda', model: 'RSX'});
        //     });
    }

    async insertLanguage(model: string, bookModel, versionModel, languageModel) {
		let realm = await this.getRealm();
		if (realm) {
            var ls = realm.objectForPrimaryKey('LanguageModel', this.languageCode);
            if (ls) {
                var pos = -1;
                for (var i=0; i<ls.versionModels.length; i++) {
                    var vModel = ls.versionModels[i];
                    if (vModel.versionCode == this.versionCode) {
                        pos = i;
                        break;
                    }
                }
                if (pos > -1) {
                    var bModels = ls.versionModels[pos].bookModels;
                    // need to push bookmodel
                    for (var j=0; j<bModels.length; j++) {
                        if (bModels[j].bookId == this.bookId) {
                            console.log("book already present -- " + this.bookId)
                            return;
                        }
                    }
                    realm.write(() => {
                        ls.versionModels[pos].bookModels.push(bookModel);
                        console.log("write complete.. new book..")
                    });
                } else {
                    realm.write(() => {
                        ls.versionModels.push(versionModel);     
                        console.log("write complete.. new version..")                    
                    });
                }
            } else {
                realm.write(() => {
                    realm.create('LanguageModel', languageModel);
                    console.log("write complete.. new language..")
                });
            }
	  	}
    }
    
    async getRealm() {
    	try {
    		return await Realm.open({schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseComponentsModel] });
    	} catch (err) {
            console.log("erro in realm"+err)
    		return null;
    	}
    }

    addFormattingToLastVerse(line) {
        if (this.verseList.length > 0) {
            var res = this.verseList[this.verseList.length - 1].text + " \n " + line + " ";
            this.verseList[this.verseList.length - 1].text = res;
        }
    }

    addFormattingToNextVerse(line) {
        var verseComponentsModel = {type: null, verseNumber: null, 
            text: " " + line + " ", highlighted: false, added: false};
        this.verseList.push(verseComponentsModel);
    }
}