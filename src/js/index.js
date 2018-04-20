/***************************复用头部尾部资源***********************/
$(function(){
	//加载头部资源
	$("#header").load("html/reuse/header.html", function(){
		//加载完毕之后，搜索框
		$(".input").on("keyup", function(){
			let val = $(this).val(),//当前文本框的值
				url = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`;
			//使用jsonp实现跨域请求
			$.getJSON(url, function(data){
				let html = "";
				data.result.forEach(function(curr){
					html += `<div>${curr[0]}</div>`; 
				})
				$(".info").html(html);
				//点击内容到搜索框中
				$(".info").on("click", function(e){
					let src = e.target;
					$(".input").val(src.innerText);
				})
				//离开隐藏搜索的内容
				$(".info").on("mouseleave", function(){
					$(".info").hide();
				})
			})
		})
	});
	//加载尾部资源
	$("#footer").load("html/reuse/footer.html");
})

// 模拟轮播结束的四张图片
$(function(){
	let silie = [
			{img : "./img/pro_hd_01.jpg"},
			{img : "./img/pro_hd_02.jpg"},
			{img : "./img/pro_hd_03.jpg"},
			{img : "./img/pro_hd_04.jpg"},
	];
	var html = "";
	// 遍历添加
	silie.forEach(function(curr){
		html += `<div><a herf="#"><img src="${curr.img}"></a></div>`;
	});	
	//向生态系统里边做HTML添加
	$(".silie").html(html);
});

/***************************异步加载商品***********************/
$(function(){
	//使用模板引擎
	/*$.getJSON("/mock/prod.json", function(data){
		let html = template("prod_temp", {produsts : data.res_body.produsts});
		console.log(html);
	})*/
	// 加载商品
	$.getJSON("mock/prod.json", function(data){
		let html = "";
		data.res_body.forEach(function(prod){
			html += `<div style="overflow:hidden">
						<a href="#">
							<ul>
							    <li style="display: none;" class="id">${prod.id}</li>
							    <li class="img"><img src="${prod.img}"></li>
							    <li class="title">${prod.title}</li>
							    <li class="price">￥${prod.price}</li>
							    <li class="add_to_cart" style="opacity:0.8; color:white;">加入购物车</li>
							</ul>
						</a>
					</div>`;
		});
		$(".products1").prepend(html);
	})
	// 处理CSS,添加购物车按钮显示
	$("div.products1").delegate("ul", "mouseenter", function(){
		$(this).find(".add_to_cart").stop().animate({bottom:0},200).show()
	}).delegate("ul", "mouseleave", function(){
		$(this).find(".add_to_cart").stop().animate({bottom:-43},200).hide()});
})
/***************************加入购物车***********************/
$(function(){
	// 事件委派
	$("div.products1").delegate("a", "click", function(e){
		//阻止事件默认行为
		e.preventDefault();
		//获取当前选购的商品
		let prod = {
			id : $(this).find(".id").text(),
			title : $(this).find(".title").text(),
			img : $(this).find("img").attr("src"),
			price : $(this).find(".price").text().slice(1),
			amount : 1
		};
		//配置cookie插件,自动在JS值和JSON值转换
		$.cookie.json = true;
		//获取cookie中保存的商品数据
		let products = $.cookie("products") || [];
		//判断购物车是否存在已经选购的商品
		let index = exist(prod.id, products)
		if(index == -1) //-1表示不存在
			products.push(prod);
		else
			products[index].amount++;
		//将数组中的商品保存到cookie中
		$.cookie("products", products, {expirse : 7, path : "/"});
		//加在购物车成功之后抛物线
		let end = $(".right_cart").offset(),
			flyer = $(`<img src="${prod.img}">`);
			flyer.fly({
				start : {
					left : event.pageX - $(window).scrollLeft(),
					top : event.pageY - $(window).scrollTop(),
				},
				end : {
					left : end.left - $(window).scrollLeft(),
					top : end.top - $(window).scrollTop(),
					width : 0,
					height : 0
				}
			})
		//判断ID是否在products里边
		function exist(id, products){
			let existIndex = -1;
			$.each(products, function(index, prod){
				if(prod.id == id) {
					existIndex = index;
					return false;
				}
			})
			return existIndex;
		}
	})
})



