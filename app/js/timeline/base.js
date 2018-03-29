import $ from 'jQuery';



class Base{
	//中间列表HTML
	getContentListHTML(data=[]){
		let self = this, html = ``;
		this.dataList = new Set(data);
		let list = this.changeDataToMap(data);

		
		for( let [y,year] of list.entries()){
			html += `<div class="content_year tips" id="content_year_${y}">${y}</div>`;
			for( let [m,month] of year.entries()){
				html += `<div class="content_month tips" id="content_month_${y}_${m}">${m}月</div>`;
				for( let [idx,li] of month.entries()){
					let lunar = self.GetLunarDateString(new Date(li.date));
					html += `
						<div class="content_item content_item_${idx%2==0?'left':'right'} ${idx==0?'first':''}">
							<div class="content_item_icon_arrow"></div>
							<div class="content_item_icon_dot">
								<div class="content_item_icon_dot_child"></div>
							</div>
							<div class="content_item_icon_head">
								<div class="content_item_icon_head_title">
									<div class="content_item_icon_head_title_lunar">${lunar.substr(0,1)}<br>&nbsp;&nbsp;&nbsp;${lunar.substr(1,1)}</div>
									${li.date.replace(/\//g,'-')}
								</div>
								<div class="content_item_head_intro">
									<i class="ui_icon quote_before"></i>
									${li.intro}
									<i class="ui_icon quote_after"></i>
								</div>
							</div>
							<div class="content_item_media">
								${li.media}
							</div>
							<div class="content_item_footer">
								<div class="content_item_footer_info">
									<a href="javascript:;" title="赞"><i class="icon_zan"></i>(${li.like})</a>
									<a href="javascript:;" title="评论"><i class="icon_pin"></i>(${li.comment})</a>
								</div>
								<div class="content_item_footer_like">
									${li.like>=10000?Number(li.like/10000).toFixed(1)+'万':li.like}人觉得很赞
								</div>
							</div>
							
						</div>
					`;
				}
			}
			
		}
		html +=`<div class="content_year" id="content_month_0_0">出生</div>`;
		$(self.content_el).html(html);

		this.getscrubberHTML(list);
	}
	//左边索引HTML
	getscrubberHTML(list){
		let self  = this;
		let html = `<a href="javascript:;" class="current" id="top">现在</a>`;
		for(let [y,year] of list.entries()){
			html += `<a href="javascript:;" class="scrubber_year" id="scrubber_year_${y}">${y}年</a>`;
			for(let [m,month] of year.entries()){
				html += `<a href="javascript:;" class="scrubber_month scrubber_month_in_${y}" year="${y}" month="${m}" id="scrubber_month_${y}_${m}">${m}月</a>`;
			}
		}
		html += `<a href="javascript:;" id="bottom">出生</a>`;
		$(self.scrubber_el).html(html);
	}


	//根据年份，月份，转化data格式；
	changeDataToMap(data=[]){
		let list = new Map();
		let lastyear ,lastyearMap = new Map();
		let lastmonth, lastmonthArr = [];
		for(let li of data){
			let year = li.date.split('/')[0];
			let month = li.date.split('/')[1];		
			if(lastyear === year){
				if(lastmonth === month){
					lastmonthArr.push(li);
				}else{
					lastmonthArr = [li];
					lastyearMap.set(month,lastmonthArr);
				}
			}else{
				lastyearMap = new Map();
				lastmonthArr = [li];
				lastyearMap.set(month,lastmonthArr);	
				list.set(year,lastyearMap);
			}
			lastmonth = month;
			lastyear = year;
		}

		return list;
	}

	//标签跳转 事件
	changeTabNav(e){
		let self = this;
		let id = e.currentTarget.id.replace(/scrubber/,'content');
		let top = 0;
		if(id === 'top'){
			top = 0;
		}else if(id === 'bottom'){
			top = $(document).height()-$(window).height();
		}else{
			top = $('#'+id).offset().top-50;
		}
		// $(document).scrollTop(top);

		//页面抖动
		// var timer = setInterval(function(){
		// 	let osTop =  $(document).scrollTop();
		// 	let ispeed = Math.floor((top-osTop) / 6);
		// 	$(document).scrollTop(osTop + ispeed) ;
		// 	if(Math.abs(ispeed)<=2){
		// 		clearInterval(timer);
		// 	}
		// },30);
		$('html, body').animate({
		    'scrollTop': top
		}, 400);	
	}


	//监听滚动事件
	listenScroll(e){
		let self = this;
		let scrollTop = $(document).scrollTop();
		let scruTop = self.scrubberTop;
		let cha = scrollTop-scruTop;
		if(scrollTop<scruTop&&$(self.scrubber_el).attr('style')!=""){
			$(self.scrubber_el).removeAttr("style")
		}else if(scrollTop>=scruTop){
			$(self.scrubber_el).css({top:cha+"px"});
		}

		let arr = $(self.content_el).find(".tips").filter((idx,ele)=>$(ele).offset().top<(scrollTop+100));
		if(arr.length>0){
			let id = arr[arr.length-1].id.replace(/content/,'scrubber');
			$('#'+id).addClass("current").siblings().removeClass("current");
		}
	}
}

export default Base;