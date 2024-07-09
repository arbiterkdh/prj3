# react project build
cd ../frontend
yarn build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
rm -rf build
mv ../frontend/dist src/main/resources/static


# spring project build
./gradlew bootJar

# build image
docker build -t arbiterkdh1/saengjoncoding .

