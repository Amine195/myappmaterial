$( document ).ready(function(){
    $(".button-collapse").sideNav();

    $("#register").validate({
        rules: {
            username: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email:true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmation: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            }
        },
        //For custom messages
        messages: {
            username:{
                required: "Enter a username",
                minlength: "Enter at least 5 characters"
            }
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
