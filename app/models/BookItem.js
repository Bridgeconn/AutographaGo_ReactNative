'use strict';

import Realm from 'realm'

export default class BookItem extends Realm.Object {}
BookItem.schema = {
    name: 'BookItem',
    primaryKey: 'bookId',
    properties: {
      bookId: 'string',
      bookName: 'string',
      bookNumber: 'int',
      section: {type: 'string', default: 'NT'},
      chapterItems: {type: 'list', objectType: 'ChapterItem'},
      bookmarks: 'int?[]',
    },
};