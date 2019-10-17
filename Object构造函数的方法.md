# Object 构造函数的方法

|方法|描述|
|:---|:---|
|`Object.assign()`|通过复制一个或多个对象来创建一个新的对象。|
|`Object.create()`|使用指定的原型对象和属性创建一个新对象。|
|`Object.defineProperty()`|给对象添加一个属性并指定该属性的配置。|
|`Object.defineProperties()`|给对象添加多个属性并分别指定它们的配置。|
|`Object.entries()`|返回给定对象自身可枚举属性的 [key, value] 数组。|
|`Object.freeze()`|冻结对象：其他代码不能删除或更改任何属性。|
|`Object.getOwnPropertyDescriptor()`|返回对象指定的属性配置。|
|`Object.getOwnPropertyNames()`|返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。|
|`Object.getOwnPropertySymbols()`|返回一个数组，它包含了指定对象自身所有的符号属性。|
|`Object.getPrototypeOf()`|返回指定对象的原型对象。|
|`Object.is()`|比较两个值是否相同。所有 NaN 值都相等（这与 `==` 和 `===` 不同）。|
|`Object.isExtensible()`|判断对象是否可扩展。|
|`Object.isFrozen()`|判断对象是否已经冻结。|
|`Object.isSealed()`|判断对象是否已经密封。|
|`Object.keys()`|返回一个包含所有给定对象自身可枚举属性名称的数组。|
|`Object.preventExtensions()`|防止对象的任何扩展。|
|`Object.seal()`|防止其他代码删除对象的属性。|
|`Object.setPrototypeOf()`|设置对象的原型（即内部 [[Prototype]] 属性）。|
|`Object.values()`|返回给定对象自身可枚举值的数组。|

1. `Object.assign()` 通过复制一个或多个对象来创建一个新的对象。

    语法： `Object.assign(target, ...sources)`

    参数： `target`：目标对象； `source`： 源对象

    返回值： 目标对象

    如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

    例如：

    浅拷贝

    ```javascript
    function mutateObject (obj) {
        obj.a.thing= true;
        return obj;
    }
    const obj = {
        a: {
            thing: false
        }
    };
    const clone = Object.assign({}, obj);
    let result = mutateObject(clone);
    console.log(result);
    ```

    合并对象

    ```javascript
    const o1 = { a: 1 };
    const o2 = { b: 2 };
    const o3 = { c: 3 };

    const obj = Object.assign(o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
    ```

    合并具有相同属性的对象

    ```javascript
    const o1 = { a: 1, b: 1, c: 1 };
    const o2 = { b: 2, c: 2 };
    const o3 = { c: 3 };

    const obj = Object.assign({}, o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    ```

2. `Object.create()` 使用指定的原型对象和属性创建一个新对象。

    语法： `Object.create(proto[, propertiesObject])`

    参数： `proto`： 新创建对象的原型对象； `propertiesObject`: 可选。如果没有指定为 `undefined`，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应`Object.defineProperties()`的第二个参数。

    返回值： 一个新对象，带着指定的原型对象和属性。

    如果`propertiesObject`参数是`null`或非原始包装对象，则抛出一个 `TypeError` 异常。

    例子：用 `Object.create`实现类式继承

    下面的例子演示了如何使用Object.create()来实现类式继承。这是一个所有版本JavaScript都支持的单继承。

    ```javascript
    // Shape - 父类(superclass)
    function Shape() {
    this.x = 0;
    this.y = 0;
    }

    // 父类的方法
    Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
    };

    // Rectangle - 子类(subclass)
    function Rectangle() {
    Shape.call(this); // call super constructor.
    }

    // 子类续承父类
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?',
    rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?',
    rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved.'
    ```

    如果你希望能继承到多个对象，则可以使用混入的方式。

    ```javascript
    function MyClass() {
        SuperClass.call(this);
        OtherSuperClass.call(this);
    }

    // 继承一个类
    MyClass.prototype = Object.create(SuperClass.prototype);
    // 混合其它
    Object.assign(MyClass.prototype, OtherSuperClass.prototype);
    // 重新指定constructor
    MyClass.prototype.constructor = MyClass;

    MyClass.prototype.myMethod = function() {
        // do a thing
    };
    ```

    `Object.assign` 会把  `OtherSuperClass`原型上的函数拷贝到 `MyClass`原型上，使 `MyClass` 的所有实例都可用 `OtherSuperClass` 的方法。`Object.assign` 是在 ES2015 引入的，且可用 `polyfilled`。要支持旧浏览器的话，可用使用 `jQuery.extend()` 或者 `_.assign()`。

    2. 修改属性

    如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。

    当试图改变不可配置属性（除了value和writable 属性之外）的值时会抛出TypeError，除非当前值和新值相同。

    **Writable 属性**
    当writable属性设置为false时，该属性被称为“不可写”。它不能被重新分配。

    ```javascript
    var o = {}; // Creates a new object

    Object.defineProperty(o, 'a', {
    value: 37,
    writable: false
    });

    console.log(o.a); // logs 37
    o.a = 25; // No error thrown
    // (it would throw in strict mode,
    // even if the value had been the same)
    console.log(o.a); // logs 37. The assignment didn't work.

    // strict mode
    (function() {
    'use strict';
    var o = {};
    Object.defineProperty(o, 'b', {
        value: 2,
        writable: false
    });
    o.b = 3; // throws TypeError: "b" is read-only
    return o.b; // returns 2 without the line above
    }());
    ```

    如示例所示，试图写入非可写属性不会改变它，也不会引发错误。

    **Enumerable 特性**

    enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

    ```javascript
    var o = {};
    Object.defineProperty(o, "a", { value : 1, enumerable:true });
    Object.defineProperty(o, "b", { value : 2, enumerable:false });
    Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
    o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

    for (var i in o) {    
    console.log(i);  
    }
    // 打印 'a' 和 'd' (in undefined order)

    Object.keys(o); // ["a", "d"]

    o.propertyIsEnumerable('a'); // true
    o.propertyIsEnumerable('b'); // false
    o.propertyIsEnumerable('c'); // false
    ```

    **Configurable 特性**

    configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改。

    ```javascript
    var o = {};
    Object.defineProperty(o, "a", { get : function(){return 1;}, 
                                    configurable : false } );

    // throws a TypeError
    Object.defineProperty(o, "a", {configurable : true}); 
    // throws a TypeError
    Object.defineProperty(o, "a", {enumerable : true}); 
    // throws a TypeError (set was undefined previously) 
    Object.defineProperty(o, "a", {set : function(){}}); 
    // throws a TypeError (even though the new get does exactly the same thing) 
    Object.defineProperty(o, "a", {get : function(){return 1;}});
    // throws a TypeError
    Object.defineProperty(o, "a", {value : 12});

    console.log(o.a); // logs 1
    delete o.a; // Nothing happens
    console.log(o.a); // logs 1
    ```

    如果o.a的configurable属性为true，则不会抛出任何错误，并且该属性将在最后被删除。

3. `Object.defineProperty()` 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

    语法： `Object.defineProperty(obj, prop, descriptor)`

    参数： `obj`： 要在其上定义属性的对象。 `prop`： 要定义或修改的属性的名称。 `descriptor`： 将被定义或修改的属性描述符。

    返回值： 被传递给函数的对象。

    例如：

    1. 创建属性

    如果对象中不存在指定的属性，Object.defineProperty()就创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。拥有布尔值的字段的默认值都是false。value，get和set字段的默认值为undefined。一个没有get/set/value/writable定义的属性被称为“通用的”，并被“键入”为一个数据描述符。

    ```javascript
    var o = {}; // 创建一个新对象

    // 在对象中添加一个属性与数据描述符的示例
    Object.defineProperty(o, "a", {
    value : 37,
    writable : true,
    enumerable : true,
    configurable : true
    });

    // 对象o拥有了属性a，值为37

    // 在对象中添加一个属性与存取描述符的示例
    var bValue;
    Object.defineProperty(o, "b", {
    get : function(){
        return bValue;
    },
    set : function(newValue){
        bValue = newValue;
    },
    enumerable : true,
    configurable : true
    });

    o.b = 38;
    // 对象o拥有了属性b，值为38

    // o.b的值现在总是与bValue相同，除非重新定义o.b

    // 数据描述符和存取描述符不能混合使用
    Object.defineProperty(o, "conflict", {
    value: 0x9f91102, 
    get: function() { 
        return 0xdeadbeef; 
    } 
    });
    // throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors
    ```
   
    3. 添加多个属性和默认值

    考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和Object.defineProperty()为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示。

    ```javascript
    var o = {};

    o.a = 1;
    // 等同于 :
    Object.defineProperty(o, "a", {
    value : 1,
    writable : true,
    configurable : true,
    enumerable : true
    });


    // 另一方面，
    Object.defineProperty(o, "a", { value : 1 });
    // 等同于 :
    Object.defineProperty(o, "a", {
    value : 1,
    writable : false,
    configurable : false,
    enumerable : false
    });
    ```

4. Object.freeze() 冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

    语法： Object.freeze(obj)

    参数： obj： 要被冻结的对象。

    返回值： 被冻结的对象。

    例子：

    1. 冻结对象

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

    2. 浅冻结对象

    ```javascript
    obj1 = {
       internal: {}
    };
    Object.freeze(obj1);
    obj1.internal.a = 'aValue';
    obj1.internal.a // 'aValue'
    ```

    3. 深冻结对象

    ``` javascript
    // 深冻结函数.
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

5. Object.is() 判断两个值是否是相同的值。

    语法： Object.is(value1, value2);
    
    参数： value1： 第一个需要比较的值。 value2： 第二个需要比较的值。

    返回值： 表示两个参数是否相同的布尔值 。

    描述：

    Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

    1. 两个值都是 undefined
    2. 两个值都是 null
    3. 两个值都是 true 或者都是 false
    4. 两个值是由相同个数的字符按照相同的顺序组成的字符串
    5. 两个值指向同一个对象
    6. 两个值都是数字并且
    7. 都是正零 +0
    8. 都是负零 -0
    9. 都是 NaN
    10. 都是除零和 NaN 外的其它同一个数字

    这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

    这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。

    例子：

    ```javascript
    Object.is('foo', 'foo');     // true
    Object.is(window, window);   // true

    Object.is('foo', 'bar');     // false
    Object.is([], []);           // false

    var foo = { a: 1 };
    var bar = { a: 1 };
    Object.is(foo, foo);         // true
    Object.is(foo, bar);         // false

    Object.is(null, null);       // true

    // 特例
    Object.is(0, -0);            // false
    Object.is(0, +0);            // true
    Object.is(-0, -0);           // true
    Object.is(NaN, 0/0);         // true
    ```
    