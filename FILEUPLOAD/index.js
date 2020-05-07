const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 
    
var image_url;
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
    
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
  console.log('FROM_MULTER_B - uploads FUNCTION');
        // Uploads is the Upload_folder_name 
        cb(null, "uploads") 
    }, 
    filename: function (req, file, cb) { 

        const img_url = Date.now()+'img'+path.extname(file.originalname).toLowerCase();
        image_url = img_url
		console.log('FROM_MULTER_B - filename FUNCTION');
      cb(null, img_url) 
    } 
  }) 
       
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        console.log('FROM_MULTER_B - upload FUNCTION');
       

        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).single("fileName");        
  
app.get("/",function(req,res){ 
    res.render("Signup"); 
}) 
    
app.post("/uploadProfilePicture",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
            console.log(image_url);
            path='uploads'+image_url
            res.send("Success, Image uploaded!") 
        } 
    }) 
}) 
    
// Take any port number of your choice which 
// is not taken by any other process 
app.listen(3000,function(error) { 
    if(error) throw error 
        console.log("Server created Successfully on PORT 3000") 
}) 