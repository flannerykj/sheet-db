import React from 'react'
import { render } from 'react-dom'

function postForm(event) {
  console.log(event);
    var request;
    // Bind to the submit event of our form
      // Abort any pending request
      if (request) {
          request.abort();
      }
      // setup some local variables
      var $form = $("#foo");

      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      // Serialize the data in the form
      var serializedData = $form.serialize();

      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      $inputs.prop("disabled", true);

      // Fire off the request to /form.php
      request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycbx_RDVvPFQl27aLHHp9rVNn0DTd2ZcLp1aoZXX9cODc6p05nwXE/exec",
          type: "post",
          data: serializedData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // Log a message to the console
          console.log("Hooray, it worked!");
          $('#foo')[0].reset();
          $('#message').text("Submitted!");

      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error(
              "The following error occurred: "+
              textStatus, errorThrown
          );
      });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
          $inputs.prop("disabled", false);
      });

      // Prevent default posting of form
      event.preventDefault();
}

export function Writer() {

  return (
    <div>
    <h2 id="message"></h2>
    <form id='foo' onSubmit={postForm}>
      <div className="form-group">
        <p>
          <label>Name</label>
          <input className="form-control" id='name' name='name' type='text'/>
        </p><p>
          <label>Email Address</label>
          <input className="form-control" id='email' name='email' type='email'/>
        </p><p>
          <label>Phone Number</label>
          <input className="form-control" id='phone' name='phone' type='tel'/>
        </p><p>
          <label>Message</label>
          <textarea className="form-control" id='message' name='message' rows='5'></textarea>
        </p>
          <div id='success'></div>
          <button className="btn btn-info"type='submit'>Send</button>
        </div>
    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script>


    </script>
    </div>
  )
}
