
document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByClassName('img-input-with-preview');
    for (var i = 0; i < elements.length; i++) {
        elements[i].onchange = GenerateImageThumbnail;
        SetUpPreviewElements(elements[i]);
    }
});


function GenerateImageThumbnail(elem) {
    var inputElemId = elem.target.getAttribute('id');

    var fileElem = document.getElementById(inputElemId);

    var fileData = fileElem.files[0];
    
    var divNodes = document.querySelectorAll('[data-preview-for="' + inputElemId + '"]');

   

    if (divNodes.length === 0) {
        SetUpPreviewElements(elem.target);
        divNodes = document.querySelectorAll('[data-preview-for="' + inputElemId + '"]');
    }
    
    var divNode = divNodes[0];
    var imgNode = divNode.childNodes[0];
    
    imgNode.src = "";
    
    if (fileData == undefined) {
        return;
    }

    var fileReader = new FileReader();

    if (fileData)
        fileReader.readAsDataURL(fileData);

    fileReader.onloadend = function () { imgNode.src = fileReader.result;}
}



function SetUpPreviewElements(elem) {
    var inputElemId = elem.id;
    var fileElem = document.getElementById(inputElemId);
    var divNode = null;
    var imgNode = null;
    var divNodes = document.querySelectorAll('[data-preview-for="' + inputElemId + '"]');

    if (divNodes.length === 0) {
        divNode = document.createElement('div');
        divNode.classList.add('img-input-preview');
        divNode.setAttribute('data-preview-for', inputElemId);
        imgNode = document.createElement('img');

        var customClass = fileElem.getAttribute('data-preview-class');

        if (customClass)
            divNode.classList.add(customClass);


        divNode.appendChild(imgNode);
        fileElem.after(divNode);
    }
}

function ClearImgWithPreview(elemId) {
    var elem = document.getElementById(elemId);
    elem.value = null;
    var event = new Event('change');
    elem.dispatchEvent(event);
}