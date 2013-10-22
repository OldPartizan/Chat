var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var text = require('fs');


server.maxConnections = 100;
server.listen(8080);

app.use(express.static(__dirname + '/'));


function formatDate(date) {
	var dd = date.getDate()
	if ( dd < 10 ) dd = '0' + dd;
	var mm = date.getMonth()+1
	if ( mm < 10 ) mm = '0' + mm;
	var yy = date.getFullYear() % 100;
	if ( yy < 10 ) yy = '0' + yy;
	return dd+'.'+mm+'.'+yy;
}



 var schetchlk = 0;


io.sockets.on('connection', function (socket) {

		socket.on('user', function(login) {
            socket.set('nickname', login, function() {
            var time = (new Date).toLocaleTimeString() + '/' + (formatDate(new Date()));
            socket.emit('conect', '<p>' + "Вы вошли в чат" + '</p>');
            socket.broadcast.emit ('conect', '<p>' + "В чат вошел " + login+ '(' + time + ')'+ '</p>');
            console.log("Connected new users: " + login + '(' + time + ')');
            ++schetchlk;
			io.sockets.emit ('addconect', schetchlk);
            });
		});


    socket.on('my_event', function(content) {
		try {
			var time = (new Date).toLocaleTimeString() + '/' + (formatDate(new Date()));
			console.log(content);
			var conmsg = '<p>' + content  + '(' + time + ')' + '</p>' ;
			io.sockets.emit('mmm', conmsg);

            text.open("mesg.txt", "a", 0644, function(err, file_handle) {
                if (!err) {
                    text.write(file_handle, content + '(' + time + ')' + '.' + '\r\n', null, 'utf8', function(err, written) {
                        if (!err) {
                            text.close(file_handle);
                        } else {
                            // Произошла ошибка при записи
                        }
                    });
                } else {
                    // Обработка ошибок при открытии
                }
            });


        }
		catch (e) {
            console.log(e);
            //client.disconnect();
        }
        });

        socket.on('disconnect',function(){
            socket.get('nickname', function (err, login) {
            console.log(login + ' disconnected');
            var us_dis = '<p>' + login + " покинул чат" + '</p>';
            io.sockets.emit ('mmm', us_dis);
			--schetchlk;
            io.sockets.emit ('addconect', schetchlk);
            });
        });

});

