require(["config"], function(){
	require(["jquery", "cookie", "template", "loadHF"], function($, cookie, template){
		/*********************cookie查找数据并渲染，计算总计支付总金额***********************/
		$(function(){
			// 不能确认地址，没有写完页面不能确认地址
			$(".btn").on("click", function(){
				alert("地址不在配送范围内,请重新填写");
			})
			// 找到cookie里边的数据
			$.cookie.json = true;
			let prods = $.cookie("products");
			let html = template("order_list", {orders : prods});
			$(".order_prod").html(html);
			//计算总金额
			let sum = 0;
			prods.forEach(function(curr){
				sum += curr.amount * curr.price;
			})
			sum = sum.toFixed(2);
			$(".order_sum").html("￥" + sum + "元");
		});

		/**************************打开会员登录,弹出登录框提示*****************************/
		$(function(){
			//打开会员登录 
			$(".to_login").click(function() {
				$("#regist_container").hide();
				$("#_close").show();
				$("#_start").animate({
					left: '38%',
					height: '520px',
					width: '400px'
				}, 500, function() {
					$("#login_container").show(500);
					$("#_close").animate({
						height: '40px',
						width: '40px'
					}, 500);
				});
			});
			//关闭
			$("#_close").click(function() {
				
				$("#_close").animate({
					height: '0px',
					width: '0px'
				}, 500, function() {
					$("#_close").hide(500);
					$("#login_container").hide(500);
					$("#regist_container").hide(500);
					$("#_start").animate({
						left: '0px',
						height: '0px',
						width: '0px'
					}, 500);
				});
			});
			//去 登录
			$("#toLogin").click(function(){
				$("#regist_container").hide(500);
				$("#login_container").show(500);
			});
			$("#login_QQ").click(function(){
				alert("暂停使用！");
			});
			$("#login_WB").click(function(){
				alert("暂停使用！");
			});
		})


	})
})