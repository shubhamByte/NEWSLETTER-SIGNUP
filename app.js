const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});


app.post("/", function (req, res) {
  const first_Name = req.body.fName;
  const last_Name = req.body.lName;
  const email = req.body.email;

  // creating object
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first_Name,
        LNAME: last_Name}
    }]
  };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/2180362273/";

    const options = {
      method: "POST",
      auth: "shubhamK:df9c9b1f34f73334ceb76f199debf98f-us17"
    }

    const request = https.request(url,options,function(response){
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });

      if (response.statusCode === 200)
      {
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }

    })

      request.write(jsonData);
      request.end();

      
  });

  app.post("/failure", function(req,res){
    res.redirect("/");
  })

  app.post("/success", function(req,res){
    res.redirect("/");
  })


app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000...");
});










