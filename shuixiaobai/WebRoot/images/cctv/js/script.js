$(function(){
	
	//页面不足一屏，铺满一屏
	$('.layout').css('min-height',$(window).height());
	//动画
	new WOW().init();
	
	//tab切换
		$('.h-tabel .hd li').click(function(){
			$('.h-tabel .hd li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.h-tabel .bd ul').hide().eq($(this).index()).show();
			$('.h-join').hide().eq($(this).index()).show();
			return false;
		})
	
	
	
})
