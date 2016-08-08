function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  // d.setTime(d.getTime() + (exdays*10));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
  function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}

function My_lobibox() {
        $(function () {
          Lobibox.notify('info', {
              title: 'Не спешите уходить!',
              msg: '<b>Оставьте вкладку открытой</b>, включите звуки, нажав на ссылку над таймером<br>и вы всегда будете в курсе новых ставок.',
              icon: false,
              position: 'bottom left',
              delay: 40000,
              showClass: 'fadeInUp',
              hideClass: 'fadeOutDown',
              width: 328, //Any Integer
          });
       });
    };
	
function Trade() {
		$(function () {
  Lobibox.notify('info', {
      title: 'Внимание:',
      msg: 'Не забывайте вставить ссылку на ваш трейд оффер в настройках!',
      icon: false,
      position: 'bottom left',
      delay: 40000,
      showClass: 'fadeInUp',
      hideClass: 'fadeOutDown',
      width: 328, //Any Integer
          });
       });
	};
	

function checkCookie() {
  var Lobibox = getCookie("Lobibox");
  if (Lobibox === "") { // Cookie not set
    My_lobibox();
    // console.log("test");
    setCookie("Lobibox", "seen", 7);
  }
}

function checkCookieTrade() {
  var Lobibox = getCookie("Trade");
  if (Lobibox === "") { // Cookie not set
    Trade();
    // console.log("test");
    setCookie("Trade", "seen", 7);
  }
}


checkCookieTrade();

$('.reklama_cslots').addClass('animated bounceOutLeft');