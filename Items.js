/*
File for misc items,  Line and Picture
@author <bibby@surfmerchants.com>
*/

var Line=function(txt)
{
	this.txt = txt;
	for(var a=1; a<arguments.length; a++)
		this.addParam(arguments[a]);
};

Line.prototype={
	addParam:function(p)
	{
		var col = ColorConvert.convert(p,"#hex");
		if( col )
			this.color = col; 
	}
};


var Picture=function(src)
{
	this.img = (function(i)
	{
		i.src=src;
		return i;
	})(new Image)
}
