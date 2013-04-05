var intv;
function f(){
	//clear old values
	clearInterval(intv);
	//get keywords
	var x = document.getElementById('text').value;
	
	//call json function in every 10 seconds
	json(x);
	intv = setInterval(function(){
		json(x);
	}, 10000);
}

function json(x)
{
	//if getJSON returns an object successfully, enter the function
	$.getJSON("http://search.twitter.com/search.json?q="+x+"&rpp=5&callback=?", function(data){
		var results = data.results;	
		
		var tweets ='<div style="border-style:solid; border-color:#104E8B; border-width:2px; margin:30px; padding:5px;">';
				
		if(results.length==0)
			tweets += '<p style="font-style:normal; padding:20px;">No tweets found!</p>';
		else{
			tweets += '<table>';
			for(i=0; i<results.length; i++){
				var date = results[i].created_at;
				var username = results[i].from_user_name;
				var profileImageURL = results[i].profile_image_url;
				var nickname = results[i].from_user;
				var text = results[i].text;
				
				tweets += '<tr><td style="padding:5px; " rowspan="2" ><img style="border-style:solid; border-width:1px;" src="'+profileImageURL+'"></td>';
				tweets += '<td><b>'+username+'</b>&nbsp;<a href="https://twitter.com/'+nickname+'" target="_blank">'+nickname+'</a> &nbsp;('+date+')</td></tr>';
				tweets += '<tr><td>'+text+'</td></tr>';
			}
			tweets += '</table>';
		}
		tweets += '</div><hr/>';
		
		//add tweet list to the page
		document.getElementById('container').innerHTML = tweets;
	});
}