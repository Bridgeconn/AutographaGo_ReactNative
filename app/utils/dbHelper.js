'use strict';

import Realm from 'realm'
import ChapterItem from '../models/ChapterItem'
import BookItem from '../models/BookItem'

class DbHelper {

    setRealm() {
		new Realm({deleteRealmIfMigrationNeeded: true, schema: [ChapterItem, BookItem] });
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

	async insert(model: string, value) {
		let realm = await this.getRealm();
		if (realm) {
	  		realm.write(() => {
				realm.create(model, value);
				console.log("write complete..")
			});
	  	}
	}

	async queryLinks() {
		let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects('ChapterItem').filtered('bookOwner.bookId = "BO2"');;
			console.log("result == " + results.length)
			return results;
		}
	}
}

export default new DbHelper();