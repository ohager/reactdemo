var httpRequest = new XMLHttpRequest();
var person = {};

 /* */

function changed(event){
    person[event.target.id] = event.target.value;
}

function save(){

    httpRequest.onreadystatechange = responseHandler;
    httpRequest.open("POST", "http://www.oldschoolway.com/person");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send( JSON.stringify(person) );

}

function responseHandler() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200 ) {
            console.log(httpRequest.responseText);
        } else {
            console.error('Damn!');
        }
    }
}