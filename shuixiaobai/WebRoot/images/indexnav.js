//首页导航
function navMouse(){

	//创建鼠标事件开关
	var bBut = true;
	//事件对像
	var navLi = $('.navLeWrap ul > li');
	//列表包裹对像
	var navUl = $('.navLeWrap ul');
	//导航外层包裹对像
	var indexNav = $('.indexNav');
    //所有右边内容层
	var navCRi = $('.navConRi');
	//一个右边内容层
	var riWrapCont = $('.navRiWrap > .navConRi');
	//当前状态的类名
	var current = 'current';
	//右侧内容关闭按钮
	var colose = $('.colose');
	//动画动动时间
	var moveTime = 300;
	//暂停时间
	var stopTime = 300;


	//首页导航鼠标的处理事件
	navLi.on("mouseenter mouseleave",function(event){

		var _this = $(this).index();
		var objNext = $(this).parents(".navLeWrap").next(".navRiWrap").children(".navConRi").eq(_this).fadeTo(0,1).stop();

		if (event.type == "mouseenter") {

			if (bBut) {

				objNext.animate({'width':'270px'},moveTime).siblings().stop().animate({'width':'0px'},stopTime);
			} else{
				objNext.animate({'width':'270px'},0).siblings().stop().animate({'width':'0px'},0);
			};
			bBut = false;
			$(this).addClass(current);

		}else if (event.type == "mouseleave") {
			$(this).removeClass(current);
			objNext.animate({'width':'270px'},moveTime).siblings().stop().animate({'width':'0px'},stopTime);
		};
	});

	//当鼠标离开列表ul时,还原运动状态
	indexNav.on("mouseleave",function(){
		bBut = true;
	});
	//当鼠标离开导航外层时，右侧内容隐藏
	indexNav.on("mouseleave",function(){
		navCRi.stop().animate({'width':'0px'},stopTime);
	});
	//给左边列表添加样式
	riWrapCont.on("mouseenter mouseleave",function(event){

		var that = $(this).index();
		var objPrev = $(this).parent(".navRiWrap").prev(".navLeWrap").find("li");

		if (event.type == "mouseenter") {
			objPrev.eq(that).addClass(current);
		} else if (event.type == "mouseleave"){
			objPrev.removeClass(current);
		};
	});
	//点击关闭右边内容层
	colose.on("click",function(){
		$(this).parent().hide();
	});

}
$(function(){
	//通过问律师可以帮你解答什么问题？鼠标事件
	$(".index-2-1 li").mouseover(function(){
		var _this = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".index-2-2 > div").eq(_this).addClass("current").siblings().removeClass("current");
	});
	$(".evlauteMy span").on("mouseenter mouseleave",function(event){
		if (event.type == "mouseenter") {
			$(this).addClass("active").siblings().removeClass("active");
		}
	});

	//首页导航
	navMouse();
});