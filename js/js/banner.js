define(['jquery'],function(){
	$(function(){
		var banner = {
			imgs: $('.banner .bannerleft div .bannerimg'),
			spans: $('.banner .bannerleft .bannernum span'),
			banner: $('.banenr .bannerleft'),
			timer: null,
			now: 0,
			next: 0,
			/*初始化*/
			init: function(){
				this.autoplay();
				this.spansenter();
				/*this.btnSwitch();*/
			},
			/* 按钮滑过 */
			spansenter: function(){
				var _this = this;
				this.spans.on('mouseenter',function(){
					$(this).addClass('active1').siblings().removeClass('active1');
					_this.now = _this.spans.eq( $(this) );
					console.log( $(this).eq() );
					_this.imgSwitch();
				})
			},
			/* 自动轮播 */
			autoplay: function(){
				var _this = this;
				timer = setInterval(function(){
					_this.next++;
					_this.next %= 4;
					_this.now = _this.next;
					_this.imgSwitch();
				},1500)
			},
			/* 图片淡入淡出*/
			imgSwitch: function(){
				this.imgs.eq( this.now ).fadeTo(500,1).siblings().fadeTo(500,0);
				this.spans.eq( this.now ).addClass('active1').siblings().removeClass('active1');
			}
			/*btnSwitch: function(){
				var _this = this;
				this.banner.mouseenter(function(){
					clearInterval(_this.timer);
				});
				this.spans.mouseleave(function(){
					_this.autoplay();
				})
			}*/
			/*btnSwitch: function(){
				var _this = this;
				this.spans.mouseenter(function(){
					_this.imgs.eq( _this.index ).fadeTo(500,1).siblings().fadeTo(500,0);
					_this.spans.eq( _this.index ).addClass('active1').siblings().removeClass('active1');
					clearInterval(timer);
				});
				this.spans.mouseleave(function(){
					_this.autoplay();
				})
			}*/
		};
		banner.init();
	});
	
});