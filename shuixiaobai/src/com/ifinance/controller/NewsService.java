package com.ifinance.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ifinance.base.BaseController;
import com.ifinance.base.BaseService;
import com.ifinance.model.News;
import com.jfinal.plugin.activerecord.Page;

public class NewsService  extends BaseService {
	/**
	 * 所有的 dao 对象也放在 Service 中
	 */
	private static final News dao = new News().dao();
	
	public News findById(int id) {
		News news = dao.findById(id);
		return news;
	}
	
	public Page<News> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from news order by id desc");
	}
	
	public Map<String, List<News>> getTopNews(BaseController bc) {
		Map<String, List<News>> topNews = new HashMap<String, List<News>>();
		topNews.put("topZixun", dao.getTopZixun());
		topNews.put("topShuiwu", dao.getTopShuiwu());
		topNews.put("topFaq", dao.getTopFaq());
		
		return topNews;
	}
}
