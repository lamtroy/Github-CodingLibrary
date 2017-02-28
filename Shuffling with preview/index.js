/*****
 * Date:2017-02-28
 * Author:Bin
 * By:HBuilder
 ****/
//1.custom data(Sources in the process of actual production and the back end)
	 var data = [
	{img:1,h2:'Createive',h3:'DUET'},
	{img:2,h2:'Dior',h3:'Well'},
	{img:3,h2:'pretty',h3:'Bor'},
	{img:4,h2:'Nice',h3:'Eva'},
	{img:5,h2:'いらっしゃいませ',h3:'Soul'},
	{img:6,h2:'오직 한 집밖에 없다.',h3:'OFO'},
	{img:7,h2:'Handsome',h3:'IAN'}
	 ];
	 //2.generic function
	 var g = function(id){
	 	if(id.substr(0,1) == '.'){
	 		return document.getElementsByClassName(id.substr(1));
	 	}
	 	return document.getElementById(id);
	 }
	 //3.Add slides
	 function addSlider(){
	 	//3.1 get template
	 	var tpl_main = g('template_main').innerHTML.replace(/^\s*/,'').replace(/\s*/,'');
	 	var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*/,'').replace(/\s*/,'');
	 	//3.2 define the final output
	 	var out_main = [];
	 	var out_ctrl = [];
	 	//3.3 Iterate through all the data, construct the final output HTML
	 	for(i in data){
	 		var _html_main = tpl_main
	 								.replace(/{{index}}/g,data[i].img)
	 								.replace(/{{h2}}/g,data[i].h2)
	 								.replace(/{{h3}}/g,data[i].h3)
	 								.replace(/{{css}}/g,['','main-i-right'][i%2]);
	 		var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
	 		out_main.push(_html_main);
	 		out_ctrl.push(_html_ctrl);
	 	}
	 	//3.4 Writes the HTML back to the corresponding DOM
	 	g('template_main').innerHTML = out_main.join('');
	 	g('template_ctrl').innerHTML = out_ctrl.join('');
	 	
	 	 //7.add #main_background
	 	g('template_main').innerHTML +=tpl_main
	 								.replace(/{{index}}/g,'{{index}}')
	 								.replace(/{{h2}}/g,data[i].h2)
	 								.replace(/{{h3}}/g,data[i].h3);
		g('main_{{index}}').id = 'main_background';
	 }
	
	 //5.switchslider
	function switchSlider(n){
		//5.1 get the show slider&button
		var main = g('main_'+n);
		var ctrl = g('ctrl_'+n);
		//5.2 get all sliders&buttons
		var clear_main = g('.main-i');
		var clear_ctrl = g('.ctrl-i');
		//5.3 clear all their style
		for(i=0;i<clear_ctrl.length;i++){
			clear_main[i].className = clear_main[i].className.replace('main-active','');
			clear_ctrl[i].className = clear_ctrl[i].className.replace('ctrl-active','');
		}
		//5.4 add style for now
		main.className +=' main-active';
		ctrl.className +=' ctrl-active';
		//8. copy now to the background
		setTimeout(function(){
			g('main_background').innerHTML = main.innerHTML;
		},600);
	}
	 //9. autoplay
	 function play(){
	 	var myIndex;
	 	var allCtrl = g('.ctrl-i');
	 	for(var i=0;i<allCtrl.length;i++){
	 		if(parseInt(allCtrl[i].getAttribute("class").indexOf("ctrl-active"))>-1){
	 			myIndex = i+1;
	 		}
	 	}
	 	next(myIndex);
	 	setTimeout(function(){
	 		play()
	 	},5000);
	 };
	  function next(s){
	 	if(s == data.length){
	 		s=1;
	 	}else{
	 		s++;
	 	}
	 	switchSlider(s);
	 };
	 //4.what time to run
	 window.onload = function(){
	 	addSlider();
	 	switchSlider(1);
	 	play();
	 }