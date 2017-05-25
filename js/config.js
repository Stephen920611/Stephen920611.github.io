/*
	配置文件
*/

require.config({
	baseUrl: '../js',
	paths: {
		'jquery': 'lib/jquery-1.11.3',
		'banner': 'js/banner',
		'register': 'js/register',
		'login': 'js/login',
		"jquery.cookie": "plug/jquery.cookie",
		"template": "plug/template",
		'indexcookie': 'js/indexcookie',
		'detail': 'js/detail'
	},
	//处理非AMD规范的js文件    指定某个文件的依赖  || 暴露接口
	shim: {
		'banner': ['jquery'],
		'register': ['jquery'],
		'login': ['jquery'],
		'detail': ['jquery'],
		"jquery.cookie": ['jquery'],
		'template': ['jquery']
	}
});