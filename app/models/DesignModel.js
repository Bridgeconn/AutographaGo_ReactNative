'use strict';

import Realm from 'realm'

export default class DesignModel extends Realm.Object {}
DesignModel.schema = {
    name: 'DesignModel',
    properties: {
        styling:{type: 'string', indexed: true}
    }
};