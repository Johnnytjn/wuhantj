# wuhantj

## Development Enviornment Requirements
1. Node is installed - v10.16.0+, https://nodejs.org/en/
2. yarn is installed - https://yarnpkg.com/en/

## Integration debug
1. edit "API_BASE_URL" in .env if necessary (SERVER_PORT if necessary as well)
2. run 'yarn start-dev'

## Packaging
In root folder, run './bin/package.sh', the package will be generated in ./package folder. 

## Deployment
Copy the package file (wuhantj.tar.gz) onto the server and extrat it into a folder, then run 'node app.js'.

