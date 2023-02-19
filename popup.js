var xhr = null;
var data_result = null;

var xhr2 = null;
var data_result2 = null;

const getXmlHttpRequestObject = function () {
    if (!xhr) {
        xhr = new XMLHttpRequest();
    }
    return xhr;
};

function dataCallback() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("received response");
        // dataDiv = document.getElementById('result-container');
        // dataDiv.innerHTML = xhr.responseText;
        // alert(xhr.responseText);
        data_result = JSON.parse(xhr.responseText);
        var div = document.getElementById('legend');
        div.innerHTML = `Total emissions: ` + Math.round(data_result.Total_emissions*100)/100;
        // alert(data_result.Total_emissions);
    }
}
function sendData(dat) {
    // var input = document.getElementById('data-input').value;
    var data = {
        name: dat
    };

    var dataToSend = JSON.stringify(data);
    if (!dat) {
        console.log("input was empty");
        return;
    }

    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = dataCallback;
    // asynchronous requests
    xhr.open("PUT", "http://localhost:3000/get_stats", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // Send the request over the network
    console.log("sending: " + dataToSend);
    xhr.send(dataToSend);
}

//
const getXmlHttpRequestObject2 = function () {
    if (!xhr2) {
        xhr2 = new XMLHttpRequest();
    }
    return xhr2;
};

function dataCallback2() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
        console.log("received response");
        // dataDiv = document.getElementById('result-container');
        // dataDiv.innerHTML = xhr.responseText;
        // alert(xhr.responseText);
        data_result2 = xhr2.responseText;
        var div = document.getElementById('openai-res');
        div.innerHTML = data_result2.split("\n").join("<br />");
        alert(data_result2);
    }
}
function sendData2(dat) {
    // var input = document.getElementById('data-input').value;
    var data = {
        name: dat
    };

    var dataToSend = JSON.stringify(data);
    if (!dat) {
        console.log("input was empty");
        return;
    }

    xhr2 = getXmlHttpRequestObject2();
    xhr2.onreadystatechange = dataCallback2;
    // asynchronous requests
    xhr2.open("POST", "https://gcheang.autocode.dev/ellehacks@0.0.2/", true);
    xhr2.setRequestHeader("Content-Type", "application/json");
    // Send the request over the network
    console.log("sending: " + dataToSend);
    xhr2.send(dataToSend);
}

// const getXmlHttpRequestObject = function () {
//     if (!xhr) {
//         xhr = new XMLHttpRequest();
//     }
//     return xhr;
// };

// function dataCallback() {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         console.log("received response");
//         // dataDiv = document.getElementById('result-container');
//         // dataDiv.innerHTML = xhr.responseText;
//         // alert(xhr.responseText);
//         data_result = JSON.parse(xhr.responseText);
//         var div = document.getElementById('legend');
//         div.innerHTML = `Total emissions: ` + Math.round(data_result.Total_emissions*100)/100;
//         alert(data_result.Total_emissions);
//     }
// }
// function sendData(dat) {
//     // var input = document.getElementById('data-input').value;
//     var data = {
//         name: dat
//     };

//     var dataToSend = JSON.stringify(data);
//     if (!dat) {
//         console.log("input was empty");
//         return;
//     }

//     xhr = getXmlHttpRequestObject();
//     xhr.onreadystatechange = dataCallback;
//     // asynchronous requests
//     xhr.open("PUT", "http://localhost:3000/get_stats", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     // Send the request over the network
//     console.log("sending: " + dataToSend);
//     xhr.send(dataToSend);
// }
//
async function update_title() {
    var title;
    await chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var tab = tabs[0];
        title = tab.title;
        console.log("Title: " + title);
        var element = document.getElementById("legendOne");
        element.innerHTML = title;
        sendData("Bananas");
        sendData2("Bananas");
    });
}

addEventListener("load", (event) => { update_title(); });

chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      update_title();
    }
  });