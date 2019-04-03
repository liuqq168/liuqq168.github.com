		String.prototype.Trim = function() {
			return this.replace(/^\s*|\s*$/g, "");
		}

		function recordLog(watchflag) {
			try {
				$.getScript("http://stat.baike.com/js/webstat_manage.js", function() {
					StatVirtualTraffic(document.referrer, window.location,
							"stat_hdstat_onclick_" + watchflag);
				});
			} catch (e) {
			}
		}
		var nowAudio;

		var nextUrl = function(url){
			var summary = $("#custom_zy p:eq(1)").html();
			var count = $("#ttsCount").val();
			
			if(count==null || count<1){
				count = Math.floor(summary.length/50);
				if(summary.length%50>0){
				count +=1;
			}
			}else{
				count = Number(count);
			}
			var as=url;
						var as1 = url.split(".mp3");
						if(as1.length>1){
							var as2 =as1[0].split("_");
							if(as2.length>1 && as2[as2.length-1]<count){
								as2[as2.length-1]++;
								as = as2[0]+"_"+as2[as2.length-1];						
							}else{
								as = as2[0]+"_"+"1";
							}
							as += ".mp3"+as1[1];
						}
			return as
		}

		var createAudio = function(url,flag,indexFlag){
			var objs = $('.audioSummary');
			var flag = 0;
			if(objs.length>0 ){
				$('.audioSummary').each(
				function() {
					var surl = $(this).attr('src');
					if(url==surl){
						flag=1;
					}
				});
				if(flag==0){
				var audioSummary;
				if(indexFlag==1){
					audioSummary = $('<audio id="nowAudio"></audio>');
				}else{
					audioSummary = $('<audio id="nextAudio"></audio>');
				}		
				audioSummary.attr('src',url);
				audioSummary.attr('preload','true');
				audioSummary.attr('class','audioSummary');			
				audioSummary.appendTo('body');
				}		
			}else{
				var audioSummary;
				if(indexFlag==1){
					audioSummary = $('<audio id="nowAudio"></audio>');
				}else{
					audioSummary = $('<audio id="nextAudio"></audio>');
				}
				audioSummary.attr('src',url);
				audioSummary.attr('preload','true');
				audioSummary.attr('class','audioSummary');			
				audioSummary.appendTo('body');
			}
		}

		//var isNext  = function(url){
		//	
		//	var as=url;
		//				var as1 = url.split(".mp3");
		//				if(as1.length>1){
		//					var as2 =as1[0].split("_");
		//					if(as2.length>1){
		//						var ind = as2[1];
		//						if(ind%2==0){
		//							return true;
		//						}else{
		//							return false;
		//						}
		//					}
		//				}
		//	return false
		//}

		$(document).ready(
				function() {
				   //是否存在信息模块
					var summaryContent = $("#custom_zy p:eq(1)").text();
					var xinxi = $(".xinxi").html();
					if (summaryContent != null && summaryContent != "" && summaryContent != undefined) {
						if (xinxi != null && xinxi != "" && xinxi != undefined) {
							setTimeout(function() {
								$('.btnSound').each(
										function() {
											var surl = $(this)
													.attr('soundUrl');
													var str =  surl.split(".mp3");
													if(str.length>1){
														surl = str[0]+"_1.mp3"+str[1];
													}
											createAudio(surl,0,1);															
											setTimeout(function() {
												createAudio(nextUrl(surl),1,2);
											}, 5000);
										});
							}, 1000);
							//$(".baiketitl .ispeech").show();
							$("#btn-sound").show();
						}else{
							$("#btn-sound").show();
							$("#btn-sound").css("opacity",".3");
							//移除id
							$("#btn-sound").removeAttr("id");

						}
					}
						$(".baiketitl .ispeech").click(function() {
							recordLog("wap_tts");
							$(".pop-speech").show();
						});
			const btnSound = document.getElementById("btn-sound")
			const popSound = document.getElementById("handDiv")
			function soundPlay(){
				if(btnSound.className=="btnSound"){
				popSound.className="fixed-bot on"
				//btnSound.getElementsByTagName("svg")[0].innerHTML = `<use xlink:href="#ico-sound2" />`
				btnSound.className = "btnSound on"
				popSound.getElementsByClassName("isound")[0].getElementsByTagName("i")[0].style=""
				}else{
				popSound.className="fixed-bot"
				//btnSound.getElementsByTagName("svg")[0].innerHTML = `<use xlink:href="#ico-sound" />`
				btnSound.className = "btnSound"
				$('.istop').click();
				$('.iplay').hide();
				$('.ipause').show();
				return;
				}
				nowAudio = $("#nowAudio");
				//var nextAudioSrc = $("#nextAudio").attr("src");
				nowAudio[0].play();
				nowAudio[0].addEventListener('ended', function () {
					var nextAudioSrc = $("#nextAudio").attr("src");
					if(undefined != nextAudioSrc && ''!=nextAudioSrc){
						nowAudio.attr('src',nextAudioSrc);
					    $("#nextAudio").attr("src",nextUrl(nextAudioSrc));
					}				
					nowAudio[0].play();
				});	
			}
			btnSound.onclick=function(){soundPlay()}
			popSound.getElementsByClassName("iclose")[0].onclick = function(){soundPlay()}
			function soundPause(){
				if(popSound.getElementsByClassName("iplay")[0].style.display == "none" ){
				popSound.getElementsByClassName("ipause")[0].style.display = "none"
				popSound.getElementsByClassName("iplay")[0].style = ""
				popSound.getElementsByClassName("isound")[0].getElementsByTagName("i")[0].style.animationPlayState="paused"
				}else{
				popSound.getElementsByClassName("iplay")[0].style.display = "none"
				popSound.getElementsByClassName("ipause")[0].style = ""
				popSound.getElementsByClassName("isound")[0].getElementsByTagName("i")[0].style = ""    
				}
				nowAudio[0].pause();
			}
			popSound.getElementsByClassName("ipause")[0].onclick = function(){soundPause()}
			popSound.getElementsByClassName("iplay")[0].onclick = function(){soundPause()}
			popSound.getElementsByClassName("istop")[0].onclick = function(){
				popSound.getElementsByClassName("ipause")[0].style.display = "none"
				popSound.getElementsByClassName("iplay")[0].style = ""
				popSound.getElementsByClassName("isound")[0].getElementsByTagName("i")[0].style.animationIterationCount="1" 
				nowAudio[0].pause();
					$('.btnSound').each(
						function() {
							var surl = $(this).attr('soundUrl');
							var str =  surl.split(".mp3");
							var id;
							if(str.length>1){
								surl = str[0]+"_1.mp3"+str[1];
								var s = str[0].split("/");
								if(s.length>1){
									id = s[s.length-2];
								}						
							}
							$("#nowAudio").attr("src",surl);
							$("#nextAudio").attr("src",nextUrl(surl));
					});
			}
						
			// 点击播放事件处理
			$(".ispeech").click(function() {
				$('.command .ipause', '.pop-speech').show();
				$('.command .iplay', '.pop-speech').hide();
				nowAudio = $("#nowAudio");
				//var nextAudioSrc = $("#nextAudio").attr("src");
				nowAudio[0].play();
				nowAudio[0].addEventListener('ended', function () {
					var nextAudioSrc = $("#nextAudio").attr("src");
					if(undefined != nextAudioSrc && ''!=nextAudioSrc){
						nowAudio.attr('src',nextAudioSrc);
					    $("#nextAudio").attr("src",nextUrl(nextAudioSrc));
					}				
					nowAudio[0].play();
				});		
			});
			// 暂停事件处理
			$(".command .ipause").click(function() {
				$('.command .ipause', '.pop-speech').hide();
				$('.command .iplay', '.pop-speech').show();
					nowAudio[0].pause();
			});
			// 播放事件处理
			$(".command .iplay").click(function() {
					$('.command .iplay', '.pop-speech').hide();
					$('.command .ipause', '.pop-speech').show();
					nowAudio[0].play();
			});
			// 停止事件处理
			$(".command .istop").click(function() {
				$('.command .iplay', '.pop-speech').show();
				$('.command .ipause', '.pop-speech').hide();
					nowAudio[0].pause();
					$('.btnSound').each(
						function() {
							var surl = $(this).attr('soundUrl');
							var str =  surl.split(".mp3");
							var id;
							if(str.length>1){
								surl = str[0]+"_1.mp3"+str[1];
								var s = str[0].split("/");
								if(s.length>1){
									id = s[s.length-2];
								}						
							}
							$("#nowAudio").attr("src",surl);
							$("#nextAudio").attr("src",nextUrl(surl));
					});
			});
			//关闭播放器事件处理
			$(".command .iclose").click(function() {
				$('#handDiv').removeClass("on");
				nowAudio[0].pause();
				//aSound.stop();
				//nextSound.stop();
				$('.btnSound').each(
						function() {
							var surl = $(this).attr('soundUrl');
							var str =  surl.split(".mp3");
							var id;
							if(str.length>1){
								surl = str[0]+"_1.mp3"+str[1];
								var s = str[0].split("/");
								if(s.length>1){
									id = s[s.length-2];
								}						
							}
							$("#nowAudio").attr("src",surl);
							$("#nextAudio").attr("src",nextUrl(surl));
					});
			});		
		});
