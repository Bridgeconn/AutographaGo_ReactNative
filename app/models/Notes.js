'use strict';

import Realm from 'realm'

export default class NoteModel extends Realm.Object {}
NoteModel.schema = {
    name: 'NoteModel',
    properties: {
        title: 'string',
        timestamp:'string',
    	bodyModel: 'BodyModel[]',
        reference: 'ReferenceModel[]',
    }
};