;
(function($){
	function Carousel({imgs, width, height, duration, isAutoPlay, showPrevNext, showCircle}) {
		this.imgs = imgs; // 保存需要轮播切换图片的数组{src, href}
		this.width = width; // 轮播图容器宽度
		this.height = height; // 轮播图容器高度
		this.lis = null; // 轮播图片的 LI 盒子
		this.circles = null; // 小圆点盒子
		this.currentIndex = 0; // 当前显示图片的索引
		this.nextIndex = 1; // 即将显示图片的索引
		this.timer = null; // 自动轮播切换的计时器id
		this.duration = duration || 3000; // 轮播切换时间间隔
		this.container = null;
		this.isAutoPlay = typeof isAutoPlay === "boolean" ? isAutoPlay : true;
		this.showPrevNext = showPrevNext;
		this.showCircle = showCircle;
	}

	Carousel.prototype = {
		constructor : Carousel,
		init : function(container){ // 初始化，动态创建轮播图布局结构
			// 动态生成的li、小圆点、向前/后 的HTML字符串
			let lis = "", circles = "", prevNext = "";
			this.imgs.forEach(function(img){
				lis += `<li><a href="${img.href}"><img src="${img.src}"></a></li>`;
				circles += `<i></i>`;
			});
			if (this.showCircle) // 是否显示小圆点
				circles = `<div class="pages">
							 ${circles}
						   </div>`;
			if (this.showPrevNext) // 是否显示向前/后按钮
				prevNext = `<div class="prev">&lt;</div>
							<div class="next">&gt;</div>`;

			// 布局结构
			let html = `<ul>
							${lis}
						</ul>
						${circles}
						${prevNext}`;
			// 将布局结构添加到容器中
			$(container).html(html);
			// css样式设置
			$(container).addClass("xm-container")
						.css({
							width: this.width,
							height: this.height
						})
						.find("img").css({
							width: this.width,
							height: this.height
						});
			// 获取所有的轮播图片li盒子与小圆点的盒子
			this.lis = $("li", $(container));
			this.circles = $("i", $(container));
			// 第一个
			this.lis.eq(0).show();
			if (this.showCircle)
				this.circles.eq(0).addClass("current");
			// 设置所使用到的容器属性
			this.container = $(container);
			// 注册事件监听
			this.registerEventListener();
		},
		autoPlay : function(){ // 自动轮播
			if (this.isAutoPlay) { // 是否自动轮播
				this.timer = setInterval(()=>{
					this.move();
				}, this.duration);
			}
		},
		move : function(){
			// 当前正显示图片淡出
			this.lis.eq(this.currentIndex).stop().fadeOut(200);
			// 即将显示图片淡入
			this.lis.eq(this.nextIndex).stop().fadeIn(200);

			// 修改小圆点样式
			this.circles.eq(this.currentIndex).removeClass("current");
			this.circles.eq(this.nextIndex).addClass("current");

			// 修改索引值
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.lis.length)
				this.nextIndex = 0;
		},
		enter : function(){
			clearInterval(this.timer);
		},
		leave : function(){
			this.autoPlay();
		},
		over : function(elem){
			// 获取当前elem小圆点在其兄弟元素中的索引
			let _index = $(elem).index();
			if (_index === this.currentIndex)
				return;
			this.nextIndex = _index;
			this.move();				
		},
		prev : function(){
			this.nextIndex = this.currentIndex - 1;
			if (this.nextIndex < 0)
				this.nextIndex = this.lis.length - 1;
			this.move();
		},
		registerEventListener : function(){
			// 在轮播容器中鼠标移入、移出
			this.container.hover(()=>{
				this.enter();
			}, ()=>{
				this.leave();
			});
			// 小圆点移入事件
			let that = this;
			$(".pages", this.container).on("mouseover", "i", function(){
				that.over(this);
			});
			// 向前/后翻页
			$(".prev", this.container).click(()=>{
				this.prev();
			});
			$(".next", this.container).click(()=>{
				this.move();
			});
		}
	};

	$.fn.carousel = function(options){
		this.each(function(){
			let c = new Carousel(options);
			c.init(this);
			c.autoPlay();
		});
	};


	// $.prototype.carousel = function(){}
	/*$.fn.extend({
		carousel : function(){}
	});*/

	// $.fn.extend() -- 为 jQuery 对象的实例添加扩展功能
	// $.extend() -- 为 jQuery 函数对象本身扩展功能
})(jQuery);