function SherryPage(nomal){
    try{
        if(Zepto){
            $(document).on('swipeUp',function(){slide(0)}).on('swipeDown',function(){slide(1)})
        }

    }catch (e){}

    function gc(a){
        return document.getElementsByClassName(a)
    }

    window.addEventListener("touchmove",function(e){
        e.preventDefault();  //不能滑屏
        return false;       //地址栏不上移
    });

    //z用于检查 是否有最后一个side
    //x用于检查 是否是从最后的x向上滑到倒数第一个整屏；
    var z=false;
    var x=false;
    var y=true;
    var wh=window.innerHeight;
try{
    var footer=gc('side')[0];
}catch (e){}
    if(footer){
        z=true;
        var bt=Math.ceil(wh/4);
        footer.style.height=bt+'px';
    }


    var full=gc('full');
    var box=gc('box')[0];
    var worm=gc('worm')[0];

    box.style.position='relative';
    box.style.overflow='hidden';
    worm.style.position='absolute';
    worm.style.top=0;
    worm.style.width=window.innerWidth+'px';

    var n=full.length;
    function firstSet(){
        for(var i=0;i<full.length;i++){
            full[i].style.height=wh+'px';
        }
        box.style.height=wh+'px';
        worm.style.width=window.innerWidth+'px';
    }
    firstSet();
    var flag3=true;

//
    window.onresize=function(){
        wh=window.innerHeight;
        firstSet();
        setScrollTop();

    };


    var checkNumber;
    function checkNum(){
        //var sc=document.body.scrollTop||document.documentElement.scrollTop;
        var sc=Math.abs(worm.offsetTop);
        checkNumber=sc/wh;
           console.log(sc,checkNumber);
        return checkNumber+1
    }


//在浏览器窗口大小变换时 依然显示当前屏 解决错屏问题
    function setScrollTop(){
        worm.style.top=-wh*checkNumber+'px';
    }







    onn();


    //go有2个参数 分别是target给1000就是往下滑动1个图给-1000就是往上滑动一个图  给其他是自定义目标位置 速度 回调函数
    //    go(window.innerHeight,8);
    function go(t,fn2){
       if(flag3){
           flag3=false;
           var flagCheck=false;
           if(t==1000||t==-1000){
               if(t==1000){
//            往下滑
                   var target=(checkNumber+1)*wh;

               }else{
//            往上滑
                   target=(checkNumber-1)*wh
               }
               flagCheck=true
           }
           else if(t==bt){
               target=bt+(n-1)*wh;
               x=true;
               flagCheck=true
           }else if(t<n){
                   target=t*wh;
                   flagCheck=true
           }

//        var target=window.innerHeight;
//
           if(flagCheck){
               of();
               clearInterval(timer);
               var timer=setInterval(function(){
                   //var sTop=document.body.scrollTop||document.documentElement.scrollTop;
                   var sTop=Math.abs(worm.offsetTop);
                   var speed=(target-sTop)/6;
                   speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
                   if(sTop==target){
                       clearInterval(timer);
                       checkNum();
                       onn();
                       if(fn2){
                           fn2()
                       }
                       if(nomal){
                           nomal()
                       }
                       flag3=true;
                   }else{
                       worm.style.top=-(Math.abs(worm.offsetTop)+speed)+'px';
                       //document.body.scrollTop=document.body.scrollTop+speed;
                       //document.documentElement.scrollTop=document.documentElement.scrollTop+speed;
                   }
               },15)
           }
       }
    }


    function scrollFunc(e) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                slide(1)
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                slide(0)
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0) { //当滑轮向下滚动时
                slide(0);
            }
            if (e.detail< 0) { //当滑轮向上滚动时
                slide(1)
            }
        }
    }

//设定绑定和解除事件 为了解决在滑屏过程中如果再次滑屏屏幕就疯了的问题
    function onn(){
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {//firefox
            document.addEventListener('DOMMouseScroll', scrollFunc);
        }
        document.onmousewheel = scrollFunc;   //ie 谷歌
    }
    function of(){
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {//firefox
            document.removeEventListener('DOMMouseScroll', scrollFunc);
        }
        document.onmousewheel = null;   //ie 谷歌
    }

    //引入对Zepto支持




// 滑动事件 参数a>0代表向上滚动 a<0代表向下滚动
    function slide(a){
        checkNum();
        //var c=Math.ceil(checkNumber);
        checkNumber=Math.floor(checkNumber);
        if(a){
        //alert('up');
            if(checkNumber&&x){
                x=false;
                go(n-1);

            }else if(checkNumber){
                go(-1000)
            }
            y=true;
        }else{
        //alert('down');
            if(checkNumber<n-1){
                //alert(c);
                //alert(n);
                go(1000);

            }else if(z&&checkNumber==n-1&&y){
                y=false;
                go(bt)
            }
        }
    }
    return {"go":go,"num":checkNum}
}
