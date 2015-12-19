function a(callback){
    console.log("我是主函数a")
    callback();
}
function b(){
    console.log("我是回调函数b");
}
function c(){
    console.log("我是回调函数c")
}

a(b); //输出 "我是主函数a" "我是回调函数b"
a(c); //输出 "我是主函数a" "我是回调函数c"