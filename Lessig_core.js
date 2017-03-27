	/*
A Lessig Method presentation "slideware" object
@author bibby <bibby@surfmerchants.com>
*/

var Lessig={
	slides:[],
	sli:0,
	blankSlide:null,
	screen:null,
	show_progress:true,
	
	flickrs:[],
	fli:0,
	fli_nag:true,
	flickr:function(txt)
	{
		if(!ImgSearch.data.api_key)
		{
			var api;
			if(Lessig.fli_nag)
				var api = prompt("You need a Flickr API key to use the flickr feature.\nYou set it in Lessig_settings.js\nor enter it now:");
				
			if(api)
				ImgSearch.data.api_key = api;
			else
			{
				Lessig.fli_nag = false;
				return new Picture();
			}
		}
		
		ImgSearch.get(txt);
		return new Picture( this.fli++ );
	},
	
	defaults:{
		backgroundColor:"white",
		color:"black"
	},
	
	// escape key does what?  start | end
	esc:"start",
	
	next:function()
	{
		if(this.slides[ this.sli+1 ])
			this.sli++;
		else
			return;
		this.drawSlide();
	},
	prev:function()
	{
		if(this.slides[ this.sli-1 ])
			this.sli--;
		else
			return;
		this.drawSlide();
	},
	start:function()
	{
		this.sli=0;
		this.drawSlide();
	},
	
	end:function()
	{
		this.sli = this.slides.length-1;
		this.drawSlide();
	},
	
	clear:function()
	{
		this.screen.innerHTML="";
	},
	
	/*for when viewport intentionally changes*/
	fix:function()
	{
		this.getViewport();
		this.drawSlide();
	},
	
	drawSlide:function()
	{
		this.clear();
		if(this.slides[ this.sli ])
		{
			this.slides[ this.sli ].draw();
			if(this.show_progress)
				this.showProgress();
		}
		else
			this.blankSlide.draw();
		
	},
	
	init:function()
	{
		this.screen = document.body;
		this.getViewport();
		this.blankSlide = new Slide();
		
		extend( this.screen.style , {
			textAlign:"center",
			overflow:"hidden",
			backgroundColor:Lessig.defaults.backgroundColor
		});
		
		window.onkeydown = function(e)
		{
			if(!e) e = event;
			var key=(e.keyCode)?e.keyCode:0;
			switch(key)
			{
				case 37:
					Lessig.prev();
				break;
				case 39:
					Lessig.next();
				break;
				case 27:
					Lessig[ Lessig.esc ]();
				break;
			}
		}
		
		this.start();
	},
	
	// viewport
	vp:{},
	// a found function
	getViewport:function()
	{
		var viewportwidth;
		var viewportheight;
		 
		 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		 if (typeof window.innerWidth != 'undefined')
		 {
			  viewportwidth = window.innerWidth,
			  viewportheight = window.innerHeight
		 }
		 
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		 else if (typeof document.documentElement != 'undefined'
			 && typeof document.documentElement.clientWidth !=
			 'undefined' && document.documentElement.clientWidth != 0)
		 {
			viewportwidth = document.documentElement.clientWidth,
			viewportheight = document.documentElement.clientHeight
		 }
		 
		 // older versions of IE
		else
		{
			viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
			viewportheight = document.getElementsByTagName('body')[0].clientHeight
		}
		
		this.vp.w = viewportwidth;
		this.vp.h = viewportheight;
	},
	
	addSlides:function()
	{
		Util
		.iterator(arguments)
		.each(function(lessig)
		{
			if( this instanceof Slide )
				lessig.slides.push(this);
		}, this);
	},
	
	showProgress:function()
	{
		var s = document.createElement('span');
		s.className = "progress";
		s.innerHTML = "Slide "+(this.sli+1)+" of "+this.slides.length;
		Lessig.screen.appendChild(s);
	},
	
	splitIntoSlides:function(str,delim,replaces)
	{
		delim = delim || " ";
		Util
		.iterator( str.split(new RegExp(delim)) )
		.each(function()
		{
			var s = this;
			if(replaces instanceof Object)
				for(var r in replaces)
					s = s.replace(new RegExp(r,"g"),replaces[r]);
			Lessig.addSlides( new Slide( s ) );
		})
	}
};

window.onload = function()
{
	Lessig.init();
};

