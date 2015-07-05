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
                          humane.timeout = 1300;
                          humane.log('svh reload...');  
                      } else {
                          console.log("Reload...\n");
                      }   
                  }
                };
                
                httpRequest.open("POST","http://"+window.location.hostname+":"+data.port+"/reload", true);

                var clientStatus = {reload: false};
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send(JSON.stringify(clientStatus));
            }
        }
    }, false);

} else {
    console.log("Reload is disabled because your browser doesn't support SSE.");
}