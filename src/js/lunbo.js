window.onload = function(){
	var lis = $(".lunbo"), // 所有轮播图片
			length = lis.length, // 图片张数
			liWidth = lis[0].clientWidth, // 图片宽度
			currentIndex = 1, // 当前图片索引
			nextIndex = 2, // 即将图片索引
			timer = null,
			duration = 3000,
			circles = null;
		/* 复制第一张与最后一张图片盒子 */
		var first = lis[0].cloneNode(true),
			last = lis[length - 1].cloneNode(true);
		/* 添加 */
		$("#pic").append(first);
		$("#pic").prepend(last,lis[0]);
		/* 动态添加小圆点 */
		var html = "";
		for (var i = 0; i < length; i++) {
			html += "<i></i>";
		};
		$("#pages").append(html);
		circles = $("#pages").children();
		circles[0].className = "current";
		// 图片张数修改
		length += 2;
		/* 动态设置 ul#pic 宽度 */
		$("#pic").css({
			width : length * liWidth,
			left : -liWidth
		})
		// 轮播切换函数
		function move() {
			// 定位终值
			var _left = -1 * nextIndex * liWidth;
			// 运动动画
			$("#pic").animate({left: _left}, 500, function(){
				// 判断，是否还原定位位置
				if (currentIndex >= length - 1){
					currentIndex = 1;
					nextIndex = 2;
					$("#pic").css({left : -liWidth});
				} else if (currentIndex === 0) {
					currentIndex = length - 2;
					nextIndex = length - 1;
					$("#pic").css({left : -(length - 2) * liWidth});
				}
			});
			// 设置红色小圆点索引
			var circleIndex = nextIndex - 1;
			if (circleIndex >= length - 2)
				circleIndex = 0;
			else if (circleIndex < 0)
				circleIndex = length - 3;
			for (var i = 0; i < length - 2; i++) {
				circles[i].className = "";
			}
			circles[circleIndex].className = "current";
			currentIndex = nextIndex;
			nextIndex++;
		}
		timer = setInterval(move, duration);
		/* 鼠标移入/移出容器范围，停止/重启自动轮播 */
		$("#container").on("mouseenter", function(){
			clearInterval(timer);
		});
		$("#container").on("mouseleave", function(){
			timer = setInterval(move, duration);
		});

		/* 小圆点移入 */
		$("#pages").on("mouseover", function(e){
			e = e || event;
			let src = e.target || e.srcElement;
			if (src.nodeName === "I") { // 小圆点
				// 移入小圆点的索引
				var _index = Array.from(circles).indexOf(src);
				if (currentIndex === _index + 1)
					return;
				nextIndex = _index + 1;
				move();
			}
		});
		/* 向前/后翻页 */
		$("#prev").on("click", function(){
			nextIndex = currentIndex - 1;
			move();
		});
		$("#next").on("click", function(){
			move();
		});
}
