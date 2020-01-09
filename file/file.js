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
        // this.outputNode.text = fileStr;
        // $(outputNode).text(fileStr)
        $('#encstr').text(fileStr)
            // console.log('outputNode id : ' + outputNode.id);
    };		
}

function onFileReadError() {
	alert("Error reading file.");
}
