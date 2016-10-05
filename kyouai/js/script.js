//page controller
var pnames = ['item1', 'item2','item3','item4','item5','item6','item7','item8'];
var curpage = 0;

var pnum = 1;
var startfrom = document.getElementById('startfrom') || 0;
if (startfrom != 0)
{
	curpage = +startfrom.value;
}

var cbutton = document.getElementById('checkbutton');

function checkans()
{
	var res = false;
	switch(curpage+1)
	{
		case 1:
		res = check_1h();
		break;
		case 2:
		res = check_2h();
		break;
		case 6:
		res = check_6();
		break;
		default:
		res = true;
		break;
	}
	if (res)
	{
		// alert('あってます @ ' + (curpage+1));
		var sect = document.getElementById('section' + (curpage +1));
		sect.classList.toggle('none');
		nextpage();
		scrollTop();
		sect = document.getElementById('section' + (curpage +1));
		sect.classList.toggle('none'); //turn off none

		// $('#section'+(curpage+1)).animate({opacity:0}, 'ease', ()=>{
		// 	nextpage();
		// 	scrollTop();
		// 	$('#section'+(curpage+1)).animate({opacity:1}, 'ease');
		// });

	}
	else
	{
		// alert('間違ってます @ ' + (curpage+1));
		var wmsg = document.getElementById('wrongmsg' + (curpage +1));
		wmsg.classList.remove('hidden');
	}
}

function nextpage() {
	curpage++;
	// var sect = document.getElementById('section' + (curpage +1));
	// sect.style.opacity = 0;
	var next = document.getElementById(pnames[curpage]);
	next.checked = 1;

	// $('#section'+(curpage+1)).css('opacity',0); //reset so there is a smooth transition
	// $('#'+pnames[curpage])[0].checked = 1;
}


// function resetview()
// {

// 	$('#wrongmsg').animate({opacity: 0}, 'ease');
// 	$('#checkbutton').animate({opacity: 1}, 'ease');
// 	cbutton.disabled = false;

// }

function debug(item)
{
	var ans = [
	['キイト','ホウチョウ','ウォッカ','タキビ','カナヅチ','ランプ','ブロックベイ','ヨウスイロ'],
	['ド','ア','カ','ク','イ','タ','セ','ジ','オ','シ','ウ','ン','ヨ','キ','モ','チ','ツ','タ','エ','ヨ','ウ','タ','イ','ジ','ト','ガ','ン','ク','イ','ヨ','イ','サ',''/*'ウ'*/]
	];


	var boxes;
	if (item == 1)
		boxes = document.getElementsByName('cw');
	
	if (item == 2)
		boxes = document.getElementsByName('cw2');

	for (var i = 0; i < boxes.length; i++)
	{
		boxes[i].value = ans[item-1][i];
	}
	//resetview();
}

function check_1h()
{
	var ans = ['キイト','ホウチョウ','ウォッカ','タキビ','カナヅチ','ランプ','ブロックベイ','ヨウスイロ'];
	var boxes = document.getElementsByName('cw');

	for (var i = 0; i < boxes.length; i++)
	{
		if (boxes[i].value != ans[i])
		{
			// var wmsg = document.getElementById('wrongmsg1');
			// wmsg.classList.toggle('none');
			// $('#wrongmsg1').animate({opacity:1}, 'ease');
			return false;
		}
	}
	pnum = 2;
	console.log('all correct');
	// cbutton.style.opacity = 0;
	// cbutton.disabled = true;
	//hook even listener

	return true;

}

function setup() {
	var cw2s = document.getElementsByName('cw2');
	for (var i = 0; i < cw2s.length; i++)
	{
		cw2s[i].addEventListener('keyup', ontextboxenter);
		cw2s[i].addEventListener('input', check_2h);
		
	}

	// $('input[name="cw2"]').on('input', check_2h);
}
setup(); //setup input hooks for section 2

function hiraganaToKatagana(src) {
	//https://gist.github.com/kawanet/5553478
	return src.replace(/[\u3041-\u3096]/g, function(match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
}

function ontextboxenter(key)
{
	if (key.keyCode == 13)
	{
		console.log('enter pressed');
		key.target.value = hiraganaToKatagana(key.target.value.trim());
		// check_2h(true);
	}
	console.log(key.keyCode);
}
function check_2h()
{

	var ans = ['ド','ア','カ','ク','イ','タ','セ','ジ','オ','シ','ウ','ン','ヨ','キ','モ','チ','ツ','タ','エ','ヨ','ウ','タ','イ','ジ','ト','ガ','ン','ク','イ','ヨ','イ','サ','ウ'];
	var boxes = document.getElementsByName('cw2');


	var count = 0;
	var wronginp = false;
	for (var i = 0; i < boxes.length; i++)
	{
		// if (htk)
		// {
		// 	var conv = hiraganaToKatagana(boxes[i].value.trim());
		// 	if (boxes[i].value.trim() != conv)
		// 		boxes[i].value = conv;
		// 	if (boxes[i].value.trim().length > 1)
		// 		boxes[i].value = boxes[i].value.trim()[0];
		// }
		if (boxes[i].value.trim() != '')
		{
			count++;	
			wronginp |= (boxes[i].value != ans[i]);
		} 
	}
	if (count != boxes.length) return false; //do nothing when everything is not filled
	if (wronginp)
	{
		// $('#wrongmsg2').animate({opacity:1}, 'ease');
		return false;
	}

	console.log('all correct');
	var s2box = document.getElementById('s2textbox');
	s2box.classList.remove('none');
	// $('#s2textbox').removeClass('none');
	// $('#s2textbox').animate({opacity:1}, 'ease');
	// $('#s2textbox').removeClass('hidden-none');
	return true;
}

function check_2h_a(page)
{
	var ans = '';
	if (page == 0)
		ans = '大好き';
	else
		ans = '愛してる'
	
	var nexttext = document.getElementById('s2textbox');
	if (nexttext.value.trim() == ans)
	{
		var cb2 = document.getElementById('checkbutton2');
		cb2.classList.remove('none');
		// $('#checkbutton2').animate({opacity: 1, display: 'block', visibility: 'visible'}, 'ease');
		// $('#checkbutton2').removeClass('hidden-none none');
	}
}



function check_6()
{
	var extraboxes = document.getElementsByName('s6textbox');
	if (extraboxes[0].value == '大好き' && extraboxes[1].value == '愛してる')
	{
		return true;
	}		
	else
	{
		// $('#wrongmsg6').animate({opacity:1}, 'ease');
	}
	return false;
}

//scroll to top

function scrollTop() {
	window.scrollTo(0,0); //no need for animation.
}