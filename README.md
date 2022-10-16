# Import Manufacturing Data
## How To

## Steps to use

By default, the script points to a mongo database in your localhost. Configure your database address in the .env file and migrate-mongo-config.js file if you want to change it.

Install the dependencies and devDependencies and run the migrations to populate the database from the root folder.

```sh
cd importManufacturingData
npm i
npx migrate-mongo up
```

Run the script for the desired device/file.
```sh
cd app
node importManufacturingData connect ./common/mocks/connect-error1.csv
```

You can run the script for the new device type `newdevice`
```sh
cd app
node importManufacturingData newdevice ./common/mocks/connect-error1.csv
```

Run the tests from the root folder
```sh
npm run test
```