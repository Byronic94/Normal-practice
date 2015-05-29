//js查找一篇英文文章中出现频率最高的单词(由26个英文字母大小写构成)，输出该单词及出现次数，不区分大小写，主要是正则的运用

function counts(article){
    article = article.trim().toUpperCase();
	var array = article.match(/[A-z0-9]+/g);
	article = " "+array.join("  ")+" ";
	var max = 0,word,num = 0,maxword="";
	for(var i = 0; i < array.length; i++) {	    
		word = new RegExp(" "+array[i]+" ",'g');
		num = article.match(word).length;
		if(num>max){
		  max=num;
		  maxword = array[i];
	    }
	}
	console.log(maxword+" "+max);
}
counts("Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;");