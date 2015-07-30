function reverse(div){
    if(div.childElementCount!=0)
	var list = div.childNodes;
    var rev = document.createElement('div')
    for(var i = list.length - 1; i>=0; i--){
    	rev.appendChild(list[i]);
    }
    div.parentNode.replaceChild(rev,div);
}