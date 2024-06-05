let altAlan=document.getElementsByClassName("altAlan");
for (let i = 0; i < altAlan.length; i++) {
  altAlan[i].style.display="none"
}
console.log();
function altAlann(no) {
if (document.getElementsByClassName("arrow")[no].className=="arrow fa-solid fa-chevron-up") {
  document.getElementsByClassName("arrow")[no].className="arrow fa-solid fa-chevron-down";
  altAlan[no].style.display="none";
}  
else{
  document.getElementsByClassName("arrow")[no].className="arrow fa-solid fa-chevron-up"
  altAlan[no].style.display="block";
}
}
