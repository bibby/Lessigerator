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
		html.innerHTML = this.content.replace(/\</g,'&lt;');
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
	}
};
