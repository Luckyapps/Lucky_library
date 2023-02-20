window.addEventListener("load", function () {console.warn("[LUCKY_LIBRARY] Loaded")});

function element_add(wert, element, mode){ //Etwas (z.B. Text) zu einem html element hinzufügen
    if(element){
      if(mode){
        if(mode == "add"){
          document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + wert;
        }
        mode = undefined;
      }else{
        document.getElementById(element).innerHTML = wert;
        console.log("container add to element");
        element = undefined;
      }
    }else{
      console.warn("ERROR: -element_add() kein Element angegeben");
    }
}

function get_add(adress){ //Hilfsfunktion gehört zu data_get()
    return new Promise(resolve => {
    var requestURL = adress;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      var data_temp2 = request.response;
      resolve(data_temp2);
    }
  });
}

async function data_get(adress){ //Api Abfrage zurückgeben
     var data_temp = await get_add(adress);
     return data_temp;
}

function sleep(ms) { //Sleep funktion, wird ausgelöst mit: await sleep(ms) !!Aufrufende funktion muss asynchron sein!!
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createHTML(htmlString) { //HTML element erstellen
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

async function scriptLoader(path, callback){ //Ein JS script einbetten
  var script = document.createElement('script');
  script.type = "text/javascript";
  //script.async = true;
  script.src = path;
  script.onload = function(){  
    if(typeof(callback) == "function"){
      callback();
    }
  }
  try
  {
    var scriptOne = document.getElementsByTagName('script')[0];
    scriptOne.parentNode.insertBefore(script, scriptOne);
  }
  catch(e)
  {
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}

function cssLoader(file, callback){ //Ein CSS stylesheet einbetten || Callback: Eine Funktion ausführen, wenn sheet geladen ist
    var link = document.createElement("link");
    link.href = file;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
    link.onload = function(){
      if(typeof(callback) == "function"){
          callback();
      }
  }
}


async function fetch_data(url, type){ //Daten einer API abrufen --> Muss mit await aufgerufen werden
  var data;

  url = await http_fix(url);
  
  await fetch(url)
  
  .then((response) => response.text())

  .then((data_text) => {
    if(type == "JSON"){
      data = JSON.parse(data_text)
    }else{
      data = data_text;
    }
  });

  return data;
}

function http_fix(url){
  if(!url.includes("https")){
      if(url.includes("http")){
          url = url.replace("http","https");
          return url;
      }
  }else{
      return url;
  }
}
