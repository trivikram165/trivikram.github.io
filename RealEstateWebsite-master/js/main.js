$(document).ready(function(){
    console.log("main.js");

    localStorage.removeItem("status");
    localStorage.removeItem("room");
    localStorage.removeItem("type");
    localStorage.removeItem("location");

    $.ajax({
        url : "data/services.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            console.log(data);
            makeServices(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });

    $.ajax({
        url : "data/place.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            console.log(data);
            makePlace(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });

    $("#contactus").click(function(){
        console.log("Btn click");

        /* check name */
        var name = $("[name='Name']").val();
        var regName = /^[A-z][a-z]{1,15}(\s[A-z][a-z]{1,15}){0,3}$/;
        var isNameValid = regName.test(name);
        
        var errors = [];

        if(!isNameValid){
            errors.push('name');
        }

        /* check email */
        var email = $("[name='Email']").val();
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isEmailValid = regEmail.test(email);

        if(!isEmailValid){
            errors.push('email');
        }

        /* check subject */
        var subject = $("[name='Subject']").val();
        console.log(subject);
        var regSubject = /^[a-zA-Z0-9_.-\s]+$/;
        var isSpecCharFound = regSubject.test(subject);
        console.log('Subject', subject, 'is', isSpecCharFound);
        console.log(subject.length)
        if(!isSpecCharFound || subject.length < 5 || subject.length > 50){
            errors.push('subject');
        }
        console.log(errors);

        /* check message */ 
        var message = $("[name='Message']").val();
        var regMessage = /^[a-zA-Z0-9_.-\s]+$/;
        var isSpecCharFound2 = regMessage.test(message);
        
        if(!isSpecCharFound2 || message.length < 20 || message.length > 300){
            errors.push('message');
            console.log('Message failed!');
        }

        if(errors.length == 0){
            alert('Message sent successfully!');
            $(".form-errors").text("");
            $("[name='Name']").val("");
            $("[name='Email']").val("");
            $("[name='Subject']").val("");
            $("[name='Message']").val("");
        }
        else{
            $(".form-errors").text("");
            errors.forEach(element => {
                if(element == 'name'){
                    $(".form-errors").append("<p class='text-light'>Name can only have letters between 2 and 15 characters long.</p>");
                }
                if(element == 'email'){
                    $(".form-errors").append("<p class='text-light'>Email is not in the right format.</p>");
                }
                if(element == 'subject'){
                    $(".form-errors").append("<p class='text-light'>Subject needs to be between 5 and 50 characters long, also special characters like #$%&/()'<>;: are not allowed.</p>");
                }
                if(element == 'message'){
                    $(".form-errors").append("<p class='text-light'>Message needs to be between 20 and 300 characters long, also special characters like #$%&/()'<>;: are not allowed.</p>");
                }
            });
        }


    })

    $.ajax({
        url : "data/properties.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            updateFilters(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });

    $("#findHere").click(function(){
        var status = $("[name='status']").val()
        var bedrooms = $("[name='bedrooms']").val()
        var type = $("[name='type']").val()
        var location = $("[name='location']").val()

        if(status == 0){
            localStorage.removeItem("status");
        }
        else{
            localStorage.setItem("status", status);
        }
        if(bedrooms == 0){
            localStorage.removeItem("room");
        }
        else{
            localStorage.setItem("room", bedrooms);
        }
        if(type == 0){
            localStorage.removeItem("type");
        }
        else{
            localStorage.setItem("type", type);
        }
        if(location == 0){
            localStorage.removeItem("location");
        }
        else{
            localStorage.setItem("location", location);
        }

        
        localStorage.removeItem("typeSep");
        localStorage.removeItem("locationSep");
        
        
        window.location = "property.html";
    })
})

function makeServices(data){
    var html = "";
    var idx = 0;
    data.forEach(element=> {
        html += `<div class="col-lg-4 ` 
        
        if(idx == 1){
            html += "serv-w3mk my-lg-0 my-5";
        }
        console.log(idx);

        html += ` service-card">
            <a class="${element.class}" href="#">
                <div class="w3pvtits-services-grids">
                    <div class="icon-effect-wthree">
                        <span class="fa ${element.icon} ser-icon"></span>
                    </div>
                    <h4 class="text-bl my-4">${element.headline}</h4>
                    <p class="text-center">${element.text}</p>
                    <a class="service-btn btn mt-xl-5 mt-4 ${element.class}" href="#">Read More
                        <span class="fa fa-long-arrow-right ml-2"></span>
                    </a>
                </div>  
            </a>
        </div>
        `;
        idx++;
    });
    $("#services-cards").html(html);

    $(".find-house").click(function(e){
        e.preventDefault();
        console.log("Find house");
        makeTypeSepStorage("House");
        window.location = "property.html";
    })
    $(".find-apartment").click(function(e){
        e.preventDefault();
        console.log("Find apartment");
        makeTypeSepStorage("Apartment");
        window.location = "property.html";
    })
    $(".find-land").click(function(e){
        e.preventDefault();
        console.log("Find land");
        makeTypeSepStorage("Land");
        window.location = "property.html";
    })

}

function makePlace(data){
    var html = "";
    data.forEach(element=> {
        html += `
                <div class="col-lg-3 col-sm-6 place-w3 ${element.extra}">
                    <!-- branch-img -->
                    <a id="${element.id}" href="#">
                    <div class="team-img ${element.img} place-card">
                        <div class="team-content">
                            <h4 class="text-wh">${element.place}</h4>
                            <p class="team-meta">${element.city}</p>
                        </div>
                    </div>
                    </a>
                </div>
        `;
    });
    $("#place-cards").html(html);

    $("#losangeles").click(function(e){
        e.preventDefault();
        console.log("Find Los Angeles");
        makeLocationSepStorage("Los Angeles");
        window.location = "property.html";
    })
    $("#newyork").click(function(e){
        e.preventDefault();
        console.log("Find New York");
        makeLocationSepStorage("New York");
        window.location = "property.html";
    })
    $("#madrid").click(function(e){
        e.preventDefault();
        console.log("Find Madrid");
        makeLocationSepStorage("Madrid");
        window.location = "property.html";
    })
    $("#paris").click(function(e){
        e.preventDefault();
        console.log("Find Paris");
        makeLocationSepStorage("Paris");
        window.location = "property.html";
    })
}

function updateFilters(data){
    var allStatuses = [];
    var allTypes = [];
    var allLocations = [];
    var allRooms = [];

    for(d of data){
        if(!allStatuses.includes(d.status)){
            allStatuses.push(d.status);
        }
        if(!allTypes.includes(d.type)){
            allTypes.push(d.type);
        }
        if(!allLocations.includes(d.location)){
            allLocations.push(d.location);
        }
        if(!allRooms.includes(Number(d.rooms))){
            var num = Number(d.rooms);
            allRooms.push(num);
        }
    }

    allRooms.sort((a, b) => {
        if(a > b)
            return 1;
        else if(a < b)
            return -1;
        else 
            return 0;
    })
    
    makeSelectTag(allStatuses, "Status");
    makeSelectTag(allTypes, "Type");
    makeSelectTag(allLocations, "Location");
    makeSelectTag(allRooms, "Bedrooms");
}

function makeSelectTag(data, name){
    html = `<option value='0'>${name}</option>`;
    for(d of data){
        html += `<option value="${d}">${d}</option>`
    }
    var nameToLow = name.toLowerCase();
    $(`[name='${nameToLow}']`).html(html);
}

function makeTypeSepStorage(name){
    localStorage.setItem("typeSep", name);

    localStorage.removeItem("status");
    localStorage.removeItem("room");
    localStorage.removeItem("type");
    localStorage.removeItem("location");
    localStorage.removeItem("locationSep");
}

function makeLocationSepStorage(name){
    localStorage.setItem("locationSep", name);

    localStorage.removeItem("status");
    localStorage.removeItem("room");
    localStorage.removeItem("type");
    localStorage.removeItem("location");
    localStorage.removeItem("typeSep");
}