
function addUser(){
    
window.location.href = '/gallery/add';
}
function cancelAdd(){

window.location.href = '/gallery';
}


var id = 0; 

var id = 0; 

function myFunction(bbb, name, info, img, gallery_id,test) {
    id = gallery_id;
    var srt; 
    document.getElementById("myModalLabel").innerHTML =  name;
    document.getElementById("info").innerHTML =  info;
    document.getElementById("gallery_img").src =img;
    document.getElementById("test").innerHTML = id;

     console.log("dddd", test);
    // for(var j=0; j < data[1].lenght ; j++){
    //     if(gallery_id ==data[1][j].gallery_id ){
    //         console.log("id test", data[1][j].comment);
    //     }
    // }
    

    console.log("idid",bbb);


}
        
