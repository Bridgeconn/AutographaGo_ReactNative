'use strict';

import Realm from 'realm'
import ChapterItem from '../models/ChapterItem'
import BookItem from '../models/BookItem'

class DbHelper {

    setRealm() {
		new Realm({schema: [ChapterItem, BookItem] });
    }

    async getRealm() {
    	try {
    		return await Realm.open({schema: [ChapterItem, BookItem] });
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

	async insert(model: string, chapterNumber, numberOfVerses) {
		let realm = await this.getRealm();
		if (realm) {
	  		realm.write(() => {
				realm.create(model, { chapterNumber: chapterNumber, numberOfVerses: numberOfVerses });
				console.log("write complete: " + chapterNumber)
			});
	  	}
	}

	close() {

	}

	createRealm() {

	}
}
export default new DbHelper();