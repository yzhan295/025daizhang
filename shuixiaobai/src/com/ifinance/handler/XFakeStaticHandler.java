package com.ifinance.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;
import com.jfinal.kit.StrKit;

public class XFakeStaticHandler extends Handler {
	
	private String viewPostfix;
	
	public XFakeStaticHandler() {
		viewPostfix = ".html";
	}
	
	public XFakeStaticHandler(String viewPostfix) {
		if (StrKit.isBlank(viewPostfix)) {
			throw new IllegalArgumentException("viewPostfix can not be blank.");
		}
		this.viewPostfix = viewPostfix;
	}
	
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		if ("/".equals(target)) {
			next.handle(target, request, response, isHandled);
			return;
		}
		
		if ("/mobile".equals(target)) {
			next.handle("/mobile/index.html", request, response, isHandled);
			return;
		}
		
		if (target.contains("/news-page-")) {
			String page = target.replace("/news-page-", "").replace(".html", "");
			target = "/news";
			request.setAttribute("page", page);
		}
		
		if (target.contains("/news-detail-")) {
			String id = target.replace("/news-detail-", "").replace(".html", "");
			target = "/news_detail";
			request.setAttribute("id", id);
		}
		
		int index = target.lastIndexOf(viewPostfix);
		if (index != -1) {
			target = target.substring(0, index);
		}
		next.handle(target, request, response, isHandled);
	}
}
