var a;
function displayStickies(ul){
	for(var i=0;i<localStorage.length;i++){
		var key1=localStorage.key(i),
		stickyExp=/Sticky/;
		if(stickyExp.test(key1)){
			var sticky=localStorage.getItem(key1),
			sticky=JSON.parse(sticky),
			key1=key1.substring(7,9),
			li=document.createElement("li");
			li.style.backgroundColor=sticky.color;
			li.innerHTML=key1+"."+"<br>"+sticky.note;
			ul.appendChild(li);
			li.setAttribute("contenteditable","true");	
		}
	}
}
function checkTextarea(textArea){
	var h2=document.getElementsByTagName("h2")[0];
	if(h2.style.display==="block"){
		h2.style.display="none";
	}
	textArea.value="";
	textArea.setAttribute("placeholder","Type here and click Create Sticky");
}
function addSticky(textArea,ul,selectTag,selectedColor){
	var textValue=textArea.value;
	//Check whether textarea contains text
	if(textValue===""){
	textArea.setAttribute("placeholder","");
	document.getElementsByTagName("h2")[0].style.display="block";
	return;	
	}
	//Prevent duplicate stickies
	for(var i=0;i<localStorage.length;i++){
		var key1=localStorage.key(i),
		string=localStorage.getItem(key1);
		string=JSON.parse(string);
		if(string.note===textValue){
			alert("Sticky already created. Please create a different sticky");
			return;	
		}
	}
	var key=localStorage.length;
	if(key===0){
		key=1;
	}
	//Prevent duplicate keys
	for(var i=0;i<localStorage.length;i++){
		var key1=localStorage.key(i);
		key1=parseInt(key1.substring(7,9));
		if(key===key1){
			key++;
		}
	}
	var key_1="Sticky_"+key,	
	li=document.createElement("li");
	var noteObject={
		"note":textValue,
		"color":selectedColor	
	};
	localStorage.setItem(key_1,JSON.stringify(noteObject));
	li.style.backgroundColor=selectedColor;
	li.innerHTML=key+"."+"<br>"+textValue; 
	ul.appendChild(li);
	li.setAttribute("contenteditable","true"); 
}
function deleteStickyMain(){
	var key5,
	num;
	function deleteSticky(){
		num=prompt("Please look at the sticky number"+"\n"+"and enter it below to delete");
		for(var i=0;i<localStorage.length;i++){
			key5=localStorage.key(i);
			if(num===key5.substring(7,9)){
				localStorage.removeItem(key5);
				alert("Sticky "+num+" successfully deleted");
				location.reload(true);
				return a=true;
			}
		}
	}
	function returnDeleteSticky(){
		if(num===null||num===""){
			alert("Delete failed. No Sticky was deleted");
			return;
		}
		while(num!==null||num!==""){
			if(num===null||num===""){
				alert("Delete failed. No Sticky was deleted");
				return;
			}if(a===true){
				return;
			}
			alert("There is no sticky with the number "+num+"\n"+"Please enter a valid number");
			deleteSticky();
		}
	}
	if(localStorage.length===0){
		alert("There are no stickies to delete");
		return;	
	}
	deleteSticky();
	if(a===true){
		return;
	}else{
		returnDeleteSticky();
	}
}
function clearStickies(){
	if(localStorage.length===0){
		alert("Error deleting stickies."+"\n"+"There are no stickies to delete!");
		return;	
	}
	var returnValue=prompt("Are you sure you want to delete all stickies?"+"\n"+"Type 'yes' or 'no'");
	if(returnValue==="no"){
		alert("Delete cancelled");
		return;
	}else if(returnValue==="yes"){
		localStorage.clear();
		alert("All Stickies have been successfully deleted");	
		location.reload(true);
	}else if(returnValue===null||returnValue===""){
		alert("Delete failed. No sticky was deleted");
		return;		
	}else{
		alert("You typed an invalid response. Delete failed");	
	}

}
window.onload=function(){
	var selectTag=document.getElementById("color"),
	selectedOptionIndex=selectTag.selectedIndex,
	selectedColor=selectTag.options[selectedOptionIndex].innerHTML;
	selectTag.style.color=selectedColor;
	function changeSelectColor(){
	selectedColor=selectTag.options[selectTag.selectedIndex].innerHTML;
	selectTag.style.color=selectedColor;
	}
	var ul=document.getElementsByTagName("ul")[0];
	textArea=document.getElementById("textarea");
	textArea.setAttribute("placeholder","Type here and click Create Sticky");
	textArea.style.backgroundColor=selectedColor;
	selectTag.onchange=function(){
		changeSelectColor();
		textArea.style.backgroundColor=selectedColor;
	}
	//display stickies on page
	displayStickies(ul);
	//clear textarea before input
	textArea.onfocus=function(){
		checkTextarea(textArea);
	};
	//add sticky to local storage and page after button click
	document.getElementsByTagName("input")[0].onclick=function(){
		addSticky(textArea,ul,selectTag,selectedColor);	
	};
	document.getElementsByTagName("input")[1].onclick=function(){
		deleteStickyMain();	
	};
	document.getElementsByTagName("input")[2].onclick=function(){
		clearStickies();	
	};
};



