
var HdTools = {
	jsloadArray:{},
	loadJs: function(jsUrl, fun){
		var self = this;
		var callback = (typeof fun == 'function') ? fun : function(){};
		if(self.jsloadArray[jsUrl]){
			callback();
		}else{
			$.ajax({
				dataType:'script',
				url: jsUrl,
				cache:true,
				success:function(){
					self.jsloadArray[jsUrl] = true;
					callback();
				}
			});
		}
	},
	loadJs2: function(jsUrl, fun1,fun2){
		var self = this;
		var callback1 = (typeof fun1 == 'function') ? fun1 : function(){};
		var callback2 = (typeof fun2 == 'function') ? fun2 : function(){};
		if(self.jsloadArray[jsUrl]){
			callback1();
		}else{
			jQuery.getScript(jsUrl, function(){
				self.jsloadArray[jsUrl] = true;
				callback2();
			});
		}
	}
};
//自动完成
function showAutocomplete(){
    var jsUrl = "//www.huimg.cn/lib/wap/jquery.autocomplete.search-20160905.js";
	HdTools.loadJs2(jsUrl,function(){
		$("body").css("overflow-y","hidden");
		$("#search_autocomplete").show();
		$("#q").focus().click();
	},function(){
		auto_complete_crossdomain_general("#search_autocomplete input[type='text']:first", 3, "doc", "100%");
		$("body").css("overflow-y","hidden");
		$("#search_autocomplete").show();
		$("#q").focus().click();
	});
}
var AlbumInterface = {};
function iniAlbum(callback){
	if(typeof $$imgAlbum != 'object'){
		return;
	}
	//为兼容https，去掉http请求协议
	var jsUrl1 = "//www.huimg.cn/wap/js/iscroll-zoom.min.js";
	var jsUrl2 = "imgScroll-20190406.js";
	HdTools.loadJs(jsUrl1,function(){
		HdTools.loadJs(jsUrl2,function(){
			if(!AlbumInterface['imgAlbumScroll']){
				AlbumInterface['imgAlbumScroll'] = $.imgAlbumScroll($$imgAlbum,$('.wrap').find('img'));
			}
			callback();
		});
	});
}
var catalogueScroll = null;
function showCatalogueScroll(callback){
		var jsUrl = "//www.huimg.cn/wap/js/iscroll-zoom.min.js";
		HdTools.loadJs(jsUrl,function(){
			callback();
		});
}
function updateAlbum(img_eles,imgAlbums){
		if(img_eles!=null&&img_eles.length>0){
				if(typeof(countImg) != "undefined" && $("#albumLength").length > 0){
					countImg = countImg+img_eles.length;
					$("#albumLength").text(countImg+"张图");
				}
				iniAlbum(function(){
					if(imgAlbums!=null&&imgAlbums.length>0){
						AlbumInterface.imgAlbumScroll.updateImgAlbum(imgAlbums,img_eles);
					}else{
						AlbumInterface.imgAlbumScroll.updateImgBind(img_eles);
					}
				})
		}
}

//异步加载百科帮你涨姿势后  因为其中可能包含有图片，所以更新相册信息 将图片加入相册
function updateSurveyAlbum(){
			var baikesurvey_img = $('.baikesurvey .img img').first();
			if(baikesurvey_img==null||baikesurvey_img.length<1){
				return;
			}
			var baikesurvey_src = baikesurvey_img.attr('src');
			if(baikesurvey_src==null||baikesurvey_src==""){
				return;
			}
			var title = "";
			var img_title = baikesurvey_img.attr('title');
			var discription = baikesurvey_img.parent().parent().select("strong").first();
			if(discription!=null&&discription.length>0){
			    title = $.trim(discription.text());
			}else if(img_title!=null&&img_title!=""){
				title = img_title;
			}else{
				title = $.trim($("#doctitle").val());
			}
			
			var flag = false ;
			var zy_src = $('.zy .img img').first().attr('src');
			if(zy_src==null||zy_src==""){
				flag = true;
			}
			var imgAlbums = [];
			var count = 1;
			
			if(typeof $$imgAlbum != 'object'){
				imgAlbums.push({'src':baikesurvey_src,'title':title});
			}else{
				$.each($$imgAlbum, function(i, n){
				if(count==1){
					if(flag){
						imgAlbums.push({'src':baikesurvey_src,'title':title});
						imgAlbums.push({'src':i,'title':n});
					}else{
						imgAlbums.push({'src':i,'title':n});
						imgAlbums.push({'src':baikesurvey_src,'title':title});
					}
				}else{
					imgAlbums.push({'src':i,'title':n});
				}
				count++;
			});
			}
			updateAlbum(baikesurvey_img,imgAlbums);
}

function updateTextAlbum(){
			if(typeof $$imgAlbum != 'object'){
				return;
			}
			var now_imgs = $('.wrap').find('img');
			if(now_imgs==null||now_imgs.length<1){
				return;
			}
			updateAlbum(now_imgs,null);
}
var t1 = null;
function myclick(){
	if (t1 == null){
		t1 = new Date().getTime();
	}else{		
		var t2 = new Date().getTime();
		if(t2 - t1 < 500){
			t1 = t2;
			return;
		}else{
			t1 = t2;
		}
	}
	$('.bot').toggle('fast');
	$('.header-lv3').toggle('fast');
}
var _preventTouchMove = function (e){ 
	e.preventDefault();
 };
function addPreventTouchMove(){
	document.getElementsByTagName('body')[0].addEventListener('touchmove',_preventTouchMove , false);
}
function removePreventTouchMove(){
	document.getElementsByTagName('body')[0].removeEventListener('touchmove', _preventTouchMove, false);
}

/* 根据prd判断是否隐藏底部跳转 */
function hideMyappJudgeByReq(){
	var array= new Array();
	array = location.href.split('&prd=');
	for(i=0;i<array.length;i++){
	   var value =  array[i];
	    if(value=='myapp'){
	      $('#my_app').attr('style','display:none');
		   break;
	    }
	}
}

//给正文中的表格增加左右滑动事件
var table_IScrolls = {};
function scrollTables($text){
		if(null==$text){
			return;
		}
		var $scrollables = $text.find('div.scrollable');
		if($scrollables.length<1){
			return;
		}
		var jsUrl = "//www.huimg.cn/wap/js/iscroll-zoom.min.js";
		HdTools.loadJs(jsUrl,function(){
			$scrollables.each(function(){
				var $this = $(this);
				var scrollTable_id = $.trim($this.attr("id"));
				if(""!=scrollTable_id&&scrollTable_id.indexOf("scrollTable_")==0){
					if(!table_IScrolls[scrollTable_id]){
						var _scroll = new IScroll('#'+scrollTable_id, {						
							scrollX: true,
							scrollY: true,
							eventPassthrough:true
							});
							_scroll.on('beforeScrollStart',function(){
								console.log('bytedance://disable_swipe')
								var imgs = $('#'+scrollTable_id).find("img");
								if(imgs.length>0){
									this.refresh();
								}
							});
							_scroll.on("scrollEnd",function(){
								console.log('bytedance://enable_swipe')
							})
							table_IScrolls[scrollTable_id] = true;
					}
				}
				//此处只是为了初始化第一个导航栏目
				if("nav_module_div" == $text.attr("id")){
					return false;
				}
			});
		});
}
$(function(){
	$('#search_autocomplete').on("touchmove",function(e){
			e.preventDefault();
	});
	$('.header-lv3').on("touchmove",function(e){
			e.preventDefault();
	});
	$('.img-view .black-bg').on("touchmove",function(e){
			e.preventDefault();
	});
	$("a[class='iclose']").on('click',function(){
		$("body").removeAttr("style");
		$("#search_autocomplete").hide();
	});
	$("em[class='idel']").on('click',function(){
		$("#search_autocomplete input[type='text']:first").val("");
		$(this).hide();
	});
	$("#top_search_ipt").attr('readonly','readonly');
	$("#top_search_ipt").on('click',function(){
			showAutocomplete();
	});
	$('.jt-l').parent().on('click',function(){
			$('.img-view').hide();
	});
	$('#imgAlbum').on('click','li',myclick);
	if(typeof $$imgAlbum == 'object'){
		iniAlbum(function(){});
	}
	
	$('.search-form .inpb').click(function(){
		var $this = $(this);		
		$this.css({"color": "#ff8400"})
		setTimeout(function(){
				$this.removeAttr("style");
			},600);
		var keyword=document.getElementById('q').value.replace(/^\s*|\s*$/g,'');
		if(keyword!=''){
			if(typeof LRU_array == "object"){
					LRU_array.add(keyword);
			}
			window.open('//so.baike.com/m/doc/'+encodeURIComponent(keyword)+'&prd=so_m');
		}
	});
	$('.search-form  .input-button').click(function(){
		var $this = $(this);
		$this.css({"color": "#ff8400"})
		setTimeout(function(){
				$this.removeAttr("style");
			},600);
	});
	hideMyappJudgeByReq();
	setTimeout(function() {
		try {
			var hash = window.location.hash;
			if(hash){
				$("#list-catalogue li["+hash.substr(1, hash.length)+"]").tap();
			}
		}catch(e) {
			
		}
	}, 500);
});
