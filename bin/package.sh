#!/bin/sh

pkgname=wuhantj.tar.gz
pkg_dir=package
build_dir=./build

rm -rf ./${pkg_dir}/$pkgname

# copy client code
yarn run build
cp -Ra dist ${build_dir}
# copy server code
cp -Ra server/* ${build_dir} 
# copy config file
cp .env ${build_dir}

cp package.json ${build_dir}
export NODE_ENV=production
cd ${build_dir}
yarn

if [ $? -eq 1 ]; then
    echo "Error occured during install npm packages. Try to rebuild again."
    exit 1
fi
tar -czf ../${pkg_dir}/$pkgname .[!.]* *
