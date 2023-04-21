$(document).ready(function(){
    console.log("everypage.js");
    $.ajax({
        url : "data/menu.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            makeMenu(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });

    $.ajax({
        url : "data/social.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            makeSocial(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });
})

function makeMenu(data){
    console.log(data);
    var html = "";
    data.forEach(element => {
        html += `<li class="nav-item ml-2 mr-2">
                    <a class="nav-link text-dark" href="${element.href}">${element.name}</a>
                </li>`;
    });

    $("#navbar-main").html(html);
}

function makeSocial(data){
    console.log(data);
    var html = "";
    data.forEach(element => {
        html += `<li class="pl-2">
                    <a href="${element.href}" class="rounded-circle">
                        <span class="fab ${element.icon}"></span>
                    </a>
                </li>`;
    });

    $("#social-media").html(html);
}