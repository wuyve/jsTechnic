# jsTechnic

## 目录

<!-- TOC -->

- [jsTechnic](#jstechnic)
    - [目录](#目录)
    - [[Object的对象方法函数](./Object构造函数的方法.md)](#object的对象方法函数object构造函数的方法md)
    - [异步之async-await](#异步之async-await)
    - [异步执行函数Generator (*-yield)](#异步执行函数generator--yield)
    - [Nodejs的readline模块的基本使用](#nodejs的readline模块的基本使用)
    - [js的默认赋值](#js的默认赋值)
    - [读取文件下的目录的文件类型](#读取文件下的目录的文件类型)
    - [js的执行机制](#js的执行机制)
    - [基本数据类型和引用数据类型的复制](#基本数据类型和引用数据类型的复制)
    - [数组及数组内元素倒叙](#数组及数组内元素倒叙)
    - [JS数组去重](#js数组去重)
    - [数组对象去重](#数组对象去重)
    - [判断对象是否为空](#判断对象是否为空)
    - [浏览器存储：localStorage & sessionStorage](#浏览器存储localstorage--sessionstorage)
    - [指定范围内的随机数(min - max)](#指定范围内的随机数min---max)
    - [++[[]][+[]]+[+[]] === 10  ???](#--10--)
    - [{} + {} = ?](#----)
    - [创建二维数组](#创建二维数组)
    - [冻结对象](#冻结对象)
    - [浅冻结对象](#浅冻结对象)
    - [深冻结对象](#深冻结对象)

<!-- /TOC -->

## [Object的对象方法函数](./Object构造函数的方法.md)

## 异步之async-await

```javascript
const fs = require("fs");
const read = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
async function readByAsync() {
    let a1 = await read('redux.txt');
    let a2 = await read('state.txt');
    let a3 = await read('react-router.txt');
    console.log(a1.toString());
    console.log(a2.toString());
    console.log(a3.toString());
}
readByAsync();
```

## 异步执行函数Generator (*-yield)

```javascript
function* show() {
    yield read('state.txt');
    yield read('react-router.txt');
    yield read('redux.txt');
}
const s = show();
s.next().value.then(res => {
    console.log(res.toString());
    return s.next().value;
}).then(res => {
    console.log(res.toString());
    return s.next().value;
}).then(res => {
    console.log(res.toString());
});
```

## Nodejs的readline模块的基本使用

```javascript
// 引入readline模块
var readline = require('readline');

//创建readline接口实例
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// question方法
rl.question("你叫什么？", function (answer) {
    console.log("名字是：" + answer);
    // 不加close，则不会结束
    rl.close();
});

// close事件监听
rl.on("close", function () {
    // 结束程序
    process.exit(0);
});
```

## js的默认赋值

```javascript
function aa(num = 0) {
    var bb = num;
    console.log(bb)
}
aa();
```

或者下面这样

```javascript
function aa(num) {
    var bb = num | 0;
    console.log(bb)
}
aa();
```

## 读取文件下的目录的文件类型

```javascript
const fs = require('fs');
const path = require('path')
const arr = fs.readdirSync(path.resolve('./'));
console.log(arr)
arr.forEach(name => {
    const p = path.resolve('./', name);
    console.log(name, 'is link?', name.endsWith('.lnk'));
    console.log(name, 'is symbolicLink?', fs.statSync(p).isSymbolicLink())
})
```

## js的执行机制

``` javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

process.nextTick(function() {
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

## 基本数据类型和引用数据类型的复制

基本类型的复制就是复制了一份值

```javascript
var a = 10;
var b = a;
a = 222;
console.log(a);
console.log(b);
```

引用类型的复制其实是复制了一份指针，指针指向的值只有一个。

```javascript
var obj1 = {};
var obj2 = obj1;
obj1.name = "aaa";
obj2.age = 12;
console.log(obj1);
console.log(obj2);
```

## 数组及数组内元素倒叙

```javascript
let strNum = ['abcd', 'apple', 'ssdewr', 'sfsfrwe'];
for (let i = 0, len = strNum.length; i < len; i++) {
    let mid = strNum[i].split('');
    mid = mid.reverse();
    mid = mid.join('');
    strNum[i] = mid;

}
strNum = strNum.reverse();
console.log(strNum);
```

## JS数组去重

首先定义一个数组

```javascript
let arr = [11,22,33,12,22,11,'dsaf','fff','asd','dsaf'];
```

方法一：利用Set属性去重

```javascript
let result = Array.from(new Set(arr));
console.log(result);
```

方法二： 使用for嵌套for，然后用splice去重

```javascript
for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            j--;
        }
    }
}
console.log(arr);
```

方法三：利用indexof去重

```javascript
let mid = [];
for(let i = 0; i < arr.length; i++) {
    if (mid.indexOf(arr[i]) === -1) {
        mid.push(arr[i]);
    }
}
console.log(mid);
```

方法四：使用sort去重 ，返回去重后且排序的数组

```javascript
arr = arr.sort();
let mid = [];
for(let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
        mid.push(arr[i]);
    }
}
console.log(mid);
```

方法五： 利用includes

```javascript
let mid = [];
for (let i = 0; i < arr.length; i++) {
    if (!mid.includes(arr[i])) {
        mid.push(arr[i]);
    }
}
console.log(mid);
```

方法六： 利用对象属性不能重复(性能最高)

```javascript
let obj = {}, result = [];
for(let i of arr) {
    if (!obj[i]) {
        result.push(i);
        obj[i] = 1;
    }
}
console.log(result);
```

## 数组对象去重

```javascript
let arr = [
    {
        UACode: '123123123123123123_1',
        UAName: '123123123',
        devType: '摄像机'
    },
    {
        UACode: '123456343123453123453412534123_1',
        UAName: '123123123213',
        devType: '摄像机'
    },
    {
        UACode: '123123123123123123_1',
        UAName: '123123123',
        devType: '摄像机'
    }
];
let obj = {};
arr = arr.reduce((item, next) => {
    obj[next.UACode] ? '' : obj[next.UACode] = true && item.push(next);
    return item;
}, []);
console.log(arr);
```

## 判断对象是否为空

```javascript
let obj = {
    name: undefined
};
let bool = JSON.stringify(obj) === '{}';
console.log(bool);  // true

let boolObject = obj === {};
console.log(boolObject);  // false
```

## 浏览器存储：localStorage & sessionStorage

存储localStorage

```javascript
let localStore = {
    setStore (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
        content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    getStore (name) {
        if (!name) return
        return window.localStorage.getItem(name)
    },
    removeStore (name) {
        if (!name) return
        window.localStorage.removeItem(name)
    }
}
```

存储seeionStorage

```javascript
let sessionStore = {
    setStore (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
        content = JSON.stringify(content)
        }
        window.sessionStorage.setItem(name, content)
    },
    getStore (name) {
        if (!name) return
        return window.sessionStorage.getItem(name)
    },
    removeStore (name) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
    emptyStore () {
        window.sessionStorage.clear()
    }
}
```

## 指定范围内的随机数(min - max)

```javascript
function rangeNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
 }
 let a = rangeNum(10, 100);
 console.log(a);
```

## ++[[]][+[]]+[+[]] === 10  ???

分解： 
1. +[] === 0             ++[[]][0] + [0]
2. ++[[]][0] == A + 1    +([] + 1)+[0]
3. []+1 === 1            1+[0]
4. [0] === '0'           1+'0'
5. 10

```javascript
let a = ++ [[]][+[]]+[+[]];
console.log(a);  // 10
```

## {} + {} = ?

```javascript
let a = {} + {};
console.log(a);  // [object Object][object Object]
```

## 创建二维数组

```javascript
/**
 * param {行数} rows
 * param {列数} cols
 * param {初始值} inital
 */
Array.matrix = function (rows, cols, inital) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        let colums = [];
        for (let j = 0; j < cols; j++) {
            colums[j] = inital;
        }
        arr[i] = colums;
    }
    return arr;
}
var nums =Array.matrix(5, 5, 2);
console.log(nums);
```

## 冻结对象

```javascript
let obj1 = {
    name: 'obj1'
};
let obj2 = obj1;
Object.freeze(obj2);
obj1.name = 'wwwwww';
console.log(obj1);
console.log(obj2);
```

## 浅冻结对象

```javascript
obj1 = {
    internal: {}
  };
  
  Object.freeze(obj1);
  obj1.internal.a = 'aValue';
  obj1.internal.a // 'aValue'
```

## 深冻结对象

```javascript
// 深冻结函数
function deepFreeze(obj) {
    // 取回定义在obj上的属性名
    var propNames = Object.getOwnPropertyNames(obj);
    // 在冻结自身之前冻结属性
    propNames.forEach(function(name) {
      var prop = obj[name];
      // 如果prop是个对象，冻结它
      if (typeof prop == 'object' && prop !== null)
        deepFreeze(prop);
    });
    // 冻结自身(no-op if already frozen)
    return Object.freeze(obj);
  }
  obj2 = {
    internal: {}
  };
  deepFreeze(obj2);
  obj2.internal.a = 'anotherValue';
  obj2.internal.a; // undefined
  ```

## 数组浅拷贝

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = arr1;
arr1[0] = 'hfhfhf';
console.log(arr1);
console.log(arr2);
```

## 数组深拷贝

```javascript
function copy (arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        arr2[i] = arr1[i];

    }
}
var nums = [];
for (let i = 0; i < 10; ++i) {
    nums[i] = i + 1;
}
var sameNums = [];
copy(nums, sameNums);
nums[0] = 'asfdhiufhwe';
console.log(nums);
console.log(sameNums);
```
