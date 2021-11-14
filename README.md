# Conversational_AI

## 前言
想要把流程控制交給 Node Red 處理，接下來有幾個步驟要進行

- [ ] 啟動 centos 環境
- [ ] 建立 NodeRed 環境
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
```