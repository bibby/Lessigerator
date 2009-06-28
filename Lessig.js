/*
Lessing init script.
Just an include function, and some inclusions.
@author bibby <bibby@surfmerchants.com>
*/

/*
A generic php-like "include" method
@author bibby <bibby@surfmerchants.com>
*/
var include=function()
{
	for(i=0; i<arguments.length; i++)
	{
		include.inc.append(arguments[i])
	}
};

include.prototype={
	elm:null,
	loaded:{},
	findElm:function()
	{
		if(this.elm == null)
		{
			var h=document.getElementsByTagName('head');
			this.elm = h[0] || document.body;
		}
		
		return this.elm;
	},
	debug:'',
	append:function(file)
	{
		var s = document.createElement('script');
		file = this.parseURL(file);
		if(!file) 
			return false;
		s.src=file+(-1==file.indexOf("?")?'?':'&')+Number(new Date());
		this.findElm().appendChild(s);
		s.parentNode.removeChild(s);
		this.loaded[file]=true;
		this.debug += (file + " appended\n");
	},
	parseURL:function(fname)
	{
		if(!(fname.indexOf instanceof Function))
			return false;
		
		var url, back = new RegExp(/^\.\.\//);
		if(fname.substr(0,1) == '/')
			fname = location.protocol+"//"+location.host + fname;
		else
		if(fname.indexOf('://')==-1)
		{
			url = location.toString().split('/');
			url.pop();
			while(back.test(fname)==true)
			{
				if(url.join('/') != location.protocol+"//"+location.host)
					url.pop();
				fname=fname.replace(back,'');
			}
			url.push(fname);
			fname = url.join('/');
		}
		
		return fname;
	},
	d:function(fname)
	{
		return !!this.loaded[this.parseURL(fname)];
	},
	once:function()
	{
		var i,arg;
		args:for(i=0; i<arguments.length; i++)
		{
			arg=arguments[i];
			if(this.d(arg))
				continue args;
			include(arg);
		}
	}
};

(function()
{
	include.inc = new include();
	for(var i in include.inc)
	{
		if( include.inc[i] instanceof Function)
		{
			include[i.toString()]=
			(function(method)
			{
				return function(arg)
				{
					return include.inc[method](arg)
				};
			})(i.toString());
		}
		
		if( include.inc[i] instanceof Object)
		{
			include[i.toString()]= include.inc[i.toString()];
		}
	}
})();


/* object extend */
var extend=function(objA,objB)
{
	if(!objA)
		return false;
	
	for(var x in objB) objA[x]=objB[x];
	
	for(var i = 2; i<arguments.length; i++)
		extend(objA,arguments[ i ]);
	return objA;
}

extend.able=function(o)
{
	extend(o,{
		"extend":function()
		{
			for(var i = 0; i<arguments.length; i++)
				extend(this,arguments[ i ]);
			return this;
		}
	});
	return o;
}



/* init Lessig */

include.once(
	'Color.js',
	'Util.js',
	'Lessig_core.js',
	'Slide.js',
	'ImgSearch.js',
	'Lessig_settings.js'
);
