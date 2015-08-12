function add(a,b){
	var addFlag,str1,str2,na,nb,Maxlen=[],Minlen=[],result=[];
	
	addFlag = 0;

	str1 = a.split("");
	str2 = b.split("");
	na = str1.length;
	nb = str2.length;

	if(na >= nb){
		Maxlen = str1;
		Minlen = str2
	} else{
		Maxlen = str2;
		Minlen = str1;
	}

	for(var i = Maxlen.length - 1;i >= 0;i--){
		if(Minlen.length > i)
			temp = parseInt(Maxlen[i]) + parseInt(Minlen[i]) +addFlag;
		else
			temp = parseInt(Maxlen[i]) + addFlag;

		if(temp > 9){
			result[i] = temp - 10;
			if(i == (Maxlen.length - 1)) 
				result[Maxlen.length] = 1;
            addFlag = 1;
		} else {
			result.push(temp);
			addFlag = 0;
		}
	}
	return result.reverse().join('');
};

var result = add("92395","5556789");
console.log(result);


function multi(a,b){
	var str1,str2,len1,len2,maxlen,result=[];
	str1 = a.split("").reverse();
	str2 = b.split("").reverse();
	len1 = str1.length;
	len2 = str2.length;

	for(var i = 0;i < len1 + len2 - 1;i++)
			result[i] = 0;
	for(var i = 0;i < len1;i++)
		for(var j = 0;j < len2;j++)
			result[i+j] += parseInt(str1[i]) * parseInt(str2[j]);

	var n = result.length;
	for(var k = 0;k < n;k++){
		var temp = result[k];
		if(temp >= 10){
			result[k] = temp % 10;
			result[k+1] += Math.floor(temp / 10);
		}	
	}
	return result.reverse().join("");
}

var answer = multi("14444","12223344");
console.log(answer);
