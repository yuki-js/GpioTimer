"use strict";

var canvas = $("#graph");
var context = canvas[0].getContext("2d");
var currentValue = true;//ok?
var moveWidth = 1;
var imgData = null;
var pause=false;
function draw() {
    if(pause){
        return;
    }
    var width = canvas.width();
    var height = canvas.height();
    context.clearRect(0, 0, width, height);
    if(imgData){context.putImageData(imgData, -moveWidth, 0);}
    context.strokeStyle = "red";
    context.lineWidth = 10;
    context.beginPath();

    context.moveTo(width - moveWidth, currentValue * height);
    context.lineTo(width, currentValue * height);

    context.closePath();
    context.stroke();
    imgData = context.getImageData(0, 0, width, height);
    window.requestAnimationFrame(draw);
}
draw();

$("#pause").on("click",function(){
    if(pause){
        pause=false;
        draw();
    }else{
        pause=true;
    }
});
$("#out").on("click",function(){
    var blob = new Blob([ list.html() ], { "type" : "application/comma-separated-values" });
    window.URL = window.URL || window.webkitURL;
    var d=new Date();
    $(this).attr("href", window.URL.createObjectURL(blob))
        .attr("download","gpioTimer_"+d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2)+("0"+(d.getHours())).slice(-2)+("0"+d.getMinutes()).slice(-2)+".csv");
});
var list=$("#list");
list.html("value,sec,diff");
var socket = io();
var lastTs=0;
socket.on("change",function(v){
    
    currentValue= !!v.value;
    $("#value").text(currentValue?"ON":"OFF");
    if(pause){
        return;
    }
    
    if(list.html(list.html()+","+currentValue*1+","+v.ts+","+(v.ts-lastTs)).children().length>36){
        list.children().last().remove();
    }
    lastTs=v.ts*1;
});
