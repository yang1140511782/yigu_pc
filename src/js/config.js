//配置requireJS
require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4",
		template : "lib/art-tempalte/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie"
	},
	shim : {
		zoom : {
			deps : ["jquery"]
		}
	}
})