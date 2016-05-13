# iScroll，纯js插件
iScroll插件解决fixed+input在ios下弹出软键盘出现的bug。

## Getting started

html结构:

```
    <header id="header"> </header>
    
    <!-- 可以滚动的区域 -->
    <main id="main">
        ...
    </main>
    
    <!-- fixed定位的底部 -->
    <footer id="footer"></footer>
```

css样式:

```
header, footer, main {
    display: block;
}
header, footer{
    background: red;
    z-index: 100;
}
header {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
}

footer {
    position: fixed;
    height: 34px;
    left: 0;
    right: 0;
    bottom: 0;
}

main {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    /* 使之可以滚动 */
    overflow-y: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
```

js调用: 

* 字符串

```
var myScroll = new Iscroll().init('#main');
```

*  dom元素

```
var myScroll = new Iscroll().init(document.querySelector('main'));
```

## Initialization

```
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">
    <meta charset="utf-8">
    <style>
        header, footer, main {
            display: block;
        }
        header, footer{
            background: red;
            z-index: 100;
        }
        header {
            position: fixed;
            height: 50px;
            left: 0;
            right: 0;
            top: 0;
        }

        footer {
            position: fixed;
            height: 34px;
            left: 0;
            right: 0;
            bottom: 0;
        }

        main {
            /* main绝对定位，进行内部滚动 */
            position: absolute;
            top: 50px;
            bottom: 34px;
            /* 使之可以滚动 */
            overflow-y: scroll;
            /* 增加该属性，可以增加弹性 */
            -webkit-overflow-scrolling: touch;
        }
    </style>
</head>
<body onload="loaded()">
    <!-- fixed定位的头部 -->
    <header id="header">
        
    </header>
    
    <!-- 可以滚动的区域 -->
    <main id="main">
        ...
    </main>
    
    <!-- fixed定位的底部 -->
    <footer id="footer">
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
    
</body>
<script src="iscroll.js"></script>
<script>
var myScroll ;
function loaded(){
    myScroll = new Iscroll().init('#main');
    myScroll.stopTouchmove(['#header', '#footer']);  //添加该语句，会获得更好的体验。
}
</script>

</html>

```

## Method

### scrollToElement(obj, time)

scrollToElement(obj, time) 平滑地滑动到某个元素。

| 值 | 描述 |
| ------------- | ------------- |
| obj | id名称`#id` 或 dom元素 |
| time | int。滚动时间，单位：毫秒 |

```
myScroll.scrollToElement(document.querySelector('#main p:last-child'),600);
```

### scrollTo(location)

scrollTo(location) 滑动到某个具体位置

| 值 | 描述 |
| ------------- | ------------- |
| location | int。某个位置 |

```
myScroll.scrollTo(600);
```

### stopTouchmove(obj)

stopTouchmove(obj) 禁止元素的touchmove，防止滚动在上面触发了部分浏览器全屏模式切换，而导致顶部地址栏和底部工具栏遮挡住 header 和 footer 元素。添加该方法，会获得更好的体验。

| 值 | 描述 |
| ------------- | ------------- |
| obj | 数组。格式：['#header', '#footer'] |


