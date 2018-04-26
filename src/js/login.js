require(["config"], function(){
	require(["jquery", "code"], function($){
		$(function(){
			/******判断输入手机号是否正确******/
			$(".phone").on("blur", function(){
				if($(this).val().length == 11 && !!/^[1-9]\d*$/.test($(this).val())){
					$(".phone_hint").css("visibility", "hidden");
					$(".correct").show();
					$(".error").hide();
				} else {
					$(".error").show().prev().hide();
					$(".phone_hint").css("visibility", "visible");
				}
			});

			// 验证码
			$('#code').codeVerify({
				type : 1,
				width : '100px',
				height : '44px',
				fontSize : '30px',
				codeLength : 4,
				btnId : 'login_btn',
				ready : function() {
				},
				success : function() {
					alert('登录成功！3秒后跳转主页面');
					setTimeout(function(){
						location = "../index.html";
					},3000)
				},
				error : function() {
					$(".err").show();
					setTimeout(function(){
						$(".err").hide();
					},5000)
				}
			});
		});
		
	})
})