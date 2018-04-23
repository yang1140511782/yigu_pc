require(["config"], function(){
	require(["jquery", "template", "cookie", "loadHF"], function($, template, cookie){
		/*************************找到cookie的数据，并渲染**************************/
		$(function(){
			/**********************调用cookie插件********************/
			$.cookie.json = true;
			let _products = $.cookie("products") || [];
			// 没有商品则提示
			if(_products.length === 0){
				alert("购物车为空，请到主页选购商品");
				location = "/yigu/index.html";
			}	
			else{
				$(".cart_con").hide();
			}
			//显示找到的购物车数据
			let html = template("prod_list", {products:_products});
			$("#cart_con").html(html);
			/*********************修改数量，改变价格*******************/
			//点击修改数量
			$(".cart_tb").on("click", ".add,.minus", function(e){
				// 找到想要修改数量的ID
				let _id = $(this).data("id");
				// 找到数组中的下标索引
				let _index = exist(_id, _products);
				console.log(_index);
				if ($(this).is(".add")){
					_products[_index].amount++;
				}else if($(this).is(".minus")){
					if(_products[_index].amount <= 1)
						return;
					_products[_index].amount--;
				}
				//保存到cookie
				$.cookie("products", _products, {path:"/", exprise:30});
				//渲染到页面
				$(this).siblings(".amount").val(_products[_index].amount);
				$(this).parent().next().html((_products[_index].amount * _products[_index].price).toFixed(2));
				sum();
			});
			//当数量文本框失去焦点的时候做修改并验证
			$(".cart_tb").on("blur", ".amount", function(){
				//找到当前的id
				let _id = $(this).data("id");
				//找到数组中的下标
				let _index = exist(_id, _products);
				//验证amount文本框数量是否为数字
				if (!/^[1-9]\d*$/.test($(this).val())){
					$(this).val(_products[_index].amount);
					return;
				}
				_products[_index].amount = $(this).val();
				//改变合计的值
				$(this).parent().next().html((_products[_index].amount * _products[_index].price).toFixed(2));
				sum();
			});
			/*****************************点击确定，删除当前行*******************************/
			// 删除当前行
			$(".cart_tb").on("click", ".remove", function(){
				$(".cart-hint").show();
				let than = $(this);
				$(".cart-hint").on("click", ".qd,.qx", function(){
					if($(this).is(".qd")){
						let _id = than.data("id");
						console.log(_id);
						let _index = exist(_id, _products);
						//删除数组中的索引
						_products.splice(_index, 1);
						//删除的数组保存cookie中
						$.cookie("products", _products, {path:"/", exprise:30});
						//删除DOM文档中的行
						than.parents("tr").remove();
						//删除完，提示购物车空
						/*if(_products.length === 0){
						}*/
						$(".cart-hint").hide();
					} else if($(this).is(".qx")){
						$(".cart-hint").hide();
					}
					sum()
				});
			});
			/*****************************全选设置*******************************/
			// 点击全选框按钮，计算合计金额
			$(".ck_all").on("click", function(){
				//设置所有行前（当前商品）的选购状态
				$(".ck_prod").prop("checked", $(this).prop("checked"));
				sum();
			});
			//点击取消当前复选框按钮，则取消全选设置
			$(".ck_prod").on("click", function(){
				let _status = $(".ck_prod:checked").length === _products.length;
				$(".ck_all").prop("checked", _status);
				sum();
			});
			/**************************插件点击结算，弹出登录框提示*****************************/
			//打开会员登录 
			$("#Login_start_").click(function() {
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
			/***********************需要用到的封装函数****************************/
			// 找出 id 对应商品在 products 中下标
			function exist(id, products) {
				let existIndex = -1;
				$.each(products, function(index, prod){
					if(prod.id == id) {
						existIndex = index;
						return false;
					}
				})
				return existIndex;
			};
			//计算商品的合计
			function sum(){
				let sum = 0;
				$(".ck_prod:checked").each(function(index, id){
					sum += parseInt($(this).parents("tr").find(".sub").text());
				})
				$(".total").text("￥" + sum.toFixed(2));
			}
		})
	});
});

