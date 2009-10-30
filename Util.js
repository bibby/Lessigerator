Util={
	iterator:function(obj)
	{
		var items=[];
		items.ptr=0;
		
		if(obj && obj.length)
			for(var i=0; i<obj.length; i++)
				items.push(obj[i]);
		
		return extend(items, 
		{
			each:function(callback,reference)
			{
				var end;
				if(callback instanceof Function)
				{
					for(var i=0; i<this.length; i++)
					{
						end = callback.call( this[i] , reference);
						if(end === false)
							return;
					}
				}
			},
			next:function()
			{
				this.ptr++;
				return this.current();
			},
			prev:function()
			{
				this.ptr--;
				return this.current();
			},
			current:function()
			{
				return this[this.ptr];
			},
			reset:function()
			{
				this.ptr=0;
			}
		});
	},
	br:function()
	{
		return document.createElement('br');
	},
	txt:function(t)
	{
		return document.createTextNode(t);
	},
	
	html:function(content /*,className [,className]*/)
	{
		var s = document.createElement('span'),
			cls=[],
			args=Util.iterator(arguments);
		
		args.shift();
		args.each(function()
		{
			cls.push(this);
		});
		
		s.className = cls.join(' ');
		
		s.appendChild(content instanceof Object ? content : Util.txt(content) );
		return s;
	},
	
	link:function(url,content)
	{
		var s = document.createElement('a');
		s.href = url;
		s.target = "lessigerator_window";
		s.appendChild(content instanceof Object ? content : Util.txt(content) );
		return s;
	},
	
	cat:function()
	{
		var s = document.createElement('span');
		Util.iterator(arguments).each(function()
		{
			s.appendChild(this instanceof Object ? this : Util.txt(this) );
		});
		return s;
	},
	
	color:function(elm, color)
	{
		elm = Util.html(elm);
		
		var col = ColorConvert.convert(color,"#hex");
		if(col)
			extend(elm.style,{
				color:col
			});
		return elm;
	},
	
	center:function(obj)
	{
		extend( obj.style,{
		position:'absolute',
		top: Math.round( (Lessig.vp.h/2) -  (parseInt(obj.height)/2))+"px",
		left: Math.round( (Lessig.vp.w/2) - (parseInt(obj.width)/2))+"px"
		});
	}
}
