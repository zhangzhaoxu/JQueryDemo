title: JQuery基础
speaker: 杭电助手 - 张照煦
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# JQuery基础
## 演讲者：张照煦

[slide]

# Jquery简介
JQuery是JavaScript的函数库，支持HTML元素的选取和操作，css操作，js特效与动画，dom处理，ajax等,
通过做一个简单的图片瀑布流来展示JQuery的用法,最后来简单的介绍一下JQuery是如何实现的.

[slide style="background-image:url('/img/bg1.png')"]

## JQuery元素选取与操作
常用的几种选择器:
```javascript
$("#domID")
$("p")
$(".class")

$("p:first")
$("p:last")
....
```
[GO](http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)
JQuery元素选择器几乎涵盖了所有你想要的元素选泽方式！
[slide]
## JQuery元素选择器的性能问题
### 1.总是从#id选择器来继承
这是JQuery选择器的一条黄金法则。JQuery选择一个元素最快的方法就是用ID来选择了
```javascript
$("#content").hide();
```
或者从ID选择器继承来选择多个元素：
```javascript
$("#content p").hide();
```
### 2.在class前面使用tag
JQuery中的第二快的选择器就是tag选择器(**$("head")**),因为它直接来自于原声JavaScript的**getElementByTagName()**方法。所以最好用tag来修饰class(并且不要忘了就近的ID)
```javascript
$("input.myClass");
$("#myID input.class");
```
[slide]
JQuery中**class**选择器是最慢的，在IE浏览器下它会遍历所有的dom节点。尽量避免使用class选择器。也不要用tag来修饰ID。下面的例子会遍历所有的div元素来查找id为content的那个节点：
```javascript
$("div #content");
```
不要用，画蛇添足，很慢，另外也不要用ID来修饰ID，这样也是画蛇添足
```javascript
$("#id #id")
```
----
[slide]
### 使用子查询
将父对象缓存起来以备将来使用
```javascript
var header = $("#header");
var menu = header.find(".menu");
var menu = $(".menu",header);
```
### 使用JQuery强大的链式操作
采用JQuery链式操作比缓存选择器更有效
```javascript
$('li.menu-item').click(function () {
    alert("click")
}).css('display','block')
  .css('color','red')
  .fadeTo(2,0.7);
```
[slide]
# JQuery事件
先看一个最基本的JS写法：
```javascript
document.getElementById("myID").addEventListener("click",function(){
    alert("success");
});
```
JQuery帮给我们封装好了就简便多了:
```javascript
$("#myID").bind({
    click : function(){},
    mouseover : function(){},
    mouserout : function(){}
});
```
[slide]
## JQuery效果
JQuery内置了很多动画效果，虽然我几乎没用过，简单的介绍一下：
### 隐藏与显示
```javascript
hide(speed,callback)   //隐藏一个元素，speed为slow,fast或毫秒
show(speed,callback)   //显示一个元素
toggle(speed,callack)  //让元素在隐藏与显示之间切换
```
### 淡入淡出
```javascript
fadeIn(speed,callback)             //设置隐藏元素淡入
fadeOut(speed,callback)            //设置显示元素淡出
fadeToggle(speed,callback)         //设置元素自动切换淡入淡出
fadeTo(speed,opacity,callback)     //设置元素渐变为给定的不透明度，值在0-1间
```
[slide]
### 滑入滑出
```javascript
slideDown()
slideUp()
slideToggle()
```

### 动画
animate({params},speed,callback) 设置动画，参数设置形成动画的CSS属性，其中可以设置多个属性。
jQuery提供针对动画的队列功能，对于编写的多个animate调用，jQuery会创建包含这些方法调用的内容队列，然后逐一执行。
<br/>
示例1：
```javascript
div.animate({left:'100px'},"slow");
```
示例2：
```javascript
$("button").click(function(){
      $("div").animate({
      height:'+=150px',
      width:'+=150px'
    },slow);
});
```
stop(all,toEnd)  用于停止相应的变化。all表示清除动画队列，默认为FALSE，toEnd规定是否完成当前动画，默认为False。
[slide]
## JQuery操作html
### 1.获取与设置元素相关文本与属性
```javascript
text()      //获取或设置选择元素的文本，会将其中的html标签删除，当无参数时为获取，有参数时为设置
html()      //获取或设置选择元素的文本，可以包含html标签
val()       //获取或设置表单字段的值
attr(key)   //获取指定属性的值。可以一次设置多个值。放到一个json对象中即可。
```
上面4个函数，也可以传递一个函数来进行新值的设定，回调函数有两个参数，选定元素在当前选择集合中的索引下标，以及旧值。新值通过函数返回值返回。示例：
```javascript
$("button").click(function(){
  $("#img").attr("src", function(i,oldValue){
    console.log(i,oldValue);
    return "2.jpg";
  });
});
```
[slide]
## 添加
```javascript
append(str)  //在被选中元素结尾插入内容，块内插入。
after(str)   //在被选中元素后插入内容，块外插入。
prepend(str) //在被选中元素头前插入内容，块内插入。
before(str)  //在被选中元素前插入内容，块外插入。
```
示例：
```javascript
$("#ulCon").append("<li>新插入的元素</li>");
```
## 删除
```javascript
remove()   //删除被选元素及子元素，允许接收一个选择器，进行过滤删除
empty()    //删除被选元素的子元素
```
示例：
```javascript
$("div").remove(".italic");
```
[slide]
## 操作类
```javascript
addClass()     向选中元素添加类，可多个
removeClass()  从选中元素删除类，可多个
toggleClass()  对被中元素进行添加/删除类的切换操作
```
示例：
```javascript
$("button").click(function(){
  $("h1,h2,p").toggleClass("blue");
});
```
[slide]
## css()方法
```javascript
css(key)         //获取选择元素的指定css属性
css(key,value)   //设置选择元素指定的css属性，可多个
$("p").css({"background-color":"yellow","font-size":"200%"});
```
[slide]
## JQuery for Ajax
### 基本js实现的ajax
```javascript
var xmlHttp;
if(window.XMLHttpRequest()){
    xmlHttp = new XMLHttpRequest();
}else{
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        document.getElementById("myDiv").innerHTML = xmlHttp.responseText;
    }
}
xmlHttp.open("GET","test1.txt",true);
xmlHttp.send();
```
准备状态有5个值，分别为 0:请求未初始化，1：服务器已经连接 2：请求已接收 3：请求处理中 4：请求已经完成响应就绪
[slide]
### JQuery实现ajax
```javascript
$(selector).load(URL,data,callback);  //用于异步加载数据，可设置回调函数，callback(resp,status,xhr)
$.get(url,callback)       //用于异步发送get请求，回调函数：callback(data,status)
$.post(url,data,callback)  //用于异步发送post请求，回调函数：callback(data,status)
$.ajax({
    type: '',
    url: '',
    data: '',
    success: function(data){},
    error:function(err,data){}
})
```
示例:
```javascript
$.ajax({
    type : 'get',
    url : '/user/test',
    data : {
        name : 'Tom',
        password : '4474'
    },
    success: function(data){
        console.log(data);
    },
    error: function(err,data){
        console.log(err+" "+data);
    }
})
```
[slide]
## github : [github.com/zhangzhaoxu](https//:github.com/zhangzhaoxu)
## 个人博客 : [zhangzhaoxu.github.io](https//:zhangzhaoxu.github.io)





