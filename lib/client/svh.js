/**
 * Reload Check
 *
 * Description :
 * Client JavaScript to Check Reload Event via Server-Sent Event
 *
 *
 * Author By : Equan Pr
 * http://www.junwatu.com
 */

var source = new EventSource('/reload');

function connect() {
    source.addEventListener("reload", function (event) {

        var data = JSON.parse(event.data);
        //console.log(data);
        if (data['reload'] === "yes" && data['reloadFlag'] === 1) {
            console.log("reloading...\n");
            source.close();
            window.location.reload();
        }
    }, false);

    source.addEventListener("open", function (event) {
        //console.log("Connection open!");
    });

    source.onerror = function (event) {
        if (event.target.readyState === EventSource.CLOSED) {
            source.close();
            //console.log("Connection closed!");
        } else if (event.target.readyState === EventSource.CONNECTING) {
            //console.log("Connection closed. Attempting to reconnect!");
        } else {
            //console.log("Connection closed. Unknown error!");
        }
    };
}

if (!!window.EventSource) {
    connect();
} else {
    console.log("doesn't support server-sent event");
}
