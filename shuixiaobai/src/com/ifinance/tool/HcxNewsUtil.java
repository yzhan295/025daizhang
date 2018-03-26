package com.ifinance.tool;

import java.io.IOException;
import java.util.Date;

import javax.sql.DataSource;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.ifinance.model.News;
import com.ifinance.model._MappingKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

public class HcxNewsUtil {
	  static {
	        PropKit.use("config_loc.txt");

			// 主数据库配置
			C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"),
					PropKit.get("password").trim());
			c3p0Plugin.start();

	        DataSource dataSource = c3p0Plugin.getDataSource();

	        // 配置ActiveRecord插件
	        ActiveRecordPlugin arp = new ActiveRecordPlugin(dataSource);
	        // 所有映射在 MappingKit 中自动化搞定
	        _MappingKit.mapping(arp);

	        arp.start();
	    }
	  
	public static void main(String[] args) {
		String url = "http://www.hcx123.com/faq/zxgs/570.html";
		String str = getHTML(url);
		analyzeHTMLByString(str);
	}

	private static String getHTML(String url) {
		CloseableHttpClient httpclient = HttpClients.createDefault();

		try {
			HttpPost httpget = new HttpPost(url);

			// 设置参数到请求对象中
			httpget.setHeader("Content-type", "application/x-www-form-urlencoded");
			// 请求首部--可选的，User-Agent对于一些服务器必选，不加可能不会返回正确结果
			httpget.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/39.0");
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体
				HttpEntity entity = response.getEntity();
				// 打印响应状态
				if (entity != null) {
					return EntityUtils.toString(entity, "utf-8");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return null;
	}
	
	public static void analyzeHTMLByString(String html) {
		try{
			Document document = Jsoup.parse(html);
			String title = document.getElementsByClass("htitle").get(0).text();
			Elements newsList = document.getElementsByClass("newnr");
			Element contentEle = newsList.get(0);
			String contentHtml = contentEle.html();
			
			String smallImage = "";
			if (null != contentEle.getElementsByTag("img")) {
				smallImage = contentEle.getElementsByTag("img").attr("src");
			}
			
			System.out.println(title);
			System.out.println(contentHtml);
			
			News news = new News();
			news.setTitle(title);
			news.setSmallImage(smallImage);
			news.setContent(contentHtml);
			news.setShortDesc(contentEle.text().substring(0, 100));
			news.setAuthor("精税财务");
			news.setType(0);
			news.setUpdateTime(new Date());
			news.setCreateTime(new Date());
			
			news.save();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
