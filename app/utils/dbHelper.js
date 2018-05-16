'use strict';

import Realm from 'realm'
import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import NoteModel from '../models/NoteModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'
import StylingModel from '../models/StylingModel'
import ReferenceModel from '../models/ReferenceModel'

import {
	Platform,
} from 'react-native';
import { lang } from 'moment';
var RNFS = require('react-native-fs');

class DbHelper {

    async getRealm() {
    	try {
    		return await Realm.open({
				// deleteRealmIfMigrationNeeded: true, 
				path:
					Platform.OS === 'ios'
					? RNFS.MainBundlePath + '/autographa.realm'
					: RNFS.DocumentDirectoryPath + '/autographa.realm',
				schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseComponentsModel,NoteModel, StylingModel, ReferenceModel] });
    	} catch (err) {
    		return null;
    	}
    }

    async query(model: string, filter?: string, sort?: string, desc?: bool) {
    	let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects(model);
		    if(filter) {
		        results = results.filtered(filter);
			}
			if (sort) {
				results = results.sorted(sort, desc);
			}
			return results;
		}
		return null;
	}

    async queryVersionWithCode(verCode: string, langCode: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langCode);
			let resultsA = result.versionModels;
			resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
			return resultsA;
		}
		return null;
	}

	async queryBooksWithCode(verCode: string, langCode: string, bookId?: string, text?: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langCode);
			if (result) {
				let resultsA = result.versionModels;
				resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
				if (resultsA.length > 0) {
					let resultsB = resultsA[0].bookModels;				
					if (bookId) {
						resultsB = resultsB.filtered('bookId ==[c] "' + bookId + '"');
						return resultsB;
					}
					if (text) {
						 resultsB = resultsB.filtered('bookName CONTAINS[c] "' + text + '"').sorted("bookNumber");
						 return resultsB
						}
					return resultsB.sorted("bookNumber");
				}
				return null;
			}
			return null;
		}
		return null;
	}

	async queryInVerseText(verCode: string, langCode: string, text: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result1 = realm.objects("VerseComponentsModel");
			result1 = result1.filtered('languageCode ==[c] "' + langCode + '" && versionCode ==[c] "' + verCode + '"');
			result1 = result1.filtered('text CONTAINS[c] "' + text + '"');
			return result1;
		}
		return null;
	}
	async queryHighlights(verCode: string, langCode: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result1 = realm.objects("VerseComponentsModel");
			result1 = result1.filtered('languageCode ==[c] "' + langCode + 
				'" && versionCode ==[c] "' + verCode + '"');
			result1 = result1.filtered('highlighted == true')
			return result1;//.distinct('verseNumber', 'chapterNumber', 'bookId');
		}
		return null;
	}

	async insert(model: string, value) {
		let realm = await this.getRealm();
		if (realm) {
	  		realm.write(() => {
				realm.create(model, value);
			});
	  	}
	}
	
	async insertNewBook(bookModel, versionModel, languageModel) {
		let realm = await this.getRealm();
		if (realm) {
            var ls = realm.objectForPrimaryKey('LanguageModel', languageModel.languageCode);
            if (ls) {
                var pos = -1;
                for (var i=0; i<ls.versionModels.length; i++) {
                    var vModel = ls.versionModels[i];
                    if (vModel.versionCode == versionModel.versionCode) {
                        pos = i;
                        break;
                    }
                }
                if (pos > -1) {
                    var bModels = ls.versionModels[pos].bookModels;
                    // need to push bookmodel
                    for (var j=0; j<bModels.length; j++) {
                        if (bModels[j].bookId == bookModel.bookId) {
                            return;
                        }
                    }
                    realm.write(() => {
                        ls.versionModels[pos].bookModels.push(bookModel);
                    });
                } else {
                    realm.write(() => {
                        ls.versionModels.push(versionModel);     
                    });
                }
            } else {
                realm.write(() => {
                    realm.create('LanguageModel', languageModel);
                });
            }
	  	}
	}

	async updateHighlightsInBook(model, chapterIndex, verseIndex, isHighlight) {
		let realm = await this.getRealm();
		if (realm) {
			realm.write(() => {
				model[chapterIndex].verseComponentsModels[verseIndex].highlighted = isHighlight				
			});
		  }
	}

	async queryBookIdModels(verCode: string, langCode: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langCode);
			let resultsA = result.versionModels;
			resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
			if (resultsA.length > 0) {
				let resultsB = resultsA[0].bookModels;
				let bookIdModels = [];
				for (var i=0; i<resultsB.length; i++) {
					var bModel = {bookId:resultsB[i].bookId, bookName:resultsB[i].bookName,
						section: resultsB[i].section, bookNumber: resultsB[i].bookNumber,
						languageCode: langCode, versionCode: verCode, numOfChapters:resultsB[i].chapterModels.length };
						bookIdModels.push(bModel);
				}		
				return bookIdModels;
			}
			return null;
		}
		return null;
	}

	async updateHighlightsInVerse(langCode, verCode, bookId, chapterNumber, verseNumber, isHighlight) {
		let realm = await this.getRealm();
		if (realm) {
			let results = realm.objects('VerseComponentsModel');
				console.log("db len = " + results.length)
				results = results.filtered('languageCode ==[c] "' + langCode +
					'" && versionCode ==[c] "' + verCode + '" && bookId ==[c] "' +
					bookId + '" && chapterNumber == ' + chapterNumber +
					' && type ==[c] "v" && verseNumber ==[c] "' + verseNumber + '"' );
				realm.write(() => {
					for (var i=0;i<results.length;i++) {
						results[i].highlighted = isHighlight;
					}
					console.log("update highlight complete..")
				});
			
		}
	}
	async addNote(value,time){
		console.log("value in db helper "+value)
		let realm = await this.getRealm();
			if (realm) {
				console.log("value in db help "+value)
				realm.write(() => {
					realm.create('NoteModel',{body:value, createdTime:time,modifiedTime:time})
					console.log("write.. new notes..")
		  	});
		 
		}
	}

	async updateNote(value, createdTime, modifiedTime){
		let realm = await this.getRealm();
		console.log('update continue .....')
		let update = realm.objects('NoteModel').filtered(	"createdTime = $0",new Date(createdTime));

		realm.write(() => {
			update[0].modifiedTime = modifiedTime,
			update[0].body = value
		})
	}

	async deleteNote(index){
		let realm = await this.getRealm();
		let results = realm.objects('NoteModel');
		console.log("result "+JSON.stringify(results[index]))
		realm.write(() => {
			realm.delete(results[index]);
			console.log("deleted data from table")
		})
	}

	// async addStyle(index,){
	// 	console.log("value in db helper "+value)
	// 	let realm = await this.getRealm();
	// 		if (realm) {
	// 			console.log("value in db help "+value)
	// 			realm.write(() => {
	// 				realm.create('StylingModel',{characterIndex:index, format:})
	// 				console.log("write.. new notes..")
	// 	  	});
		 
	// 	}
	// }
	
}

export default new DbHelper();