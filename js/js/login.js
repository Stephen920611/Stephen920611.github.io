/*!
	登录页面  js
*/

//加载配置文件
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery','jquery.cookie'],function($){
		
		var spans = $('.loginctop span');
		var cons = $('.content');
		var logincverify = $('.logincverify1');
		var loginin = $('.logincin');
		var timer,
			i=0,
			url;
		/*
			点击登录切换页面
		 */
		bg();
		spans.click(function(){
			$(this).addClass('loginclick').siblings().removeClass('loginclick');
			$(this).parent('.loginctop').next().children('.loginccon').eq( $(this).index() ).show().siblings().hide();
		});
		/* 背景自动切换*/
		timer = setInterval(function(){
			i++;
			i = i >= 4 ? 1 : i;
			url = `url(../imgs/login-bg${i}.jpg)`;
			cons.css('backgroundImage',url);
		},3000);

		//点击图片切换时候，换背景色和数字
		logincverify.click(function(){
			bg();
		});
		/*随机生成背景颜色和四位数字验证码*/
		function bg(){
			var bgcolor = '0123456789abcdef';
			var c = '#';
			var f = '';
			/*生成背景颜色c*/
			for(var i=0; i<6; i++){
				/*0-15*/
				var n = parseInt( Math.random()*16 );
				c += bgcolor[n];
			}
			/*生成四位数字验证码*/
			var f = parseInt( Math.random( )*Math.pow(36,4) ).toString(36) ;

			logincverify.css('background-color',c);
			logincverify.html(f);
		};

		loginin.click(function(){
			var account = $('.account').val();
			var pwd = $('.password').val();
			//判断是否输入为空
			if(account=='' || pwd == ''){
				alert('用户名或者密码不能为空');
				return;
			}

			//使用ajax进行登录
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/login.php',
				data: {
					account: account,
					password: pwd
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status) {
						alert('登录成功');

						//判断是否需要自动登录
						//if( $('#remember').prop('checked') ){
							var userinfo = {
								account: account,
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
						//}

						//大部分会跳转到首页
						location.href = 'index.html';
					}else{
						alert('登录失败');
					}
				}
			});
		});



	});
});
