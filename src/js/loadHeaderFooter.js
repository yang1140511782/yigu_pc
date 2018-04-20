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
			})
		});
		//加载尾部资源
		$("#footer").load("/html/reuse/footer.html");
	})
})