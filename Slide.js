/* Lessig slides and SlideEffect
@author <bibby@surfmerchants.com>
*/

var Slide = function()
{
	this.lines=[];
	for(var i=0; i<arguments.length; i++)
	{
		this.addArg( arguments[i] );
	}
};

Slide.prototype={
	addArg:function(a)
	{
		if(a instanceof SlideEffect)
			this.effects = a.effects;
		else
			this.addLine( a );
	},
	addLine:function(l)
	{
		if(
			(l instanceof Line)==false
		 && (l instanceof Picture)==false
		)
			l = new Line(l);
		
		this.lines.push(l);
	},
	
	draw:function()
	{
		if( this.lines.length == 0)
			return;
		
		var h = Math.round( Lessig.vp.h / this.lines.length );
		
		Lessig.screen.style.lineHeight = h+"px";
		
		extend(Lessig.screen.style, this.effects || Lessig.defaults);
		
		for(var i=0; i< this.lines.length; i++)
		{
			Lessig.screen.appendChild(
				(function(l)
				{
					var t = document.createElement('div');
					
					if(l instanceof Picture)
					{
						extend( l.img.style ,{
							margin:'auto'
						});
						t.appendChild( l.img)
					}
					else
					{
						var lenMod = Math.round(l.txt.length/8)||1;
						extend(t.style,{
							fontSize: Math.min( Math.round(h * Lessig.fontOffset / (lenMod/2)) , Lessig.defaults.maxSize )+"px" ,
							whiteSpace:"nowrap"
						});
						t.innerHTML = l.txt;
						
						if(l.color)
							t.style.color = l.color;
					}
					
					return t;
				})( this.lines[i])
			);
		}
	}
};


var SlideEffect=function()
{
	this.effects = {};
	extend( this.effects, arguments[0]);
};
