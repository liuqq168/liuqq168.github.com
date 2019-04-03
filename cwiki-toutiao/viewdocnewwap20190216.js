document.write("<script language=javascript src='//www.huimg.cn/lib/jquery.qrcode.min.js'></script>");
var navScroll;
//有热点参考内容
var hasBaikeArchive;
//有百科涨姿势内容
var hasBaikeSurvay;
//需要的广告类型 1要通投  2不要通投
var adTypeNeed = 1;
//相关人物栏目增加左右滑动属性 创建iscroll实例
var canScroll;	//滚动事件
var hasGuanMingAd = false;//有冠名广告
var notLoadedAD = true;//是否已经加载过底部广告
var isEsLoad = false;
var fxflag = null;//分享标记,区分页面不同的分享内容

function rela_loaded () {
	rela_resize();
	navScroll = new IScroll('#conBox', {
		scrollX: true,
		scrollY: false,
		momentum: true,
		eventPassthrough:true
	});
}

//相关人物栏目增加左右滑动属性样式
function rela_resize(){
	var lis = $('#conBox li');
	var windowWidth = 100;
	$('#conBox ul').css({ width:(windowWidth*lis.length)+'px'});
}

//判断请求是否来自 高德？一点资讯？云知声？墨迹天气？ 根据fr参数判定
function judgeByReq(_target){
	var href = location.href;
	var href_index = href.indexOf(_target);
	if(href_index>0){
		return true;
	}
	return false;
}
function loadFooterAD(){
	if(isEsLoad&&notLoadedAD){
		$("footer").show();
		notLoadedAD = false;
		$("footer div.ad_xuanban").each(function(index,value){
			$(value).show();
			if($(value).find('iframe').length !== 0){
				var ad_id = $(value).attr('id').replace('hd_ad_doc_','');
				var iframe_id = "hd_ad_doc_iframe_"+ad_id;
				document.getElementById(iframe_id).contentWindow.HDAdvertisement.resize();
			}
		});
	}
}

function showBrandDirectOrPickAdv(){
	if($("#hd_ad_doc_107")){
		$("#hd_ad_doc_107").attr("class","");
		$("#hd_ad_doc_107").show();
	}
	if($("#hd_ad_doc_108")){
		$("#hd_ad_doc_108").attr("class","");
		$("#hd_ad_doc_108").show();
	}
}

//加载完成
$(window).load(function() {
	//console.log('baike log - init finish')
	console.info('baike log - init finish')
	//显示底部 与 右侧插件浮层广告
	var hasBottomAd = false;
	if($("#hd_ad_doc_82") && $("#hd_ad_doc_82").find('iframe').length != 0){
		hasBottomAd = true;
		$("#hd_ad_doc_82").show();
		//var iframe_id = "hd_ad_doc_iframe_82";
		//document.getElementById(iframe_id).contentWindow.HDAdvertisement.resize();
	}
	if($("#hd_ad_doc_83") && $("#hd_ad_doc_83").find('iframe').length != 0){
		hasGuanMingAd = true;
		$("#btn_guanming").show();
		//var iframe_id = "hd_ad_doc_iframe_83";
		//document.getElementById(iframe_id).contentWindow.HDAdvertisement.resize();
	}else{
		//没有冠名广告
		$("#btn_guanming").remove();
	}
	//仅有冠名的时候bottom:100px--冠名加底部固定广告bottom:140px;
	if(!hasBottomAd && hasGuanMingAd){
		$("#handDiv").css("bottom","100px");
	}else if(hasBottomAd && hasGuanMingAd){
		$("#handDiv").css("bottom","140px");
	}
	$("#btn_guanming").click(function(){
		$("#hd_ad_doc_83").show();
	});
	$("#closeBottomAd").click(function(){
		if(!hasGuanMingAd){
			$("#handDiv").css("bottom","50px");
		}else if(hasGuanMingAd){
			$("#handDiv").css("bottom","100px");
		}
	});
});


var is_yidianzixun = false;
var is_zhwnl = false;
var is_shunli = false;
var is_gaode = false;
var is_yunzhisheng = false;
var is_xunfei = false;
var is_haokan = false;
var is_huangli = false;
var is_zhongsou = false;
var is_maimai = false;
$(document).ready(function () {

	document.domain = 'liuqq168.github.io';

	//热点参考 显示更多点击事件
	$("#showMoreBaikeArchives").click(function(){
		$("li.nodisplay ").filter(":lt(5)").show();
		$("li.nodisplay ").filter(":lt(5)").removeClass("nodisplay");
		if($("li.nodisplay ").length < 1){
			$("#showMoreBaikeArchives").hide();
		}
	});

	//回到顶部点击事件
	$("#to_top").click(function(){
		if($("#hd_ad_doc_72").length > 0 && $("#hd_ad_doc_72").css("display") == "block"){
			$('html body').scrollTop(105);
		}else{
			$('html body').scrollTop(20);
		}
		document.getElementById('word_menu_bg').style.display='none';
	});

	/*$(".wrapper img").lazyload({ effect : "fadeIn",threshold : 100});*/
	/*正文目录与正文展开与收拢*/
	//cwiki页面不需要此类功能
	/* $("#content .h2_line").click(function () {
		var subsectionid = $(this).attr("id");
		var type = $("#" + subsectionid + "em").attr("class");
		var nextDivobj = $("#"+subsectionid).next("div");
		if (type != null && type == "bthide") {
			nextDivobj.slideDown();
			$("#" + subsectionid + "em").removeClass("bthide").addClass("btshow");
		} else if (type == "btshow") {
			nextDivobj.slideUp();
			$("#" + subsectionid + "em").removeClass("btshow").addClass("bthide");
		}
	}); */

	/*涨姿势的标题栏点击事件*/
	$('.wrap').on('click', '.baikesurvey .h2_line', function(){
		var emTag = $(this).find('em');
		var self = $(this);
		var apiUrl = '//guancha.baike.com/getBKSurveyText.do';
		if (emTag.hasClass("bthide")) {
			if(!self.next('.survey').hasClass('loaded')){
				var args = {
					action: 'ajaxQueryText',
					baikeId: $(this).attr('ref')
				};
				$.ajax({
					url : apiUrl,
					type : 'GET',
					data : args,
					dataType : 'jsonp',
					jsonp : 'callback',
					async: true,
					success : function(details){
						if(details.baikeId){
							var showSurvey = details.text || '';/*[TODO]获取接口内容中的涨姿势部分，如果需要还有做一些处理*/
							self.next('.survey').html(showSurvey);
							self.next('.survey').addClass('loaded');
						}else{
							self.next('.survey').find('p').html('加载失败');
						}
					},
					error: function(){
						self.next('.survey').find('p').html('加载失败');
					}
				});
			}
			self.next('div.survey').slideDown();
			emTag.removeClass("bthide").addClass("btshow");
		}else {
			if (emTag.hasClass("btshow")) {
				self.next('div.survey').slideUp();
				emTag.removeClass("btshow").addClass("bthide");
			}
		}
	});

	$('h3.bklogo').on('click',function(){
		window.location.href = "//3g.baike.com";
	});
	/*获取涨姿势内容，并且填充到指定区域，但是设置为不可见的*/
	var getSurvey = function(callback){
		$('.baikesurvey').hide();
		var doctitle = $('.wrap').find('h1:first').html();
        var doctitle=doctitle.replace('<em class="btn-VRdisplay">全景</em>','');
		var apiUrl = '//guancha.baike.com/getBKSurveyNewsShow.do';/*[TODO]接口url，如果需要拼接参数*/
		if(doctitle){
			var args = {
				objectid: doctitle,
				pageSize: 10,
				productid: 'doc',
				appcode: 'baikesurvey'
			};
			$.ajax({
				url : apiUrl,
				type : 'GET',
				data : args,
				dataType : 'jsonp',
				jsonp : 'callback',
				success : function(details){
					/*[TODO]接口格式不确定，要重写*/
					if(details.docTitle){
						/*[TODO]获取接口内容中的涨姿势部分，如果需要还有做一些处理*/
						if(details.baikeSurveyDTO && details.baikeSurveyDTO.contentExt){
							hasBaikeSurvay = 1;
							var surveyImg = details.baikeSurveyDTO.contentExt['surveyImgURL'],surveyImgTitle = details.baikeSurveyDTO.contentExt['surveyImgRemak'];
							if(surveyImg){
								$('.baikesurvey').find('.summary').append('<div class="img img_r" ><a><img title='+surveyImgTitle+' alt='+surveyImgTitle+' src="'+surveyImg.replace('_140','')+'"></a><strong>'+surveyImgTitle+'</strong></div>');
							}
							var showSummary = details.baikeSurveyDTO.contentExt['summary'];
							if(showSummary){
								$('.baikesurvey').find('.summary').append(showSummary);
								var lastInfo = details.baikeSurveyDTO.baseInfo;
								var lastDate = new Date(lastInfo['createTime']);
								var lastDateStr = lastDate.getFullYear()+'-'+(lastDate.getMonth()+1)+'-'+lastDate.getDate();

								if (details.baikeSurveyDTO.surveyText) {
									//$('.baikesurvey').append('<span class="h2_line" ref="'+lastInfo['id']+'"><em class="bthide"></em>'+lastInfo['baikeTitle']+'<time>'+lastDateStr+'</time></span>');
									$('.baikesurvey').append('<div class="survey loaded" style="display:none;">'+details.baikeSurveyDTO.surveyText+'</div>');
								}
							}
						}else{
							$('.baikesurvey').find('.summary').hide();
						}
						if(details.dtoList){
							var k = 0;
							for(var i=0; i<details.dtoList.length;i++){/*[TODO]获取接口内容中的相关部分，将内容填充进来*/
								var tdoInfo = details.dtoList[i].baseInfo;
								var tdoDate = new Date(tdoInfo['createTime']);
								if(tdoInfo['isArchive'] == '1'){
									var tdoDateStr = tdoDate.getFullYear()+'-'+(tdoDate.getMonth()+1)+'-'+tdoDate.getDate();
									if(tdoInfo['imgUrl'] == '' || tdoInfo['imgUrl'] == null || tdoInfo['imgUrl'] == undefined){
										tdoInfo['imgUrl'] = '//www.huimg.cn/public/codefaultimg_140.gif';
									}
									var to_style = '';
									var no_display = '';
									k++;
									if(k > 3){
										to_style = ' style="display:none;"  ';
										no_display = ' class="nodisplay "';
										$("#showMoreBaikeArchives").show();
									}
									//$("#baikePlusDiv").show();
									hasBaikeArchive = '1';
									var baikeTitle=tdoInfo['baikeTitle'];
									if(tdoInfo['baikeTitle'].length>20){
										baikeTitle=baikeTitle.substr(0,20);
										baikeTitle=baikeTitle+'...';
									}
									var year=new Date(parseInt(tdoInfo['createTime'])).getFullYear();
									var month=new Date(parseInt(tdoInfo['createTime'])).getMonth()+1;
									if(month<10){
										month="0"+month;
									}
									var date=new Date(parseInt(tdoInfo['createTime'])).getDate();
									if(date<10){
										date="0"+date;
									}
									var t_date=year+"-"+month+"-"+date

									$("#baikePlusList").append('<li '+no_display+"   "+to_style+'><a href="//plus.baike.com/m/articles/'+tdoInfo['id']+'.html?prd=citiao_dangan_news" class="gray3"><span class="img"><img src="'+tdoInfo['imgUrl']+'"></span><p class="h45">'+baikeTitle+'</p><em class="gray9">'+t_date+'</em></a></li>');
								}
							}
						}
						callback(true);
					}else{
						callback(false);
					}
				},
				error: function(){
					callback(false);
				}
			});
		}else{
			callback(false);
		}
	}


	var getOne = function(subsectionid, callback){
		var subsection = $("#"+subsectionid);
		var nextDiv = subsection.next("div");
		subsection.show();
		nextDiv.show();
		scrollTables(nextDiv);
		callback(nextDiv.text().length);
	};

	var getBefore = function(targetId, idArray, callback){
		var len = idArray.length, flag = len;
		var isBreak = false;
		if(len < 1){
			getOne(targetId,function(code){
				if(code >= 0){
					callback(true);
				}else{
					callback(false);
				}
				isBreak = true;
			});
		}else{
			var cbFun = function(code){
				flag -= 1;
				if(flag == 0){
					getOne(targetId,function(code){
						if(code >= 0){
							callback(true);
						}else{
							callback(false);
						}
						isBreak = true;
					});
				}else{
					getOne(idArray[flag-1],cbFun);
				}
			}
			getOne(idArray[flag-1],cbFun);
		}
	};

	if($('#catalogue').length === 0){
		$("#btn-catalogue").show();
		$("#btn-catalogue").css("opacity",".3");
	}
	var hideCatalogue = function(){
		//	removePreventTouchMove();
		$('#catalogue').removeClass('on');		
		$("#fbg").hide();//浮层也隐藏
		$('body').css("overflow","visible");//页面恢复滚动
	};

	var showCatalogue = function(){
		//	addPreventTouchMove();
		$('#catalogue').addClass('on');
		$('body').css("overflow","hidden");//页面禁止滚动
	};
	//显示导航栏 按钮点击事件
	$("#btn-catalogue").on('click',function(){
		//console.log('baike log - click navigator')
		console.info('baike log - click navigator')
		if($('#catalogue').length === 0){
			return;
		}
		$("#sitenavi").hide();
		$("#fbg").show();
		canScroll=0;
		if($("#catalogue.on").length == 0){
			var fullheight = $(window).height();
			$("#list-catalogue").css('min-height',fullheight);
			$("#list-catalogue").css('max-height',fullheight);
			showCatalogueScroll(function(){
				if(!catalogueScroll){
					catalogueScroll = new IScroll('#list-catalogue',{
						tap:true,
						bindToWrapper:true,
						click:true
					});
					showCatalogue();
					catalogueScroll.refresh();
				}else{
					showCatalogue();
				}
			});
		}else{
			hideCatalogue();
		}
		return false;
	});
	$(window).resize(function(){
		var fullheight = $(window).height();
		$("#list-catalogue").css('min-height',fullheight);
		$("#list-catalogue").css('max-height',fullheight);
	});
	//栏目点击事件 点击导航栏栏目名称 跳转到对应的位置
	$(document).on('tap','#list-catalogue li[catalogkey]',function(){
		//console.log('baike log - click menu')
		console.info('baike log - click menu')
		var targetId = '',targetElement = $(),targetHtml = '',self = $(this);
		$("#fbg").css("display", "none");
		openContent();
		canScroll=1;
		$('#list-catalogue li[catalogkey]').removeClass('current');
		(!self.has('current'))||self.addClass('current');

		if($(this).hasClass('lv2')){
			pLevel = $(this).prevAll().not('.lv2').not("li[catalogkey^='custom_']").eq(0);
			targetId = pLevel.attr('catalogkey');
			targetHtml = $(this).find('a').html();
			targetElement = $("#"+targetId).next('div');
		}else{
			targetId = $(this).attr('catalogkey');
			targetElement = $("#"+targetId);
			if(targetId.indexOf('custom_')==0){
				var scroll_top = targetElement.prop('offsetTop');
				$('body').animate({scrollTop:scroll_top-60}, 'normal');
				$('.pop_msg').hide();
				hideCatalogue();
				$('#loading').hide();
				return;
			}
		}
		var beforeLi = $(this).prevAll().not('.lv2').not("li[catalogkey^='custom_']");
		var idArray = [];
		beforeLi.each(function(ind, el){
			idArray.push($(el).attr('catalogkey'));
		});
		$('#msg_wait.pop_msg').html('加载中...').show();

		hideCatalogue();
		$('#loading').hide();
		$('#load-more').show();

		getBefore(targetId, idArray, function(result){
			//if(result){
			var subIndex = 0;
			if(targetHtml){
				targetElement.find('h3').each(function(ind, subtitle){
					if($(subtitle).html() == targetHtml){
						targetElement = $(subtitle);
						subIndex = ind;
						targetElement.attr('id',targetId+'sub-'+subIndex);
					}
				});
			}
			var id = targetElement.attr('id');
			var scroll_top = $('#'+id).prop('offsetTop');
			//	$('body').animate({scrollTop:scroll_top-60}, 'normal');
			$('body').scrollTop(scroll_top-60);
			$('.pop_msg').hide();
			//}else{
			//$('#msg_tips.pop_msg').html('抱歉，网络连接有问题<br/>请稍后访问！').show().fadeOut(3000);
			//}
		});


	});

	$(document).on('tap',"i[class='iclose']",function(){
		hideCatalogue();
	});

	//功能：阻止黑色背景点击
	//$('.word_menu_bg').on('click',function(){return false;});

	$("body").on('click',function( ){
		hideCatalogue();
	});

	var loadMore = function(e,isFromYisou){
		isFromYisou = (isFromYisou === true);
		var firstHidden = $("#content .h2_line:hidden").eq(0);
		if(firstHidden.length === 0){
			if($("footer").is(':hidden') || e.type !== 'scroll'){
				$('#load-more').html('没有更多了！').show().fadeOut(3000);
				$("footer").show();
				$(".foot").show();
			}
			//	if(!isFromYisou){
			//		$('#content .nav-module').show();
			//	}
			return false;
		}
		var targetId = firstHidden.attr('id');
		$('#load-more').hide();
		$('#loading').show();
		getOne(targetId,function(code){
			$('#loading').hide();
			//半自动去掉
			//	if(!isFromYisou){
			//		$('#load-more').show();
			//	}
			//	if(code < 0){
			//$('#msg_tips.pop_msg').html('抱歉，网络连接有问题<br/>请稍后访问！').show().fadeOut(3000);
			//	}
		});
	};
	$("#load-more").on('click',loadMore);

	var startScroll = function(isFromYisou){
		isFromYisou = (isFromYisou === true);
		/*//Todo 当多个广告是需修改
		 var hdbizid = $('#hdAdBizId').val();
		 var ehd_base_src = '//ehd.baike.com/fetchehd?biztype=xuanban&bizid='+hdbizid+'&domain=www.baike.com';
		 var interval_ehd1 = setInterval(function(){
		 if($('input#ad_load_flag').val() && $('center div.ad_xuanban').find('iframe').length !== 0){
		 var ad_id = $('center div.ad_xuanban').attr('id').replace('hd_ad_doc_','');
		 var new_ehd_src = ehd_base_src + '&dwidth=320&dheight=50&location=' + ad_id;
		 new_ehd_src += '&iframeid=hd_ad_doc_iframe_' + ad_id;
		 new_ehd_src += '&adholderid=hd_ad_doc_' + ad_id;
		 $('center div.ad_xuanban').find('iframe').attr('src',new_ehd_src);
		 clearInterval(interval_ehd1);
		 }
		 },200);*/
		if(!isFromYisou){
			//显示顶部广告
			if(isEsLoad){
				$('center').show();
				$('center div.ad_xuanban').show();
				if($('center div.ad_xuanban').find('iframe').length !== 0){
					var ad_id = $('center div.ad_xuanban').attr('id').replace('hd_ad_doc_','');
					var iframe_id = "hd_ad_doc_iframe_"+ad_id;
					document.getElementById(iframe_id).contentWindow.HDAdvertisement.resize();
				}
			}
		}
		var scrollCount = 0;
		/*var initTop = 0;
		 var $headerword = $('#header-word');
		 var $catalogue = $('#catalogue');*/
		$(window).bind("scroll",function(e){
			//console.log('baike log - scroll start')
			console.info('baike log - scroll start')
			// 然后判断窗口的滚动条是否接近页面底部
			//半自动去掉
			//	if( $(document).scrollTop() + $(window).prop('innerHeight') > $(document).height() - 50 ){
			//if(Math.abs($('#anchor').offset().top-$(window).scrollTop()-($(window).height()*0.8))<400){
			if((($(document).scrollTop())%($(window).height()))>$(window).height()*0.8){
				var contentHeight = $("#content").height();
				var contentMaxHeight = $("#content").css("max-height");
				if(contentHeight>=1000&&contentMaxHeight=="1000px"){
					$(".unfold-full").css("display", "");
				}
				if(isFromYisou){
					loadMore(e,isFromYisou);
				}else {
					if(scrollCount){
						loadMore(e,isFromYisou);
					}else{
						var firstHidden = $("#content .h2_line:hidden").eq(0);
						var targetId = firstHidden.attr('id');
						scrollCount += 1;
						$("#loading").show();
						getOne(targetId,function(code){
							if(code < 0){
								$('#msg_tips.pop_msg').html('抱歉，网络连接有问题<br/>请稍后访问！').show().fadeOut(3000);
							}
							$("#loading").hide();
							//	$("#load-more").show();
							//	$('#content .nav-module').show();
							if(isEsLoad){
								$("footer").show();
								//$("footer div.ad_xuanban").show();
								//修改：iframe高度自适应
								$("footer div.ad_xuanban").each(function(index,value){
									$(value).show();
									if($(value).find('iframe').length !== 0){
										var ad_id = $(value).attr('id').replace('hd_ad_doc_','');
										var iframe_id = "hd_ad_doc_iframe_"+ad_id;
										document.getElementById(iframe_id).contentWindow.HDAdvertisement.resize();
									}
								});
							}
							//显示底部广告
							/*$("footer div.ad_xuanban").each(function(index,value){
							 if($(value).find('iframe').length !== 0){
							 var ad_id = $(value).attr('id').replace('hd_ad_doc_','');
							 var new_ehd_src = ehd_base_src + '&dwidth=320&dheight=52&location=' + ad_id;
							 new_ehd_src += '&iframeid=hd_ad_doc_iframe_' + ad_id;
							 new_ehd_src += '&adholderid=hd_ad_doc_' + ad_id;
							 $(value).find('iframe').attr('src',new_ehd_src);
							 }
							 });*/
							$(".foot").show();
						});
					}

				}
			}
		});
	};
	/*展示页面，页面展示从这个地方开始*/
	(function(){
		//隐藏过长的表格
		$("table").each(function(){
			var obj = this;
			var trObj = $(obj).find('tr');
			var trLength = trObj.length;
			if(trLength > 3){
				var i = 0;
				$(trObj).each(function(){
					if(i > 2){
						$(this).hide();
					}
					i++;
				});
				var objParent = $(obj).parent(".scroller"),objAfter;
				objParent.length>0?objAfter=objParent:objAfter=obj;
				$(objAfter).after("<em class=\"btn_allTD2 mar-b15 gray7\" onclick='showTable($(this).parent().find(\"table\").eq(0));$(this).hide();'>查看完整表格<svg><use xlink:href='#ico-x3j'/></svg></em>");
			}
		});

		//后台过滤了菜单栏的超链接属性，在这里重新激活
		$("#irwl").attr("href","//lanwei.baike.com/");
		$("#ijiemi").attr("href","//plus.baike.com/m/nbaikejiemi");
		//$("#ifocus").attr("href","//m.baike.com/tuijian/");
		$("#ikexue").attr("href","//m.baike.com/so/");
		$("#iindoc").attr("href","//m.baike.com/top/");
		$("#ipic").attr("href","//m.baike.com/tupian/");
		$("#ibaikefm").attr("href","//fm.baike.com/");
		//$("#ad-xnsc-a").attr("href","//www.baike.com");
		$("a[isuserlink=1]").each(function(){
			var userIden = $(this).attr("idenattr");
			$(this).removeClass("a_del");
			$(this).addClass("gray7");
			$(this).attr("href","//i.baike.com/profile.do?useriden="+userIden);
		});
		$("#personRelaList").css("width","100%");
		var doctitle = $('.wrap').find('h1:first').html();//[XXX]
		$("#btn-renwubk").attr("href","//guancha.baike.com/personalBaikeV2.do?action=card&docTitle="+doctitle);
		$("#btn-renwubk").removeClass("a_del");
		$("#btn-renwubk").addClass("btn-renwubk");

		var appFromUrl = $("#appFromUrlId").val();
		$("#btnMaiMaiId").attr("href",appFromUrl);

		$("#personRelaList").css("width","100%");
		//处理底部导航栏表格 左右滑动
		scrollTables($("#nav_module_div"));
		//cwiki使正文里的表格可以拖动
		scrollTables($("div"));
		$(window).bind("scroll",function(e){
			/*	//大于2屏  显示to_top按钮
			 if($(window).scrollTop() > ($(window).height()*2)){
			 $("#to_top").show();
			 }else{
			 $("#to_top").hide();
			 }
			 */
			//$('#btn-catalogue').hide();
			$('#to_top').hide();
			$('#btn_guanming').hide();
			var nearestId = "";
			var nearestValue = 0;
			var i = 0;
			var top_distance = document.body.scrollTop;
			if (document.documentElement && document.documentElement.scrollTop){
				top_distance = document.documentElement.scrollTop;
			}else if (document.body){
				scroll_top = document.body.scrollTop;
			}
			var screen_height = $(window).height();
			//$("#custom_zy, .xinxi, #custom_qiyeInfo, .related, .h2_line").each(function(){
			//$("#custom_zy, .xinxi,#ciyundiv , #tucediv , #timelinediv , #custom_qiyeInfo, .related, .h2_line").each(function(){
			$("#custom_zy, .xinxi,#custom_ciyun , #custom_tuce , #custom_timeline , #custom_qiyeInfo, .related, .h2_line").each(function(){
				var obj = $(this);
				if($(this).offset().top < top_distance+screen_height){
					i++;
					if(i == 1){
						nearestValue = Math.abs($(this).offset().top-top_distance);
						nearestId = $(this).attr("id");
					}
					if(Math.abs($(this).offset().top-top_distance) <= nearestValue && $(this).offset().top-top_distance != 0){
						nearestValue = Math.abs($(this).offset().top-top_distance);
						nearestId = $(this).attr("id");
					}
				}
			});
			if(nearestId != ""){
				$('#list-catalogue li[catalogkey]').removeClass('current');
				$('#list-catalogue li[catalogkey='+nearestId+']').addClass('current');
			}
		});
		var refer = document.referrer, referReg = /\/\/([^\/]+).yisou.com\//i, referReg2 = /\/\/([^\/]+).sm.cn\//i, referReg3 = /\/\/([^\/]+).uodoo.com\//i;
		var isFromYisou = referReg.test(refer);
		if(judgeByReq("fr=yidian")){
			is_yidianzixun = true;
		}
		if(judgeByReq("fr=zhwnl")){
			is_zhwnl = true;
		}
		if(judgeByReq("fr=shunli")){
			is_shunli = true;
		}
		if(judgeByReq("fr=gaode")){
			is_gaode = true;
		}
		if(judgeByReq("fr=yunzhisheng")){
			is_yunzhisheng = true;
		}
		if(judgeByReq("fr=xunfei")){
			is_xunfei = true;
		}
		if(judgeByReq("fr=haokan")){
			is_haokan = true;
		}
		if(judgeByReq("fr=huangli")){
			is_huangli = true;
		}
		if(judgeByReq("fr=zhongsou")){
			is_zhongsou = true;
		}
		if(judgeByReq("prd=citiao_maimai")){
			is_maimai = true;
		}

		isFromYisou = isFromYisou || referReg2.test(refer)||referReg3.test(refer)||is_yidianzixun||is_zhwnl||is_shunli||is_yunzhisheng||is_xunfei||is_haokan||is_huangli||is_zhongsou||is_maimai;
		if(typeof EsLoad =="function"){
			isEsLoad = true;
		}
		$('center').hide();
		$('footer iframe').hide();
		$('div.ad_xuanban').hide();
		if(!isFromYisou && !is_gaode){//非来自yisou和高德
			//一次加载所有广告填充src
			try{
				isEsLoad&&EsLoad();
			}catch(e){}
		}else if(is_gaode){//来自高德
			adTypeNeed = 2;//只要定投广告
			isEsLoad&&EsLoad();
		}else{
			$.cookie("docCookie","adDocCookie",{expires:0.00035});
		}
		//$('.wrapper').hide();
		//$('#content .nav-module').hide();
		//注释分类树
		//$('.btn_treepop').hide();
		$('#load-more').css('clear','left').hide();
		$('#loading').css('clear','left');
		$('#msg_tips.pop_msg').css('margin-left','-110px');
		$('#msg_tips.pop_msg').css('text-align','center');
		$('#msg_wait.pop_msg').html('加载中...').show();

		var hashId = window.location.hash;
		if(hashId){
			hashId = hashId.replace('#','');
			if(hashId.indexOf("pos=")!=-1){
				hashId = hashId.replace('pos=','');
				window.location.hash="#"+hashId;
			}
			//过滤头条在CWIKI路径后追加参数
			if(hashId.indexOf("hack=1")!=-1){
                hashId = '';
			}
		}



		/*开始获取涨姿势内容，如果返回true，并且文章内容还没显示出来，则设置为可见的
		 如果文章内容显示出来，则绑定滚动事件，只在滑动到最上方的时候才显示涨姿势内容
		 */
		//$('#baikePlusDiv').eq(0).before('<div id="custom_zzs" class="baikesurvey" style="display:none;"><div class="summary"><span class="ico-dangan">百科帮你涨姿势<i></i></span></div></div>');

		getSurvey(function(ok){
			if(ok === true){
				setTimeout(function(){
					if( $('.wrapper').is(':hidden')
					//|| $(document).scrollTop() < $('#baikePlusDiv').eq(0).offset().top - 100
					){
						//$('#custom_zzs').show();
					}else{
						$(window).bind("scroll.survey", function(){
							// 然后判断窗口的滚动条是否接近页面底部
							if( $(document).scrollTop() < $('.wrap').offset()['top'] && $('.baikesurvey').is(':hidden')){
								//$('#custom_zzs').show();
								$(window).unbind("scroll.survey")
							}
						});
					}
					if(hasBaikeSurvay == 1){
						//相关人物目录后面
						var custom_related = $('li[catalogkey="custom_related"]');
						//基本信息后面
						var custom_xinxi = $('li[catalogkey="custom_xinxi"]');
						//摘要后面
						var custom_zy = $('li[catalogkey="custom_zy"]');
						//工商信息后面
						var custom_qiye = $('li[catalogkey="custom_qiyeInfo"]');
						/*if(custom_qiye.length > 0){
						 custom_qiye.after('<li catalogkey="custom_zzs"><a href="javascript:void(0)">百科帮你涨姿势</a></li>');
						 }else if(custom_related.length>0){
						 custom_related.after('<li catalogkey="custom_zzs"><a href="javascript:void(0)">百科帮你涨姿势</a></li>');
						 }else if(custom_xinxi.length > 0){
						 custom_xinxi.after('<li catalogkey="custom_zzs"><a href="javascript:void(0)">百科帮你涨姿势</a></li>');
						 }else if(custom_zy.length > 0){
						 custom_zy.after('<li catalogkey="custom_zzs"><a href="javascript:void(0)">百科帮你涨姿势</a></li>');
						 }else{
						 $('#list-catalogue ul').before('<li catalogkey="custom_zzs"><a href="javascript:void(0)">百科帮你涨姿势</a></li>');
						 }*/
					}

					if(hasBaikeArchive == "1"){
						//涨姿势后面
						//var custom_zzs = $('li[catalogkey="custom_zzs"]');
						//相关人物目录后面
						var custom_related = $('li[catalogkey="custom_related"]');
						//基本信息后面
						var custom_xinxi = $('li[catalogkey="custom_xinxi"]');
						//摘要后面
						var custom_zy = $('li[catalogkey="custom_zy"]');
						//工商信息后面
						var custom_qiye = $('li[catalogkey="custom_qiyeInfo"]');

						/*if(custom_zzs.length>0){
						 custom_zzs.after('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }
						 else if(custom_related.length>0){
						 custom_related.after('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }else if(custom_qiye.length > 0){
						 custom_qiye.after('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }else if(custom_xinxi.length > 0){
						 custom_xinxi.after('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }else if(custom_zy.length > 0){
						 custom_zy.after('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }else{
						 $('#list-catalogue ul').before('<li catalogkey="baikePlusDiv"><a href="javascript:void(0)">热点参考</a></li>');
						 }*/
					}


					//更新相册
					updateSurveyAlbum();
				}, 500)
			}
		});

		//注释分类树
		// 判断是否有分类树，并填充分类树区域内容，并显示
		/*var docTitle = $('.wrap').find('h1:first').html();
		 $.ajax({
		 url: '//api.hudong.com/categoryTree.do',
		 type: 'GET',
		 dataType: 'jsonp',
		 jsonp : 'callback',
		 timeout: 30000,
		 data:{
		 action: 'hasCategoryTree',
		 docTitle: decodeURIComponent(docTitle)
		 },
		 success: function(result){
		 if(result.status == 1){
		 var curCategory = result.value[0].currentCategory,curTree = result.value[0].currentTree;
		 if(curCategory){
		 var showTitle = curCategory.title.length > 10 ?curCategory.title.substring(0,9)+'...' : curCategory.title;
		 $('div.tree_link').find('a i').after(showTitle);
		 $('div.tree_link').find('a').attr('href','//category.widget.baike.com/g/categorytree/'+docTitle+'.html');
		 $('div.tree_link').show();
		 $('div.btn_treepop').find('a').html(showTitle);
		 $('div.btn_treepop').find('a').attr('href','//category.widget.baike.com/g/categorytree/'+docTitle+'.html');
		 $('div.btn_treepop').show();
		 }
		 }
		 },
		 error: function(e){

		 }
		 }); */

		var limitNum = 400;
		var zyNum = $('.zy').text().length;
		limitNum -= zyNum;
		//if(limitNum > 0){
		if(true){
			var allLi = $('#list-catalogue li').not('.lv2').not('.gg-w650h250');

			var idArray = [];
			allLi.each(function(ind, el){
				var  id = $(el).attr('catalogkey');
				if(id.indexOf('custom_')!=0){
					idArray.push(id);
				}
			});
			var isBreak = false;
			var i = 0;
			var callbackFun = function(code){
				if(code >= 0){
					limitNum -= code;
					if(limitNum < 0){
						$('.wrapper').show();
						$('.pop_msg').hide();
						if(hashId){
							$("#list-catalogue li[catalogkey="+hashId+"]").trigger('tap');
						}
						startScroll(isFromYisou);
					}else{
						i += 1;
						if(i<idArray.length){
							getOne(idArray[i],callbackFun);
						}else{
							$('.wrapper').show();
							$('.pop_msg').hide();
							if(hashId){
								$("#list-catalogue li[catalogkey="+hashId+"]").trigger('tap');
							}
						}
					}
				}else{
					$('.wrapper').show();
					$('.pop_msg').hide();
					//$('#msg_tips.pop_msg').html('部分内容加载超时！').show().fadeOut(3000);
					if(hashId){
						$("#list-catalogue li[catalogkey="+hashId+"]").trigger('tap');
					}
					startScroll(isFromYisou);
				}
			}
			if(i<idArray.length){
				getOne(idArray[i],callbackFun);
			}else{
				$('.wrapper').show();
				$('.pop_msg').hide();
			}
		}else{
			$('.wrapper').show();
			$('.pop_msg').hide();
			if(hashId){
				$("#list-catalogue li[catalogkey="+hashId+"]").trigger('tap');
			}
			startScroll(isFromYisou);
		}
		if((!isFromYisou && !is_gaode) || is_gaode){
			showBrandDirectOrPickAdv();
		}
	})()
	
	/**
	if(!(is_yidianzixun||is_zhwnl||is_shunli||is_haokan||is_huangli||is_zhongsou||is_maimai)){
		//犀牛浮层广告
		var adCookie=$.cookie("ad-xnsc");
		//如果本地没有cookie，将词条cookie写入本地
		if(adCookie!="ad-xnsc"){
			$("#ad-xnsc").show();
		}
		//如果本地存在词条cookie，不显示浮层
		if(adCookie=="ad-xnsc"){
			$("#ad-xnsc").hide();
		}
		//关闭广告，隐藏浮层
		$("#ad-xnsc-close").click(function(){
			$("#ad-xnsc").hide();
			$.cookie("ad-xnsc","ad-xnsc",{expires:60});
		});
	}
	**/
	//如果人物关系存在 则实例化iscroll实例
	if($("#conBox").length > 0){
		//基本信息目录后面或第一个
		var custom_xinxi = $('li[catalogkey="custom_xinxi"]');
		//企业工商信息
		var custom_qiye = $('li[catalogkey="custom_qiyeInfo"]');
		if(custom_qiye.length > 0){
			custom_qiye.after('<li catalogkey="custom_related"><a href="javascript:void(0)">相关人物</a></li>');
		}else if(custom_xinxi.length>0){
			custom_xinxi.after('<li catalogkey="custom_related"><a href="javascript:void(0)">相关人物</a></li>');
		}else{
			$('#list-catalogue ul').before('<li catalogkey="custom_related"><a href="javascript:void(0)">相关人物</a></li>');
		}
		rela_loaded();
	}
	//当信息模块少于5个的时候，不显示底部按钮
	if($("#custom_xinxi ul li").length<=5){
		$(".xinxi-unfold").hide();
		$("#custom_xinxi").removeClass("lines3");
	}
	//移除导致页面宽度异常的div样式
	$(".nav-module").removeAttr("style");
});




//导航模块收起和展开
function switchNavModule(navmoduleid) {
	if (document.getElementById("navData-" + navmoduleid).style.display == "none") {
		document.getElementById("nav-h2-" + navmoduleid).style.backgroundPosition = "10px -19px";
		document.getElementById("navsphidden_" + navmoduleid).style.display = "";
		document.getElementById("navspshow_" + navmoduleid).style.display = "none";
		document.getElementById("navData-" + navmoduleid).style.display = "";
	} else {
		document.getElementById("nav-h2-" + navmoduleid).style.backgroundPosition = "10px 7px";
		document.getElementById("navsphidden_" + navmoduleid).style.display = "none";
		document.getElementById("navspshow_" + navmoduleid).style.display = "";
		document.getElementById("navData-" + navmoduleid).style.display = "none";
	}
	//刷新
	var scrollDivNav = $("#navData-" + navmoduleid);
	scrollTables(scrollDivNav);
}

function showapp() {
	var useragent = navigator.userAgent;
	useragent = useragent.toLowerCase();
	if (useragent.indexOf("android") > 0 || useragent.indexOf("juc") > 0) {
		window.location = '//appserver.baike.com/deploy/guancha/baikeguancha.apk';
	} else if (useragent.indexOf("ios") > 0 || useragent.indexOf("iuc") > 0 || useragent.indexOf("iphone") > 0 || useragent.indexOf("ipad") > 0) {
		window.location = 'https://itunes.apple.com/us/app/bai-ke-guan-cha/id629847557';
	} else {
		window.location = '//about.hudong.com/m/baikeguancha.html';
	}
}

//jQuery cookie library 给浏览器增加cookie 
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

function wap_list(){
	var flag=$('#polysemyAll').hasClass('on');
	if(!flag){
		$('#polysemyAll').addClass('on');
		$('#polysemyAll').find('em').text('收起义项列表');
	}else{
		$('#polysemyAll').removeClass('on');
		$('#polysemyAll').find('em').text('更多义项');
	}
}
//下载二维码
function ajax_post(){
	var url="//static.hudong.com/55/12/26100000006141139538128888041.gif";
	window.open("//www.baike.com/wikdoc/sp/commonForWap.do?action=downloadPic&url="+encodeURIComponent(url));
}

//下载图片
function downloadPic(){
	var pic_index=$('.f16').text();
	var obj = $("#imgAlbum ul li");
	var url =obj[pic_index-1].firstChild.firstChild.firstChild.src;
	window.open('//www.baike.com/wikdoc/sp/commonForWap.do?action=downloadPic&url='+encodeURIComponent(url));
}

//导航
function btn_menu(){
	var dis=$('#fbg').css('display');

	if(dis =='none'){
		document.getElementById('fbg').style.display='block';
		document.getElementById('sitenavi').style.display='block';
		document.getElementById('header-word').style.zIndex='11';
		canScroll=0;
	}else{
		var dis=$('#fbg').css('display');
		document.getElementById('fbg').style.display='none';
		document.getElementById('sitenavi').style.display='none';
		document.getElementById('header-word').style.zIndex='4';
		canScroll=1;
	}

}

//隐藏过长的表格
function showTable(tableObj){
	var trObj = $(tableObj).find('tr');
	$(trObj).each(function(){
		$(this).show();
	});
}

//打开分享
function share(obj){
	fxflag = $(obj).parent().attr('class');
	document.getElementById('fbg').style.display='block';
	document.getElementById('share-con').style.display='block';
	canScroll=0;

}
//关闭分享
function share_close(obj){
	document.getElementById('fbg').style.display='none';
	document.getElementById('share-con').style.display='none';
	document.getElementById('share-pop-page2').style.display='none';
	canScroll=1;
}

$(function(){
	//分享到空间(分享微博写到了评论js里)
	$('#qzone').click(function(){
		if(fxflag== "fixed-rb" ||fxflag=="bot-fixed" || fxflag=="pd10"){//评论和词条分享
			var title = $('#doctitle').val();
			var summary=$('#custom_zy p').text();
			if (summary.length >120){
				summary=summary.substr(0,119)+"...";
			}
			window.open('//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(title)+'&pics=&summary='+summary+'&desc='+summary);
		}else if(fxflag.indexOf("card") >= 0){//名人认证名片分享
			var title = "";
			if(fxflag=="card"){
				title = $('.card_info h2').text();
			}else if(fxflag=="card2"){
				var titleStr = $('.card_info2 h2').text().split('<img');
				title=titleStr[0];
			}
			url = "//www.baike.com/newtop/common/starcard.html?title=" + title;
			window.open('//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title));
		}

	});
	$('#weixin').click(function(){
		$('#qrcode').empty();
		if(fxflag== "fixed-rb" ||fxflag=="bot-fixed" || fxflag=="pd10"){//评论和词条分享
			var $share_weixin= $('#share-pop-page2');
			$share_weixin.find('img').attr('src',"//a7.att.hudong.com"+$('#titlemd5').val());
			$('#qrcode img').remove();
			$('.ishare img').attr('width','180').attr('height','180');
			$share_weixin.show();
		}else if(fxflag.indexOf("card") >= 0){//名人认证名片分享
			var title = "";
			if(fxflag=="card"){
				title = $('.card_info h2').text();
			}else if(fxflag=="card2"){
				var titleStr = $('.card_info2 h2').text().split('<img');
				title=titleStr[0];
			}
			url_tmp = "//www.baike.com/newtop/common/mrcard.html?title=" + title;
			url = encodeURI(url_tmp);
			var $share_weixin = $('#share-pop-page2');
			//生成二维码
			$("#qrcode").qrcode({
				render: "canvas",
				width: 180,
				height:180,
				text:url
			});
			//获取网页中的canvas对象
			var mycanvas1=document.getElementsByTagName('canvas')[0];
			//将转换后的img标签插入到html中
			var img=convertCanvasToImage(mycanvas1);
			$('#qrcode').append(img);//imagQrDiv表示你要插入的容器id
			$('#qrcode canvas').remove();
			$('#qrcode').next().attr('width','0').attr('height','0');
			$share_weixin.show();
		}
	});
	//从 canvas 提取图片 image
	function convertCanvasToImage(canvas) {
		//新Image对象，可以理解为DOM
		var image = new Image();
		// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
		// 指定格式 PNG
		image.src = canvas.toDataURL("image/png");
		return image;
	}
	//初始化词条内链
	var localUrl = window.location.href;
	if(localUrl.indexOf("/cwiki/")==-1){
		var objs=$('.innerlink');
		for (var i=0;i<objs.length;i++){
		var obj=objs[i];
		obj.href="javascript:;";
		$(obj).attr("onclick","innerLink('"+obj.title+"');return false;");
		}
	}
	
	//基本信息内链浮层
	$('#custom_xinxi a').each(function (){
		var text=$.trim($(this).text());
		if("分享"!=text){
			$(this).href="javascript:;";
			$(this).attr("onclick","innerLink('"+text+"');return false;");
		}

		//touchend
		$(window).bind("touchend",function(e){
			//console.log('baike log - touch end')
			console.info('baike log - touch end')
			//$('#btn-catalogue').show();
			if(hasGuanMingAd){
				$("#btn_guanming").show();
			}
			if($(window).scrollTop() > ($(window).height()*2)){
				$("#to_top").show();
			}
			else{
				$("#to_top").hide();
			}
		});
	});

	//如果点开微信图标后 禁止底层内容滑动
	document.addEventListener('touchmove', function(event) {
		//$('#btn-catalogue').hide();
		$('#to_top').hide();
		$('#btn_guanming').hide();
		//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
		if(canScroll == 0){
			event.preventDefault();
		}
	});


	//滚动停止
	$(window).bind('scrollstop', function(e){
		//$('#btn-catalogue').show();
		if(hasGuanMingAd){
			$("#btn_guanming").show();
		}
		if($(window).scrollTop() > ($(window).height()*2)){
			$("#to_top").show();
		}else{
			$("#to_top").hide();
		}
	})
});

//浮层获取数据
function innerLink(title){
	$.ajax({
		url :'//www.baike.com/wikdoc/sp/docViewAjaxForWap.do',
		type : 'post',
		data : {
			action:'ajaxView',
			title:title
		},
		async: false,
		dataType : 'json',
		success : function(data){
			if(data.code==1){
				$('#chain-con').html('');
				var imgUrl=data.url;
				var summary=data.summary;
				if(data.url==null||data.url==undefined){
					imgUrl='';
				}
				if(data.summary==null||data.summary==undefined){
					summary='';
				}
				var str='<a href=\"//www.baike.com/gwiki/'+data.title+'" class=\"title gray3\"><span class=\"word\">'+data.title+' </span><span class=\"link blue\">查看详情</span></a><p class=\"info\"><a href=\"javascript:;\" class=\"img\"><img src=\"'+imgUrl+'\"/></a>'+summary+'</p>';
				if($("#hd_ad_doc_122_url").length > 0){
					str += '<div class="ad_xuanban" style="display: block;margin-top:8px;">';
					str += '<a href="' + $("#hd_ad_doc_122_link").val() + '" target="_blank"><img src="' + $("#hd_ad_doc_122_url").val() +  '" width="100%" height="60"></a></div>';
				}
				$('#chain-con').append(str);
				document.getElementById('fbg').style.display='block';
				//document.getElementById('chain-con').style.display='block';
				//在百科的页面，如果点击页面上的词条进行判断，如果是cwiki，出现异常情况，错误处理是直接跳转新词条页面
				//如果是gwiki，则按照正常流程走
				try {
					document.getElementById('chain-con').style.display='block';
				} catch (error) {
					document.getElementById('fbg').style.display='none';
					var tmptitle = window.location.href.split('wiki/')[1].split('&fr')[0];
					window.location.href = window.location.href.replace(tmptitle,data.title);
				}
				canScroll=0;
			}
		},
		error: function(data){
			console.info(eval(data));
		}
	});
}

//浮层获取数据，分类热词使用
function innerLinkCategoryDoc(title){
	$.ajax({
		url :'//www.baike.com/wikdoc/sp/docViewAjaxForWap.do',
		type : 'post',
		data : {
			action:'ajaxView',
			title:title
		},
		async: false,
		dataType : 'json',
		success : function(data){
			if(data.code==1){
				$('#chain-con').html('');
				var imgUrl=data.url;
				var summary=data.summary;
				if(data.url==null||data.url==undefined){
					imgUrl='';
				}
				if(data.summary==null||data.summary==undefined){
					summary='';
				}
				var str='<a href=\"//www.baike.com/gwiki/'+data.title+'" class=\"title gray3\"><span class=\"word\">'+data.title+' </span><span class=\"link blue\">查看详情</span></a><p class=\"info\"><a href=\"javascript:;\" class=\"img\"><img src=\"'+imgUrl+'\"/></a>'+summary+'</p>';
				if($("#hd_ad_doc_124_url").length > 0){
					str += '<div class="ad_xuanban" style="display: block;margin-top:8px;">';
					str += '<a href="' + $("#hd_ad_doc_124_link").val() + '" target="_blank"><img src="' + $("#hd_ad_doc_124_url").val() +  '" width="100%" height="60"></a></div>';
				}
				$('#chain-con').append(str);
				document.getElementById('fbg').style.display='block';
				document.getElementById('chain-con').style.display='block';
				canScroll=0;
			}
		},
		error: function(data){
			console.info(eval(data));
		}
	});
}

//计算字数  英文字符算半个 汉字算一个
function wordsCounter(words){
	var count = 0;
	if(!words)
		return 0;
	var len = 0;
	for (var i=0; i<words.length; i++) {
		if (words.charCodeAt(i)>127 || words.charCodeAt(i)==94) { //数字 英语字符之外的
			len += 1;
		}else {
			count++;
			if(count%2 != 0){
				len++;
			}
		}
	}
	return len;
}
//发布反馈意见
function publish(){
	var cookie = getCookie("publishMyFeed");
	if(cookie == null){
		cookie = 0;
	}
	if(cookie > 3){
		$("#operTips").html("系统繁忙...");
		$("#tip-pop").show();
		setTimeout(function(){$("#tip-pop").hide(1000);}, 3000);
		return;
	}
	//设置cookie
	setCookie("publishMyFeed",parseInt(cookie)+1);
	var feedbackcontent = $("#feedbackcontent").val();
	if(wordsCounter(feedbackcontent) > 500){
		$("#operTips").html("字数不能大于500!");
		$("#tip-pop").show();
		$("#tip-pop").hide(3000);
		return false;
	}
	var timestamp = Date.parse(new Date());
	$.ajax({
		url:"//www.baike.com/feedback.do?jsoncallback=?",
		type:"post",
		data:{"action":"save","t":timestamp,
			"channel":"wap","function":"gwikiPage","contact":$('#contact').val(),"feedbackcontent":feedbackcontent},
		dataType:"jsonp",
		jsonpCallback:"jsoncallback",
		success:function(data){
			var result = eval(data);
			if(result != null && result[0]['code'] == "0"){//成功
				$("#feadback-con").hide();
				$("#fbg").hide();
				$("#operTips").html("     发布成功.     ");
				$("#tip-pop").show();
				canScroll=1;
				setTimeout(function(){$("#tip-pop").hide(1000);}, 3000);
				$('#contact').val("");
				$("#feedbackcontent").val("");
				$("#publishBtn").attr("disabled","disabled");
			}else{
				$("#feadback-bg").hide();
				$("#operTips").html("发布失败...");
				$("#tip-pop").show();
				canScroll=1;
				$("#tip-pop").hide(3000);
			}
			return false;
		},error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#operTips").html("发布失败...");
			$("#tip-pop").show();
			canScroll=1;
			$("#tip-pop").hide(3000);
		}
	});
}
//计算反馈意见字数
function  countWords(){
	var feedbackcontent = $("#feedbackcontent").val();
	var leftCount = 500-wordsCounter(feedbackcontent);
	if(leftCount < 0 || leftCount >= 500){
		$("#publishBtn").attr("disabled","disabled");
	}else{
		$("#publishBtn").removeAttr("disabled","disabled");
	}
	$("#countWords").html(leftCount+"字");

}
//反馈意见联系人字数处理        
function countWordsOfContact(){
	var contact = $('#contact').val();
	if(wordsCounter(contact) > 30){
		$('#contact').val(contact.substring(0,30));
	}
}


//设置cookie 封装
function setCookie(name,value)
{
	var exp = new Date();
	exp.setTime(exp.getTime() + 60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function openMaskDiv(){
	$("#maskDiv").css('display','block');
}

function closeMaskDiv(){
	$("#maskDiv").css('display','none');
}

function closeHintDiv(){
	$("#hintDiv").css('display','none');
}

//添加js：//stat.baike.com/js/webstat_manage.js
(function(){
         _hdCO();
        if (window.top.frames.length == window.frames.length) {
			window.setTimeout(function(){
				FilterLM();
			}, 2000);
        }

})();

(function(){
	var hdClickS = document.createElement('script');
	hdClickS.type = 'text/javascript';
	hdClickS.async = true;
	var _isStatAdClick = false;
	if(window.location.host.indexOf(".baike.com")>0){
		hdClickS.src = '//www.huimg.cn/stat/js/XBKClickMonitor.js';
		_isStatAdClick = true;
	}else if(window.location.host.indexOf(".hudong.com")>0){
		hdClickS.src = '//www.huimg.cn/stat/js/HDClickMonitor20111102.js';
		_isStatAdClick = true;
	}
	if(_isStatAdClick){
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(hdClickS, s);
	}
})();

function _hdCO() {
	//Filter Non Hudong And Baike
	if(!window.location.host.indexOf(".hudong.com")>0 || !window.location.host.indexOf(".baike.com")>0){
		return;
	}
	if (window.top.frames.length != window.frames.length) {
		if ( typeof(_hd_virtual_iframe) != "undefined" && _hd_virtual_iframe != null) {
			try {
				StatIframeTraffic(_hd_virtual_iframe);
			}
			catch (e) {
			}
		}		
		return;
	}
	
	if (GetCookie("hd_uid") == null) {
		setCookies("hd_uid", genHDUID(), 365);
	}
	var _hd_refer = document.referrer.replace(/,/g, "%2c");
	if(_hd_refer==""){
		_hd_refer="-";
	}
	var _hd_refer_cookie = GetCookie("hd_referer");
	
	var query = window.location.search.substring();
	
	//hudong.com stat
	if(window.location.host.indexOf(".hudong.com")>0){
		if (_hd_refer_cookie!=null && judgeOwn(_hd_refer) && (!query.match("[?&]hf=")) && (!_hd_refer.match("[?&]hf="))){

		}else{
			var _hd_src=judgeTGPage(query);
			if(_hd_src==null){
				_hd_src=judgeTGPage(_hd_refer);
			}
			if(_hd_src!=null ){
				if(_hd_src!=_hd_refer_cookie){			
					setCookies("hd_referer", _hd_src,1);
				}			
			}else{
				setCookies("hd_referer", _hd_refer,1);
			}
		}
	}else if(window.location.host.indexOf(".baike.com")>0){
		if(query.match("[?&]uid=") && query.match("[?&]qid=")){
			var _tgds_src=judgeTGDSPage(query);
			if(_tgds_src!=null ){
				var names_values = _tgds_src.split(/[&]/);
				var names = new Array();
				var values = new Array();
				for(var i = 0; i < names_values.length; i++)
				{
					names[i] = "tgds"+names_values[i].split(/[=]/)[0];
					values[i] = names_values[i].split(/[=]/)[1];
				}
				setMultCookies(names, values,1);
			}
		}
		if ( _hd_refer_cookie!=null && judgeOwn(_hd_refer) && (!query.match("[?&]hf=")) && (!_hd_refer.match("[?&]hf="))   ){
	
		}else{
			var _hd_src=judgeTGPage(query);
			if(_hd_src==null){
				_hd_src=judgeTGPage(_hd_refer);
			}
			if(_hd_src!=null ){
				if(_hd_src!=_hd_refer_cookie){			
					setCookies("hd_referer", _hd_src,1);
				}			
			}else{
				setCookies("hd_referer", _hd_refer,1);
			}
		}
	}
	
	var hd_accessurl = window.location.href.replace(/,/g, "%2c");		

	if (GetCookie("hd_firstaccessurl") == null) {
		setCookies("hd_firstaccessurl", hd_accessurl,1);
	}
	var hd_res = "-";
	try {
		hd_res = getClientRes();
	}
	catch (e) {
	}
	
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.id = "_hdssojs";
	if(window.location.host.indexOf(".hudong.com")>0){
		sc.src = "//stat.hudong.com/hdWebStat.do?random=" + Math.random() + "&hd_accessrefer=" + encodeURIComponent(_hd_refer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
	}else if(window.location.host.indexOf(".baike.com")>0){
		sc.src = "//stat.baike.com/hdWebXBKStat.do?random=" + Math.random() + "&hd_accessrefer=" + encodeURIComponent(_hd_refer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
	}
	
	document.getElementsByTagName("head")[0].appendChild(sc);
}



function setCookies(name, value, day) {
	var d = new Date(); 

	d.setTime(d.getTime() + (day *  86400000 ));
	try{
		if(window.location.host.indexOf(".hudong.com")>0){
			document.cookie = name + "=" + value + "; expires=" + d.toGMTString() + "; path=/;domain=.hudong.com";
		}else if(window.location.host.indexOf(".baike.com")>0){
			document.cookie = name + "=" + value + "; expires=" + d.toGMTString() + "; path=/;domain=.baike.com";
		}
	}
	catch (e) {
	}
}

function getCookieVal(offset) { 
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) { 
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal(j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function judgeTGPage(query) {
	if (query.indexOf("hf=") < 0) {
		return null;
	}
	//query=query.substring(1);
	var pairs = query.split(/[?&]/);
	var tgPara='hf=';
	if(query.indexOf("pf=") > 0){
		tgPara="pf=";
	}
	for(var i = 0; i < pairs.length; i++) {	
        var pos = pairs[i].indexOf(tgPara);
        if (pos != 0) continue;
        return pairs[i].substring(3); 
    }	
}

function genHDUID() {
	var _hddt = new Date();
	var _hdst = Math.round(_hddt.getTime() / 1000);
	var _hdu = Math.round(Math.random() * 2147483647);
	return _hdu + "" + _hdst;
}

function getClientRes() {
	if (self.screen) {
		sr = screen.width + "x" + screen.height;
	} else {
		if (self.java) {
			var j = java.awt.Toolkit.getDefaultToolkit();
			var s = j.getScreenSize();
			sr = s.width + "x" + s.height;
		}
	}
	return sr;
}
function StatVirtualTraffic(hd_accessrefer, hd_accessurl, hd_virtual) {
	//set screen res
	var hd_res = "-";
	try {
		hd_res = getClientRes();
	}
	catch (e) {
	}
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.id = "_hdsvsojs";
	var _isStatVirtual = false;
	if(window.location.host.indexOf(".hudong.com")>0){
		sc.src = "//stat.hudong.com/hdWebStatVirtual.do?random=" + Math.random() + "&hd_virtual=" + hd_virtual + "&hd_accessrefer=" + encodeURIComponent(hd_accessrefer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
		_isStatVirtual = true;
	}else if(window.location.host.indexOf(".baike.com")>0){
		sc.src = '//stat.baike.com/hdWebXBKStatVirtual.do?random=' + Math.random()+'&hd_virtual='+hd_virtual+'&hd_accessrefer='+encodeURIComponent(hd_accessrefer)+'&hd_accessurl='+encodeURIComponent(hd_accessurl)+"&hd_res="+ hd_res;
		_isStatVirtual = true;
	}
	if(_isStatVirtual){
		document.getElementsByTagName("head")[0].appendChild(sc);
	}
}
function StatIframeTraffic(hd_virtual) {
	if (parent.window.frames.length > 0) {
		var hd_accessrefer = parent.document.referrer;
		var hd_accessurl = parent.window.location.href;
		StatVirtualTraffic(hd_accessrefer, hd_accessurl, hd_virtual);
	}
}

function FilterLM(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','__gaTrackerJudgeLM');
	
	if(window.location.host.indexOf(".hudong.com")>0){
		if (judgeLM() == 1) {
			__gaTrackerJudgeLM('create', 'UA-5479642-64', 'auto');
    	}
    	else {
    		__gaTrackerJudgeLM('create', 'UA-5479642-65', 'auto');
		}
	}else if(window.location.host.indexOf(".baike.com")>0){
		if (judgeLM() == 1) {
			__gaTrackerJudgeLM('create', 'UA-20697937-18', 'auto');
    	}
    	else {
    		__gaTrackerJudgeLM('create', 'UA-20697937-17', 'auto');
		}
	}

	__gaTrackerJudgeLM('require', 'displayfeatures');
	__gaTrackerJudgeLM('send', 'pageview');
    
}

//Filter LM Traffic
function judgeLM(){
    var hdReferFromCookie = GetCookie("hd_referer");
	if(hdReferFromCookie == null || hdReferFromCookie == ""){
		return 0;
	}
	if(hdReferFromCookie.indexOf("lm") == 0){
        return 1;
    }else if(hdReferFromCookie.match(/^(wlgynewtop|qidiannewtop|dlmnewtop|dlmwww|wlgywww|qidianwww|niutop|wlgy|dlm|qidian)$/)){
		return 1;
    }
    return 0;
}

function isLMID(s){
    var patrn = /^[0-9A-Za-z]+$/;
    if (!patrn.exec(s)) {
        return false;
    }
    else {
        return true;
    }
}

//Filter TGDS
function judgeTGDSPage(query) {
	if (query.indexOf("uid=") < 0 || query.indexOf("qid=") < 0) {
		return null;
	}
	var pairs = query.split(/[?&]/);
	var tgdsParau='uid=';
	var tgdsParaq='qid=';
	var names='';

	for(var i = 0; i < pairs.length; i++) {
        var pou = pairs[i].indexOf(tgdsParau);
        var poq = pairs[i].indexOf(tgdsParaq);
        if(pou == 0){
        	names += pairs[i];
        }
        if(poq == 0){
        	names += "&";
        	names += pairs[i];
        }
    }
	return names;
}

//Filter Own Stat
function judgeOwn(refer) {
	if(refer=="-"){
		return true;
	}else{
		var re;
		
		if(window.location.host.indexOf(".baike.com")>0){
			re = /^\w+:\/\/[^\/?&:]+\.baike\.com(([^.\w]+)|$)/;
		}else if(window.location.host.indexOf(".hudong.com")>0){
			re = /^\w+:\/\/[^\/?&:]+\.hudong\.com(([^.\w]+)|$)/;
		}
		 
		if(refer.match(re)){
			return true;
		}else{
			re=/^\/\/passport\.hudong\.com\/((log(in|out)\.do)|(user\/(user|xbkUser)Register\.jsp))/;
			if(refer.match(re)){
				return true;
			}
		}
	}
	return false;
}

//添加js：//stat.baike.com/js/webstat_manage_hdga.js
function getPageGACode(){
    var myJSONHudongDomainsObject = [{
        "name": "www",
        "gavalue": "1"
    }, {
        "name": "wiki",
        "gavalue": "2"
    }, {
        "name": "wikibar",
        "gavalue": "3"
    }, {
        "name": "group",
        "gavalue": "4"
    }, {
        "name": "kaiyuan",
        "gavalue": "5"
    }, {
        "name": "bbs",
        "gavalue": "15"
    }, {
        "name": "tupian",
        "gavalue": "19"
    }, {
        "name": "paihangbang",
        "gavalue": "20"
    }, {
        "name": "top",
        "gavalue": "24"
    }, {
        "name": "time",
        "gavalue": "25"
    }, {
        "name": "yun",
        "gavalue": "26"
    }, {
        "name": "task",
        "gavalue": "27"
    }, {
        "name": "dajiang",
        "gavalue": "28"
    }, {
        "name": "pic",
        "gavalue": "29"
    }, {
        "name": "gongyi",
        "gavalue": "30"
    }, {
        "name": "bwg",
        "gavalue": "31"
    }, {
        "name": "ceshi",
        "gavalue": "32"
    }, {
        "name": "123",
        "gavalue": "33"
    }, {
        "name": "renwu",
        "gavalue": "34"
    }, {
        "name": "shenghuo",
        "gavalue": "35"
    }, {
        "name": "jingji",
        "gavalue": "36"
    }, {
        "name": "redian",
        "gavalue": "37"
    }, {
        "name": "ziran",
        "gavalue": "38"
    }, {
        "name": "wenhua",
        "gavalue": "39"
    }, {
        "name": "lishi",
        "gavalue": "40"
    }, {
        "name": "shehui",
        "gavalue": "41"
    }, {
        "name": "yishu",
        "gavalue": "42"
    }, {
        "name": "dili",
        "gavalue": "43"
    }, {
        "name": "kexue",
        "gavalue": "44"
    }, {
        "name": "tiyu",
        "gavalue": "45"
    }, {
        "name": "jishu",
        "gavalue": "46"
    }, {
        "name": "reci",
        "gavalue": "49"
    }, {
        "name": "so",
        "gavalue": "51"
    }, {
        "name": "photo",
        "gavalue": "52"
    }, {
        "name": "v",
        "gavalue": "53"
    }, {
        "name": "zt",
        "gavalue": "55"
    }, {
        "name": "jiaoshi",
        "gavalue": "56"
    }, {
        "name": "i",
        "gavalue": "57"
    }, {
        "name": "w",
        "gavalue": "58"
    }, {
        "name": "zutu",
        "gavalue": "59"
    }, {
        "name": "c",
        "gavalue": "60"
    }, {
        "name": "passport",
        "gavalue": "66"
    }, {
        "name": "fenlei",
        "gavalue": "68"
    }];
	
	var myJSONBaikeDomainsObject = [{
        "name": "www",
        "gavalue": "2"
    }, {
        "name": "123",
        "gavalue": "3"
    }, {
        "name": "apps",
        "gavalue": "4"
    }, {
        "name": "fenlei",
        "gavalue": "5"
    }, {
        "name": "group",
        "gavalue": "6"
    }, {
        "name": "i",
        "gavalue": "7"
    }, {
        "name": "photo",
        "gavalue": "8"
    }, {
        "name": "pic",
        "gavalue": "9"
    }, {
        "name": "so",
        "gavalue": "10"
    }, {
        "name": "task",
        "gavalue": "11"
    }, {
        "name": "time",
        "gavalue": "12"
    }, {
        "name": "top",
        "gavalue": "13"
    }, {
        "name": "tupian",
        "gavalue": "14"
    }, {
        "name": "wap",
        "gavalue": "15"
    }, {
        "name": "zt",
        "gavalue": "16"
    }, {
        "name": "pics",
        "gavalue": "20"
    }, {
        "name": "x",
        "gavalue": "21"
    }, {
        "name": "qiye",
        "gavalue": "22"
    }];
    
    var _gaValue;
    var  _gaDomain;
	
	if(window.location.host.indexOf(".hudong.com")>0){
		_gaValue = "UA-5479642-";
		_gaDomain = ".hudong.com";
		for (var i = 0; i < myJSONHudongDomainsObject.length; i++) {
	        if (window.location.host == (myJSONHudongDomainsObject[i].name +  _gaDomain)) {
	            _gaValue = _gaValue + myJSONHudongDomainsObject[i].gavalue;
	            return _gaValue;
	            break;
	        }
    	}
	}else if(window.location.host.indexOf(".baike.com")>0){
		_gaValue = "UA-20697937-";
		_gaDomain = ".baike.com";
		for (var i = 0; i < myJSONBaikeDomainsObject.length; i++) {
	        if (window.location.host == (myJSONBaikeDomainsObject[i].name +  _gaDomain)) {
	            _gaValue = _gaValue + myJSONBaikeDomainsObject[i].gavalue;
	            return _gaValue;
	            break;
	        }
    	}
	}
	
    return 0;
}

if(window.location.host.indexOf(".hudong.com")>0 || window.location.host.indexOf(".baike.com")>0){
	if (window.top.frames.length == window.frames.length) {
	    _uacct = getPageGACode();
	    if (_uacct != null) {
	        var access_host = window.location.host;
	//        var access_host_end = access_host.indexOf(".hudong.com");
	//        if (access_host_end > 0) {
	//            access_host = access_host.substring(0, access_host_end);
	//        }
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			var _gaIsStat = false;
			if (_uacct == 0) {
				if(window.location.host.indexOf(".baike.com")>0){
                    ga('create', 'UA-20697937-1', 'auto');
					_gaIsStat = true;
				}
            }
            else {
				if (window.location.host.indexOf(".baike.com") > 0) {
                    ga('create', _uacct, 'auto');
					_gaIsStat = true;
				}else if (window.location.host.indexOf(".hudong.com") > 0){
                    ga('create', _uacct, 'auto');
					_gaIsStat = true;
				}
            }
			if(_gaIsStat){
                ga('require', 'displayfeatures');
		        ga('send', 'pageview');

			}
	    }
	}
}

