require(["config"],function(){
	require(["jquery"], function($){
		/******************* 注册 ***********************/
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
			/*************验证码**************/
			$(".send").on("click", sendCode);
			var clock = '';
			var nums = 30;
			var btn;
			function sendCode() {
				btn = $(this);
				btn.attr("disabled", true);
				 //将按钮置为不可点击
				console.log(btn.val())
				btn.val('重新获取（'+nums+'）');
				clock = setInterval(doLoop, 1000); //一秒执行一次
			}
			function doLoop() {
				nums--;
				if (nums > 0) {
					btn.val('重新获取（'+nums+'）');
				} else {
					clearInterval(clock); //清除js定时器
					btn.attr("disabled", false);
					btn.val('点击发送验证码');
					nums = 10; //重置时间
				}
			};
			/**********验证码***************/
			$(".code").on("blur", function(){
				if($(this).val().length == 6 && !!/^[1-9]\d*$/.test($(this).val()))
					$(".code_hint").css("visibility", "hidden");
				else
					$(".code_hint").css("visibility", "visible");
			});
			/**********判断密码*************/
			$(".password").on("blur", function(){
				if($(this).val().length >= 4 && $(this).val().length <= 16){
					$(".correct2").show();
					$(".error2").hide();
					$(".pass_hint").css("visibility", "hidden");
				} else {
					$(".error2").show();
					$(".correct2").hide();
					$(".pass_hint").css("visibility", "visible");
				}
			})
			/**************简单判断是否注册成功****************/
			$(".btn").on("click", function(){
				if($(".phone").val().length == 11 && !!/^[1-9]\d*$/.test($(".phone").val()) 
					&& $(".password").val().length >= 4 && $(".password").val().length <= 16
					&& $(".ck").is(":checked")){
					alert("注册成功,三秒钟后返回主页面");
					setTimeout(function(){
						location = "../index.html";
					},3000);
				} else {
					$(".err").show();
					setTimeout(function(){
						$(".err").hide();
					},5000)
				}
			})
			
		});
	});
});