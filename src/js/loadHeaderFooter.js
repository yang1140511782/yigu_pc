/******************复用加载的头部尾部***********************/
define(["jquery"], function($){
	$(function(){
		//加载头部资源
		$("#header").load("/html/reuse/header.html", function(){
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

		/********************吸顶效果************************/
			/*$(function(){  
		    var a = $('.con_header'),  
		      b =a.offset();//返回或设置导航栏相对于文档的偏移(位置)  
		 	 //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离  
		    $(document).on('scroll',function(){  
		      // var c = $(document).scrollTop();  
		  // 当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下）*／  
		      if(b.top<=500){  
		        a.css({'position':'fixed','top':'0px'})  
		        } else if(b.top === 0){  
		          a.css({'position': 'absolute', 'top':'0px'})  
		          }  
		     	})  
 			 }); */
		});
		//加载尾部资源
		$("#footer").load("/html/reuse/footer.html");
	})
})