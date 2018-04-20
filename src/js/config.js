//配置requireJS
require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4",
		template : "lib/art-template/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		loadHF : "js/loadHeaderFooter",
		fly : "lib/jquery-plugins/jquery.fly.min",
		lunbo : "lib/jquery-plugins/slide"
	},
	shim : {
		lunbo : {
			deps : ["jquery"]
		}
	}
})