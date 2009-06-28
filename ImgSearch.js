var ImgSearch={
	data:{
		method:"flickr.photos.search",
		api_key:null,
		format:"json",
		license:"7,1,2,3",
		privacy_filter:1,
		safe_search:1
	},
	
	url:"http://api.flickr.com/services/rest/?",
	get:function(text)
	{
		var data = extend({} , this.data, {text:text});
		
		var sc = document.createElement('script');
		sc.src = this.req_url(data); 
		document.getElementsByTagName('head')[0].appendChild(sc);
		sc.parentNode.removeChild(sc);
	},
	
	req_url:function(data)
	{
		var params=[];
		for(var i in data)
			params.push( i+"="+encodeURIComponent(data[i]) );
		
		return this.url+params.join('&');
	}
};

jsonFlickrApi = function(data)
{
	if(!data || data.stat != "ok")
		return false;

	if(!data.photos.photo[0])
	{
		console.log("no photos :(");
		return;
	}
	
	var obj = data.photos.photo[0];
	
	var I = (function(url)
	{
		var I = new Image();
		I.src = url;
		return I;
	})("http://farm"+obj.farm+".static.flickr.com/"+obj.server+"/"+obj.id+"_"+obj.secret+"_m.jpg")
	
	Lessig.flickrs.push(I);
	
};
