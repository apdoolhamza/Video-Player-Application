   //importing the track-name Element to shown the currant video name
let trackName = document.querySelector(".track-name");

//importing the playpause-track Element to play video if is pause or pause it if is playing
let playPauseBtn = document.querySelector(".playpause-track");

//importing the playerCurrentTime Element to manipulate currant video Time
let currTime = document.querySelector(".playerCurrentTime");

//importing the playerTotalDuration Element
let totalDuration = document.querySelector(".playerTotalDuration");

//importing the seekSlider Elements
let seekSlider = document.querySelector(".seekSlider");
let seekSliderthumb = document.querySelector(".seekSliderthumb");
 
//global variables
let isPlaying = false;
let updateTimer;
let fileid = 0;
    
//track list store to be played
let trackList = [];
 
 
// importing videosListContainer
 const videoContainer = document.querySelector(".videosListContainer");

//  importing totalVideos & totalVideosSize elements
const totalVideos = document.querySelector('.totalVideos');
const totalVideosSize = document.querySelector('.totalVideosSize');


// Function to handle file upload
function handleFileUpload(event) {

    //  new variable to store all uploaded files size
      let totalSize = 0;

           // importing uploadVideos input
      let files = document.getElementById('uploadVideos').files;

      // Iterate over each selected file to return files size
      for (let j = 0; j < files.length; j++) {
        totalSize += files[j].size;
      }
      
    // format Files Size to readable (KB,MB,GB) and assign it to totalVideosSize element
    totalVideosSize.innerHTML = formatFileSize(totalSize);

      // Iterate over each selected file
      for (let i = 0; i < files.length; i++) {        

        // allow only .mp4 file extension to be loaded
        let extension = event.target.files[i].name;
        var allowedExtensions =  /(\.mp4)$/ig;
        if (!allowedExtensions.exec(extension)) {
          event.target.value = "";
          return false;
        } else {
          
          //display total videos length to totalVideos element
          totalVideos.innerHTML = event.target.files.length;      
          
          
    
    //add each uplaoded file on trackList array when uploaded
    trackList.push({
      path: URL.createObjectURL(event.target.files[i]),
      name: event.target.files[i].name
    });
    
   // Create video element
    let video = document.createElement("video");
        video.src = URL.createObjectURL(files[i]);
        
     // start scanning if new file uplaoding
     document.querySelector('.rotate').style.cssText += 'animation:spin 2s 0.06s linear infinite';
  
  //listen if video complete loaded data
   video.addEventListener("loadeddata", function() {

      showVideos(); // Call function to display videos
      
     // hide scanner
 document.querySelector('.uploadScanVideos').style.display = 'none';
         
//   display videoContainer      
  videoContainer.style.display = 'block';
          
        })
       
     //  increment file-id by 1
       fileid ++;
    
  // Append uploaded videos to the videoContainer with its attribute and chils
 videoContainer.innerHTML += `<div class="singleVideo"><video onclick="playMe()" file-id="${fileid}" class="${event.target.files[i].name}" poster="img/image.png" id="${URL.createObjectURL(files[i])}"></video><p class="videoDuration">${formatFileSize(event.target.files[i].size)}</p><p class="videoName">${event.target.files[i].name.substring(0, event.target.files[i].name.length - 4)}</p></div>`;
    }
    }
}
  
//file size convertion to Bytes, Killobytes, Megabytes or Gigabytes
function formatFileSize(fileSizeInBytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (fileSizeInBytes >= 1024 && index < units.length - 1) {
    fileSizeInBytes /= 1024;
    index++;
  }
  return `${fileSizeInBytes.toFixed(2)} ${units[index]}`;
}
  
    // Function to show videos
    function showVideos() {
      var videos = document.getElementsByTagName("video");
      for (var i = 0; i < videos.length; i++) {
        videos[i].style.display = "block"; // Display videos
      }
    }
    
    
 //   importing currantVideoContainer
    let currantVideoContainer = document.querySelector('.currantVideoContainer');
  
  //importing currantVideoContainer child (video)
  const currTrack = document.querySelector('.currantPlaying video');
        
        
    //all uplaoded files event function use to allow play each selected video on videsListContainer(currentVideo) Element
const playMe = () => {
//append selected or clicked video file link to the currTrack src
currTrack.src = this.event.target.id;

//importing all videos Names 
let videoName = document.querySelectorAll('.videoName');

//iterate over each videoName
for (let i = 0; i < videoName.length; i++) {
 // set the video Name color to default
  videoName[i].style.color = 'black';
}
//change currant or selected or clicked video name to 'royalblue' color to indicate or index it in a list
videoName[this.event.target.getAttribute('file-id') - 1].style.color = 'royalblue';

//display currant or selected video name to the trackName Element
trackName.innerHTML = this.event.target.className;

//hide videoContainer
videoContainer.style.display = 'none';
//display currantVideoContainer
currantVideoContainer.style.display = 'block';

// play each clicked video
playTrack();


// hide video controls
showHidePlayerControls();
}
    
 // Add event listener to handle uploaded file
  document.getElementById('uploadVideos').addEventListener("change", handleFileUpload);

    
 
    function playpauseTrack() {
  //Switch between play and pause
  if (!isPlaying) playTrack();
  else pauseTrack();
  
  // show or hide player controls
  showHidePlayerControls();
}

  
  //importing menuIcon
  document.querySelector('.menuIcon').addEventListener('click', ()=> {
    //display videoContainer if is clicked
    videoContainer.style.display = 'block';
   // hide currantVideoContainer
    currantVideoContainer.style.display = 'none';
   // pause currant video from playing
    currTrack.pause();
  showHidePlayerControls();
  })
    
  function playTrack() {
    //check if trackList is not empty
    if (!trackList.length <= 0) {
    
        // Play the loaded track
        currTrack.play();
        isPlaying = true;
    
        // Replace icon with the pause icon
        playPauseBtn.innerHTML = '<i class="fa fa-pause-circle"></i>';

        // update seek numbers indicators
        clearInterval(updateTimer);
        updateTimer = setInterval(seekUpdate, 1000);
      
      }
      
    }
    
    function pauseTrack() {
      // Pause the loaded track
      currTrack.pause();
      isPlaying = false;
    
      // Replace icon with the play icon
      playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
    }
    
    
    //click event to show and hide player controls
    currantVideoContainer.addEventListener('click', () => {
      showHidePlayerControls();
    })


    // variable to store value for hide player controls
      let hidecontrols = 0;

  //  function to declare show or hide player controls 
    function showHidePlayerControls() {
      let playerControls = document.querySelector('.playerControls');
      if (document.querySelector('.playerControls').classList.contains("controls")) {
        document.querySelector('.playerControls').classList.remove("controls");

        //reset it to the default value if player controls displayed
         hidecontrols = 0;
      } else {
        document.querySelector('.playerControls').classList.add("controls");
      }
    }

    //function to seek currant video
    function seekTo() {
  /*Calculate the seek position by the percentage of the seek slider and get the relative duration to the track*/
  seekto = currTrack.duration * (seekSlider.value / 100);
 
  // Set the current track position to the calculated seek position
  currTrack.currentTime = seekto;
}
 

 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;
    seekSliderthumb.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }

  // rePlay currant video if end
  if (currTrack.currentTime === currTrack.duration) {
    playTrack();

    // display playerControls
  showHidePlayerControls();
  }

  // increment by 1
  hidecontrols++;

  // if hidecontrols value is equal to 5 seconds then hide playerControls buttons
  if (hidecontrols === 5) {
  showHidePlayerControls();
  }
}



// //importing fullScreenIcon
const fullScreenIcon = document.getElementById('fullScreenIcon');
//importing smallScreenIcon
const smallScreenIcon = document.getElementById('smallScreenIcon');

fullScreenIcon.addEventListener('click', () => {
  //open video in full screen if is clicked
  isFull();

  showHidePlayerControls();
})
smallScreenIcon.addEventListener('click', () => {
 // open video in small screen if is clicked
  isSmall();

  showHidePlayerControls();
})
//function to handle full screen view
function isFull() {
  currTrack.classList.remove('smallScreen');
  currTrack.classList.add('fullScreen');
 smallScreenIcon.style.display = 'block';
 fullScreenIcon.style.display = 'none';
}
//function to handle small screen view
function isSmall() {
 currTrack.classList.remove('fullScreen');
 currTrack.classList.add('smallScreen');
      smallScreenIcon.style.display = 'none';
      fullScreenIcon.style.display = 'block';
}


// currant video play loading scanner
const lodingSpinner = document.querySelector('.lodingSpinner');
currTrack.addEventListener('loadstart', () => {
  lodingSpinner.style.display = "flex";
})
currTrack.addEventListener('canplay', () => {
  lodingSpinner.style.display = 'none';
})


const seekLeft = document.querySelector('.seekLeft');
const seekRight = document.querySelector('.seekRight');

seekLeft.addEventListener('click', ()=>{
  seekUpdate();
  currTrack.currentTime -= 10;
  showHidePlayerControls();
})
seekRight.addEventListener('click', ()=>{
  seekUpdate();
  currTrack.currentTime += 10;
  showHidePlayerControls();
})



// importing sideBar & backArrow elements
const sideBar = document.querySelector('.sideBar');
const backArrow = document.querySelector('.backArrow');

backArrow.addEventListener('click', ()=>{
  sideBar.style.display = "none";
})
function showSideBar() {
  sideBar.style.display = "block";
}