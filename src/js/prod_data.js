require(["config"], function(){
	require(["jquery", "zoom", "cookie", "template", "loadHF"], function($, zoom, cookie, template){
		//放大镜插件配置
		$(function() {
	
			var magnifierConfig = {
				magnifier : "#magnifier1",//最外层的大容器
				width : 485,//承载容器宽
				height : 485,//承载容器高
				moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
				zoom : 2//缩放比例
			};
			var _magnifier = magnifier(magnifierConfig);
		});
		/*********************侧边栏隐藏购物车*******************/
		$(function(){
			//点击侧边栏购物车，显示
			$(".cart").on("click", function(){
				$(".look_cart").animate({right:10})
			});
			$(".look_close").on("click", function(){
				$(".look_cart").animate({right:-315})
			});
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
			});
/*			console.log(products);
			//查看cookie数量做页面购物车显示
			let	sum = 0;
				if(products){
					products.forEach(function(prod){
						sum += Number(prod.amount);
					})
				}
			$(".cart_circle2").text(sum);*/
		});
		/************************点击修改数量********************/
		/***调用cookie插件***/
		$.cookie.json = true;
		$(".num").on("click", ".p_add,.p_minus", function(){
			// let products = $.cookie("products") || [];
			// console.log(products);
			let num = 1,
				sum = null;
			if($(this).is(".p_add")){
				num++;
				sum += num;
				$(".amount").val(sum);
				console.log(sum);
			} else {
				$(".amount").val(num--)
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