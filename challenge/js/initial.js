$(document).ready(function(){
	$("#Type1").hide();
    $("#Type2").hide();
    $("#Type3").hide();
  $("#challengeType1").click(function(){
  	$("#Type1").show();
    $("#Type2").hide();
    $("#Type3").hide();

  });

  $("#challengeType2").click(function(){
  	$("#Type1").hide();
    $("#Type2").show();
    $("#Type3").hide();
  });

  $("#challengeType3").click(function(){
  	$("#Type1").hide();
    $("#Type2").hide();
    $("#Type3").show();
  });
});