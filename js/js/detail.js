/*
	详情页
 */
/*
	分析： 商品的信息
	1、商品名称
	2、价格
	3、商品图片 （大图 小图）
	4、分类
		编号
		价格
		类型
		库存

	{
		gid: 10001,
		gname:  ,
		gprice:
		...
		color: {
			"1000101": {
				id: ,
				price: ,
				type: ,
				stock: 
			}
		}
	}
	
	怎么存储cookie？（cookie格式）
	cookie: 
		{
			"1000101": {
				id: "1000101",
				amount: 1
			},
			"1000102": {
				id: "1000102",
				amount: 1
			}
		}
 */
//配置文件
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery','template'],function($,template){

		/*
			1、渲染颜色分类（读取数据）
			2、颜色的切换
			3、增加数量
			4、减少数量
			5、直接修改input
			6、加入购物车
		 */
		var detail = {
			data: {},
			init: function(){
				var _this = this;
				//读取商品数据(JSON文件格式必须正确，否则获取失败，除了数字都必须加双引号)
				$.getJSON('../../json/data.json',function(result){
					_this.data = result;
					//将a标签都放进盒子
					var list = template('type-list',result);
					$('.prodrightoptioncon').html(list);

					//选中第一个
					var first = $('.prodrightoptioncon a:first');
					first.addClass('selected');

					var id = first.data('id');
					first.parents('.productright').find('.prodrightpricechange').html( result.option[id].sale_price );
					first.parents('.productright').find('.stock-num').html( result.option[id].stock );
				});
			}
		};
		detail.init();
	})
});