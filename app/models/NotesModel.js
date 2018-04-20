'use strict';

import Realm from 'realm'

export default class NoteModel extends Realm.Object {}
NoteModel.schema = {
    name: 'NoteModel',
    properties: {
        timestamp:'string',
        body: 'string?',
        styling: 'StylingModel?[]',
        references: 'ReferenceModel?[]',
    }
};