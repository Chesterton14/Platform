Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

layui.use(['element','layer'], function() {
	var element = layui.element;
	var layer = layui.layer;
	var hrefArr = [];

	element.on('nav(test)', function(elem) {
		//console.log(elem); //得到当前点击的DOM对象
		var layhref = elem[0].attributes[1].nodeValue;

		if (hrefArr.indexOf(layhref) !== -1) {
			if (elem[0].innerText == "系统设置" || elem[0].innerText == "用户设置") {
				return;
			}
			layer.msg('此页面已打开', {icon:7,time: 1000} ); 
			return;
		}

		hrefArr.push(layhref);

		if (elem[0].innerText == "系统设置" || elem[0].innerText == "用户设置") {
			return;
		}

		element.tabAdd('demo', {
			title: elem[0].innerHTML,
			content: '<iframe src="' + layhref +'" frameborder="0"  scrolling="0" style="width:100%;height:100%"></iframe>',
			id: layhref
		});

		setTimeout(function() {
			//获取tab-title最后一个子节点
			//console.log($('#tab-title'));
			$('#tab-title')[0].lastChild.previousElementSibling.classList.remove('layui-this');
			$('#tab-title')[0].lastChild.classList.add('layui-this');
			//获取content最后一个子节点
			$('#tab-content')[0].lastChild.previousElementSibling.classList.remove('layui-show');
			$('#tab-content')[0].lastChild.classList.add('layui-show');
		}, 0);

	});


	element.on('tabDelete(demo)', function(data) {
		//console.log(data.elem);
		var thisHref = this.parentNode.getAttribute("lay-id");
		hrefArr.remove(thisHref);
	});
	

	

});

	function changePwd(){
		layui.use('layer', function() {	
			var layer = layui.layer;
			layer.open({
				type: 2,
				shade: 0.2,
				title: ['修改信息'],
				area: ['800px','650px'],
				content: 'editUser.html' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			});
		})
	}

