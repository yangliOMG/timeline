import Base from './timeline/base.js';
import Calculate from './timeline/calculate.js';
import Interface from './timeline/interface.js';
import Lunar from './timeline/lunar.js';
import $ from 'jquery';


const copyProperties = function(target,source){
	for(let key of Reflect.ownKeys(source)){
		if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
			let desc = Object.getOwnPropertyDescriptor(source,key);
			Object.defineProperty(target,key,desc);
		}
	}
}

const mix = function(...mixins){
	class Mix{}
	for(let mixin of mixins){
		copyProperties(Mix,mixin);
		copyProperties(Mix.prototype,mixin.prototype)
	}
	return Mix
}

class Timeline extends mix(Base,Calculate,Interface,Lunar){
	constructor(name='tl' ){
		super();
	    this.name=name;
	    this.dataList = new Set();
	    this.content_el = '#content';
	    this.scrubber_el = '#scrubber';
	    this.scrubberTop = $(this.scrubber_el).offset().top-91; 
	    this.updateState();
	    this.initEvent();
  	}

  	updateState(){
  		let self = this;
  		this.getdata().then( (res)=>{
  			self.getContentListHTML(res);
  			
  		});
  	}

  	initEvent(){
  		let self = this;
  		$(self.scrubber_el).on('click','a',self.changeTabNav);
  		$(document).on('scroll', self.listenScroll.bind(self));
  	}
 }

export default Timeline;

