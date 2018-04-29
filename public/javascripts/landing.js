/*function onstart()
{
  var S="Welcome To Yelp_Camp";
  document.getElementById("heading").innerText="";
  console.log(S);
  var i=0;
  function call(){
  var S="Welcome To Yelp_Camp";
  document.getElementById("heading").innerText+=S[arguments[0]];
if(i===S.length)clearInterval(m);}
  var m=setInterval(function(){call(i++);}
   ,300);
}*/


 var typed2 = new Typed('#head', {
 	strings: ['<span style="font-size:65px;color:#ffff00;">Welcome To Yelp_Camp</span>'],
    typeSpeed: 80,
    backSpeed: 0,
    fadeOut: false,
    loop: false
  });


 var typed3 = new Typed('#quote', {
    strings: ['Collected For U!!!','Collection By U!!!','Lots of Campgrounds to Choose'],
    typeSpeed: 50,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: true
  });