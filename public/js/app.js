$( document ).ready(function(){
    // Mobile side nav
    $(".button-collapse").sideNav();

    // Register validate
    $("#register").validate({
        rules: {
            username: {
                required: true,
                minlength: 6
            },
            email: {
                required: true,
                email:true
            },
            password: {
                required: true,
                minlength: 9
            },
            confirmation: {
                required: true,
                equalTo: "#password"
            }
        },
        //For custom messages
        messages: {
            username:{
                required: "Ce Champ est obligatoir !",
                minlength: "Le nom d'utilisateur doit au moin contenir 6 charactére !"
            },
            email:{
                required: "Ce Champ est obligatoir !",
                email: "Entrer un valid email !"
            },
            password:{
                required: "Ce Champ est obligatoir !",
                minlength: "Le mot de passe doit au moin contenir 9 charactére !"
            },
            confirmation:{
                required: "Ce Champ est obligatoir !",
                equalTo: "vérifier votre mot de passe !"
            },
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
    });
});

// Post ville ajax
$('#add_ville').submit(function(e) {
    e.preventDefault();
    
    var villeItem = $(this).serialize();

    $.post('/ville', villeItem, function(data) {
        $('#ville-list').append(
            `
            <li class="collection-item">
                <div class="row edit-form" style="margin-bottom:0px; margin-top:15px;">
                    <form class="col s8 offset-s4 form-edit" method="POST" action="/ville/${data._id}">
                        <div class="row" style="margin-bottom:0px;">
                            <div class="input-field col s6" style="margin-top:0px;">
                                <input id="${data._id}" value="${data.name}" name="ville[name]" type="text" class="validate" style="margin-bottom:0px;">
                                <label for="${data._id}">Modifier le nom d'une ville *</label>
                            </div>
                            <button class="btn btn-floating waves-effect waves-light green" type="submit" name="submit"><i class="material-icons right">check</i></button>
                        </div>
                    </form>
                </div>
                <div class="row" style="margin-bottom:0px;">
                    <h6 class="col s6">
                        ${data.name}
                    </h6> 
                    <div class="col s6 right-align">
                        <button class="btn-floating waves-effect waves-light blue darken-1 edit-button"><i class="material-icons">edit</i></button>                      
                        <form style="display: inline" method="POST" action="/ville/${data._id}" class="delete-ville">
                            <button type="submit" class="btn-floating waves-effect waves-light red"><i class="material-icons">delete</i></button>
                        </form>
                    </div>
                </div>
            </li>
            `
        )
        $('#add_ville').find('.validate').val('');
    });
});

// Edit page ajax
$('#ville-list').on('click', '.edit-button', function() {
    $(this).parents().siblings('.edit-form').toggle();
});

// Post Edit page ajax
$('#ville-list').on('submit', '.form-edit', function(e) {
    e.preventDefault();
    var villeItem = $(this).serialize();
    var actionUrl = $(this).attr('action');
    $originalItem = $(this).parents('.collection-item');
    $.ajax({
        url: actionUrl,
        data: villeItem,
        type: 'PUT',
        originalItem: $originalItem,
        success: function(data){
            this.originalItem.html(
                `
                <div class="row edit-form" style="margin-bottom:0px; margin-top:15px;">
                    <form class="col s8 offset-s4 form-edit" method="POST" action="/ville/${data._id}">
                        <div class="row" style="margin-bottom:0px;">
                            <div class="input-field col s6" style="margin-top:0px;">
                                <input id="${data._id}" value="${data.name}" name="ville[name]" type="text" class="validate" style="margin-bottom:0px;">
                                <label for="${data._id}">Modifier le nom d'une ville *</label>
                            </div>
                            <button class="btn btn-floating waves-effect waves-light green"><i class="material-icons right">check</i></button>
                        </div>
                    </form>
                </div>

                <div class="row" style="margin-bottom:0px;">
                    <h6 class="col s6">
                        ${data.name}
                    </h6>
                        
                    <div class="col s6 right-align">
                        <button class="btn-floating waves-effect waves-light blue darken-1 edit-button"><i class="material-icons">edit</i></button>                      
                        <form style="display: inline" method="POST" action="/ville/${data._id}" class="delete-ville">
                            <button type="submit" class="btn-floating waves-effect waves-light red"><i class="material-icons">delete</i></button>
                        </form>
                    </div>
                </div>
                `
            )
        }
    });
});

$('#ville-list').on('submit', '.delete-ville', function(e) {
    e.preventDefault();
    var confirmResponse = confirm('Vous etes sure ?');
    if(confirmResponse) {
        var actionUrl = $(this).attr('action');
        $villeToDelete = $(this).closest('.collection-item');
        $.ajax({
            url: actionUrl,
            type: 'DELETE',
            villeToDelete: $villeToDelete,
            success: function (data) {
                this.villeToDelete.remove();
            }
        })
    } else {
        $(this).find('button').blur();
    }
});