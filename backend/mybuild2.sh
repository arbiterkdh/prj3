
# 컨테이너 멈추고
ssh -i src/main/resources/secret/key05.pem ubuntu@3.34.98.7 'docker stop saengjoncoding'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key05.pem ubuntu@3.34.98.7 'docker rm saengjoncoding'
# pull image
ssh -i src/main/resources/secret/key05.pem ubuntu@3.34.98.7 'docker pull arbiterkdh1/saengjoncoding'
# 컨테이너 실행
ssh -i src/main/resources/secret/key05.pem ubuntu@3.34.98.7 'docker run -d -p 8080:8080 --restart always --name saengjoncoding arbiterkdh1/saengjoncoding'