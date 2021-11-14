# Conversational_AI

## 前言
想要把流程控制交給 Node Red 處理，接下來有幾個步驟要進行

- [x] 啟動 centos 環境
- [x] 建立 NodeRed 環境
- [ ] 建立帳號密碼的資料庫
- [ ] 透過登入頁面進入 NodeRed 環境

## 建立 Centos 環境

- 建立系統
```shell
docker run --name base --rm -itd -p 8080:80 -p 1234:443 --network=bridge centos:8 bash
docker attach
```

## 建立 nodejs 環境
```shell
dnf update
# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-centos-8
dnf module enable nodejs:14 -y
dnf install nodejs -y
```

## 匯出本次 docker 環境

```shell
docker export base > base.tar
```

## 驗證是否成功

```shell
cat base.tar | docker import - base
docker run --name base --rm -itd -p 8080:80 -p 1234:443 --network=bridge -v ${PWD}:/app base bash
```

## 安裝 vim

```shell
dnf install vim -y
```

## 安裝 nginx (跳過)

應該是沒用，因為沒有辦法啟用systemctl 提供服務，跳過

```shell
https://www.footmark.info/linux/centos/centos8-yum-nginx-stable-mainline/
yum install yum-utils -y
# 增加 nginx-repo
vim /etc/yum.repos.d/nginx.repo
dnf update
dnf install -y nginx nginx-module-njs
systemctl enable --now nginx
```

## 建立資料庫

```shell
docker run --name pg --rm -itd -p 5432:5432 -v ${PWD}/psql/data:/var/lib/postgresql/data/pgdata \
-v ${PWD}/app:/app \
-e POSTGRES_USER=<user> \
-e POSTGRES_DB=cai \
-e POSTGRES_PASSWORD=<pwd> \
-e PGDATA=/var/lib/postgresql/data/pgdata \
--network=bridge \
--hostname=pg \
postgres:latest
```

## 改用 docker-compose 進行 (跳過，有遇到無法正常啟動的問題)

```shell
docker-compose -f docker-compose.yml up -d --remove-orphans
```

## 建立 nodejs 執行環境

- 建立 container

```shell
docker run --name base --rm -itd -p 8080:80 -p 1234:443 --network=bridge -v ${PWD}:/app base bash
docker attach base
```

- 建立 nodejs 環境

```shell
docker run --name base --rm -itd -p 8080:80 -p 1234:443 --network=bridge -v ${PWD}:/app base bash
```
