package com.ifinance.controller;

import com.ifinance.base.BaseController;
import com.jfinal.aop.Clear;
import com.jfinal.kit.Ret;
import com.jfinal.upload.UploadFile;

public class UeditorController extends BaseController {
	public void index() {
		render("index.html");
	}

	/**
	 * ueditor上传
	 */
	@Clear
	public void upload() {
		if ("config".equals(getPara("action"))) {
			render("/ueditor/jsp/config.json");
			return;
		}
		UploadFile file = getFile("upfile"); // 获取文件
		String fileName = file.getFileName();
		String[] typeArr = fileName.split("\\.");
		String orig = file.getOriginalFileName();
		long size = file.getFile().length();
		String url = file.getUploadPath();// 上传路径

		// 获取相对地址
		String serverIp = getRequest().getServerName();// 获取IP
		Integer serverPort = getRequest().getServerPort();// 获取端口号
		int index = url.lastIndexOf("u");// 获取upload的首个位置
		String uu = url.substring(index);// 获取upload这几个单词
		String urls = "http://" + serverIp + ":" + serverPort + getRequest().getContextPath() + "/" + uu + "/"
				+ fileName;
		System.out.println("图片地址是：=======" + urls);
		Ret ret = Ret.create("state", "SUCCESS") // 下面这几个都是必须返回给ueditor的数据
				.set("url", urls) // 文件上传后的路径
				.set("title", fileName) // 文件名称
				.set("original", orig).set("type", "." + typeArr[1]).set("size", size);
		renderJson(ret);
	}
}