require(["config"], function(){
	require(["jquery", "cookie", "loadHF"], function($, cookie){
		/***************************复用头部尾部资源***********************/
		$(function(){
			//加载头部资源
			$(".header").load("/html/reuse/header.html", function(){
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
			$(".footer").load("/html/reuse/footer.html");
		});
	});
});


/*************************找到cookie的数据，并渲染**************************/
$(function(){
	/**********调用cookie插件************/
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
	
	/**********修改数量，改变价格************/



	//判断products里边是否有id
	function exist(id, products){
		
	}
})
