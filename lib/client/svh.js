//SSE Client - Equan Pr <http://equan.me>
'use strict';
var sse;
if (!!window.EventSource) {
    sse = new EventSource('/reload');
    sse.addEventListener("reload", function (event) {
        var data = JSON.parse(event.data);
        if (data['reload']) {
            if(window.XMLHttpRequest) {
                var httpRequest;
                console.log('send reload status to server');
                httpRequest = new XMLHttpRequest();

                httpRequest.onreadystatechange = function(){
                  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      sse.close();
                      setTimeout(function(){
                        window.location.reload();
                      }, 5);

                      if(humane){
                          humane.timeout = 13000;
                          humane.log('Reload...');  
                      } else {
                          console.log("Reload...\n");
                      }   
                  }
                };

                httpRequest.open("POST","http://localhost:"+data.port+"/reload", true);

                var clientStatus = {reload: false};
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send(JSON.stringify(clientStatus));
            }
        }
    }, false);

} else {
    console.log("Your browser doesn't support server-sent event. Better if you upgrade it!");
}
