'use strict';

import Realm from 'realm'

export default class ReferenceModel extends Realm.Object {}
ReferenceModel.schema = {
    name: 'ReferenceModel',
    properties: {
        bookName:'string',
        chapterNumber:'int',
        VerseNumber:'int'
    }
};