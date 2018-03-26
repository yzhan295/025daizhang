package com.ifinance.base;

import com.jfinal.core.ActionException;
import com.jfinal.core.Controller;
import com.jfinal.kit.StrKit;

public class BaseController extends Controller {
	public Integer toInt(String value, Integer defaultValue) {
		try {
			if (StrKit.isBlank(value))
				return defaultValue;
			value = value.trim();
			if (value.startsWith("N") || value.startsWith("n"))
				return -Integer.parseInt(value.substring(1));
			return Integer.parseInt(value);
		}
		catch (Exception e) {
			throw new ActionException(400, this.getRender(),  "Can not parse the parameter \"" + value + "\" to Integer value.");
		}
	}
	
}
