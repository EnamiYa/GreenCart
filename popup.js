var test_data = "Beef (beef herd)";
var test_data2 = "Bananas";

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
        data_result = JSON.parse(xhr.responseText);
        var div = document.getElementById('legend');
        div.innerHTML = `Carbon emissions: ` + Math.round(data_result.Total_emissions*100)/100;
    }
}

function sendData(dat) {
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
    xhr.open("PUT", "http://localhost:3000/get_stats", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dataToSend);
}

const getXmlHttpRequestObject2 = function () {
    if (!xhr2) {
        xhr2 = new XMLHttpRequest();
    }
    return xhr2;
};

function dataCallback2() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
        data_result2 = xhr2.responseText;
        var div = document.getElementById('openai-res');
        div.innerHTML = data_result2.split("\n").join("<br/>");
    }
}
function sendData2(dat) {
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
    xhr2.open("POST", "https://gcheang.autocode.dev/ellehacks@0.0.3/", true);
    xhr2.setRequestHeader("Content-Type", "application/json");
    console.log("sending: " + dataToSend);
    xhr2.send(dataToSend);
}

async function update_info() {
    var title;
    await chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var tab = tabs[0];
        title = tab.title;
        console.log("Title: " + title);
        var element = document.getElementById("legendOne");
        element.innerHTML = title;
        if (title.includes("Bananas")) {
            sendData(test_data2);
            document.getElementById('openai-res').innerHTML = "";
            document.getElementById('shopbutton').style.display = "none";
            document.getElementById('typewriter').innerHTML = "✔️";
            return;
        }
        sendData(test_data);
        sendData2(test_data);
    });
}

addEventListener("load", (event) => { update_info(); });

chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      update_info();
    }
  });