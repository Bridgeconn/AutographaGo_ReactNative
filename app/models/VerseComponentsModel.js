'use strict';

import Realm from 'realm'

export default class VerseComponentsModel extends Realm.Object {}
VerseComponentsModel.schema = {
    name: 'VerseComponentsModel',
    properties: {
    	type: 'string',
    	verseNumber: {type: 'string', indexed: true},
    	text: {type: 'string', indexed: true},
    	highlighted: 'bool',
    	languageCode: 'string',
		versionCode: 'string',
		bookId: {type: 'string', indexed: true},
		chapterNumber: {type: 'int', indexed: true},
        
        verseComponentOwner: {type: 'linkingObjects', objectType: 'ChapterModel', property: 'verseComponentsModels' }
    }
};