'use strict';

import Realm from 'realm'

export default class ChapterItem extends Realm.Object {}
ChapterItem.schema = {
    name: 'ChapterItem',
    // primaryKey: 'chapterId',
    properties: {
      // chapterId: 'string',
      chapterNumber: 'int',
      numberOfVerses: 'int',
    },

    // List<VerseComponentsModel> verseComponentsModels
};