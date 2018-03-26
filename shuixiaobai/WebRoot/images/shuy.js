$(".dweixin").hover(
function () {
	
	var obj = $(this).find(".dzweixin");
	
	obj.show();
	

},
function () {
	
	var obj = $(this).find(".dzweixin");
	
	obj.hide();

}
);


	function qhuan(a){ 
			
			$(".jz").removeClass("cur");
			$("#j_"+a).addClass("cur");
			
			$(".student_voice").hide();
			
			
			$("#st_"+a).show();
			
			}
			
            function upImg(){
				iThis = Number($('.this_place').val());
				iImgNum = $('.dtudent_list li').length;
			
				if(iThis == 1){
					$(".dtudent_list li:eq("+(iImgNum - 3)+")").css('left','-160px');
				}else{
					$(".dtudent_list li:eq("+(iThis - 3)+")").css('left','-160px');
				}
				if(iThis == 1){
					$(".dtudent_list li:eq("+(iThis)+")").children('.img').children('img').animate({height:'100px',width:'100px'});
					$(".dtudent_list li:eq("+(iThis)+")").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
					//$(".dtudent_list li:eq("+(iThis)+")").animate({height:'100px',width:'100px'});
					
					iThis = iImgNum;
					
					
					$(".dtudent_list li:eq(2)").children('.img').children('img').animate({height:'160px',width:'160px'});
					$(".dtudent_list li:eq(2)").children('.img').animate({height:'160px',width:'160px',marginTop:'-30px'});
					//$(".dtudent_list li:eq(0)").animate({height:'160px',width:'160px'});
				}else{
					if(iImgNum == iThis){
						//alert(1);
						
						$(".dtudent_list li:eq(2)").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq(2)").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						
						$(".dtudent_list li:eq(0)").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq(0)").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						//$(".dtudent_list li:eq(0)").animate({height:'100px',width:'100px'});

					}else{
						$(".dtudent_list li:eq("+iThis+")").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq("+iThis+")").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						//$(".dtudent_list li:eq("+iThis+")").animate({height:'100px',width:'100px'});

					}
											
					iThis --;
					
					$(".dtudent_list li:eq("+iThis+")").children('.img').children('img').animate({height:'160px',width:'160px'});
					$(".dtudent_list li:eq("+iThis+")").children('.img').animate({height:'160px',width:'160px',marginTop:'-30px'});
					//$(".dtudent_list li:eq("+iThis+")").animate({height:'160px',width:'160px'});
				}
				$(".dtudent_list li").find('.student_info').hide('slow');
				setTimeout(function(){
					$(".dtudent_list li").each(function(index, element) {
						if((iThis - 4) <= index && (iThis + 3) >= index){
							
							
							$(element).show();
						}else{
						
							$(element).hide();
						}
						if((iImgNum - iThis) < 6 && (2 - (iImgNum - iThis)) >= index && (2 - (iImgNum - iThis)) >= 0){
							$(element).show();
						}
						if(iThis==1 && index==4){
							iLeft = 0;	
						
						}else if(iImgNum == iThis && index == 0){
							iLeft = 0;
						}else if(iImgNum == iThis && index == 1){
							iLeft = 164;
						}else if(iImgNum == iThis && index == 2){
							iLeft = 324;
						}else if(iImgNum == iThis && index == 3){
							iLeft = 552;
						}else if(iImgNum == iThis && index == 4){
							iLeft = 716;
						}
						
						else if(index <= iThis){
							if((index - iThis + 2) < 0){
								iLeft = (iImgNum + (index - iThis + 2)) * 160 + 64;
							}else{
								iLeft = (index - iThis + 2) * 160;
							}
						}else{
							iLeft = (index - iThis + 2) * 160 + 64;
						}
						//alert(index,iLeft);
						
						$(element).animate({left:iLeft+'px'});
						
						if(iThis == iImgNum){
							setTimeout(function(){$(".dtudent_list li:eq(2)").find('.student_info').show()},500);
						}else if( index == iThis){
							setTimeout(function(){$(element).find('.student_info').show()},500);
						}
						
					});
					
				},500);
				if(iImgNum < iThis){
					iThis = 1;
				}
				$('.this_place').val(iThis);
				if(iThis <= iImgNum){
				}
				
			}
            function nextImg(){
				iThis = Number($('.this_place').val());
				iImgNum = $('.dtudent_list li').length;
			if(iThis <= iImgNum){
				
			
					
					
					
					if(iThis == iImgNum){
						
						$(".dtudent_list li:eq(0)").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq(0)").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						//$(".dtudent_list li:eq(0)").animate({height:'100px',width:'100px'});
						
						iThis ++;
					
						
						$(".dtudent_list li:eq(1)").children('.img').children('img').animate({height:'160px',width:'160px'});
						$(".dtudent_list li:eq(1)").children('.img').animate({height:'160px',width:'160px',marginTop:'-30px'});
						//$(".dtudent_list li:eq(1)").animate({height:'160px',width:'160px'});
						
						$(".dtudent_list li:eq(2)").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq(2)").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						
					}else{
						$(".dtudent_list li:eq("+iThis+")").children('.img').children('img').animate({height:'100px',width:'100px'});
						$(".dtudent_list li:eq("+iThis+")").children('.img').animate({height:'100px',width:'100px',marginTop:'0'});
						//$(".dtudent_list li:eq("+iThis+")").animate({height:'100px',width:'100px'});
						
						iThis ++;
						if(iThis == iImgNum){
							
						//alert(iImgNum);
							$(".dtudent_list li:eq(0)").children('.img').children('img').animate({height:'160px',width:'160px'});
							$(".dtudent_list li:eq(0)").children('.img').animate({height:'160px',width:'160px',marginTop:'-30px'});
							//$(".dtudent_list li:eq(0)").animate({height:'160px',width:'160px'});
							
							
						}else{
							$(".dtudent_list li:eq("+iThis+")").children('.img').children('img').animate({height:'160px',width:'160px'});
							$(".dtudent_list li:eq("+iThis+")").children('.img').animate({height:'160px',width:'160px',marginTop:'-30px'});
							//$(".dtudent_list li:eq("+iThis+")").animate({height:'160px',width:'160px'});
						}
					}
					$(".dtudent_list li").find('.student_info').hide('slow');
					setTimeout(function(){
						$(".dtudent_list li").each(function(index, element) {
							if((iThis - 5) <= index && (iThis + 4) >= index){
								$(element).show();
							}else{
								//alert(index);
								$(element).hide();
							}
							if((iImgNum - iThis) <6 && (2 - (iImgNum - iThis)) >= index && (2 - (iImgNum - iThis)) >= 0){
								$(element).show();
							}
							
				 if(iThis==1 && index == 0){
						iLeft = 552;		
						}else				
							
				 if(iThis==1 && index == 1){
						iLeft = 324;		
						}else			
							
				 if(iThis==1 && index == 3){
						iLeft = 716;		
						}else			
				 if(iThis==1 && index == 2){
						iLeft = 164;		
						}else			
							
				 if(iThis==1 && index == 4){
						iLeft = 0;		
						}else if(iImgNum == iThis && index == 2){
						iLeft = 164;		
						}else if(iImgNum == iThis && index == 4){
						iLeft = 716;		
						}else if(iImgNum == iThis && index == 0){
								iLeft = 324;
							}else if(index <= iThis){
								if((index - iThis + 2) < 0){
									iLeft = (iImgNum + (index - iThis + 2)) * 160 + 64;
								}else{
									iLeft = (index - iThis + 2) * 160;
								}
							}else{
								iLeft = (index - iThis + 2) * 160 + 64;
							}
							
							$(element).animate({left:iLeft+'px'});
							
							if(iThis == iImgNum){
								setTimeout(function(){$(".dtudent_list li:eq(0)").find('.student_info').show()},500);
							}else if( index == iThis){
								setTimeout(function(){$(element).find('.student_info').show()},500);
							}
							
						});
						
					},500);
					if(iImgNum < iThis){
						iThis = 1;
					}
					$('.this_place').val(iThis);
				}
				
			}
			
			
			
		function xshi(){
	
	$("#ui-search").show();
	
	
}

$(".ui-win-close").click(function(){
  $("#ui-search").hide();
});



	function linkxshi(a){
	
$(".linknr").hide();	
	
$("#ln_"+a).show();

$(".linka").removeClass("cur");	
	$("#la_"+a).addClass("cur");
	
	
	
}



			
			
			
			
			
			
			
			
			
			
			
			
			