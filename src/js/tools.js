/* 
 * 生成随机整数数字，范围位于指定下限到上限之间，
 * 能够取到下限值，不能取到上限值
 * @param lower 随机数字下限范围
 * @param upper 随机数字上限范围
 * @return 产生的随机整数数字
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

/*
 * 生成随机的rgb()颜色值
 * @return 生成的随机颜色rgb()字符串内容，如：rgb(35, 17, 245)
 */
function randomColor() {
	// 生成 0~256之间的随机数字
	var r = random(0, 256),
		g = random(0, 256),
		b = random(0, 256);
	// 返回随机颜色字符串
	return "rgb("+ r +","+ g +","+ b +")";
}

/*
 * 查找 value 在 array 数组中第一次出现的索引
 * @param value 待查找元素
 * @param array 数组
 * @return 查找到的下标，找不到则返回-1
 */
function inArray(value, array) {
	if (Array.prototype.indexOf) // 浏览器支持使用数组ES5中的indexOf()方法
		return array.indexOf(value);

	// 不支持使用 indexOf() 方法，则遍历迭代每个元素
	for (var i = 0, len = array.length; i < len; i++) {
		if (array[i] === value)
			return i;
	}

	return -1;
}

/*
 * 解析查询字符串，将查询字符串转换为对象
 * @param url 网址
 * @return 转换后的对象
 */
function parseQueryString(url) {
	var start = url.indexOf("?") + 1, // 起始位置
		end = url.indexOf("#"), // 结束位置
		queryString = url.slice(start, end), // 查询字符串
		parts = queryString.split("&"), // 将查询字符串分割成数组
		obj = {}; // 生成对象
	// 遍历parts数组中每个元素
	for (var i = 0, len = parts.length; i < len; i++) {
		// 将遍历到当前元素使用=分割
		var arr = parts[i].split("=");
		// 数组中第一个元素为属性名，其它元素使用=号连接作为属性值
		var name = arr.shift(),
			value = arr.join("=");
		// 保存到对象中
		obj[name] = value;
	}

	// 返回生成对象
	return obj;
}

/*
 * 将对象转换为查询字符串
 * @param obj 待转换对象
 * @return 转换后的查询字符串
 */
function toQueryString(obj) {
	// 保存查询字符串
	var queryString = [];
	// 遍历对象各属性
	for (var attrName in obj) {
		queryString.push(attrName + "=" + obj[attrName]);
	}
	// 返回查询字符串结果
	return queryString.join("&");
}

/*
 * 生成随机验证码（字符可取：大/小写字母、数字）
 * @param len 生成验证码长度，默认为4
 * @return 生成的验证码字符串
 */
function generateValidateCode(len) {
	// 未传递 len 参数，则默认值为4
	if (typeof len === "undefined")
		len = 4;
	// 保存生成的验证码
	var validateCode = "";
	// 循环生成验证码
	do {
		// 在48~122之间产生随机数字
		var rand = random(48, 123);
		// 判断生成的随机数字是否在合理范围
		if (rand >= 48 && rand <= 57 // 数字
			|| rand >= 65 && rand <= 90 // 大写字母
			|| rand >= 97 && rand <= 122) { // 小写字母
			validateCode += String.fromCharCode(rand);
		}
	} while (validateCode.length < len);
	return validateCode;
}

/*
 * 将日期时间格式化为 "yyyy-MM-dd HH:mm:ss" 字符串的格式
 * @param datetime 日期时间对象
 * @return 格式化后的字符串
 */
function format(datetime) {
	var _year = datetime.getFullYear(),
		_month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		_date = ("0" + datetime.getDate()).slice(-2),
		_hour = ("0" + datetime.getHours()).slice(-2),
		_min = ("0" + datetime.getMinutes()).slice(-2),
		_second = ("0" + datetime.getSeconds()).slice(-2),
		_result = _year + "-"+ _month +"-"+ _date +" "+ _hour +":"+ _min +":" + _second;
	// 返回格式化后字符串
	return _result;
}

/*
 * 根据选择器在指定上下文中查找元素
 * @param selector 选择器： #id   .class   element
 * @param context 待查找上下文环境，默认取 document
 * @return 查找到的元素（集合） 
 */
function $(selector, context) {
	context = context || document;
	if (selector.indexOf("#") === 0) // id
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // className
		return getElementsByClassName(selector.slice(1), context);
	// tagName
	return context.getElementsByTagName(selector);
}

/*
 * 根据类名在指定上下文中查找元素，解决浏览器兼容
 * @param className 类名
 * @param context 待查找上下文环境，默认取 document
 * @return 查找到的集合或数组 
 */
function getElementsByClassName(className, context) {
	context = context || document;
	// 如果支持使用 context.getElementsByClassName()方法，则直接调用
	if (context.getElementsByClassName) 
		return context.getElementsByClassName(className);
	
	// 如果不支持使用 context.getElementsByClassName()方法，以下解决兼容：
	// 保存查找结果的数组
	var result = [];
	// 获取查找上下文后代中所有元素
	var elements = context.getElementsByTagName("*");
	// 遍历所有的元素
	for (var i = 0, len = elements.length; i < len; i++) {
		// 获取当前遍历到元素的所有类名
		var classNames = elements[i].className.split(" ");
		// 判断待查找的类名在当前所有类名数组中是否存在
		if (inArray(className, classNames) !== -1)
			result.push(elements[i]);
	}
	// 返回查找结果
	return result;
}

/*
 * 根据属性名获取/设置CSS属性值
 * @param element DOM元素对象
 * @param attrName CSS属性名
 * @param attrValue 待设置的CSS属性值
 * @return 获取到的属性值
 */
function css(element, attrName, attrValue) {

	if (typeof attrName === "object") {
		var obj = attrName;
		for (var attr in obj) {
			element.style[attr] = obj[attr];
		}
		return;
	}

	if (typeof attrValue === "undefined") // 获取
		return window.getComputedStyle 
				? window.getComputedStyle(element)[attrName]
				: element.currentStyle[attrName];
	// 设置
	element.style[attrName] = attrValue;
}

/*
 * 注册事件监听:解决 addEventListener() 与 attachEvent() 兼容问题
 * @param element 待注册事件监听的DOM元素
 * @param type 事件类型
 * @param callback 回调函数，事件处理程序
 */
function on(element, type, callback) {
	// 支持使用 addEventListener
	if (element.addEventListener){
		// 如果事件类型字符串以 "on" 开头，则去掉
		if (type.indexOf("on") === 0)
			type = type.slice(2);

		element.addEventListener(type, callback);
	} else { // 不支持使用 addEventListener
		// 如果事件类型字符串没有以 "on" 开头，则添加
		if (type.indexOf("on") !== 0)
			type = "on" + type;

		element.attachEvent(type, callback);
	}
}

/*
 * 移除事件监听:解决 removeEventListener() 与 detachEvent() 兼容问题
 * @param element 待移除事件监听的DOM元素
 * @param type 事件类型
 * @param callback 回调函数，事件处理程序，需要与注册事件监听时绑定的事件处理程序是同一个
 */
function off(element, type, callback) {
	// 支持使用 removeEventListener
	if (element.removeEventListener){
		// 如果事件类型字符串以 "on" 开头，则去掉
		if (type.indexOf("on") === 0)
			type = type.slice(2);

		element.removeEventListener(type, callback);
	} else { // 不支持使用 removeEventListener
		// 如果事件类型字符串没有以 "on" 开头，则添加
		if (type.indexOf("on") !== 0)
			type = "on" + type;
		
		element.detachEvent(type, callback);
	}
}

/*
 * 获取/设置指定元素在文档中的定位坐标
 * @param element DOM元素对象
 * @param coordinates 待设置的坐标 {top, left}
 * @return 坐标对象：{top, left}
 */
function offset(element, coordinates) {
	// 获取
	if (typeof coordinates === "undefined") {
		// 定义变量，累加文档坐标定位值
		var _top = 0, _left = 0;
		// 循环求解
		while( element !== null ) {
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}

		return {
			top : _top,
			left : _left
		};
	}

	// 设置
	// 求指定 element 的有定位父元素
	var parent = element.offsetParent;
	// 求父元素在文档中定位
	var _top = 0, _left = 0;
	// 循环求解
	while( parent !== null ) {
		_top += parent.offsetTop;
		_left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	// 求指定 element 相对其父元素的坐标定位
	element.style.top = coordinates.top - _top + "px";
	element.style.left = coordinates.left - _left + "px";
}

/*
 * 解决 event.pageX 与 event.pageY 兼容问题
 * @param event 事件event对象
 * @return 解决兼容后的坐标对象 {x, y}
 */
function page(event) {
	var _x = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
		_y = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	return {
		x : _x,
		y : _y
	}
}

/*
 * 获取指定元素边框以内的总宽度
 * @param element DOM元素对象
 * @return 计算后的宽度值
 */
function innerWidth(element) {
	// 元素未隐藏
	if (element.style.display !== "none")
		return element.clientWidth;
	// 元素隐藏
	return parseFloat(css(element, "paddingLeft"))
			+ parseFloat(css(element, "width"))
			+ parseFloat(css(element, "paddingRight"));
}

/*
 * 获取指定元素边框以内的总高度
 * @param element DOM元素对象
 * @return 计算后的高度值
 */
function innerHeight(element) {
	// 元素未隐藏
	if (element.style.display !== "none")
		return element.clientHeight;
	// 元素隐藏
	return parseFloat(css(element, "paddingTop"))
			+ parseFloat(css(element, "height"))
			+ parseFloat(css(element, "paddingBottom"));
}

/*
 * 获取指定元素边框及以内的总宽度
 * @param element DOM元素对象
 * @return 计算后的宽度值
 */
function outerWidth(element) {
	// 元素未隐藏
	if (element.style.display !== "none")
		return element.offsetWidth;
	// 元素隐藏
	return parseFloat(css(element, "borderLeftWidth"))
			+ parseFloat(css(element, "paddingLeft"))
			+ parseFloat(css(element, "width"))
			+ parseFloat(css(element, "paddingRight"))
			+ parseFloat(css(element, "borderRightWidth"));
}

/*
 * 获取指定元素边框及以内的总高度
 * @param element DOM元素对象
 * @return 计算后的高度值
 */
function outerHeight(element) {
	// 元素未隐藏
	if (element.style.display !== "none")
		return element.offsetHeight;
	// 元素隐藏
	return  parseFloat(css(element, "borderTopWidth"))
			+ parseFloat(css(element, "paddingTop"))
			+ parseFloat(css(element, "height"))
			+ parseFloat(css(element, "paddingBottom"))
			+ parseFloat(css(element, "borderBottomWidth"));
}

/*
 * 获取/保存 cookie
 * @param key cookie名
 * @param value cookie值
 * @param options 可配置选项，对象结构 {expires:1, path:"/", domain:"", secure:true}
 */
function cookie(key, value, options) {
	// reading
	if (typeof value === "undefined") {
		// 获取所有 cookie
		var cookies = document.cookie.split("; ");
		// 遍历各条 cookie
		for (var i = 0, len = cookies.length; i < len; i++) {
			// 使用 = 分割当前遍历到的 "key=value" 字符串
			var parts = cookies[i].split("=");
			// cookie名
			var name = decodeURIComponent(parts.shift());
			// 判断当前遍历到 cookie 名是否是待查找的 cookie 名
			if (name === key) // 返回 cookie值
				return decodeURIComponent(parts.join("="));
		}
		// 如果根据 cookie 名不能找到对应的 cookie 值
		return undefined;
	}

	// writing
	// 配置选项默认处理
	options = options || {};
	// 构建 cookie 字符串，key=value
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 失效时间
	if (options.expires) {
		var date = new Date();
		date.setDate(date.getDate() + options.expires);
		cookie += ";expires=" + date.toUTCString();
	}
	// 路径
	if (options.path)
		cookie += ";path=" + options.path;
	// 域
	if (options.domain)
		cookie += ";domain=" + options.domain;
	// 安全链接
	if (options.secure)
		cookie += ";secure"
	// 保存 cookie
	document.cookie = cookie;
}

/*
 * 根据 cookie 名删除 cookie
 * @param key cookie名
 * @param options 可配置项
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}

/*
 * 运动框架
 * @param element 待添加运动动画效果的DOM元素
 * @param options 多属性运动时传递的运动终值对象
 * @param speed 限定运动总时长
 * @param fn 运动结束后继续执行的函数
 */
function animate(element, options, speed, fn) {
	// 清除元素上已有的运动动画效果
	clearInterval(element.timer);
	// 初值、范围
	var start = {}, range = {};
	for (var attrName in options) {
		// 初值
		start[attrName] = parseFloat(css(element, attrName));
		// 范围
		range[attrName] = options[attrName] - start[attrName];
	}
	// 记录运动起始时间
	var startTime = +new Date();
	// 启动计时器，运动
	element.timer = setInterval(function(){
		// 运动开销时间
		var elapsed = Math.min(speed, +new Date() - startTime);
		// 每个属性都走一步
		for (var attrName in options) {
			// 计算当前步具体的值
			var result = elapsed * range[attrName] / speed + start[attrName];
			// 设置 css
			element.style[attrName] = result + (attrName === "opacity" ? "" : "px");
		}
		// 判断是否停止计时器
		if (elapsed === speed) {
			clearInterval(element.timer);
			// 如果有运动结束后执行的函数，则调用执行
			fn && fn();
		}
	}, 1000/60);
}

/*
 * 淡入
 * @param element 待添加运动动画效果的DOM元素
 * @param speed 限定运动总时长
 * @param fn 运动结束后继续执行的函数
 */
function fadeIn(element, speed, fn) {
	element.style.display = "block";
	element.style.opacity = 0;
	animate(element, {opacity: 1}, speed, fn);
}

/*
 * 淡出
 * @param element 待添加运动动画效果的DOM元素
 * @param speed 限定运动总时长
 * @param fn 运动结束后继续执行的函数
 */
function fadeOut(element, speed, fn) {
	element.style.display = "block";
	element.style.opacity = 1;
	animate(element, {opacity: 0}, speed, function(){
		element.style.display = "none";
		fn && fn();
	});
}

/*
 * ajax操作
 * @param options 可配置参数 
 *	{
 *		type : "GET|POST", // 请求方式，默认为 "GET"
 *		url : "", // 请求资源的 url
 *		data : {username:"xx", password:"xxx", phone:"xxxx"}, // 向服务器传递的参数
 *		dataType : "json|text", // 预期从服务器返回的数据格式
 *		success : function(respData){}, // 请求成功执行的函数
 *		error : function(errMsg){} // 请求失败执行的函数
 *	}
 */
function ajax(options) {
	options = options || {};

	// 请求服务器资源url
	var url = options.url;
	if (!url)
		return;
	// 请求方式
	var method = (options.type || "get").toUpperCase();
	// 处理查询字符串
	var queryString = null;
	if (options.data) { // 有向服务器传递参数，则构建查询字符串结构
		queryString = [];
		// ["username=xx", "password=xxx", "phone=xxxx"]
		for (var attr in options.data) {
			queryString.push(attr + "=" + options.data[attr]);
		}
		// username=xx&password=xxx&phone=xxxx
		queryString = queryString.join("&");
	}
	// 判断是GET还是POST请求，GET请求时将查询字符串串联在URL后
	if (queryString && method === 'GET') {
		url += "?" + queryString;
		queryString = null;
	}

	// 创建核心对象
	var xhr = new XMLHttpRequest();
	// 准备建立连接
	xhr.open(method, url, true);
	// 发送请求
	if (method === "POST")
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(queryString);
	// 处理响应
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
			if (xhr.status === 200) { // 请求成功
				// 获取响应文本
				var data = xhr.responseText; 
				// 判断预期从服务器返回的数据格式
				if (options.dataType === "json")
					data = JSON.parse(data);
				/* 数据处理业务 */
				options.success && options.success(data);
			} else { // 请求失败
				options.error && options.error(xhr.statusText);
			}
		}
	};
}

/*
 * ajax，get请求
 */
function get(url, data, success, dataType) {
	ajax({
		type : 'get',
		url : url,
		data : data,
		success : success,
		dataType : dataType
	});
}

/*
 * ajax，post请求
 */
function post(url, data, success, dataType) {
	ajax({
		type : 'post',
		url : url,
		data : data,
		success : success,
		dataType : dataType
	});
}