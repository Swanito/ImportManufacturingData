const CONFIGS_COLLECTION = 'configs';
const CONFIGS = [
  {
    "device": "connect",
    "headers": [
      {
        "name": "BLPassword",
        "ignore": true,
        "dbName": null,
        "criteria": null,
        "type:": null
      },
      {
        "name": "serialNumber",
        "ignore": false,
        "dbName": "serialNumber",
        "criteria": "^([0-9A-Z]{10})$",
        "type:": "string"
      },
      {
        "name": "skuNumber",
        "ignore": false,
        "dbName": "skuNumber",
        "criteria": "^(AUG-AC[0-9]{2})|(02-01-001)$",
        "type:": "string"
      },
      {
        "name": "macAddressWiFi",
        "ignore": false,
        "dbName": "wifiMacAddress",
        "criteria": "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
        "type:": "string"
      },
      {
        "name": "shipDate",
        "ignore": false,
        "dbName": "shipDate",
        "criteria": "^(?:[1-9]\\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d{1,9})?(?:Z|[+-][01]\\d:[0-5]\\d)$",
        "type:": "date"
      }
    ]
  },
  {
    "device": "doorbell",
    "headers": [
      {
        "name": "serialNumber",
        "ignore": false,
        "dbName": "serialNumber",
        "criteria": "^([0-9A-Z]{10})$",
        "type:": "string"
      },
      {
        "name": "skuNumber",
        "ignore": false,
        "dbName": "skuNumber",
        "criteria": "^(AUG-AC[0-9]{2})|(02-01-001)$",
        "type:": "string"
      },
      {
        "name": "augfirmware",
        "ignore": false,
        "dbName": "augfirmware",
        "criteria": "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$",
        "type:": "string"
      },
      {
        "name": "battserialnumber",
        "ignore": false,
        "dbName": "batterySerialNumber",
        "criteria": "^([0-9A-Z]{10})$",
        "type:": "string"
      }
    ]
  }
]

module.exports = {
  async up(db, client) {
    for (let i = 0; i < CONFIGS.length; i++) {
      db.collection(CONFIGS_COLLECTION).findOne({ device: CONFIGS[i].device }).then((storedConfig) => {
        if (!storedConfig) {
          return db.collection(CONFIGS_COLLECTION).insertOne(CONFIGS[i]);
        }
      });
    }
  },

  async down(db, client) {
    return db.collection(CONFIGS_COLLECTION).deleteMany();
  }
};
