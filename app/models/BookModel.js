'use strict';

import Realm from 'realm'

export default class BookModel extends Realm.Object {}
BookModel.schema = {
    name: 'BookModel',
    // primaryKey: 'bookPrimaryId',
    properties: {
      bookId: 'string',
      // bookPrimaryId: 'string',
      // languageCode: 'string',
      // versionCode: 'string',
      bookName: 'string',
      chapterModels: 'ChapterModel[]',
      bookmarksList: 'int?[]',
      section: {type: 'string', default: 'NT'},
      bookNumber: 'int',

      bookOwner: {type: 'linkingObjects', objectType: 'VersionModel', property:'bookModels' }
    }
};