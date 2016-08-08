(function($) {
$(document).ready(function() {
	function _$(a) {return document.getElementById(a);}
	function ce(a) {return document.createElement(a);}
	function ca(a) {return document.createAttribute(a);}

	var progress = _$('pb');
	var items = 0;
	var mymoney = 0;
	var totalcost = 0;
	var lastticket = 0; //Обновляем билеты
	var currency = null;
	var ticketNumber = null;

	var socketIO = io('185.62.188.19:8303');

	socketIO.once('connect', function(){
		socketIO.emit('0');

		if ($('#top-page').length > 0) {
			socketIO.emit('top');
		}

		if ($('#history-page').length > 0) {
			socketIO.emit('2');
		}

		if ($('#main-page').length > 0) {
			socketIO.emit('trade-link', { steamId : getSteamID() });
		}

		if ($('#settings-page').length > 0) {
			socketIO.emit('trade-link', { steamId : getSteamID() });
		}

		// currency
  		socketIO.on('currency', function(data){
  			currency = (data == 'rur') ? 'руб' : '$';
  		});

  		//informers
  		socketIO.on('informers', function(data){
			if(data.inf1 && _$('inf1')) _$('inf1').innerHTML = data.inf1;
			if(data.inf2 && _$('inf2')) _$('inf2').innerHTML = data.inf2.toFixed() + ' ' + currency;
			if(data.inf3 && _$('inf3')) _$('inf3').innerHTML = data.inf3;

			if(data.inf4 && _$('inf4')) _$('inf4').innerHTML = data.inf4.toFixed() + ' ' + currency;
			if(data.inf4 && $('.jackpotNum').length) {
				var jackpotThousands = parseFloat(data.inf4);
				jackpotThousands = jackpotThousands.toFixed();
				$('.jackpotNum').text(jackpotThousands + ' руб');
			}

			if(typeof data.inf5 != 'undefined' && $('.inf5').length > 0) {
				var inf5 = data.inf5;
				
				if (data.inf5 == '0') {
					inf5 = 'отсутствует';
				} else {
					inf5 += currency;
				}
				
				$('.inf5').text(inf5);
			}

			if(data.inf6 && $('.inf6')) $('.inf6').text(data.inf6);
			if(data.inf7 && $('#inf7').length) $('#inf7').text(data.inf7);
			if(data.inf8 && $('#inf8').length) $('#inf8').text(data.inf8);
			if(data.inf9 && $('#inf9').length) $('#inf9').text(data.inf9);
			if(data.inf10 && $('#inf10').length) $('#inf10').text(data.inf10.toFixed(2) + ' ' + currency);
			if(data.inf11 && $('#inf11').length) $('#inf11').text(data.inf11.toFixed(2) + ' ' + currency);
		});

		// top
  		socketIO.on('top', function(data){
			buildTopTable(data.list);
  		});

  		// last-winner
  		socketIO.on('last-winner', function(data){
			if (_$('winner-name') && _$('winner-avatar') && _$('winner-money')) {
				_$('winner-name').innerHTML = data.name;
				_$('winner-avatar').innerHTML = ('<img src="' + data.ava + '" alt="" width="75px">');
				_$('winner-money').innerHTML = data.money.toFixed(0) + currency;
			   _$('winner-chance').innerHTML = data.chance +'%';
			}
  		});

  		// history
  		socketIO.on('history', function(data){
			buildHistoryPage(data.history, data.historyOrder, data.commission);
  		});

  		// timer
  		socketIO.on('timer', function(data){
  			if (data.timer == '0:0') {
				$('.gametime.gamepause').removeClass('hidden');
			}

			// timer
			var minute = data.timer.substring(0, data.timer.indexOf(':'));
			var second = data.timer.substring(data.timer.indexOf(':')+1);
			if (minute.length == 1) {
				minute = '0'+minute;
			}
			if (second.length == 1) {
				second = '0'+second;
			}
			if (_$('timer')) {
				$('#timer').text(minute + ':' + second);
			}
  		});
		
		
		socketIO.on('accoffer', function(data){
			if (data.steamid == getSteamID()) {
		        $('.acceptoffer').removeClass('hidden');
		        setTimeout(function(){
		        $('.acceptoffer').addClass('hidden');
		        }, 5000);
	        }
        });
		
		
        socketIO.on('errtrade', function(data){
	        if (data.steamid == getSteamID()) {
		        $('.errortrade').removeClass('hidden');
		        setTimeout(function(){
		        $('.errortrade').addClass('hidden');
		        }, 10000);
	        }
        });

        socketIO.on('errlink', function(data){
	        if (data.steamid == getSteamID()) {
		        $('.errnolink').removeClass('hidden');
		        setTimeout(function(){
		        $('.errnolink').addClass('hidden');
		        }, 10000);
	        }
        });
		
        socketIO.on('erritems', function(data){
	        if (data.steamid == getSteamID()) {
		        $('.errmaxitems').removeClass('hidden');
		        setTimeout(function(){
		        $('.errmaxitems').addClass('hidden');
		        }, 10000);
	        }
        });	
		
		//Таймер v2
var timerV2 = function()
{
var colSeconds = 18;
var sec = 0;

sec = colSeconds;
var idInterval = setInterval(function(){
var tempSec = sec+'';
if(sec <= 0)
{
clearInterval(idInterval);
}
if (tempSec.length == 1) {
tempSec = '0'+tempSec;
}
$('.timer-v2').text(tempSec);
sec--;
}, 1000);
}


  		// push new item
  		socketIO.on('0', function(data){
  			var cont = _$('game'); 
			if (cont == null) {
				return;
			}
			
  			$('.players-percent').removeClass('hidden');
			$('#start-game-advert').hide();
			$('#in-game-advert').show();

			var icount = parseInt($('#items-count-temp').text());
			icount++;
			$('#items-count-temp').text(icount);
			if (data.steamid == getSteamID()) {
			 	$('#chance-temp').text(data.chance.toFixed(2));
			 	$('#player-items-count').text(data.itemcounter);
			}

			// build deposite
			var deposite = ce('tr');

			var aclass = document.createAttribute('class');
			aclass.value = 'item-bg';

			var astyle = ca('style');
			astyle.value = 'color:' + data.color + '; background-color:'+data.background_color+';';

			deposite.setAttributeNode(aclass);
			deposite.setAttributeNode(astyle);

			// image 1 TD
			var image1td = ce('td');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-ava';
			image1td.setAttributeNode(aclass);

			// prepare image
			var image = ce('img');

			var asrc = ca('src');
			asrc.value = data.ava;
			image.setAttributeNode(asrc);

			image1td.appendChild(image);

			deposite.appendChild(image1td);
	 
			// text TD
			var texttd = ce('td');
			
			var aclass = document.createAttribute('class');
			aclass.value = 'col-text';
			texttd.setAttributeNode(aclass);

			// text
			var text = ce('p');
			//Билеты начало
            var ddk = lastticket+1;
            var ntk = (lastticket+Math.ceil(data.cost*10));
            lastticket = ntk;
            var tick = ntk-ddk;
            //Билеты конец
			text.innerHTML = data.user + " вложил <br> <b>" + data.itemname + "</b> (~" + data.cost + " " + currency + ") <br />Билеты от <b>#"+ddk+"</b> до <b>#"+ntk+"</b> <div class='bilet'><span>"+ "+" +tick+"</span></div>";
			texttd.appendChild(text);

			deposite.appendChild(texttd);

			// image 2 TD
			var image2td = ce('td');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-img';
			image2td.setAttributeNode(aclass);

			// image 2 
			image = ce('img');

			asrc = ca('src');
			asrc.value = "http://steamcommunity-a.akamaihd.net/economy/image/"+ data.image +"/96fx96f";
			image.setAttributeNode(asrc);

			image2td.appendChild(image);

			deposite.appendChild(image2td);

			// add
			var addtd = ce('td');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-add';
			addtd.setAttributeNode(aclass);

			deposite.appendChild(addtd);

			// insert deposite into list
			cont.insertBefore(deposite, cont.firstChild);

			// update items count
			items++;
			if(items > 100) {
				items = 100;
			}

			progress.style.width = items+"%";
			console.log(progress, items);
			var SteamID = getSteamID();
			totalcost += data.jackpot;
			if (data.steamid == SteamID) {
				//_$('kolvo').innerHTML = "ВЫ ВНЕСЛИ В ИГРУ - "+data.itemcounter+" ПРЕДМЕТОВ<br>ВАШ ШАНС ВЫИГРАТЬ - "+data.chance+"%";

				mymoney = data.money;
			}
			var winchance = 0;
			if (totalcost > 0) {
				winchance = mymoney / totalcost*100;
			}

			$('title').text(data.jackpot.toFixed(0) + currency + ' - CSGOGET.RU');

			if (sound == 'on') {
				$('#new-item-sound')[0].play();
			}
  		});

		// type 2
		socketIO.on('2', function(data){
			$('#jackpot-temp').text(data.jackpot + ' ' + currency);
			$('.game-num').text(data.gamenumber);
			//Хеш раунда начало
            $.ajax({type:"GET",url:"/hash_generator.php?string="+data.gamenumber,success:function(message){
            $('#roundHash').text(message);
            }});
               $.ajax({type:"GET",url:"/hash_generator.php?num="+data.gamenumber,success:function(messages){
            $('#random-number').text(messages);
            }});
            //Хеш раунда конец
		});
		
		// ticket Number
  		socketIO.on('ticketNumber', function(data){
			ticketNumber = data.ticketNumber;
  		});

		// end-game
		socketIO.on('end-game', function(data){
			timerV2();
			$('#winner-end').text(' ??? ');
			$('#winner-ticket').text(' ??? ');
				
			if (sound == 'on') {
                          $('#start-roule-sound')[0].play();
                        }
			$('#items-count-temp').text('0');
			
			$('.gameactive').addClass('hidden');
			$('.gameend').removeClass('hidden');
			$('.details-wrap').addClass('hidden');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');

			$('.winner-cost-value').text(data.money);
			$('.winner-cost-valuta').text(' ' + currency);

			// Tape 
			$users = $('.players-tape').find('.players-percent-block');
			var itemsTape = [];
			$.each($users, function(index, el) {
				var img_src = $(el).find('img').attr('src');
				var chance_field = $(el).find('.players-percent-text').text();
				var chance = parseFloat(chance_field.substr(0,chance_field.indexOf('%')));

				for (var i = 0; i <= chance; i++) {
					itemsTape.push(img_src);
				}
			});

			function shuffle(o){
			    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			    return o;
			}

			itemsTape = shuffle(itemsTape);

			itemsTape.splice(100, itemsTape.length-100);

			if (itemsTape.length < 100) {
				var differ = 100 - itemsTape.length;
				for (var i = 0; i < differ; i++) {
					itemsTape.push(itemsTape[0]);
				}
			}

			itemsTape[95] = data.ava;

			$.each(itemsTape, function(i,v){
				$('.all-players-list').append('<img src="' + v + '" />');
			});

			setTimeout(function(){
				$('.all-players-list').css('-moz-transform' ,'translate3d(-7605px, 0, 0)');
				$('.all-players-list').css('-ms-transform' ,'translate3d(-7605px, 0, 0)');
				$('.all-players-list').css('-o-transform' ,'translate3d(-7605px, 0, 0)');
				$('.all-players-list').css('-webkit-transform' ,'translate3d(-7605px, 0, 0)');
				$('.all-players-list').css('transform' ,'translate3d(-7605px, 0, 0)');
				setTimeout(function(){
					$('#winner-end').text(data.name);
					bil = ticketNumber * 10;
					$('#winner-ticket').text(bil);
					lastticket = 0;
					$('#start-game-advert').show();
					$('#in-game-advert').hide();
				}, 13000);

			}, 1000);
		});

		// end-game-empty
		socketIO.on('end-game-empty', function(data){
			$('#items-count-temp').text('0');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');
		});

		// start-game
		socketIO.on('start-game', function(data){
			$('.gametime.gamepause').addClass('hidden');
			if (sound == 'on') {
                $('#start-game-sound')[0].play();
            }			

			//clear
			items = 0;
			money = 0;
			totalcost = 0;

			progress.setAttribute('style', 'width: 0%;');

			$('#winner-end').text(' ??? ');

			$('#items-count-temp').text('0');
			$('.gameactive').removeClass('hidden');
			$('.winner-cost-value').text('');
			$('.winner-cost-valuta').text(' ' + currency);
			$('.gameend').addClass('hidden');
			$('.details-wrap').removeClass('hidden');
			$('.all-players-list').empty();
			$('.all-players-list').css('-moz-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-ms-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-o-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-webkit-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('transform' ,'translate3d(458px, 0, 0)');
			$('#game').empty();
			$('.players-tape').empty();
			$('.players-percent').addClass('hidden');
			$('#progbarin').css('width', 0);
			$('#player-items-count').text(0);
			$('#chance-temp').text(0);
			$('#gamestart-end').removeClass('hidden');
			$('#gamestart-start').addClass('hidden');
			$('title').text('CSGOGET.RU');
			$('#timer').text('02:00');
		});

		// trade-link
		socketIO.on('trade-link', function(data){
  			if (data.list.length == 0) {
				if ($('#settings-page').length == 0) {
					$('.token-block.promo').removeClass('hidden');
				}
			} else {
				$('.token-block.promo').addClass('hidden');
				if ($('#main-page').length > 0) {
					$('.tradeoffer-link').val(data.list[0].tradelink);

				}
				if ($('#settings-page').length > 0) {
					$('input[rel="get-trade-link"]').val(data.list[0].tradelink);
				}
			}
  		});

  		// playersUnique
  		socketIO.on('playersUnique', function(data){
			var $cont = $(".players-tape");
			$cont.empty();

			// for admins
			
			$.each(data.order, function(i,itemOrder){
				var row = '<div class="players-percent-block">\
								<img src="' + data.list[itemOrder.steamid].ava + '" alt="avatar">\
								<div class="players-percent-text">' + data.list[itemOrder.steamid].chance.toFixed(2) + '%</div>';

				
				if (getSteamID() === itemOrder.steamid) {
					$('#chance-temp').text(data.list[itemOrder.steamid].chance.toFixed(2));
					$('#player-items-count').text(data.list[itemOrder.steamid].itemcounter);
				}

				$cont.append(row);
			});

			if (data.order.length > 0) {
				$cont.parent().removeClass('hidden');
			}
		});
	});

	// function updateUsersList() {
	// 	ws.send(JSON.stringify({
	// 		type: 'items'
	// 	}));
	// }

	function getSteamID() {
		return $('#steamid').length > 0 ? $('#steamid').html() : 0;
	};

	function getToken() {
		return $('#steamtoken').length > 0 ? $('#steamtoken').html() : 0;
	};

	// ws.onmessage = function(event) {
	// 	var msg = JSON.parse(event.data);
	// 	console.log(msg);

	// 	if (msg.type == 'user-inventory') {
	// 		var avatar = $('#current-user-header').find('.avatar').attr('src'),
	// 			nickname = $('#current-user-header').find('.nickname').text(),
	// 			$cont = $('.fieldset-profile');

	// 		var inventory = '';
	// 		if (msg.items != false) {
	// 			$.each(msg.items, function(i,v){
	// 				inventory += '<a href="#" title="' + v.name + '"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'+ v.icon_url + '/96fx96f"></a>';
	// 			});
	// 		}

	// 		var profile = '<div class="user-profile"><img src="' + avatar + '" class="avatar" /><span class="nickname">' + nickname + '</span><div class="user-inventory"><span class="btn-yellow show-inventory">ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¸Ð½Ð²ÐµÐ½Ñ‚Ð°Ñ€ÑŒ</span><div class="inventory hidden">' + inventory + '</div></div><div class="clearfix"></div></div>';

	// 		$cont.prepend(profile);

	// 		$(document).on('click', '.show-inventory', function(){
	// 			$(this).addClass('hidden');
	// 			$('.user-inventory .inventory').removeClass('hidden');
	// 		});

	// 	}
	// };

	function getWidth(style){
		return style.substring(style.indexOf('width:')+7, style.indexOf('%'));
	}

	var buildTopTable = function(list) {
		var countTop = list.length;
		$('#count-top').text(countTop);
		var $parent = $('#top-tbody');
		var i = 0;

		var imgrank = 1;
		$('#raiting-players').text(list.length);
		$.each(list, function(index, el) {
			i++;
			if (i > 3) {
				imgrank++;
				i = 0;
			}
			var row = '<tr>\
                    <td class="col-place">' + (index+1) + '</td>\
                    <td class="col-image"><img src="' + el._id.winnerimg + '" alt="image"></td>\
                    <td class="col-rank"><img src="pict/rank/' + imgrank + '.png" alt="image"></td>\
                    <td class="col-nick">' + el._id.winnername + '</td>\
                    <td class="col-wincount">' + el.count + '</td>\
                    <td class="col-prize">' + el.total.toFixed() + currency + '</td>\
            </tr>';
            $parent.append(row);
		});

	};

	function escapeHtml(text) {
	  return text
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	}
	
	var buildHistoryPage = function(history, historyOrder, commission) {
		var $parent = $('.history-wrap');
		
		$.each(historyOrder, function(i, index) {
			var el = history[index];

			var itemsHistory = '';

			$.each(el.items, function(index1, item) {
				itemsHistory += '<li>\
								<a class="history-item-prize" data-image="http://steamcommunity-a.akamaihd.net/economy/image/'+ item.image + '/85fx70f" data-user="'+ item.ava+'" data-title="' + item.itemname + '" data-price="~ ' + item.cost + '" data-color="#' +  item.background_color + '">\
									<img src="http://steamcommunity-a.akamaihd.net/economy/image/' + item.image + '/85fx70f" alt="image">\
									</a>\
							</li>';
			});

			var row = '<div class="history-item">\
			    <div class="history-item-top">\
			        <div class="history-item-top-right">\
			            <div>Игра #' + el.game + '</div>\
			            <div class="date"></div>\
			        </div>\
			        <div class="history-item-top-left">\
			            <div class="history-item-image">\
			                <img src="' + el.winnerimg + '" alt="image">\
			            </div>\
			            <div class="history-item-desc">\
			                <div class="history-item-title">' + escapeHtml(el.winnername) + '</div>\
			                <ul class="history-item-desc-list">\
			                    <li>\
			                        <div class="title">Выигрыш:</div>\
			                        <div class="value">~' + el.winnermoney + ' руб.</div>\
			                    </li>\
			                    <li>\
			                        <div class="title">Шанс:</div>\
			                        <div class="value">' + el.winnerchance + '%</div>\
			                    </li>\
			                </ul>\
			            </div>\
			        </div>\
			    </div>\
			    <div class="history-item-bottom">\
			        <div class="history-item-prizes">\
			            <h4>Выигрыш с учетом комиcсии:</h4>\
			            <ul class="history-item-prizes-list">\
			            ' + itemsHistory + '\
			            </ul>\
			        </div>\
			    </div>\
			</div>';

			$parent.append(row);
		});

		$('.history-item-prize').hover(function() {
            var cur = $(this);
            var cur_image = cur.attr('data-image');
            var cur_title = cur.attr('data-title');
            var cur_price = cur.attr('data-price');
            var cur_color = cur.attr('data-color');
			var cur_ava = cur.attr('data-user');
            $('body').append('<div class="history-item-prize-drop">\
            <div class="history-item-prize-drop-top">\
			<div style="float: right;padding: 7px;">                                        <img src="'+ cur_ava +'" alt="image" style="width: 90px;height: 90px;">                                    </div>\
            <div class="history-item-prize-drop-left" style="background: ' + cur_color + '">\
            <div class="history-item-prize-drop-image">\
            <img src="' + cur_image + '" alt="image" />\
            </div>\
            </div>\
            <div class="history-item-prize-drop-top-inner">\
            <div class="history-item-prize-drop-title">' + cur_title + '</div>\
            <div class="history-item-prize-drop-price">' + cur_price + ' ' + currency + '</div>\
            </div>\
            </div>\
            </div>');
            $('.history-item-prize-drop').fadeIn(200);
            $('.history-item-prize-drop').position({
                of: cur,
                my: "center bottom-10",
                at: "center top",
                collision: "none none"
            });
        }, function() {
            $('.history-item-prize-drop').remove();
        });
	}

	// sounds
	var sound = $.cookie('sound');
	if (sound == 'on') {
		$('.sound-link-off').addClass('hidden');
		$('.sound-link-on').removeClass('hidden');
	} else {
		$('.sound-link-on').addClass('hidden');
        $('.sound-link-off').removeClass('hidden');
	}


	$(document).on('click', '.sound-link-on', function(e) {
		e.preventDefault();

        $(this).addClass('hidden');
        $('.sound-link-off').removeClass('hidden');

        sound = 'off';
        $.cookie('sound', 'off', { expires: 365 });
	});

	$(document).on('click', '.sound-link-off', function(e) {
		e.preventDefault();

        $(this).addClass('hidden');
        $('.sound-link-on').removeClass('hidden');

        sound = 'on';
        $.cookie('sound', 'on', { expires: 365 });
	});
});

})(jQuery);