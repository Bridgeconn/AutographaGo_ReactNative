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
    
    getBookId() {
        return this.bookId;
    }
    
    setBookId(value) {
        this.bookId = value;
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
        var lines = result.split('\n');
        console.log("len = " + lines.length);
        var languageName = "English", languageCode = "ENG", versionCode = "UDB", 
                versionName = "Unlocked Literal Bible", source = "BridgeConn", 
                license = "OPEN", year = 2015;

        for(var i = 0; i < lines.length; i++){
            console.log("lll = :: " + lines[i])
            //code here using lines[i] which will give you each line
            if (!this.processLine(lines[i], languageName, languageCode, versionCode)) {
                return false;
            }
        }
        this.addComponentsToChapter();
        this.addChaptersToBook();
        // addBookToContainer(languageName, languageCode, versionCode, versionName, source, license, year);
    }

    processLine(line, languageName, languageCode, versionCode) {
        var splitString = line.split(" ");
        if (splitString.length == 0) {
            return true;
        }
        switch (splitString[0]) {
            case Constants.MarkerConstants.MARKER_BOOK_NAME: {
                if (!this.addBook(splitString[1])) {
                    console.log("Skip book, already exist in db, " + splitString[1] + "  lan=" + languageName + versionCode);
                    return false;
                }
                break;
            }
            case Constants.MarkerConstants.MARKER_CHAPTER_NUMBER: {
                console.log("chapter num = " + line)
                for (var i=0;i<splitString.length;i++) {
                    console.log("line " + i + "  ==" + splitString[i])
                }
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

    addBook(bookId) {
        this.bookId = bookId;
        // todo check if book already exists in db and return ! present??
        return true;
    }

    addChapter(num) {
        this.addComponentsToChapter();
        var number = parseInt(num , 10 );
        var chapterModel = {chapterNumber: number, numberOfVerses: 0};
        this.chapterList.push(chapterModel);
    }

    addChunk() {
        var verseComponentsModel = {type: Constants.MarkerTypes.CHUNK, verseNumber: 0, 
            text: null, highlighted: false};
        this.verseList.push(verseComponentsModel);
    }

    addSection(markerType, line, splitString) {
        var res = null;
        if (splitString.length > 1) {
            var res = line.slice(4);
        }
        var verseComponentsModel = {type: markerType, verseNumber: 0, 
            text: res, highlighted: false};
        this.verseList.push(verseComponentsModel);
    }

    // spliceSlice(str, index, count, add) {
    //     // We cannot pass negative indexes dirrectly to the 2nd slicing operation.
    //     if (index < 0) {
    //       index = str.length + index;
    //       if (index < 0) {
    //         index = 0;
    //       }
    //     }
      
    //     return str.slice(0, index) + (add || "") + str.slice(index + count);
    // }

    addParagraph(splitString, line) {
        var res = null;
        if (splitString.length > 1) {
            res = line.slice(3);
        }
        var verseComponentsModel = {type: Constants.MarkerTypes.PARAGRAPH, verseNumber: 0, 
            text: res, highlighted: false};
        this.verseList.push(verseComponentsModel);
    }

    addVerse(splitString) {
        var verseNum = splitString[1];
        var intString = verseNum.replace(Constants.StylingConstants.REGEX_NOT_NUMBERS, "");
        var notIntString = verseNum.replace(Constants.StylingConstants.REGEX_NUMBERS, "");
        if (intString == "") {
            return;
        }
        if (!(notIntString == "" || notIntString == "-")) {
            return;
        }
        var stringBuilder = [];
        for (var i=2; i<splitString.length; i++) {
            stringBuilder.push(splitString[i]);
        }
        var result = stringBuilder.join(" ");

        var verseComponentsModel = {type: Constants.MarkerTypes.VERSE, verseNumber: splitString[1], 
            text: result, highlighted: false};

        // for (var i=verseComponentsModelList.size()-1; i>=0; i--) {
        //     if (verseComponentsModelList.get(i).getVerseNumber() != null) {//.equals("") ) {
        //         break;
        //     }
        //     verseComponentsModelList.get(i).setVerseNumber(splitString[1]);
        //     if (chapterModelList.size() > 0) { // dont really need this check, but still
        //         verseComponentsModelList.get(i).setChapterId(bookModel.getBookId() + "_" + chapterModelList.get(chapterModelList.size() - 1).getChapterNumber());
        //     }
        // }
        // verseComponentsModel.setAdded(true);
        // verseComponentsModel.setMarker(Constants.ParagraphMarker.V);
        // verseComponentsModel.setLanguageCode(languageCode);
        // verseComponentsModel.setVersionCode(versionCode);
        this.verseList.push(verseComponentsModel);
    }

    addComponentsToChapter() {
        if (this.chapterList.length > 0) {
            if (this.verseList.length > 0) {
                var size = 0;
                for (var i=0; i< this.verseList.length; i++) {
                    if (i == 0 || !this.verseList[i].verseNumber == this.verseList[i-1].verseNumber) {
                        size++;
                    } else {
                        break;
                    }
                }
                this.chapterList[this.chapterList.length - 1].numberOfVerses = size;
            }
        }
    }

    addChaptersToBook() {
        var bookModel = {bookId: 'GEN', bookName: 'Book 2', bookNumber: 2, section: 'OT', chapterModels: this.chapterList}
        this.insert('BookModel', bookModel);
    }

    addFormattingToNextVerse(line) {
        if (this.verseList.length > 0) {
            var stringBuilder = [];
            stringBuilder.push(this.verseList[this.verseList.length - 1].text);
            stringBuilder.push(" \n " + line + " ");
            this.verseList[this.verseList.length - 1].text = stringBuilder.join("");
        }
    }

    addFormattingToLastVerse(line) {
        var verseComponentsModel = {type: null, verseNumber: 0, 
            text: " " + line + " ", highlighted: false};
        this.verseList.push(verseComponentsModel);
    }
}