require(["config"], function(){
	require(["jquery", "template", "loadHF", "lunbo"], function($, template){
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
			//使用模板引擎异步加载商品
			$.getJSON("/mock/prod.json", function(data){
				let html = template("prod_temp", {products : data.res_body});
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

	})
});
