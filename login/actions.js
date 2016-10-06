function request( url, callback ) // Make request
{
    var xhttp = new XMLHttpRequest( ); // Create ajax request
    xhttp.onreadystatechange = function( ) 
    {
        if (this.readyState == 4 ) // Confirm request status
        {
            if( this.status == 200 ) // Confirm http code
            {
                callback( true, this.response ); // Run callback
            }
            else
            {
                callback( false, this.status ); // Run callback
            }
        }
    };
    xhttp.open( "GET", url, true ); // Open request
    xhttp.send( ); // Start request
}

function setErrorMessage( text ) // Create function to set error message
{
    document.getElementById( "errorsec" ).innerHTML = text; // Set message
}

function handleContinued( complete, data ) // Callback
{
    console.log( "Returned: " + data ); // Log callback parameter
    
    if( !complete ) // If request failed
    {
        document.getElementById( "spinner" ).style.visibility = "hidden"; // Hide spinner
        
        setErrorMessage( "An error occoured. Code: " + data ); // Set error
    }
    else
    {
        document.getElementById( "spinner" ).style.visibility = "hidden"; // Hide spinner
        
        var jsonObject = JSON.parse( data ); // Parse json
        
        if( jsonObject.value == "account_in_use" ) // If account is in use
        {
            document.getElementById( "un" ).style.borderColor = "#FDCF55"; // Set border colors
            document.getElementById( "pw" ).style.borderColor = "#FDCF55";
            
            setErrorMessage( "Username taken" ); // Set message
        }
        else if( jsonObject.value == "created" ) // If complete w/o issue
        {
            window.open( "welcome/", "_self" ); // Goto welcome page
        }
    }
}

function handle( ) // Main handle function
{
    var username = document.getElementById( "un" ).value; // Get field value
    var password = document.getElementById( "pw" ).value;
    
    var continuePermitted = true;
    
    document.getElementById( "spinner" ).style.visibility = "visible"; // Make spinner visible
    
    if( username == "" ) // If username is blank
    {
        document.getElementById( "un" ).style.borderColor = "#F35B6B"; // Set border color
    }
    
    if( password == "" ) // If password is blank
    {
        document.getElementById( "pw" ).style.borderColor = "#FDCF55"; // Set border color
    }
    
    if( continuePermitted ) // If no errors happened
    {
        request( encodeURI( "../../FRAMEWORK/createaccount.php?name=" + username + "&password=" + password ), handleContinued ); // Start request & encode uri
    }
    else // If a field if left out
    {
        setErrorMessage( "Enter a value for the highlighted fields"); // Set error message
    }
}