
   
    
      

  window.console = window.console || function(t) {};
  

 "use strict";
 "object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.START_MONITORING_AFTER)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(n){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(t){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){return window.CP.PenTimer.shouldStopLoop(o)},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};               
 var lista;
 
(function () {
    lista = document.getElementById('lista'), tareaInput = document.getElementById('tareaInput'), btnNuevaTarea = document.getElementById('btn-agregar');
    lista.innerHTML = getStorage();
    var agregarTarea = function () {
        var tarea = tareaInput.value, nuevaTarea = document.createElement('li'), enlace = document.createElement('a'), contenido = document.createTextNode(tarea);
        if (tarea === '') {
            tareaInput.setAttribute('placeholder', 'Agrega una tarea valida');
            tareaInput.className = 'error';
            return false;
        }
        enlace.appendChild(contenido);
        enlace.setAttribute('href', '#');
        nuevaTarea.appendChild(enlace);
        lista.appendChild(nuevaTarea);
        tareaInput.value = '';
        for (var i = 0; i <= lista.children.length - 1; i++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            lista.children[i].addEventListener('click', function () {
                this.parentNode.removeChild(this);
            });
        }
        window.CP.exitedLoop(1);
        setStorage(lista.innerHTML);
    };
    var comprobarInput = function () {
        tareaInput.className = '';
        teareaInput.setAttribute('placeholder', 'Agrega tu tarea');
    };
    var eleminarTarea = function () {
        this.parentNode.removeChild(this);
        setStorage(lista.innerHTML);
    };
    btnNuevaTarea.addEventListener('click', agregarTarea);
    tareaInput.addEventListener('click', comprobarInput);
    for (var i = 0; i <= lista.children.length - 1; i++) {
        if (window.CP.shouldStopExecution(2)) {
            break;
        }
        lista.children[i].addEventListener('click', eleminarTarea);
    }
    window.CP.exitedLoop(2);
    window.document.onunload = documentUnLoad;
}());
   
if (document.location.search.match(/type=embed/gi)) {
  window.parent.postMessage("resize", "*");
}

function setStorage(data) {
    // Store
    localStorage.setItem("array", data);
}
function getStorage(){
    // Retrieve
    return (localStorage.getItem("array")==null)?'':localStorage.getItem("array");
}