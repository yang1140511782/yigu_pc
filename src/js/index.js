require(["config"], function(){
	require(["jquery", "template", "cookie", "fly", "loadHF", "lunbo"], function($, template, cookie, fly){
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
			$("div.products1").delegate("div", "mouseenter", function(){
				$(this).find(".add_to_cart").stop().animate({bottom:0},200).show()
			}).delegate("div", "mouseleave", function(){
				$(this).find(".add_to_cart").stop().animate({bottom:-43},200).hide()});
		})
		/***************************加入购物车***********************/
		$(function(){
			// 事件委派
			$("div.products1").delegate(".add_to_cart", "click", function(e){
				//获取当前选购的商品
				let prod = {
					id : $(this).parent().find(".id").text(),
					title : $(this).parent().find(".title").text(),
					img : $(this).parent().find("img").attr("src"),
					price : $(this).parent().find(".price").text().slice(1),
					amount : 1
				};
				//配置cookie插件,自动在JS值和JSON值转换
				$.cookie.json = true;
				//获取cookie中保存的商品数据
				let products = $.cookie("products") || [];
				//判断购物车是否存在已经选购的商品
				let index = exist(prod.id, products);
				if(index == -1) //-1表示不存在
					products.push(prod);
				else
					products[index].amount++;
				//将数组中的商品保存到cookie中
				$.cookie("products", products, {expirse : 7, path : "/"});
				//加在购物车成功之后抛物线
				var offset = $(".end").offset();  //结束的地方的元素
				$(".add_to_cart").click(function(event){   //是$(".add_to_cart")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
					var add_to_cart = $(this);
					var img = add_to_cart.parent().find('._img').attr('src');
					var flyer = $('<img class="u-flyer" src="'+img+'">');
					console.log(flyer);
					flyer.fly({
						start: {
							left: event.pageX - $(window).scrollTop(),
							top: event.pageY - $(window).scrollLeft()
						},
						end: {
							left: offset.left+10 - $(window).scrollTop(),
							top: offset.top+10 - $(window).scrollLeft(),
							width: 0,
							height: 0
						},
						onEnd: function(){
							$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
							add_to_cart.css("cursor","pointer").removeClass('btn').unbind('click');
							this.destory();
						}
					});
					//查看cookie数量做页面购物车显示
					$.cookie.json = true;
					let products = $.cookie("products"),
						sum = 0;
						if(products){
							products.forEach(function(prod){
								sum += Number(prod.amount);
							})
						}
					$(".cart_circle").text(sum);
					$(".cart_circle2").text(sum);
				});
			})
					$.cookie.json = true;
					let products = $.cookie("products"),
						sum = 0;
					if(products){
						products.forEach(function(prod){
							sum += Number(prod.amount);
						})
						$(".cart_circle").text(sum);
						$(".cart_circle2").text(sum);
					}
					
			// 划过侧边栏购物车改变颜色
			$("#cart_right").on("mouseenter", function(){
				$(this).css("background", "#fd7400");
			}).on("mouseleave", function(){
				$(this).css("background", "#000");
			})

		});
		/*********************侧边栏隐藏购物车*******************/
		$(function(){
			//点击侧边栏购物车，显示
			$(".cart").on("click", function(){
				// 找到cookie里边已加入购物车的商品数据，渲染look_cart(隐藏购物车)页面
				$.cookie.json = true;
				let products = $.cookie("products") || [];
				let html = template("cart_temp", {cart_prods : products}); 
				$(".cart_prod").html(html);
				// 找到cookie的数量，并做总计
				let num = 0,
					sum = 0;
				products.forEach(function(curr){
					num += curr.amount;
					sum += (curr.price * curr.amount);
				})
				$(".cart_hd_num").html("共计("+ num + ")件商品");
				$(".cart_hd_sum").html("合计:￥" + sum.toFixed(2));
				$(".look_cart").animate({right:10});
				// 点击删除购物车
				$(".cart_prod").on("click", ".remove_cart", function(){
					//找到删除的id
					let id = $(this).data("id"),
					//判断数组中有没有这个id
					index = exist(id, products);
					products.splice(index, 1);
					$.cookie("products", products, {path:"/", expirse:30});
					//删除DOM元素中的当前商品
					$(this).parents("ul").remove();
				})
				
			});
			$(".look_close").on("click", function(){
				$(".look_cart").animate({right:-315})
			});
			
			
		});
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
});
