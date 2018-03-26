$(function(){

		//评价我们的声音鼠标事件
		$(".evlauteMy span").mouseover(function(){
			var _this = $(this).index();
 			$(this).addClass("current").siblings().removeClass("current");
 			$(this).parent(".evlauteMy").siblings(".evlautCont").find("div").eq(_this).fadeIn(20).siblings().fadeOut(20);
		});

		//首屏banner效果图
		var ali=$('#lunbonum li');
	    var aPage=$('#lunhuanback p');
	    var aslide_img=$('.lunhuancenter > div');
	    var iNow=0;
		
	    ali.each(function(index){	
	        $(this).click(function(){
	            slide(index);
	        })
	    });
		
	    function slide(index){	
	        iNow=index;
	        ali.eq(index).addClass('lunboone').siblings().removeClass();
			aPage.eq(index).siblings().stop().animate({opacity:0},1000);
			aPage.eq(index).stop().animate({opacity:1},1000);	
	        aslide_img.eq(index).show().siblings('div').hide();
	    }
		
		function autoRun(){	
	        iNow++;
			if(iNow==ali.length){
				iNow=0;
			}
			slide(iNow);
		}
		
		var timer=setInterval(autoRun,5000);
			
	    ali.hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(autoRun,5000);
	    });
	});