# React-calendar

---

# 專案說明：

---

本專是是房間預約系統，可以搭配後端server顯示目前哪些room被預約並顯示在該使用者的google日曆，由於目前沒有對應的後端所以只能將資料暫存（刷新就消失）

# 專案建置：

---

請先 install 本專案所需套件

```jsx
npm install
```

請選擇一種方式開啟

```jsx
npm run start
```

```jsx
yarn start
```

預設會使用port 3000 如果該port已被使用會自動切換到合適的port

---

# 如何使用：

---

![readmeImg/Untitled.png](readmeImg/Untitled.png)

1. 收起側邊欄
2. 選擇月份，會用藍圈標記當日
3. 顯示哪些房間
4. 回到今天
5. 房間預約顯示

## 創建房間：

![readmeImg/Untitled%201.png](readmeImg/Untitled%201.png)

1.點擊需要預約的房間和時間

![readmeImg/Untitled%202.png](readmeImg/Untitled%202.png)

2.填寫該次預約的訊息

![readmeImg/Untitled%203.png](readmeImg/Untitled%203.png)

3.該次預約會顯示在畫面上

![readmeImg/Untitled%204.png](readmeImg/Untitled%204.png)

4.可以點選該活動查看細節或是刪除修改

(由於目前沒有後端所以刪除無法使用）