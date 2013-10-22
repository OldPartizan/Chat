var socket = io.connect('http://localhost');



function user_conect () {
socket.emit('user', login);
socket.on('conect', function (data) {
		addMessage(data);
});

}



function addMessage(data) {
        var divr = document.createElement('b');
		divr.innerHTML = data;
		$(divr).insertBefore('#mess');
		$('#mess').insertBefore(divr);
    }



socket.on ('addconect', function (data) {
  		
		
        adduser (data);
 
});


function m () { 
	
		
	$('#msg_input').click(function() {
		var x = $('#messages').val();
		socket.emit('my_event',  login + ': ' + x);
		$('#messages').val('');
	});	
  	
	socket.on('mmm', function (data) {
		
		addMessage(data);

				
		
	});

}


	
	