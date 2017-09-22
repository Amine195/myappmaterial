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
                <div>${data.name}
                    <a href="#!" class="secondary-content">
                        <i class="material-icons">send</i>
                    </a>
                </div>
            </li>
            `
        )
        $('#add_ville').find('.validate').val('');
    });
});