'use strict';

import Realm from 'realm'

export default class VerseIdModel extends Realm.Object {}
VerseIdModel.schema = {
    name: 'VerseIdModel',
    properties: {
    	bookId: 'string',
    	bookName: 'string',
    	chapterNumber: 'int',
    	verseNumber: 'string',
    	text: 'string',
    	timeStamp: 'Date',
    	searchId: 'string',
    }
};