;(function(){
	
	//登录后新信息点击事件
	$(".loginOk").on("click",['.loginOk > span','.loginOk > i'],function(event){
		if (event.target.tagName == 'SPAN') {
			$(this).find("span div").stop(true).slideToggle('fast');
			$(this).find("i div").stop(true).hide();
		}else if(event.target.tagName == 'I'){
			$(this).find("span div").stop(true).hide();
			$(this).find("i div").stop(true).slideToggle('fast');

		}
		event.stopPropagation();//阻止冒泡
	});
	$("html,body").click(function(event){
		$(".loginOk > span div").slideUp('fast');
		$(".loginOk > i div").slideUp('fast');
	});

	//创业会员服务鼠标事件
	function nav(){

		var navLiSecond = ".navLiSecond";
		var navSeWrap = ".navSeWrap";
		var current = "current";

		$(navLiSecond).on("mouseenter mouseleave",function(event){
			if (event.type == "mouseenter") {
				$(this).find(navSeWrap).stop(true,true).slideDown(260);
			} else if (event.type == "mouseleave") {
				$(this).find(navSeWrap).stop(true,true).slideUp(260);
			};
		});
		$(navSeWrap).on("mouseenter mouseleave",function(event){
			if (event.type == "mouseenter") {
				$(this).parent(".navLiSecond").addClass(current);
				event.stopPropagation();//阻止冒泡
			} else if (event.type == "mouseleave") {
				$(this).parent(".navLiSecond").removeClass(current);
			};
		});
	}
	nav();

	//滚动滚动条,当然宽导航看不见时，显示窄导航
	$(window).scroll(function(){
		
		var topH;
		var headerFixd = $(".headerFixd").height()
		if ($(".photosrc").length > 0) {
			topH = 105 + $(".photosrc").height();
		} else{
			topH = 105;
		};
		if ($(document).scrollTop() > (topH-headerFixd)) {
			$('.headerFixd').fadeIn(200);
		}else{
			$('.headerFixd').fadeOut(100);
		}
	});

})(jQuery);
