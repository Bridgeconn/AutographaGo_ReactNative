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

    async query(model: string, filter?: string) {
    	let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects(model);
			console.log("result == " + results.length)
		    if(filter) {
		        return results.filtered(filter);
		    }
			return results;
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
}

export default new DbHelper();