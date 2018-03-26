package com.ifinance.tool;

import com.ifinance.base.BaseController;

public class IpUtil {

	private static IpUtil uniqueInstance = null;

	public static IpUtil getInstance() {
		if (uniqueInstance == null) {
			uniqueInstance = new IpUtil();
		}
		return uniqueInstance;
	}

	private IpUtil() 
	{
		
	}
	
	public String getIp(BaseController bc) {
		String ip = bc.getRequest().getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = bc.getRequest().getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = bc.getRequest().getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = bc.getRequest().getRemoteAddr();
		}
		System.out.println("ip:"+ip);
		return ip;
	}
}
