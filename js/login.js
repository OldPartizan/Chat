var login = null;

function show(){
    var username = prompt("Для входа в чат просто введите ваше имя","");
    if (username != null && username!=""){
       login = username;
       user_conect ();

    }
    else {
    document.write("Ошибка! Попробуте еще раз.");
    }
}