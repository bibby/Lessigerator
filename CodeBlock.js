CodeBlock = function(file)
{
	this.filename = file;
	this.content = '';
	this.fetchContent();
}


CodeBlock.prototype={
	html:function()
	{
		var html = document.createElement('pre');
		html.innerHTML = this.prepare();
		return html;
	},
	
	fetchContent:function()
	{
		if(!this.filename)
			return;
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.cb = this;
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status)
				this.cb.content = this.responseText;
		};
		xmlhttp.open("GET",this.filename,true);
		xmlhttp.send(null);
	},
	
	setContent:function(to)
	{
		this.content = to;
	},
	
	prepare:function()
	{
		var content = this.content.replace(/\</g,'&lt;');
		
		Util.iterator( content.match(/\[C:.+\[:C\]/g))
		.each(function()
		{
			var head = this.substr(0,this.indexOf(']')+1)
			var col = head.substr(3, head.length-4);
			content = content.replace( head , '<span style="color:'+ColorConvert.convert(col,'#hex')+'">');
			content = content.replace("[:C]","</span>");
		});
		
		return content;
	}
};
