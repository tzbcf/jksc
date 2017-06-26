/**
 * Created by Administrator on 2017/5/30.
 */
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

/*首页图片切换*/
window.onload = function(){
    fnTab_1();
};
function fnTab_1()
{
    var oTab=id("main").getElementsByClassName('tabPic')[0];
    var oList=id("main").getElementsByClassName('picList')[0];
    var aNav=oTab.getElementsByTagName("nav")[0].children;
    var iNow=0;
    var iX=0;
    var iW=view().w;
    var oTimer=0;
    var iStartTouchX=0;
    var iStartX=0;
    bind(oTab,"touchstart",fnStart);
    bind(oTab,"touchmove",fnMove);
    bind(oTab,"touchend",fnEnd);
    auto();
    function auto()
    {
        oTimer=setInterval(function(){
            iNow++;
            iNow=iNow%aNav.length;
            tab();
        },3000);
    }
    function fnStart(ev)
    {
        oList.style.transition="none";
        ev=ev.changedTouches[0];
        iStartTouchX=ev.pageX;
        iStartX=iX;
        clearInterval(oTimer);
    }
    function fnMove(ev)
    {
        ev=ev.changedTouches[0];
        var iDis=ev.pageX-iStartTouchX;
        iX=iStartX+iDis;
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
    }
    function fnEnd()
    {
        iNow=iX/iW;
        iNow=-Math.round(iNow);
        if(iNow<0)
        {
            iNow=0;
        }
        if(iNow>aNav.length-1)
        {
            iNow=aNav.length-1;
        }
        tab();
        auto();
    }
    function tab()
    {
        iX=-iNow*iW;
        oList.style.transition="0.5s";
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
        for(var i=0;i<aNav.length;i++)
        {
            removeClass(aNav[i],"active");
        }
        addClass(aNav[iNow],"active");
    }
}

/*图片滑动*/

/*
function fnSlide()
{
    var oTab=id("main").getElementsByClassName('index_new')[0];
    var oList=oTab.getElementsByTagName('ul')[0];
    var iX=0;
    var iStartTouchX=0;
    var iW=view().w;
    var iStartX=0;
    var slideAll=0;
    var iDis=0;
    var iLeft=0;
    bind(oTab,"touchstart",fnStart);
    bind(oTab,"touchmove",fnMove);
    bind(oTab,"touchend",fnEnd);

    function fnStart(ev)
    {
        ev=ev.changedTouches[0];
        iStartTouchX=ev.pageX;
        iStartX=iX;
        iLeft=oList.offsetLeft;

    }
    function fnMove(ev)
    {
        ev=ev.changedTouches[0];
        iDis=ev.pageX-iStartTouchX;
        iX=(iStartX+iDis)*0.8;
        if(){}
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
    }
    function fnEnd()
    {
        slideAll+=iDis;
        if(slideAll>=0){
            oList.style.transition="0.5s";
            oList.style.WebkitTransform=oList.style.transform="translateX(0px)";
        }else if(slideAll<=-iW){
            oList.style.transition="0.5s";
            oList.style.WebkitTransform=oList.style.transform="translateX("+(-iW)+"px)";
        }else{
            return 0;
        }
    }

}
*/

/*物品详情页图片切换*/

function wpxqfnTab(){
    var oTab=id("main").getElementsByClassName('wpxq_tabPic')[0];
    var oList=id("main").getElementsByClassName('wpxq_picList')[0];
    var aNav=oTab.getElementsByTagName("nav")[0].children;
    var iNow=0;
    var iX=0;
    var iW=view().w;
    var iStartTouchX=0;
    var iStartX=0;
    bind(oTab,"touchstart",fnStart);
    bind(oTab,"touchmove",fnMove);
    bind(oTab,"touchend",fnEnd);
    function fnStart(ev)
    {
        oList.style.transition="none";
        ev=ev.changedTouches[0];
        iStartTouchX=ev.pageX;
        iStartX=iX;
    }
    function fnMove(ev)
    {
        ev=ev.changedTouches[0];
        var iDis=ev.pageX-iStartTouchX;
        iX=iStartX+iDis;
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
    }
    function fnEnd()
    {
        iNow=iX/iW;
        iNow=-Math.round(iNow);
        if(iNow<0)
        {
            iNow=0;
        }
        if(iNow>aNav.length-1)
        {
            iNow=aNav.length-1;
        }
        tab();
    }
    function tab()
    {
        iX=-iNow*iW;
        oList.style.transition="0.5s";
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
        for(var i=0;i<aNav.length;i++)
        {
            removeClass(aNav[i],"active");
        }
        addClass(aNav[iNow],"active");
    }
}


/*全部商品切换*/
$(function(){
    var This_index1;
    $('.fl_goods .left ').find('li').on('touchend',function(){
        This_index1=$(this).index('li');
        $('.fl_goods .left ').find('a').removeClass('choose').eq(This_index1).addClass('choose');
        $('.fl_goods .right').find('ul').css('display','none').eq(This_index1).css('display','block');
    });

     var iHeight=$('#main').css('height');
    $('.left').css('height',iHeight);
    $('.right').css('height',iHeight);
});

/*购物车全选删除按钮*/
$(function(){
    var oButton=true;
    var This_index2;
    $('.gou').on('touchstart',function(){
        This_index2=$(this).index('.gou');
        if(oButton){
            $('.gou').eq(This_index2).attr('src','img/gwc_gou.png');
            oButton=false;
            gwcExcel();
        }else{
            $('.gou').eq(This_index2).attr('src','img/gwc_none.png');
            oButton=true;
            gwcExcel();
        }

    });

    $('.gwc_all img').on('touchstart',function(){
        if(oButton){
            oButton=false;
            $('.gwc_all img').attr('src','img/gwc_gou.png');
            $('.gou').attr('src','img/gwc_gou.png');
        }else{
            oButton=true;
            $('.gwc_all img').attr('src','img/gwc_none.png');
            $('.gou').attr('src','img/gwc_none.png');
        }
        gwcExcel();
    });

    $('.gwc_remove').on('touchstart',function(){
        $(this).parent().remove();
        gwcExcel();
    });

    /*购物车编辑完成状态切换*/
    $('.person_share').on('touchstart',function(){
        if(oButton){
            oButton=false;
            $('.person_share').html('编辑');
            $('.gwc_remove').hide();
            $('.gwc_edit').show();
            $('.produce p b').hide();
            $('.produce').css('width','64%');
            gwcExcel();
        }else{
            oButton=true;
            $('.person_share').html('完成');
            $('.gwc_remove').show();
            $('.gwc_edit').hide();
            $('.produce p b').show();
            $('.produce').css('width','55%');
            gwcExcel();
        }
    });
    /*购物车编辑数量*/
    var numArr=[];
    var num=0;
   $('.gwc_edit b').each(function(i){
       if($('.gwc_edit b').eq(i).html()==1){
           $('.gwc_edit b').eq(i).html('1');
           $('.reduce').eq(i).css('background','#cccccc');
       }else{
           $('.reduce').eq(i).css('background','#45BDB4');
       }
       numArr.push($('.gwc_edit b').eq(i).html());
    });

    $('.reduce').on('touchstart',function(){
        var This_index4;
        This_index4=$(this).index('.reduce');
        num=$('.gwc_edit b').eq(This_index4).html();
        num--;
        if(num==0){
            num=1;
        }else if(num==1){
            $('.reduce').eq(This_index4).css('background','#cccccc');
        }
        $('.gwc_edit b').eq(This_index4).html(num);
        $('.produce b').eq(This_index4).html('x'+num);
        gwcExcel();
    });

    $('.plus').on('touchstart',function(){
        var This_index5;
        This_index5=$(this).index('.plus');
        num=$('.gwc_edit b').eq(This_index5).html();
        num++;
            $('.reduce').eq(This_index5).css('background','#45BDB4');
            $('.gwc_edit b').eq(This_index5).html(num);
            $('.produce b').eq(This_index5).html('x'+num);
            gwcExcel();
    });
    /*总额变化*/
    gwcExcel();
    function gwcExcel(){
        var ArrNum=[];
        var ArrPrice=[];
        var All=0;
        var turnOn=true;
        $('.produce b').each(function(i){
            if($('.gou').eq(i).attr('src').indexOf('gou')>0){
                ArrNum.push($('.gwc_edit b').eq(i).html());
                ArrPrice.push($('.produce em').eq(i).html());
                if(turnOn){
                        turnOn=false;
                        All=All+5;
                }
            }
        });
        for(var n=0;n<ArrNum.length;n++){
            All+=ArrNum[n]*ArrPrice[n];
        }
        All = Number(All).toFixed(2);
        $('.money em').html('¥'+All);
    }
});


/*特惠区tab切换*/
$(function(){
    var This_index3;
    $('.thq_tab').find('li').on('touchstart',function(){
        This_index3=$(this).index('li')/2;
        $('.thq_tab').find('a').removeClass('checked').eq(This_index3).addClass('checked');
        $('.favorable').find('ul').css('display','none').eq(This_index3).css('display','block');
    });
});

/*管理收货地址*/
$(function(){
    var This_manage;
   $('.adress_manage li').on('touchend',function(){
       This_manage=$(this).index('li');
       $('.adress_manage li').find('i').removeClass('clickOn').eq(This_manage).addClass('clickOn');
       $('.adress_manage li').find('em').hide().eq(This_manage).show();
   });
    $('.adress li').on('touchend',function(){
     var This_adress=$(this).index('li');
        $('.adress li').find('i').show().eq(This_adress).hide();
        $('.adress li').find('em').hide().eq(This_adress).show();
    });

});

/*订单状态切换*/
$(function(){
    var order_index;
    $('.order_tab').find('li').on('touchstart',function(){
        order_index=$(this).index('li');
        $('.order_tab').find('a').removeClass('checked').eq(order_index).addClass('checked');
        $('.orderTab').hide().eq(order_index).show();
    });
});

/*我的收藏 编辑*/
$(function(){
   var collectButton=true;
    var collectIndex;
    collectNum();
    $('.collect_write').on('touchstart',function(){
        if(collectButton){
            $('.collect_write').html('完成');
            $('.collect_remove').show();
            $('.collect_store').find('.store_inform').css('width','68%');
            collectButton=false;
        }else{
            $('.collect_write').html('编辑');
            $('.collect_remove').hide();
            $('.collect_store').find('.store_inform').css('width','73%');
            collectButton=true;
        }
    });

    $('.collect_remove').on('touchend',function(){
        collectIndex = $(this).index('.collect_remove');
        $('.collect_store').find('dd').eq(collectIndex).remove();
        collectNum();
    })
    function collectNum(){
        var collectLen1=0;
        var collectLen2=0;
        collectLen1=$('.collect_store').eq(0).find('dd').length;
        collectLen2=$('.collect_store').eq(1).find('dd').length;
        $('.collect').eq(0).find('em').html('('+collectLen1+')');
        $('.collect').eq(1).find('em').html('('+collectLen2+')');
    }
});

/*物品列表tab*/
$(function(){
    var rank_index;
    $('.rank span').on('touchstart',function(){
        rank_index=$(this).index('span')-1;
        $('.rank').find('span').removeClass('rankChecked').eq(rank_index).addClass('rankChecked');
        $('.rank_goods').hide().eq(rank_index).show();
    });
});

/*支付选择*/
$(function(){
    var pay_index=0;
    $('.pay_choose ul li').on('touchend',function() {
        pay_index = $(this).index('li');
        $('.pay_choose').find('img').attr('src', 'img/gwc_none.png').eq(pay_index).attr('src', 'img/gwc_gou.png');
    });
});
