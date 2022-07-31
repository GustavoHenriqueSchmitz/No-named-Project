(function ($) {
    
    "use strict";

    /*=========================================================
                            Validate inputs
    =========================================================*/
    var input = $('.validate-input .input');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    /*=========================================================
                    Function to validate inputs
    =========================================================*/

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    /*=========================================================
                    Functions to return the validation
    =========================================================*/
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);

/*========================================================
                    Submit Form
========================================================*/
async function postFormFieldsAsJson({url, formData}) {
    // Create an object from the form data entries
    let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);
    console.log(formDataJsonString)
    // Set the fetch options (headers, body)
    let fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    };
  
    // Get the response body as JSON.
    // If the response was not OK, throw an error.
    let res = await fetch(url, fetchOptions);
  
    // If the response is not ok throw an error (for debugging)
    if (!res.ok) {
      let error = await res.text();
      throw new Error(error);
    }
    // If the response was OK, return the response body.
    window.location.replace("/");
    return res.json();
  }

// Get the form element by id
const sampleForm = document.getElementById("login-form");

// Add an event listener to the form element and handler for the submit an event.
sampleForm.addEventListener("submit", async (e) => {
/*Prevent the default browser behaviour of submitting
    the form so that you can handle this instead.*/
e.preventDefault();

// Get the element attached to the event handler.
let form = e.currentTarget;
// Take the URL from the form's `action` attribute.
let url = form.action;

try {
    /*Takes all the form fields and make the field values
    available through a `FormData` instance.*/
    let formData = new FormData(form);
    formData.set.name.perfil
    
    // The `postFormFieldsAsJson()` function in the next step.
    let responseData = await postFormFieldsAsJson({ url, formData });

    //Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);
} catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
}
});
