  var firebaseConfig = {
    // add firebase cofiguratrion here
  };
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var storage = firebase.storage();


  $('#myform').submit(function(e){
    myfunction();
    // document.getElementById("myform").reset();   
    $("#myform")[0].reset();  
    e.preventDefault();

  })

  $('#secondform').submit(function(e){
    function2();
    // document.getElementById("secondform").reset(); 
    $("#secondform")[0].reset();  
    e.preventDefault();

  })

  function myfunction(){
    var k = new Date().getTime()
    
    database.ref('users/' + k).set({
      flagMessage : "true",
      flagImage : "false",
      flagAudio : "false",
      flagText : "false",
      flagVideo : "false",
      message: $('#msg').val()
    });
  }
  
   function function2(){

    let fileElement = $(".myfile")[0];
    let myFile = fileElement.files[0];
    
    let filename = myFile.name;
    let ty = myFile.type;

    let storageRef = storage.ref(`/fileRecords/${filename}`);
    let uploadTask = storageRef.put(myFile);

    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          alert('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
      },function(error){
        alert("upload unsuccessful.. Please check the internet connection");
      },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          var myurl = downloadURL;
          var k = new Date().getTime();
          if(ty ==='image/png' || ty ==='image/jpg' || ty==='image/jpeg'){
            database.ref('users/' + k).set({
              flagMessage : "false",
              flagImage : "true",
              flagAudio : "false",
              flagText : "false",
              flagVideo : "false",
              message: myurl
            });
          }

          else if(ty === 'text/plain'){
            database.ref('users/' + k).set({
              flagMessage : "false",
              flagImage : "false",
              flagAudio : "false",
              flagText : "true",
              flagVideo : "false",
              message: myurl
            });
          }
          else if(ty==='video/mp4' || ty==='video/3gp' || ty==='video/avi' || ty==='video/mov'){
            database.ref('users/' + k).set({
              flagMessage : "false",
              flagImage : "false",
              flagAudio : "false",
              flagText : "false",
              flagVideo : "true",
              message: myurl
            });
          }
          else if(ty === 'audio/mp3'){
            database.ref('users/' + k).set({
              flagMessage : "false",
              flagImage : "false",
              flagAudio : "true",
              flagText : "false",
              flagVideo : "false",
              message: myurl
            });
          }
          else{
              alert("Sorry!!..Format is not supported now.");
              return 0;
          }
        })
    });
   }

  
  var ref = database.ref("users");
  ref.orderByChild("users").limitToLast(1).on("child_added", function(snapshot) {
      console.log(snapshot.key + " was " + snapshot.val().message);
});
