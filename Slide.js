/* Lessig slides and SlideEffect
@author <bibby@surfmerchants.com>
*/

var Slide = function()
{
	this.effects={};
	this.blocktext=Util.iterator();
	this.overlays = Util.iterator();
	
	Util
	.iterator(arguments)
	.each(function(slide)
	{
		slide.addArg(this);
	},this)
	
};

Slide.prototype={
	// redundant for convenience methods
	addArg:function(a)
	{
		if(a instanceof SlideEffect)
			extend(this.effects, a.effects);
		else
			this.blocktext.push(a);
		return this;
	},
	
	clone:function()
	{
		var s = new Slide();
		Util
		.iterator(['effects','blocktext','overlays'])
		.each(function(r)
		{
			s[this]=(function(o)
			{
				var f = function(){};
				f.prototype = o;
				return new f();
			})(r[this]);
		},this);
		return s;
	},
	
	draw:function()
	{
		if(this.blocktext.length==0)
			return;
		var c = this.make();
		// claim some space to fetch offsetHeight
		extend(c.style,{
			visibility:"hidden"
		});
		
		Lessig.screen.appendChild( c );
		
		var h = c.offsetHeight;
		var m = Math.round( (Lessig.vp.h - h) / 2);
		
		extend(c.style,{
			height:h+"px",
			marginTop:m+"px",
			marginBottom:m+"px",
			visibility:"visible",
			zIndex:1
		});
		
		this.overlays.each(function()
		{
			Util.center(this);
			Lessig.screen.appendChild( this);
		});
	},
	make:function()
	{
		var d = document.createElement('div');
		d.className = "slide";
			
		// width 80% of viewport
		var w = Math.round( Lessig.vp.w * .8 )
		// block margin
		var m = Math.round((Lessig.vp.w-w)/2);
		extend(d.style,{
			width:w+"px",
			marginLeft:m+"px",
			marginRight:m+"px"
		});
		
		this.overlays=Util.iterator();
		var html = Util.iterator();
		do
		{
			var item = this.blocktext.current();
			if( item instanceof Picture)
			{
				if(item.effect == Picture.overlay)
				{
					this.overlays.push(item.getImg());
				}
				else
					html.push( item.getImg() );
			}
			else if( item instanceof CodeBlock)
				html.push( item.html() );
			else if( item.nodeType ==1)
				html.push( item );
			else
				html.push( Util.txt( item ) );
			
			var n = this.blocktext.next();
			if(n && n.effect != Picture.overlay)
				html.push( Util.br() );
		
		}while( this.blocktext.current() != undefined)
		
		this.blocktext.reset();
		
		html.each(function()
		{
			d.appendChild(this);
		});
		
		extend( Lessig.screen.style ,
			this.effects.css || Lessig.defaults
		);
		
		return d;
	}
};


var SlideEffect=function()
{
	this.effects = {};
	extend( this.effects, arguments[0]);
};


// reusable effect
SlideEffect.invert = new SlideEffect({
	css:{
		backgroundColor:Lessig.defaults.color,
		color:Lessig.defaults.backgroundColor
	}
});


var Picture=function(src,css)
{
	this.effect = null;
	if(typeof src == "number")
	{
		this.img = src;
	}
	else
	{
		this.img = (function(i)
		{
			i.src=src;
			return i;
		})(new Image);
	}
	
	if(css instanceof Object)
	{
		if( css == Picture.overlay)
			this.effect = css;
		else
			extend(this.img.style, css);
	}
};

Picture.prototype={
	getImg:function()
	{
		if( this.img instanceof Object)
			return this.img;
		else if( typeof this.img == "number")
			return Lessig.flickrs[this.img];
	}
};

// just an empty object to use for arguments
Picture.overlay={};
