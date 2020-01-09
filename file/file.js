function onFileUpload(outputNode) {
    this.outputNode = outputNode
	// get DOM element
	let fileInputJqueryObject =$('#file');
	let fileInputDOMElement = fileInputJqueryObject[0];
	
	// get filename
	let filePath = fileInputDOMElement.value;
	let fileName = filePath.replace(/^.*(\\|\/|\:)/, '');
	
	// get file reference
	let mfile = fileInputDOMElement.files[0];
	
	// read file content
	let fileReader = new FileReader();
        fileReader.readAsText(mfile, 'UTF-8');
    var fileStr = '*';
	fileReader.onerror = onFileReadError;
	fileReader.onload = function(event) {
        // onFileReadSuccess(event, fileName);
        fileStr = event.target.result
        console.log("reading file success outputNode: "+outputNode);
        console.dir(this);
        // let obj3 = new CryptLibyPaz(key, len);
        // obj3.initDecryptor() 
        // this.outputNode.text = fileStr;
        // $(outputNode).text(fileStr)
        $('#encstr').text(fileStr)
            // console.log('outputNode id : ' + outputNode.id);
        // var decryptedArr = [];
        // var site = $("#dwebsite").val();
        // // var encdstr = $("#encstr").val();
        // var key = $("#dkey").val();
        // var len = $("#dlen").val();      //PUK-53229651 -> 0708 407388  //4912
        // if (key.length > 0 && len !== NaN){
        //     let obj2 = new CryptLibyPaz(key, len);
        //     // if (site.length > 0) //
        //     decryptedArr = obj2.decryptThis(fileStr);
        //     // console.log('decryptedArr : ' + decryptedArr);
        //     log('Modal.html decryptedArr', decryptedArr, "brown");
        //     console.dir(decryptedArr);                

        // }


    };	
    // return fileStr;	
}

function onFileReadError() {
	alert("Error reading file.");
}

// function onFileReadSuccess(event, fileName) {
// 	let fileContent = event.target.result;
	
// 	$.post("/your_server_address", 
// 		{ fileName: fileName, fileContent: fileContent }
// 		).done(function(serverResponse) {
// 			// handle server response
// 		});
// }    