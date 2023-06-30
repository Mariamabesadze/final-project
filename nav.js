let navelements = ["home", "about", "contact", "log in"];

let navlinks = ["index.html", "about.html",  "contact.html", "logIn.html"];

let navtext = '<ul class="flex">';

let navlength = navelements.length;
for(i=0; i<navlength; i++){
    navtext += '<li><a href="'+navlinks[i]+'">' + navelements[i] + "</a></li>";
    console.log(navtext);
}
navtext += "</ul>";

document.getElementById("nav").innerHTML = navtext;