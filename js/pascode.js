/**
 * The Cryptography password storage system in JS
 * 
 * ENCRYPTION
 * 1. Store the main fields encrypted in an object
 *    Each object shall contain several value pairs
 *    key                       value
 *    website                   google.com
 *    username                  bmuigai
 *    password                  ***********
 *    passlen                   
 *    email                     muigaipaz@gmail.com
 *    etc......
 *    each value will be encrypted with a secret key
 *    This seckey shall be derived from another very short but memorable key 
 *    e.g. by hashing a memorable key e.g. Topaz0139
 *    The result shall be a key-value pair with value encrypted
 *    The new key-value pairs will form a single array
 *    This array shall then be encrypted and stored alongside others, 
 *    most probably in a text file as a list in string format.
 * 
 *    So here are the steps of encryption
 *    - Create a textfield to input the hashed key and 2 others for input key-value
 *    - Create 3 buttons. 1. Encrypt, 2. Save and 3. Create object
 *    - Create another textfield to ouput the values of encrypted text
 *    - Input the seckey on the seckey input and key-value pairs in data fields
 *    - Press encrypt. The value will be encrypted but the key will not
 *    - Press save. The data will be stored in an array.
 *    - After you are done encrypting all values, Press Create object
 *    - This last step will create an object and attempt to encrypt it for storage.
 *    - Storage will bear a legible title as the key and the encrypted object as value
 *    
 *    DECRYPTION
 *    Our app begins by accessing the file containing the passwords either by dragging,
 *    uploading or downloading from a server. Once there, the steps are as follows
 *    - Input the account name you require to get the password from in a textfield
 *    - Input the seckey and press Find. This will traverse the objects decrypting 1 by 1.
 *    - If any text in website field contains the account name, it puts on a list to the right
 *    - Once through decrypting, user must choose the account from the list
 *    - From here on, just press the button decrypt to get all the fields decrypted.
 *    - That's it!! Happy coding...
 */

 