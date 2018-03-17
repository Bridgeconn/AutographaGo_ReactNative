'use strict';

import Realm from 'realm'

export default class ChapterModel extends Realm.Object {}
ChapterModel.schema = {
    name: 'ChapterModel',
    // primaryKey: 'chapterNumber',
    properties: {
      chapterNumber: 'int',
      // chapterId: 'string',
      // languageCode: 'string',
      // versionCode: 'string',
      numberOfVerses: 'int',
      verseComponentsModels: 'VerseComponentsModel[]',

      chapterOwner: {type: 'linkingObjects', objectType: 'BookModel', property:'chapterModels' }
    }
};