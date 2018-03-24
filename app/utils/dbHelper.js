'use strict';

import Realm from 'realm'
import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'

class DbHelper {

    setRealm() {
		new Realm({deleteRealmIfMigrationNeeded: true, schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseComponentsModel] });
    }

    async getRealm() {
    	try {
    		return await Realm.open({schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseComponentsModel] });
    	} catch (err) {
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

	testFilteredLinkingObjects(){
        var realm = new Realm({schema: [schemas.PersonObject]});
        var christine, olivier, oliviersParents;
        realm.write(function() {
            olivier = realm.create('PersonObject', {name: 'Olivier', age: 0});
            christine = realm.create('PersonObject', {name: 'Christine', age: 25, children: [olivier]});
            realm.create('PersonObject', {name: 'JP', age: 28, children: [olivier]});
            oliviersParents = olivier.parents;
        });
        // Three separate queries so that accessing a property on one doesn't invalidate testing of other properties.
        var resultsA = oliviersParents.filtered('age > 25');
        var resultsB = oliviersParents.filtered('age > 25');
        var resultsC = oliviersParents.filtered('age > 25');
        realm.write(function() {
            var removed = christine.children.splice(0);
            TestCase.assertEqual(removed.length, 1);
        });
        TestCase.assertEqual(resultsA.length, 1);
        TestCase.assertEqual(resultsB.filtered("name = 'Christine'").length, 0);
        TestCase.assertArraysEqual(names(resultsC), ['JP']);
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

	async insertSpecificLinking() {
		let realm = await this.getRealm();
        var chapter, chaptersBooks, checkParents;

		if (realm) {
	  		realm.write(() => {

				// realm.create(model, value);

				chapter = realm.create('ChapterModel', {chapterNumber: 3, numberOfVerses: 17});
	            realm.create('BookModel', {bookId: 'BO9', bookName: 'Christine 9', bookNumber: 9, section: 'OT', chapterModels: [chapter]});
	            chaptersBooks = chapter.bookOwner;
	            console.log("book owner = " + chaptersBooks.bookName);
	            console.log("book owner = " + chaptersBooks[0]);
	            console.log("book owner = " + chaptersBooks[0].bookName);

	            // realm.create('BookModel', {bookId: 'BO8', bookName: 'JP 6', bookNumber: 6, section: 'OT', chapterModels: [chapter]});

	            var resultsA = chaptersBooks.filtered('bookNumber > 5');
	            console.log("bookNumber> 5 :: " + resultsA);
				console.log("write complete..");
			});
	  	}
	}

	async queryLinks() {
		let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects('ChapterModel');//.filtered('bookOwner[0].bookId = "BO2"');
			let newRes = results.filtered('results.bookOwner[0].bookId = "BO2"');
			console.log("result == " + results.length)
			return results;
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