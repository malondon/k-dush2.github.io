//page controller
var pnames = ['item1', 'item2','item3','item4','item5','item6','item7','item8'];
var curpage = 0;

var pnum = 1;
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
		alert('あってます @ ' + (curpage+1));
		$('#section'+(curpage+1)).animate({opacity:0}, 'ease', ()=>{
			nextpage();
			scrollTop();
			$('#section'+(curpage+1)).animate({opacity:1}, 'ease');
		});

	}
	else
	{
		alert('間違ってます @ ' + (curpage+1));
		$('#wrongmsg'+(curpage+1)).css('visibility', 'visible');
		$('#wrongmsg'+(curpage+1)).css('display', 'inherit');
		$('#wrongmsg'+(curpage+1)).animate({opacity: 1}, 'ease');
		// .item2 #wrongmsg
	}
}


function nextpage() {
	curpage++;
	$('#section'+(curpage+1)).css('opacity',0); //reset so there is a smooth transition
	$('#'+pnames[curpage])[0].checked = 1;
}


function resetview()
{
	$('#wrongmsg').animate({opacity: 0}, 'ease');
	$('#checkbutton').animate({opacity: 1}, 'ease');
	cbutton.disabled = false;

}

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
	resetview();
}

function check_1h()
{
	var ans = ['キイト','ホウチョウ','ウォッカ','タキビ','カナヅチ','ランプ','ブロックベイ','ヨウスイロ'];
	var boxes = document.getElementsByName('cw');

	for (var i = 0; i < boxes.length; i++)
	{
		if (boxes[i].value != ans[i])
		{
			$('#wrongmsg1').animate({opacity:1}, 'ease');
			return false;
		}
	}
	pnum = 2;
	console.log('all correct');
	cbutton.style.opacity = 0;
	cbutton.disabled = true;
	//hook even listener

	return true;

}

function setup() {

	$('input[name="cw2"]').on('input', check_2h);
}
setup(); //setup input hooks for section 2

function check_2h()
{
	var ans = ['ド','ア','カ','ク','イ','タ','セ','ジ','オ','シ','ウ','ン','ヨ','キ','モ','チ','ツ','タ','エ','ヨ','ウ','タ','イ','ジ','ト','ガ','ン','ク','イ','ヨ','イ','サ','ウ'];
	var boxes = document.getElementsByName('cw2');


	var count = 0;
	var wronginp = false;
	for (var i = 0; i < boxes.length; i++)
	{
		if (boxes[i].value.trim() != '')
		{
			count++;	
			wronginp |= (boxes[i].value != ans[i]);
		} 
	}
	if (count != boxes.length) return false; //do nothing when everything is not filled
	if (wronginp)
	{
		$('#wrongmsg2').animate({opacity:1}, 'ease');
		return false;
	}

	console.log('all correct');
	$('#s2textbox').removeClass('none');
	$('#s2textbox').animate({opacity:1}, 'ease');
	$('#s2textbox').removeClass('hidden-none');
	return true;
}

function check_2h_a()
{
	const ans = '大好き';
	var nexttext = document.getElementById('s2textbox');
	if (nexttext.value.trim() == ans)
	{
		$('#checkbutton2').animate({opacity: 1, display: 'block', visibility: 'visible'}, 'ease');
		$('#checkbutton2').removeClass('hidden-none none');
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
		$('#wrongmsg6').animate({opacity:1}, 'ease');
	}
	return false;
}

//scroll to top

function scrollTop() {
	window.scrollTo(0,0); //no need for animation.
}