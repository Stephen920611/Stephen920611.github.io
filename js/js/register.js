/*!
	注册页面  js
*/

//加载配置文件
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery'],function($){
		
		/* 获取各个需要的元素*/
		var inputs = $('.conturnred');
		var contitles = $('.con-title');
		var bgColor= $('.conrightimg');
		var bgSwitch = $('.conrightchange');
		var conoks = $('.con-ok');

		//当进入页面的时候就随机生成数字和颜色
		bg();
		/*封装随机生成背景颜色和四位数字验证码*/
		function bg(){
			console.log(1);
			var bgcolor = '0123456789abcdef';
			var c = '#';
			var f = '';
			//生成背景颜色c
			for(var i=0; i<6; i++){
				/*0-15*/
				var n = parseInt( Math.random()*16 );
				c += bgcolor[n];
			};
			//生成四位数字验证码
			var f = parseInt( Math.random()*Math.pow(36,4) ).toString(36) ;

			//往方框里写背景颜色和数字
			bgColor.css('background-color',c);
			bgColor.html(f);
		};
		//点击换一换变换验证码
		var n = 0;
		bgSwitch.on('click',function(){
			bg();
			n++;
			var rotate = "rotate("+360*n+"deg)";
			$(this).find('.conrightrotate').css({"transform": rotate});
			
		});


		//定义各个注册信息的状态  默认都是false
		var regStatus = {
			phone: false,
			verify: false,
			text: false,
			uname: false,
			pwd: false,
			confirm: false
		};

		//定义需要用到的变量input
		var contentphone = $('.contentphone');
		var contentverify = $('.contentverify');
		var contextclick = $('.contextclick');
		var contentuser = $('.contentuser');
		var contentpwd = $('.contentpwd');
		var contentconfirm = $('.contentconfirm');
		var contentchecked = $('.contentchecked');
		var registnow = $('.con-registnow');
		/*手机验证 (失焦验证  手机是否合法 不合法提示输入手机号码)*/
		var regPhone = /^1[3578]\d{9}$/;
		contentphone.blur(function(){
			$(this).css('border-color','#ff6f4a');
			var phone = contentphone.val();
			//假设手机正确
			regStatus.phone = true;
			//判断手机号是否正确
			if( !regPhone.test(phone) ){
				$(this).css('border-color','#ff6f4a');
				$(this).siblings('.con-title').show();
				$(this).siblings('.con-ok').hide();

				regStatus.phone = false;
				return;
			}
			var _this = this;
			//判断手机号是否已被注册
			$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: phone
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						$(_this).siblings('.con-title').hide();
						$(_this).siblings('.con-ok').show();
					}else{
						$(_this).siblings('.con-title').show();
						$(_this).siblings('.con-ok').hide();
						regStatus.phone = false;
					}
				}
			});
		});
		contentphone.click(function(){
			$(this).siblings('.con-title').hide();
		});

		/*验证码验证 (失焦验证  验证码是否合法 不合法提示输入验证码)*/
		var regverify = /^[a-z1-9]{4}$/;
		contentverify.blur(function(){
			$(this).css('border-color','#ff6f4a');
			var verify = contentverify.val();
			var verify1 = bgColor.html();

			//判断验证码是否正确
			if( regverify.test(verify) && verify == verify1){
				$(this).siblings('.con-title').hide();
				$(this).siblings('.con-ok').show();
				$(this).css('border-color','#ddd');
				regStatus.verify = true;
				return;
			}else{
				$(this).siblings('.con-title').show();
				$(this).siblings('.con-ok').hide();
			}

		});
		contentverify.click(function(){
			$(this).siblings('.con-title').hide();
		});
		/*短信验证码验证 (失焦验证  验证码是否合法 不合法提示输入验证码)*/
		var regText = /^\d{6}$/;
		contextclick.blur(function(){
			$(this).siblings('.con-title').show();
			//获取短信验证码内容
			var textval = contextclick.val();
			//判断是否正确
			if( regText.test(textval) ){
				$(this).siblings('.con-title').hide();
				$(this).siblings('.con-ok').show();
				regStatus.text = true;
				return;
			}
		});
		contextclick.click(function(){
			$(this).siblings('.con-title').hide();
		});

		/*用户名验证 (失焦验证  用户名是否合法 并且要跟数据库里的比较)*/
		var regUser = /^\w{4,20}$/;
		contentuser.blur(function(){
			$(this).css('border-color','#ff6f4a');
			var user = contentuser.val();
			//假设用户名正确
			regStatus.uname = true;
			//判断用户名是否正确
			if( !regUser.test(user) ){
				$(this).siblings('.con-title').show();
				$(this).siblings('.con-ok').hide();
				regStatus.uname = false;
				return;
			}else{
				$(this).siblings('.con-title').hide();
				$(this).siblings('.con-ok').show();
				$(this).css('border-color','#ddd');
			}
			var _this = this;
			//判断用户名是否已被注册
			$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: user
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						//用户名可用
						$(_this).siblings('.con-title').hide();
						$(_this).siblings('.con-ok').hide();
						$(_this).siblings('..con-exist').show();
						$(_this).css('border-color','#ff6f4a');
					}else{
						//用户名已存在
						$(_this).siblings('.con-title').show();
						$(_this).siblings('.con-ok').hide();
						regStatus.uname = false;
					}
				}
			});
		});
		contentuser.click(function(){
			$(this).siblings('.con-title').hide();
		});


		/*密码验证 (密码点击和失焦 )*/
		var regPwd = /^[\w!@#$%^&*+]{8,20}$/;
		var regRuo = /^\d{1,5}|[a-z]{1,5}$/;
		var regQiang = /^[!@#$%^&*+]{8,}$/
		//失焦判断
		contentpwd.blur(function(){
			var pwd = contentpwd.val();
			$(this).parents('.content1').find('.con-passwordstr').hide();
			$(this).siblings('.con-title').show();
			//如果密码满足条件就显示
			if( regPwd.test(pwd) ){
				$(this).siblings('.con-ok').show();
				$(this).siblings('.con-title').hide();
				regStatus.pwd = true;
			}else{
				$(this).siblings('.con-ok').hide();
				$(this).siblings('.con-title').show();
			}
		});
		//点击时候状态
		contentpwd.click(function(){
			$(this).parents('.content1').find('.con-passwordstr').show();
			$(this).siblings('.con-title').hide();
		});
		//输入的时候判断密码强度
		contentpwd.on('input',function(){
			var pwd = contentpwd.val();
			if( regQiang.test(pwd) ){
				$(this).parents('.content1')
				.find('.contentpwdruo').css('background-color','#fc9720')
				.siblings('.contentpwdzhong').css('background-color','#fc9720')
				.siblings('.contentpwdqiang').css('background-color','#fc9720');
			}else if( regRuo.test(pwd) ){
				$(this).parents('.content1')
				.find('.contentpwdruo').css('background-color','#fc9720');
			}else if( !pwd){
				$(this).parents('.content1')
				.find('.contentpwdruo').css('background-color','#eee')
				.siblings('.contentpwdzhong').css('background-color','#eee')
				.siblings('.contentpwdqiang').css('background-color','#eee');
			}else{
				$(this).parents('.content1')
				.find('.contentpwdruo').css('background-color','#fc9720')
				.siblings('.contentpwdzhong').css('background-color','#fc9720');
			};
		});

		/*确认密码 (判断俩密码一样么)*/
		contentconfirm.blur(function(){
			var pwd = contentpwd.val();
			var cfpwd = contentconfirm.val();
			$(this).siblings('.con-title').show();
			//如果确认密码满足条件就显示
			if( pwd == cfpwd ){
				$(this).siblings('.con-ok').show();
				$(this).siblings('.con-title').hide();
				regStatus.confirm = true;
			}else{
				$(this).siblings('.con-ok').hide();
				$(this).siblings('.con-title').show();
				regStatus.confirm = false;
			}
		});
		//点击时候状态
		contentconfirm.click(function(){
			$(this).siblings('.con-title').hide();
		});

		/**/

		//点击登录
		registnow.on('mouseenter',function(){
			//判断所有的信息状态，如果有不合法的，不能注册
			if(regStatus.confirm && regStatus.pwd && regStatus.uname && regStatus.text && regStatus.verify && regStatus.phone){
				$(this).css({"background-color":"#33cb98 ","color":"#fff"});
			}else{
				alert('部分数据不合法');
			};
		})
		registnow.click(function(){
			
			//通过ajax提交表单数据
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: contentuser.val(),
					password: contentpwd.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						alert('注册成功');
					}else{
						alert('注册失败');
					}
				}
			});
		});
	});
});

