// 1.区分IE和非IE浏览器
if (!+[1,]) {
    alert('这是IE浏览器')
} else {
    alert('这不是IE浏览器')
}

// 2.将日期直接转换为数值
+new Date()

// 3.非IE浏览器下将类数组对象'arguments‘转为数组
Array.prototype.slice.call(arguments)

// 4.最简单的选择运算符||
var a = 0 || 3;
console.log(a);  // 3

// 5.单链式运算
var a = 10;
console.log(a++ - 1);  // 先执行a-1,再执行a=a+1

// 6. void操作符
<a href="javascript:void(0)">我是一个死链接</a>
// void是一个操作符，用来计算一个表达式但不返回值。用法:javascript:void(express),expression是一个要计算的javascript标准表达式

// 7.跳转至新页面，并且保证浏览器不会再回退
location.replace('http://www.baidu.com')

// 8.几秒钟后之后返回上一页
<meta http-equiv="refresh" content="3;url=javascript:window,history.go(-1);" />

// 9.在打开的子窗口中刷新父窗口
window.opener.location.reload()

// 10.用JavaScript打印页面
window.print()

// 11.显示/隐藏一个DOM元素
el.style.display = ''
el.style.display = 'none'

// 12.实现alert()中的文本换行
alert('p\np');  // "\n"表示换行符

// 13.实现ES5中的Object.create()函数
function clone (proto) {
    function _clone () {}
    _clone.prototype = proto;
    _clone.prototype.constructor = true;
    return new _clone ();  // 等价于Object.create(Person)
}
var me = clone(Person)
// 用原型链形式继承，构造函数重新指向新创建的对象

// 14.检测Shift、ctrl、alt键
event.shiftKey;  // 检测shift
event.altKey;  // 检测alt
event.ctrlKey;  //检测ctrl

// 15.获取屏幕分辨率的宽、高
window.screen.height;  // 获取屏幕的高
window.screen.width;  // 获取屏幕的宽

// 16.脚本用不出错方式
window.onerror = function (m, f, l) {
    return true;
}

// 17.javascript处理字符与ASCII码之间转换
console.log('a'.charCodeAt(0));  // 97
console.log(String.fromCharCode(75));  // K

// 18.把一个值转换为布尔型的最简单方式
!!'demo';  // true
!!'';  // false
!!'0';  // true
!!'1';  // true
!!{};  // true
!!true;  // true

// 19.判断浏览器是否支持HTML5
!!navigator.geolocation;

// 20.判断浏览器是否支持Canvas
function isCanvas () {
    return !!document.createElement('canvas').getContext;
}

// 21.判断IE版本
window.navigator.appVersion

// 22.获取浏览器插件的数目
navigator.plugins.length

// 23.实现对windows、mac、Linux、unix操作系统的判断(navigator.userAgent 表示用户代理)
var osType = '',
window = (navigator.userAgent.indexOf('Windows', 0) != -1) ? 1 : 0,
mac = (navigator.userAgent.indexOf('mac', 0) != -1) ? 1 : 0,
linux = (navigator.userAgent.indexOf('Linux', 0) != -1) ? 1 : 0,
unix = (navigator.userAgent.indexOf('X11', 0) != -1) ? 1 : 0;
if (windows) osType = 'Windows';
else if (mac) osType = 'Mac';
else if (linux) osType = 'Lunix';
else if (unix) osType = 'Unix';
console.log(osType)

// 24.使用原生Javascript判断是否是移动设备浏览器
var mobileReg = /iphone|ipad|android.*mobile|windows.*phone|blackberry.*mobile/i;
if ((mobileReg.test(window.navigator.userAgent.toLocaleLowerCase()))) {
    alert('移动设备！');
} else {
    alert('非移动设备！')
}