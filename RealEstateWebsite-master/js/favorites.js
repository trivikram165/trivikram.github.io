$(document).ready(function(){
    var favorites = localStorage.getItem("fav");
    var favParse = JSON.parse(favorites);
    console.log(favParse);
    showProperties(favParse);

})

function showProperties(data){
    console.log(data);
    html = "";
    if(data){
        for(d of data){
            html += `
            <div class="col-xl-4 col-lg-4 col-md-6 mt-3">
                <span class="image-block img-hover">
                    <a class="image-zoom" href="images/g1.jpg" data-gal="prettyPhoto[gallery]">
                        <img src="images/${d.img}" class="img-fluid " alt="${d.title}">
                    </a>
                </span>
                <div class="property-info-list">
                    <div class="detail">
                        <h4 class="title">
                            ${d.title}
                        </h4>
                        <div class="location mt-2 mb-2">
                            <a href="single.html">
                               <i class="fas fa-map-marker-alt"></i> ${d.location},  ${d.date}
                            </a>
                        </div>
                        <ul class="facilities-list clearfix">
                            <li class="mt-2 mb-2">
                                <i class="fas fa-bed"></i>${d.rooms} Bedrooms
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="fas fa-adjust"></i>${d.status}
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="far fa-building"></i>${d.type}
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="fas fa-dollar-sign"></i>${d.price}
                            </li>
                        </ul>
                    </div>
                    <div class="footer-properties">
                        <a class="admin" href="#">
                            <i class="fa fa-user"></i> ${d.owner}
                        </a>
                        <span>
                            <a class="open-modal" item="${d.id}" href="">Contact <i class="fas fa-arrow-right"></i></a>
                        </span>
                    </div>
                </div>
            </div>
            `
        }
        
        $("#property-card-holder").html(html);
    }
    else{
        html = "<div class='col-12 mt-5'> <h2 class='text-center'> You dont have any properties added to favorites. </h2> </div>";
        $("#property-card-holder").html(html);
    }
    

    $(".open-modal").click(function(event){
        event.preventDefault();
        $("#modal").removeClass("d-none");
        $("#modal").addClass("d-flex");
        showSpecificModal(this, data);

        var id = $(this).attr("item");
        var favorites = localStorage.getItem("fav");
        
        if(favorites){
            var favParsed = JSON.parse(favorites);
            for(obj of favParsed){
                console.log(obj.id, id);
                if(obj.id == id){
                    $(".add-fav").text("Remove from favorites");
                    break;
                }
                else{
                    $(".add-fav").text("Add to favorites");
                }
            }
        }
        else{
            $(".add-fav").text("Add to favorites");
        }
        
    })
}

function showSpecificModal(item, data){
    console.log(item);
    var id = $(item).attr("item");
    var specItem;
    $(".modal-info").html("");
    for(d of data){
        if(d.id == id){
            specItem = `
            <div class="d-flex">
                <img class="w-100" src="images/${d.img}" alt=""/>
            </div>
            
            <div class="p-4">
                <div class="row">
                    <form class="w-100">
                        <div class="col-12">
                            <input type="text" class="form-control border-radius-0" id="titleModal" placeholder="Subject" name="Subject">
                        </div>
                        <div class="col-12 mt-3">
                            <input type="email" class="form-control border-radius-0" id="emailModal" placeholder="Owner's email" name="Email">
                        </div>
                        <div class="col-12 mt-3">
                            <textarea class="w-100" id="textarea" name="Message" placeholder="Message" required=""></textarea>
                            </textarea>
                        </div>
                        <div class="col-12 mt-3 errors font-08 text-red">

                        </div>
                    </form>
                    <div id="modalButtons" class="col-12 mt-3 d-flex justify-content-center">
                        <button id="sendEmailModal" class="pl-3 pr-3 pt-2 pb-2 mr-3 border modal-btn text-center m-0-md" type="button">Send</button>
                        <a href="#" data="0" class="add-fav pl-3 pr-3 pt-2 pb-2 mr-3 border modal-btn text-center m-0-md">Add to favorites</a>
                        <a href="#" class="close-modal pl-3 pr-3 pt-2 pb-2 border ml-3 modal-btn text-center m-0-md"><i class="fas fa-times"></i></a>
                    </div>
                </div>
            </div>
                `
            $(".modal-info").html(specItem);

            $(".add-fav").attr("item", id);

            $(".close-modal").click(function(event){
                event.preventDefault();
                console.log("close-modal");
                $("#modal").addClass("d-none");
                $("#modal").removeClass("d-flex");
            })
        
            //Favorites
            $(".add-fav").click(function(e){
                e.preventDefault();
                console.log("add-fav");
                var id = $(this).attr("item");
                var allData;
        
                $.ajax({
                    url : "data/properties.json",
                    method: 'GET', 
                    type: 'json',
                    success: function(data) { 
                        for(d of data){
                            if(d.id == id){
                                var thisItem = d;
                            }
                        }
                        var favorites = localStorage.getItem("fav");
                        console.log(favorites);
                        var favParsed = JSON.parse(favorites);
                        console.log(favParsed);
                        addOrRemoveFavorites(favParsed, thisItem);
                    },
                    error: function(xhr, error, status) {
                        console.log(xhr);
                    }
                });
        
            });

            $("#sendEmailModal").click(function(){
                checkEmail();
            })
        }
    }
}

function addOrRemoveFavorites(storage, thisItem){
    if(storage){
        console.log("There is something in storage.");
        var isThisItemInStorage = false;
        for(obj of storage){
            console.log(obj.id, thisItem.id)
            if(obj.id == thisItem.id){
                console.log("This object is in storage");
                isThisItemInStorage = true;
                //DELETE THIS ITEM FROM STORAGE
                // 1. get storage, 2. delete this item from storage 3. set this as new storage
                var favorites = localStorage.getItem("fav");
                var favParsed = JSON.parse(favorites);
                
                for(idx in favParsed){
                    if(favParsed[idx].id == thisItem.id){
                        delete favParsed[idx];
                        break;
                    }
                }

                var noNullFav = favParsed.filter(function (el) {
                    return el != null;
                });

                if(noNullFav.length == 0){
                    console.log("No items left in localstorage.");
                    localStorage.removeItem("fav");
                }
                else{
                    console.log("There are still items left in storage.");
                    var stringFav = JSON.stringify(noNullFav);
                    localStorage.setItem("fav", stringFav);
                    console.log(localStorage.getItem("fav"));
                }
            
                $(".add-fav").text("Add to favorites");
                //if you delete remove object from favorites refresh page and close modal
                showProperties(JSON.parse(localStorage.getItem("fav")));
                $("#modal").addClass("d-none");
                $("#modal").removeClass("d-flex");
                break;
            }
        }
        if(!isThisItemInStorage){
            //If there are some items in storage but not this one
            var favorites = localStorage.getItem("fav");
            var favParsed = JSON.parse(favorites);    
            favParsed.push(thisItem);
            var stringFav = JSON.stringify(favParsed);
            localStorage.setItem("fav", stringFav);
            console.log(localStorage.getItem("fav")); 

            $(".add-fav").text("Remove from favorites");
        }
    }
    else{
        //SET ITEM IN STORAGE
        console.log("There is nothing in storage.");
        var newFavList = [];
        newFavList.push(thisItem);
        var stringFav = JSON.stringify(newFavList);
        localStorage.setItem("fav", stringFav);
        console.log(localStorage.getItem("fav"));

        $(".add-fav").text("Remove from favorites");
    }
}

function checkEmail(){
    var errors = [];

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
    
    /* check message */ 
    var message = $("[name='Message']").val();
    var regMessage = /^[a-zA-Z0-9_.-\s]+$/;
    var isSpecCharFound2 = regMessage.test(message);
    
    if(!isSpecCharFound2 || message.length < 20 || message.length > 300){
        errors.push('message');
        console.log('Message failed!');
    }

    console.log(errors);
    $(".errors").html("");
    for(e of errors){
        if(e == "email"){
            $(".errors").append("<p class='text-red font-08'>Email is not in the right format.</p>");
        }
        if(e == "subject"){
            $(".errors").append("<p class='text-red font-08'>Subject needs to be between 5 and 50 characters long, also special characters like #$%&/()'<>;: are not allowed.</p>");
        }
        if(e == "message"){
            $(".errors").append("<p class='text-red font-08'>Message needs to be between 20 and 300 characters long, also special characters like #$%&/()'<>;: are not allowed.</p>");
        }
    }

    if(errors.length == 0){
        alert("Email sent successfully!");
        $("[name='Email']").val("");
        $("[name='Subject']").val("");
        $("[name='Message']").val("");
    }
}