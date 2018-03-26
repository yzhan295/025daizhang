package com.ifinance.tool;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class IpParseUtil {

	// 云片配置
	public static final String	URL				= "http://restapi.amap.com/v3/ip?key=21e5764aae0fb82df5b3a1ac90e43023";


	/**
	 * ]
	 * 
	 * @param phoneNumber
	 * @param code
	 * @return
	 */
	public static String getGaoDeCity(String ip) {
		String city = null;
		PostMethod post = new PostMethod(URL);
		post.setParameter("ip", ip);

		HttpClient httpclient = new HttpClient();
		httpclient.setTimeout(1000 * 5);
		httpclient.setConnectionTimeout(1000 * 5);
		try {
			int code = httpclient.executeMethod(post);

			String respone = post.getResponseBodyAsString();
//			System.out.println(respone);
			if (null != respone) {
				JSONObject json = JSON.parseObject(respone);
				city = json.getString("city");
				if(null != city)
				{
					city = city.replace("市", "");
				
				}
			}
			
			if("[]".equals(city))
			{
				city = "上海";
			}

		} catch (Exception e) {
			// 记录日志
		} finally {
			post.releaseConnection();
		}

		return city;
	}



	public static void main(String[] args) {
		String str = getGaoDeCity("36.149.156.3");
		System.out.println(str);
	}
}
