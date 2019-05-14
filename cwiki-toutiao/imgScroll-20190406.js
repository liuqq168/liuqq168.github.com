
(function($) {
 function imgAlbumScroll() {
                this.init.apply(this, arguments);
            }
 imgAlbumScroll.prototype = {
		length:0,
		imgAlbums:[],
		imgAlbum:{},
		imgs:[],
		importImgs : [],
		imgScroll:null,
		init:function(imgAlbum,imgs){
			var self = this;
			self.imgAlbum = imgAlbum;
			self.imgs = imgs;
			$.each(self.imgAlbum, function(i, n){
				self.imgAlbums.push({src:i,title:n});
			});
		//	self.imgAlbums = $.unique(self.imgAlbums).reverse();
			self.imgAlbums = self.unique(self.imgAlbums);
			self.render();
			self.loaded();
			self.bindImgsEvent(self.imgs,"all");
		},
		unique : function(arr){
			var n = [];
			for(var i = 0; i < arr.length; i++){
				if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
			}
			return n;
		},
		updateImgBind:function(img_eles){
			var self = this;
			self.bindImgsEvent(img_eles,"inc");
		},
		updateImgAlbum:function(imgAlbums,img_eles){
			var self = this;
			self.imgAlbums = imgAlbums;
			self.render();
			self.bindImgsEvent(img_eles,"all");
		},
		render:function(){
			var self = this;
			var index =0;
			var pageSize = getPageSize();
			var windowWidth = pageSize[2]+"px";
			var windowHeight =  pageSize[3]+"px";
			var imgAlbum_ul = $('#imgAlbum ul');
			imgAlbum_ul.empty();
			var lis = [];
			var isHdTuceAd = false;
			var hdTuceAdUrl = "";
			if($(".hdTuceAd").length <= 0 && $(".hdTuceAdUrl").length > 0){
				var isHasTuceAd = false;
				hdTuceAdUrl = $(".hdTuceAdUrl").eq(0).val();
				$.each( self.imgAlbums, function(i, ele){
					 if(ele.src == hdTuceAdUrl){
						 isHasTuceAd = true;
						 return false;
					 }
				});
				if(!isHasTuceAd){
					self.imgAlbums.push({src:hdTuceAdUrl,title:$(".hdTuceAdDesc").eq(0).val()});
				}
				isHdTuceAd = true;
			}
			$.each( self.imgAlbums, function(i, ele){
				  var url = doPicURL(ele.src,"");
				  var li = "";
				  if(index==0){
					li =  '<li style="width: '+windowWidth+'; height: '+windowHeight+'; line-height: '+windowHeight+';"><div  style="overflow: hidden; position: relative; height: '+windowHeight+';z-index: 1;"><div  style=" text-align: center;position: absolute; width: 100%; height: '+windowHeight+';"><img data-url="'+url+'" data-title="'+ele.title+'" src="'+url+'" style="max-width: 100%; max-height: 100%;"/></div></div></li>';
					$('.bot .tit').text(ele.title);
				  }else{
					 li = '<li style="width: '+windowWidth+'; height: '+windowHeight+'; line-height: '+windowHeight+';"><div  style="overflow: hidden; position: relative; height: '+windowHeight+';z-index: 1;"><div  style=" text-align: center;position: absolute; width: 100%; height: '+windowHeight+';"><img data-url="'+url+'" data-title="'+ele.title+'"  src="" style="max-width: 100%; max-height: 100%;"/></div></div></li>';
				  }
				  if(isHdTuceAd && ele.src == hdTuceAdUrl){
					  li = '<li class="hdTuceAd"' + li.substring(3);
				  }
				  lis.push(li);
				  index++;
				});
			if(index > 0){
				$("#img-view-download").show();
				$("#img-view-ad").hide();
			}
			if(isHdTuceAd && lis.length == 1){
				$("#img-view-download").hide();
				$("#img-view-ad").show();
			}
			imgAlbum_ul.append(lis.join(''));
			self.length = index;
			var number = '<em class="f16">1</em>/<em id="f16_number">'+self.length+'</em>';
			$('.number').html(number);
			$('#imgAlbum').css({  width: windowWidth,height:windowHeight,position: 'fixed',top: 0,  left: 0,overflow: 'hidden','z-index': 1});
			imgAlbum_ul.css({  width: (self.length*pageSize[2])+'px',height:windowHeight,position: 'absolute'});
		},
		bindImgsEvent:function (img_eles,type){
			var self = this;
			
			var lis = $('#imgAlbum li');
			if(lis==null||lis.length<1){
					return;
			}
			
			if(img_eles==null||img_eles.length<1){
				return;
			}

			//console.log("type:"+type);
			//console.log("img_eles:"+img_eles.length);
			var noReaptImgs = img_eles.not(self.importImgs);
			//console.log("noReaptImgs:"+noReaptImgs.length);
			$.merge(self.importImgs, noReaptImgs);
			//console.log("importImgs:"+self.importImgs.length);	
			
			var bindImgs = null;
			if(type=="inc"){
				if(noReaptImgs==null||noReaptImgs.length<1){
					return;
				}
				bindImgs = noReaptImgs;
			}else{
				bindImgs = self.importImgs;
			}
			
			var imgs = lis.find('img');
			
			$.each(bindImgs,function(i,ele){
				var $this = $(this);
				var url;
				var url_original = $this.data('original');
				if(url_original==null||url_original==""){
					url = $this.attr('src');
					if(url==null||url==""){
						return;
					}
				}else{
					url = url_original;
				}
				
				var img_hit = null;
				if(imgs!=null&&imgs.length>0){
					var org_url = doPicURL(url,"");
					img_hit = imgs.filter('img[data-url="'+org_url+'"]');
				}
				if(img_hit!=null&&img_hit.length>0){
					$this.off('click').on('click',function(e){
							var e = e || event;
							e.preventDefault();
							e.stopPropagation();
							self.showImgAlbum(lis.index(img_hit.first().closest('li')));
					});
				}
				
			});
			
	    },
		showImgAlbum:function(li_index){
				var self = this;
				if(self.imgScroll){
					self.updateImgPosition(li_index);
				//	$("body").css("overflow-y","hidden");
					$('.img-view').show();
					self.imgScroll.refresh();
					self.imgScroll.goToPage(li_index,0,0);
				}
		},
		loaded:function () {
			var self = this;
				setTimeout(function () {
					self.imgScroll =  new IScroll('#imgAlbum', {
					//		zoom:true,
							scrollX: true,
							scrollY: false,
							click: true,
							momentum: false,
							bindToWrapper :true,
							snap: true,
							vScroll:false,
							hScroll:false,
						//    tap : 'tap',
							disableMouse : false,
					});
					self.imgScroll.on('beforeScrollStart',function(){
						console.log('bytedance://disable_swipe')
					});
					self.imgScroll.on("scrollEnd",updatePosition)
				}, 0);
			},
			updateImgPosition:function (position){
					var self = this;
					var next = $('#imgAlbum li:eq('+position+')');
					if(next==null||next.length<1){
						return;
					}
					var img = next.find('img');
					if(img==null||img.length<1){
						return;
					}
					var liClass = next.attr('class');
					if($(".hdTuceAd").length > 0 && "hdTuceAd"==liClass){
						$("#img-view-download").hide();
						$("#img-view-ad").show();
					}else{
						$("#img-view-download").show();
						$("#img-view-ad").hide();
					}
					var src = img.attr('src');
					if(src!=""){
						self.setTitle(img,position);
						self.updateImgPosition2pretreatment(position+1);
						self.updateImgPosition2pretreatment(position-1);
						return;
					}
					var url = img.data('url');
					if(url==""){
						return;
					}
					img.attr('src',url);
					self.setTitle(img,position);
					self.updateImgPosition2pretreatment(position+1);
					self.updateImgPosition2pretreatment(position-1);
			},
			updateImgPosition2pretreatment:function (position){
					var self = this;
					var next = $('#imgAlbum li:eq('+position+')');
					if(next==null||next.length<1){
						return;
					}
					var img = next.find('img');
					if(img==null||img.length<1){
						return;
					}
					var src = img.attr('src');
					if(src!=""){
						return;
					}
					var url = img.data('url');
					if(url==""){
						return;
					}
					img.attr('src',url);			
			},
			setTitle:function (img,position){
				var self = this;
				var title = img.data('title');
				if(title!=""){
					$('.bot .tit').text(title);
				}
				var number = '<em class="f16">'+(position+1)+'</em>/<em id="f16_number">'+self.length+'</em>';
				$('.number').html(number);
			},
			reloadData:function(){
				var self = this;
				self.render();
				self.bindImgsEvent(self.imgs,"all");
			}
	};

		
		function doPicURL(picurl,type) {
				var URLtext = picurl,strHead="";
				if(URLtext.indexOf("http:") != -1){
					URLtext = URLtext.slice(5);
					strHead = "http:"
				}else if(URLtext.indexOf("https:") != -1){
					URLtext = URLtext.slice(6);
					strHead = "https:"					
				}
				if (picurl!="" && picurl != null) {
					var picStyle = "";
					if (type=="300") {
						picStyle = "_s";
					} else if (type=="140") {
						picStyle = "_140";
					} else if (type=="60") {
						picStyle = "_f";
					} else {
						picStyle = type;
					}
					var reg = "//(a0.att|a1.att|a2.att|a3.att|a4.att|static).(hudong|hoodong).com/(\\d*)/(\\d*)/(\\d*)(.*)(\\.)(gif|png|jpg|jpeg|bmp)";
					var groups=URLtext.match(reg);
					if(groups!=null&&groups.length>0){
						if (groups[6]=="") {
							URLtext = URLtext.replace(groups[7] + groups[8], picStyle + groups[7] + groups[8]);
						} else {
							URLtext = URLtext.replace(groups[6], picStyle);
						}
					}
				}
				return strHead.concat(URLtext);
		 }
		 // 获取页面的高度、宽度
		function getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else {
				if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac    
					xScroll = document.body.scrollWidth;
					yScroll = document.body.scrollHeight;
				} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari    
					xScroll = document.body.offsetWidth;
					yScroll = document.body.offsetHeight;
				}
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) { // all except Explorer    
				if (document.documentElement.clientWidth) {
					windowWidth = document.documentElement.clientWidth;
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else {
				if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
					windowWidth = document.documentElement.clientWidth;
					windowHeight = document.documentElement.clientHeight;
				} else {
					if (document.body) { // other Explorers    
						windowWidth = document.body.clientWidth;
						windowHeight = document.body.clientHeight;
					}
				}
			}       
			// for small pages with total height less then height of the viewport    
			if (yScroll < windowHeight) {
				pageHeight = windowHeight;
			} else {
				pageHeight = yScroll;
			}    
			// for small pages with total width less then width of the viewport    
			if (xScroll < windowWidth) {
				pageWidth = xScroll;
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
			return arrayPageSize;
		}
		function updatePosition(){
				var position = this.currentPage.pageX;
				AlbumInterface.imgAlbumScroll.updateImgPosition(position);
				console.log('bytedance://enable_swipe')
		}

	$.imgAlbumScroll = function(imgAlbum,imgs) {
		return new imgAlbumScroll(imgAlbum,imgs);
	};
	$.extend($.imgAlbumScroll, {});
})(jQuery);