var RNFS = require('react-native-fs');
import Realm from 'realm'
import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'
const Constants = require('./constants');

export default class USFMParser {
    constructor() {
        this.bookId = null;
        this.chapterList = [];
        this.verseList = [];
    }

    parseFile() {
        console.log("CONTENTS :: " );
        RNFS.readFileAssets('01-GEN.usfm')
            .then((result)=>{
                this.parseFileContents(result);
            });
    }

    async insert(model: string, value) {
		let realm = await this.getRealm();
		if (realm) {
	  		realm.write(() => {
				realm.create(model, value);
				console.log("write complete..")
			});
	  	}
    }
    
    async getRealm() {
    	try {
    		return await Realm.open({schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseComponentsModel] });
    	} catch (err) {
    		return null;
    	}
    }

    parseFileContents(result) {
        var languageName = "English", languageCode = "ENG", versionCode = "UDB", 
                versionName = "Unlocked Literal Bible", source = "BridgeConn", 
                license = "OPEN", year = 2015;
        try {
            var lines = result.split('\n');
            console.log("len = " + lines.length);
            for(var i = 0; i < lines.length; i++) {
                console.log("lll = :: " + lines[i])
                //code here using lines[i] which will give you each line
                if (!this.processLine(lines[i])) {
                    return false;
                }
            }
            this.addComponentsToChapter();
            this.addChaptersToBook();
            this.addBookToContainer(languageName, languageCode, versionCode, versionName, source, license, year);
        } catch(exception) {
            console.log("error in parsing file : " + exception)
        }
    }

    processLine(line) {
        var splitString = line.split(" ");
        if (splitString.length == 0) {
            return true;
        }
        // for (var i=0; i<splitString.length; i++) {
        //     console.log("i = " + i + "   :: text = " + splitString[i]);
        // }
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
        console.log("in addChapter: " + num);
        this.addComponentsToChapter();
        var number = parseInt(num , 10);
        // todo see what to init as numberOfVerses
        var chapterModel = {chapterNumber: number, numberOfVerses: 0, verseComponentsModels: []};
        this.chapterList.push(chapterModel);
    }

    addChunk() {
        console.log("in addChunk: ");        
        // todo see what to init text
        var verseComponentsModel = {type: Constants.MarkerTypes.CHUNK, verseNumber: null, 
            text: null, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addSection(markerType, line, splitString) {
        console.log("in addSection: " + line);        
        var res = "";
        if (splitString.length > 1) {
            var res = line.slice(4);
        }
        var verseComponentsModel = {type: markerType, verseNumber: null, 
            text: res, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addParagraph(splitString, line) {
        console.log("in addParagraph: " + line);        
        var res = "";
        if (splitString.length > 1) {
            res = line.slice(3);
        }
        var verseComponentsModel = {type: Constants.MarkerTypes.PARAGRAPH, verseNumber: null, 
            text: res, highlighted: false, added: true};
        this.verseList.push(verseComponentsModel);
    }

    addVerse(splitString) {
        console.log("in addVerse: " + splitString[1]);        
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
        console.log("verseNUm = " + verseNum + "  :: intString = " + intString + "  :  notIntStr = " + notIntString)
        if (intString == "") {
            return;
        }
        if (!(notIntString == "" || notIntString == "-")) {
            return;
        }
        console.log("in adding verse in progress");        
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
        console.log("in add verses to Chapter");        
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
                console.log("size = " + size);
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

    addChaptersToBook() {
        // var bookModel = {bookId: this.bookId, bookName: 'Genesis', bookNumber: 1, 
        //     section: 'OT', chapterModels: this.chapterList}
        // this.insert('BookModel', bookModel);
    }

    addBookToContainer(languageName, languageCode, versionCode, versionName, source, license, year) {
        console.log("in add BOOK to db");        
        var bookModel = {bookId: this.bookId, bookName: 'Genesis', bookNumber: 1, 
            section: 'OT', chapterModels: this.chapterList}
        this.insert('BookModel', bookModel);
    }

    addFormattingToLastVerse(line) {
        if (this.verseList.length > 0) {
            var res = this.verseList[this.verseList.length - 1].text + " \n " + line + " ";
            this.verseList[this.verseList.length - 1].text = res;
        }
    }

    addFormattingToNextVerse(line) {
        // todo what to init type ??
        var verseComponentsModel = {type: null, verseNumber: null, 
            text: " " + line + " ", highlighted: false, added: false};
        this.verseList.push(verseComponentsModel);
    }
}