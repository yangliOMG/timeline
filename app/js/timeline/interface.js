import $ from 'jQuery';

class Interface{
	//获取data
	getdata(){
		let self = this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'/get/data',
				dataType:'json',
				success:function(res){
					resolve.call(self,res);
				},
				error:function(err){
					reject.call(err);
				}
			})
		})
	}
}

export default Interface