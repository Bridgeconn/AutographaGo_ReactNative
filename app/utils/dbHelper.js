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
			console.log("erro in open ralm" + err)
    		return null;
    	}
    }

    async query(model: string, filter?: string, sort?: string, desc?: bool) {
    	let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects(model);
			console.log("result == " + results.length)
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
			let resultsA = result.versionModels;
			resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
			if (resultsA.length > 0) {
				let resultsB = resultsA[0].bookModels;				
				if (bookId) {
					return resultsB.filtered('bookId ==[c] "' + bookId + '"');
				}
				if (text) {
					return resultsB.filtered('bookName CONTAINS[c] "' + text + '"').sorted("bookNumber");
				}
				return resultsB.sorted("bookNumber");
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
			result1 = result1.filtered('languageCode ==[c] "' + langCode + '" && versionCode ==[c] "' + verCode + '"');
			result1 = result1.filtered('highlighted == true');
			return result1;//.distinct('verseNumber', 'chapterNumber', 'bookId');
		}
		return null;
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
                            console.log("book already present -- " + bookModel.bookId)
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
		await console.log("update comes with output "+JSON.stringify(update[0].createdTime))

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
	// updateHighlights(languageModels, verseIdModels) {
	// 	for (LanguageModel languageModel : languageModels) {
    //         for (VersionModel versionModel : languageModel.getVersionModels()) {
    //             for (BookModel bookModel : versionModel.getBookModels()) {
    //                 for (ChapterModel chapterModel : bookModel.getChapterModels()) {
    //                     for (VerseComponentsModel verseComponentsModel : chapterModel.getVerseComponentsModels()) {
    //                         for (VerseIdModel verseIdModel : verseIdModels) {
    //                             if (verseIdModel.getBookId().equals(bookModel.getBookId()) &&
    //                                     verseIdModel.getChapterNumber() == chapterModel.getChapterNumber() &&
    //                                     verseIdModel.getVerseNumber().equals(verseComponentsModel.getVerseNumber())) {
    //                                 if (verseIdModel.getTimeStamp() > 0) {
    //                                     verseComponentsModel.setHighlighted(true);
    //                                 } else {
    //                                     verseComponentsModel.setHighlighted(false);
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
	// }
}

export default new DbHelper();