//配置requireJS
require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4",
		template : "lib/art-template/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		loadHF : "js/loadHeaderFooter",
		fly : "lib/jquery-plugins/jquery.fly.min",
		lunbo : "lib/jquery-plugins/slide",
		login_init : "lib/jquery-plugins/supersized-init",
		login : "lib/jquery-plugins/supersized.3.2.7.min",
		ui : "lib/jquery-plugins/ui",
		zoom : "lib/jquery-plugins/magnifier",
		code : "lib/jquery-plugins/verify"
	},
	shim : {
		lunbo : {
			deps : ["jquery"]
		},
		fly : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		},
		ui : {
			deps : ["jquery"]
		},
		code : {
			deps : ["jquery"]
		}
	}
})