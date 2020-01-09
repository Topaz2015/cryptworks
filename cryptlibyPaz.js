
    /**
     * For this to be a library with minimal connecttion to outside world, it requires: 
     * 
     * 1. EncryptThis() function. syntax : obj.encryptThis(params...)
     *  - Receives key-value data array -> Encrypts, and returns output
     *     Sample information is as follows: 
     *       -Website  : The site name for which you want save the passwords for
     *       -Password : The password for the site
     *       -Username : the username for the site if applicable
     *       -Email    : the email used to register the site
     *       -Comment  : Any other info that may be beneficial
     *  - Returns an encrypted String that can be stored in a file by the calling function.
     * 
     * 2. DecryptThis() function. syntax : obj.decryptThis(params...)
     *  - Receives an Object -> Decrypts and returns output 
     *  - Returns the decrypted array of name-value pairs to be displayed on a webpage.
     *     The output is as follows: 
     *       -Website  : The site name for which you want save the passwords for
     *       -Password : The password for the site
     *       -Username : the username for the site if applicable
     *       -Email    : the email used to register the site
     *       -Comment  : Any other info that may be beneficial
     * 
     * 3. CheckAvailabilty() function. syntax : obj.checkAvailabilty(siteName)
     *  - Receives a website name to checks if its in the webObject initialized with obj
     *  - Returns a boolean 
     */

function CryptLibyPaz(key, length) {
    this.hashed_key = CryptoJS.MD5(key).toString();
    this.useKey = this.hashed_key.substring(0, length);
    this.addKey = this.hashed_key.substring(length);
    // constructor(key, length) {        
    // }
    this.checkAvailabilty = (siteName) => {
        console.log('\nChecking availability... ');
        var itemObj = (this.objDecrypt(this.hashed_key, this.encryptedObj)).value;
        return ((itemObj.key).indexOf(siteName) >= 0);
    }

    log = function(title, value, color){
        // console.log('%c' + ('Object.values = ' + Object.values(itemObj)), 'color: #a2f');
        var col = 'color:' + color;
        var dat = title + ': ' + value;
        console.log(('%c' + dat), col);
    }

    /**
     * This is becoming rather tough
     */
    this.encryptThis = function(objArray) {
        // this.inputArray = objArray;
        var encdObject = {};
        var encdArray = [];
        encdObject.key = (objArray[0]).value;
        // console.dir(element);
        objArray.forEach(element => {
            var inputObj = {};
            inputObj.key = element.key;
            console.dir(element);
            inputObj.value = (this.encrypt(this.useKey, element.value + this.addKey)); 
            // console.log('element.value: ' + element.value)
            encdArray.push(inputObj);
        });
        encdObject.value = encdArray;  
        console.log('encdObject.key: ' + encdObject.key); 
        console.dir(encdObject);                                //
        var myEncdStr = this.objEncrypt(this.hashed_key, encdObject);   //string
        console.log(('typeof(myEncdStr: )' + typeof(myEncdStr)));
        // this.decryptThis(myEncdStr)
        return myEncdStr;
    }
    this.decryptThis = (myEncdStr) => {
        this.encryptedObj = myEncdStr;
        var keyValArray = [];
        var encdObject = (this.objDecrypt(this.hashed_key, myEncdStr)).value; //passed
        //foreach
        encdObject.forEach(element => {
            var dencdObj = {};
            var ivalue = this.decrypt(this.useKey, element.value)
            dencdObj.key = element.key
            dencdObj.value = ivalue.substring(0, ivalue.indexOf(this.addKey))
            log('decrypted key', dencdObj.key, 'green')
            log('decrypted subvalue', dencdObj.value, 'green')
            keyValArray.push(dencdObj)
            console.dir(dencdObj)
        });
        return keyValArray
    }
    // this.decryptThis = (object) => {
    //     this.encryptedObj = object;
    //     var keyValArray = [];
    //     // console.time('Timer1');
    //     // console.dir(object);
    //     console.log('\nDecrypting: ');
    //     var itemObj = (this.objDecrypt(this.hashed_key, object)).value;
    //     console.dir(itemObj);

    //     console.log('%c' + ('Object.values = ' + Object.values(itemObj)), 'color: #a2f');
    //     console.log('%c' + ('Object.keys = ' + Object.keys(itemObj)), 'color: #a8f');
    //     itemObj.forEach(element => {
    //         console.log('%c' + ('element = ' + element), 'color: #d8f');
    //         var ivalue = this.decrypt(this.useKey, element.value)


    //         console.log('%c'+('useKey: ' + this.useKey + '; ikey= '+element.key), 'color: #4fd');
    //         console.log('%c' + ('ivalue = ' + ivalue), 'color: #4fd');
    //         var obj = {}
    //         console.log('%c' + ('obj.value = ' + obj.key), 'color: #f4d');
    //         obj.key = element.key;
    //         console.log('%c' + ('obj.key = ' + obj.key), 'color: #f0d')
    //         obj.value = obj.value.substring(0, ivalue.indexOf(this.addKey))
    //         keyValArray.push(obj);
    //         console.dir(ikey);
    //         console.dir(ival);
    //     });
    //     return keyValArray;
    // }

    this.objEncrypt = function(secret, data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), secret, {
            keySize: 128 / 8,
            iv: secret,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });         //.toString()
    }

    this.objDecrypt = function(secret, data) {
        bytes = CryptoJS.AES.decrypt(data.toString(), secret, {
            keySize: 128 / 8,
            iv: secret,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }


    this.encrypt = function(key, text) {
        var cipher = CryptoJS.AES.encrypt(text, key);
        cipher = cipher.toString();
        return cipher;
    }
    this.decrypt = function(key, cipher) {
        var decipher = CryptoJS.AES.decrypt(cipher, key);
        decipher = decipher.toString(CryptoJS.enc.Utf8);
        return decipher;
    }
}


/**
 * 
 * 
 * 
 * 
 * this.encryptThis = function(array) {
        this.inputArray = array;
        var encdObject = {};
        var encdArray = [];
        encdObject.key = (array[0]).value;
        array.forEach(element => {
            var inputObj = {};
            inputObj.key = element.key;
            // console.dir(element);
            inputObj.value = (this.encrypt(this.useKey, element.value + this.addKey)); 
            // console.log('element.value: ' + element.value)
            encdArray.push(inputObj);
        });
        encdObject.value = encdArray;  
        console.log('encdObject.key: ' + encdObject.key); 
        console.dir(encdObject);                                //
        var myEncdStr = this.objEncrypt(this.hashed_key, encdObject);   //string
        // console.log('encdObject' + encdObject);
        // console.dir(encdObject);
        this.decryptThis(myEncdStr)
        return myEncdStr;
    }
    this.decryptThis = (myEncdStr) => {
        this.encryptedObj = myEncdStr;
        var keyValArray = [];
        var encdArray = [];
        // console.time('Timer1');
        // console.dir(myEncdStr);
        console.log('\nDecrypting: ');
        var encdObject = (this.objDecrypt(this.hashed_key, myEncdStr)); //passed
        encdArray = encdObject.value;
        // console.log('encdObject.key: ' + encdObject.key); 
        // console.dir(encdObject);
        console.log('encdObject.key: ' + encdObject.key);
        console.dir(encdArray);

        // console.log('%c' + ('Object.values = ' + Object.values(itemObj)), 'color: #a2f');
        // console.log('%c' + ('Object.keys = ' + Object.keys(itemObj)), 'color: #a8f');
        // itemObj.forEach(element => {
        //     console.log('%c' + ('element = ' + element), 'color: #d8f');
        //     var ivalue = this.decrypt(this.useKey, element.value)


        //     console.log('%c'+('useKey: ' + this.useKey + '; ikey= '+element.key), 'color: #4fd');
        //     console.log('%c' + ('ivalue = ' + ivalue), 'color: #4fd');
        //     var obj = {}
        //     console.log('%c' + ('obj.value = ' + obj.key), 'color: #f4d');
        //     obj.key = element.key;
        //     console.log('%c' + ('obj.key = ' + obj.key), 'color: #f0d')
        //     obj.value = obj.value.substring(0, ivalue.indexOf(this.addKey))
        //     keyValArray.push(obj);
        //     console.dir(ikey);
        //     console.dir(ival);
        // });
        // return keyValArray;
    }
 * 
 * 
 * 
 */