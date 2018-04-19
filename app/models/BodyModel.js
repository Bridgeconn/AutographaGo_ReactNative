'use strict';

import Realm from 'realm'

export default class DesignModel extends Realm.Object {}
DesignModel.schema = {
    name: 'BodyModel',
    properties: {
       designModel:'DesignModel[]',
       character:{type: 'string', indexed: true}
    }
};