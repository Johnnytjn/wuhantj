#!/bin/sh

pkgname=wuhantj.tar.gz
pkg_dir=package
build_dir=build

mkdir ./${pkg_dir}
mkdir ${build_dir}
rm -rf ./${pkg_dir}/$pkgname
rm -rf ${build_dir}/*

# copy client code
yarn run build
cp -Ra dist ${build_dir}
# copy server code
cp -Ra server/* ${build_dir} 
# copy config file
cp .env ${build_dir}

cp ./package.json ./${build_dir}
cp ./yarn.lock ./${build_dir}
cd ./${build_dir}

if [ "$SKIP_DOWNLOAD_PACKAGE" = "true" ];then 
    echo "Skip downloading npm packages."
else
    echo "Download npm packages."
    NODE_ENV=production yarn  
    rm -rf package.json
    rm -rf yarn.lock
fi

if [ $? -eq 1 ]; then
    echo "Error occured during install npm packages. Try to rebuild again."
    exit 1
fi
tar -czf ../${pkg_dir}/$pkgname .[!.]* *
