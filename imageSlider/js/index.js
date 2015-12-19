$(window).on("load", function () {
    waterfall();
    addAnimate();
    var dataInt= {'data':[
        {'src':'1.jpg'},
        {'src':'2.jpg'},
        {'src':'3.jpg'},
        {'src':'4.jpg'}
    ]};
    window.onscroll = function () {
        if(checkscrollside()){
            $.each(dataInt.data, function (index,value) {
                var $oPin = $('<div>').addClass('pin').appendTo($("#main"));
                var $oBox = $('<div>').addClass('box').appendTo($oPin);
                $('<img>').attr('src','./images/'+$(value).attr('src')).appendTo($oBox);
            });
            waterfall();
            addAnimate();
        }
    }
});

function waterfall(){
    var $aPin = $("#main>div");
    var iPinW = $aPin.eq(0).width(); //一个块的宽度
    var num = Math.floor($(window).width()/iPinW);//每行中能容纳多少张照片
    $("#main").css({
        'width':iPinW*num,
        'margin':'0 auto'
    });
    var pinHArr = [];// 用于存储每列中的所有块相加的高度

    $aPin.each(function(index,value){
        var pinH = $aPin.eq(index).height();
        if(index < num){
            pinHArr[index] = pinH; //将第一行中的num个框的高度先添加进数组
        }else{
            var minH = Math.min.apply(null,pinHArr); //数组pinHArr中的最小值
            var minHIndex = $.inArray(minH , pinHArr); //确定这个最小值在数组中的位置
            $(value).css({
                'position' : 'absolute',
                'top' : minH + 15,
                'left' : $aPin.eq(minHIndex).position().left
            });
            pinHArr[minHIndex] += $aPin.eq(index).height()+15; //更新添加了块之后列高
        }
    })
}

function checkscrollside(){
    var $aPin = $("#main>div");
    var lastPinH = $aPin.last().get(0).offsetTop+Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $(window).scrollTop();
    var documentH = $(document).height();
    return (lastPinH<scrollTop+documentH)?true:false;
}

function addAnimate(){
    var $aPin = $("#main>div>div");
    $.each($aPin, function (index, value) {
        value.onmouseover = function () {
            $(value).css({
                "-webkit-transform":"translateZ(300px)",
                "z-index" : 100
            });
        };
        value.onmouseout = function () {
            $(value).css("-webkit-transform","translateZ(0px)")
        }
    })

}