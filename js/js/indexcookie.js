/*  
	首页的cookie
*/

//配置文件
define(['jquery','jquery.cookie'],function(){
	$(function(){
		var loginco = $('.login-cookie'),
			//cookie 是个字符串,所以要转化成对象
			cookie = JSON.parse ( $.cookie('userinfo') );
			//console.log( cookie,cookie.login_status,cookie.account);
		if( cookie.login_status == 1 ){
			loginco.html( '你好'+ cookie.account );
		}
	});
});
