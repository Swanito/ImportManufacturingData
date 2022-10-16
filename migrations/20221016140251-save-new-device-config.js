const CONFIGS_COLLECTION = 'configs';
const CONFIGS = [
  {
    "device": "newdevice",
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
        "name": "newHeader",
        "ignore": false,
        "dbName": "newHeader",
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
