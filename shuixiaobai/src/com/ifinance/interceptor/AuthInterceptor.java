package com.ifinance.interceptor;

import javax.servlet.http.HttpServletRequest;

import com.ifinance.base.BaseController;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

/**
 * 接口安全性检查
 * @author 刘兴超
 */
public class AuthInterceptor implements Interceptor {



	public void intercept(Invocation invoc) {
		BaseController contro = (BaseController) invoc.getController();
		HttpServletRequest request = contro.getRequest();
//		HttpServletResponse response = contro.getResponse();
		
/*		String uri = invoc.getActionKey();
		System.out.println(uri);
		if (null == contro.getSession().getAttribute("user")) {
			if(!uri.equals("/") && !uri.contains("/qm/")) 
			{
				contro.redirect("/");
				return;
			}
		}*/
//		String uri = invoc.getActionKey(); // 默认就是ActionKey
//		String token = contro.getSessionAttr("token");
//		if(null == token)
//		{
//			if(!uri.equals("/"))
//			{
//				contro.redirect("/");
//				return;
//			}
//		}else
//		{
//			if(uri.equals("/"))
//			{
//				contro.redirect("/tax_main.html?token="+token);
//				return;
//			}
//		}
		
		// 获取用户IP地址
//		String currentCity = (String)contro.getSessionAttr("currentCity");
//		if(null == currentCity || "".equals(currentCity))
//		{
//			String ip = IpUtil.getInstance().getIp(contro);
//			String city = IpParseUtil.getGaoDeCity(ip);
//			contro.setSessionAttr("currentCity", city);
//			contro.setSessionAttr("userIp", ip);
//			Company comp = Company.dao.getCompanyInfoByArea(city);
//			if(null != comp&&1==comp.getType())
//			{
//				contro.setSessionAttr("meiqiaId", comp.getMeiqiaId());
//				contro.setSessionAttr("kfphone", comp.getTel());
//				
//			}else
//			{
//				contro.setSessionAttr("meiqiaId", "90794");
//				contro.setSessionAttr("kfphone", "17761785057");
//			}
//		}
//	
//		String userAgent = request.getHeader( "USER-AGENT" ).toLowerCase();    
//        if(null == userAgent){    
//            userAgent = "";    
//        }  
//        
//        String uri = invoc.getActionKey();
//        
//        boolean isFromMobile = CheckMobileUtil.check(userAgent);  
//        //判断是否为移动端访问  
//        if(isFromMobile){
//            contro.getSession().setAttribute("ua","mobile");  
//        } else {  
//            contro.getSession().setAttribute("ua","pc");  
//        }  
		
		try {
			invoc.invoke();
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
	}
}
