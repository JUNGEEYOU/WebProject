function addUser(){
    
window.location.href = '/gallery/add';
}
function cancelAdd(){

window.location.href = '/gallery';
}



function myFunction(name, info, img, gallery_id) {
    
        var commnetdata ="<tr><th>User name</th><th>comment</th></tr>";
    
        document.getElementById("myModalLabel").innerHTML =  name;
        document.getElementById("info").innerHTML =  info;
        document.getElementById("gallery_img").src =img;
    
        console.log("idid",gallery_id);
    }
