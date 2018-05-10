'use strict';

import Realm from 'realm'

export default class NoteModel extends Realm.Object {}
NoteModel.schema = {
    name: 'NoteModel',
    // primaryKey: 'createdTime',
    properties: {
        createdTime:'date',
        modifiedTime:'date',
        body: 'string?',
        styling: 'StylingModel[]',
        references: 'ReferenceModel[]',
    }
};