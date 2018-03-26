package com.ifinance.controller;


import com.ifinance.base.BaseController;
import com.ifinance.tool.CheckMobileUtil;

public class MobileController extends BaseController {
	static NewsService service = new NewsService();
	public void index() {
		String userAgent = this.getHeader("USER-AGENT").toLowerCase();
		if (null == userAgent) {
			userAgent = "";
		}
		
		boolean isFromMobile = CheckMobileUtil.check(userAgent);
		
		if (isFromMobile) {
			render("index.html");
		} else {
			redirect("/");
		}		
	}
	
	/**
	 * 开户
	 */
	public void kaihu() {
		render("kaihu.html");
	}
	
	
	/**
	 * 南京公司注册
	 */
	public void gszc() {
		render("gszc.html");
	}
	
	/**
	 * 记账报税
	 */
	public void jzbs() {
		render("jzbs.html");
	}
	
	/**
	 * 商标注册
	 */
	public void sbzc() {
		render("sbzc.html");
	}
	
	/**
	 * 变更法人
	 */
	public void bgfr() {
		render("bgfr.html");
	}
	
	/**
	 * 公司名称变更
	 */
	public void bggsmc() {
		render("bggsmc.html");
	}
	
	/**
	 * 注册地址变更
	 */
	public void bgzcdz() {
		render("bgzcdz.html");
	}
	
	/**
	 * 注册资本变更
	 */
	public void bgzczb() {
		render("bgzczb.html");
	}
	
	/**
	 * 经营范围变更
	 */
	public void bgjyfw() {
		render("bgjyfw.html");
	}
	
	/**
	 * 公司股东变更
	 */
	public void bggd() {
		render("bggd.html");
	}
	
	/**
	 * 公司变更
	 */
	public void gsbg() {
		render("gsbg.html");
	}

	/**
	 * 开公积金户
	 */
	public void kgjjh() {
		render("kgjjh.html");
	}

	/**
	 * 开公司账户
	 */
	public void kgszh() {
		render("kgszh.html");
	}
	
	/**
	 * 开社保户
	 */
	public void ksbh() {
		render("ksbh.html");
	}
	
	/**
	 * 公司注销
	 */
	public void zxgs() {
		render("zxgs.html");
	}
	
	/**
	 * 申请一般纳税人
	 */
	public void sqybnsr() {
		render("sqybnsr.html");
	}
	
	public void contactus() {
		render("contactus.html");
	}
	
	public void qiyezeren() {
		render("qiyezeren.html");
	}
	
	public void weilaizhanwang() {
		render("weilaizhanwang.html");
	}
	
	public void fuwulinian() {
		render("fuwulinian.html");
	}
	
	public void aboutus() {
		render("aboutus.html");
	}	
	
	public void news() {
		int page = 1;
		if (null != this.getRequest().getAttribute("page")) {
			page = toInt(this.getRequest().getAttribute("page").toString(), 1);
		}
		setAttr("newsPage", service.paginate(page, 8));
		render("news.html");
	}
	
	public void news_detail() {
		int id = toInt(this.getRequest().getAttribute("id").toString(), 0);
		setAttr("detail", service.findById(id));
		render("news_detail.html");
	}
	
	public void freeGszc() {
		String name = (String)this.getRequest().getParameter("name");
		String mobile = (String)this.getRequest().getParameter("mobile");
		render("index.html");
	}
	
}