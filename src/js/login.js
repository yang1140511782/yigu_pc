require(["config"], function(){
	require(["jquery", "code"], function($){
		
		$('.code').codeVerify({
		type : 1,
		width : '100px',
		height : '50px',
		fontSize : '30px',
		codeLength : 4,
		btnId : 'login_btn',
		ready : function() {
		},
		success : function() {
			alert('验证匹配！');
		},
		error : function() {
			alert('验证码不匹配！');
		}
	});
	})
})