'use strict';

import Realm from 'realm'

export default class VerseComponentsModel extends Realm.Object {}
VerseComponentsModel.schema = {
    name: 'VerseComponentsModel',
    // primaryKey: 'languageCode',
    properties: {
    	// chapterId: 'string', // index, non null
    	type: 'string',
    	verseNumber: 'string', // index
    	text: 'string', // index
    	highlighted: 'bool',
    	// languageCode: 'string',
    	// versionCode: 'string',
        
        verseComponentOwner: {type: 'linkingObjects', objectType: 'ChapterModel', property: 'verseComponentsModels' }
    }
};