package com.ifinance;

import java.util.HashMap;
import java.util.Map;

import com.ifinance.controller.IndexController;
import com.ifinance.controller.MobileController;
import com.ifinance.controller.UeditorController;
import com.ifinance.controller.comm.CommonController;
import com.ifinance.controller.comm.UserAuthObject;
import com.ifinance.handler.XFakeStaticHandler;
import com.ifinance.interceptor.AuthInterceptor;
import com.ifinance.model._MappingKit;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.template.Engine;

public class GlobalConfig extends JFinalConfig {
	
	//各区域访问计数/临时数据
	public static int indexTotoalCount = 2611809;
	
	public static Map<String,UserAuthObject> authMap = new HashMap<String,UserAuthObject>();
	
	public void configConstant(Constants me) {
		PropKit.use("config_loc.txt");
		PropKit.use("keywork.txt");
		me.setDevMode(PropKit.getBoolean("devMode", false));
		// tomcat编码方式
		me.setEncoding("utf-8");
		me.setBaseUploadPath("uploadfile");

	}

	public void configRoute(Routes me) {
		me.add("/", IndexController.class);
		me.add("/comm", CommonController.class);
		me.add("/ueditor", UeditorController.class);
		me.add("/mobile", MobileController.class);
	}

	public void configEngine(Engine me) {
	}

	public void configPlugin(Plugins me) {
		// 主数据库配置
		C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"),
				PropKit.get("password").trim());
		me.add(c3p0Plugin);

		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
		me.add(arp);
		// 所有配置在 MappingKit 中搞定
		_MappingKit.mapping(arp);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		me.add(new AuthInterceptor());
		me.add(new SessionInViewInterceptor());
	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
		me.add(new ContextPathHandler("contextPath"));
		me.add(new XFakeStaticHandler(".html")); 
	}

	/**
	 * 系统启动完成后执行
	 */
	public void afterJFinalStart() {
		System.out.println("############The server web start [SUCCESS]#################");
	}

	/**
	 * 系统关闭前调用
	 */
	public void beforeJFinalStop() {
	}

	/**
	 * 建议使用 JFinal 手册推荐的方式启动项目 运行此 main
	 * 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args) {
		JFinal.start("WebRoot", 8080, "/025caiwu", 5);
	}

}
