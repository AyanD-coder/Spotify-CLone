// console.log("hi")

document.addEventListener("DOMContentLoaded", function() {

let songindex= 0;
let progress;
let mastersong;
let audio = new Audio('song/1.mp3');
let moon = document.getElementById("themeToggle")
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
// let gif = document.getElementById("gif");
// let gif = document.getElementsByClassName("cat")
let gifs = document.querySelectorAll(".cat");

// let mastersong = document.getElementById("mastersong"); this should declear after songs array
let songitems = Array.from(document.getElementsByClassName("songitem"))
let songitemplay = Array.from(document.getElementsByClassName("songitenplay"))
let prev = document.getElementById("prev")
let next = document.getElementById("next")


let container = document.querySelector(".container");

moon.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    container.classList.toggle('darkcontainer');
  
    const icon = moon.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});



// moon.addEventListener('click',()=>{
//     document.body.classList.toggle("dark")
//   })
// let songs = [
//     {
//         songname: "Sorry sorry",
//         filepath: "1.mp3",
//         coverpath:"cover/download.jpg",
        
//     },
//     {
//         songname: "Bollywood song",
//         filepath: "2.mp3",
//         coverpath:"cover/mypic.jpg",
//     },
//     {
//         songname: "tera pyaar mera",
//         filepath: "3.mp3",
//         coverpath:"cover/mypic.jpg",

//     },
//     {
//         songname: "knock knock",
//         filepath: "4.mp3",
//         coverpath:"cover/4.jpg",

//     },
//     {
//         songname: "wow",
//         filepath: "5.mp3",
//         coverpath:"cover/mypic.jpg",

//     },
//     {
//         songname: "Baby",
//         filepath: "6.mp3",
//         coverpath:"cover/mypic.jpg",

//     },
//     {
//         songname: "oy hoy",
//         filepath: "7.mp3",
//         coverpath:"cover/mypic.jpg",

//     },
//     {
//         songname: "Shubh",
//         filepath: "8.mp3",
//         coverpath:"cover/mypic.jpg",

//     }
// ]
let songs=[]
fetch("songs.json")
.then(response=>response.json())
.then(data=>{
    songs=data;
    audio = new Audio(songs[songindex].filepath); // ✅ Now safe
    mastersong = document.getElementById("mastersong");
    mastersong.innerText = songs[songindex].songname;
    audio.src = songs[songindex].filepath;
    audio.addEventListener('timeupdate',()=>{
        progress= parseInt((audio.currentTime/audio.duration)*100)
        myprogressbar.value= progress;

            document.getElementById("current-time").innerText = formatTime(audio.currentTime);
            document.getElementById("duration").innerText = formatTime(audio.duration);


    });
audio.addEventListener('ended',autoplay)
    loadsongs(); 
}).catch(err => console.error("Failed to load songs.json", err))
// let mastersong = document.getElementById("mastersong");
// mastersong.innerText = songs[songindex].songname;
// songitems.forEach((element,i)=>{
//     // console.log(i);
//     element.getElementsByTagName("img")[0].src = songs[i].coverpath;
//     element.getElementsByClassName("songname")[0].innerHTML = songs[i].songname;

//     let timestampEl = element.getElementsByClassName("timestamp")[0];
//     timestampEl.childNodes[0].textContent = formatTime(tempAudio.duration) + " ";
    
// })
function loadsongs(){
    songitems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverpath;
        element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
        let tempAudio = new Audio(songs[i].filepath);
        // let tempAudio = new Audio(`song/${i + 1}.mp3`);
        tempAudio.addEventListener('loadedmetadata', () => {
            let timestampEl = element.getElementsByClassName("timestamp")[0];
            timestampEl.childNodes[0].textContent = formatTime(tempAudio.duration) + " ";
         
        });
    });
}





    masterplay.addEventListener('click', () => {
        if (audio.paused || audio.currentTime <= 0) {
            playSongresume();
            // audio.play();
            // masterplay.classList.remove('fa-circle-play');
            // masterplay.classList.add('fa-circle-pause');
            // // gif.style.opacity = 1;
            // gifs.forEach(g => g.style.opacity = 1); // To show both gifs
            // playSong();  this not work cause it will set the current time to 0

        } else {
            audio.pause();
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            // gif.style.opacity = 0;
            gifs.forEach(g => g.style.opacity = 0); // To show both gifs
            document.getElementById(songindex + 1).classList.add("fa-circle-play");
            document.getElementById(songindex + 1).classList.remove("fa-pause-circle");

        }
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        let minutes = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if (secs < 10) secs = "0" + secs;
        return `${minutes}:${secs}`;
    }
    
    

      
      myprogressbar.addEventListener('change',()=>{
        audio.currentTime= myprogressbar.value * audio.duration /100;

    });

    const makeallplay = () => {
        songitemplay.forEach((e) => {
            e.classList.remove('fa-pause-circle');
            e.classList.add('fa-play-circle');
            
        });
    };



songitemplay.forEach(element => {
    element.addEventListener('click', (e) => {
    
        let clickedIndex = parseInt(e.target.id) - 1;
        
      

        if (songindex === clickedIndex && !audio.paused) {
            // If the same song is playing, pause it
            audio.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            // gif.style.opacity = 0;
            gifs.forEach(g => g.style.opacity = 0); // To show both gifs

        }else if(songindex === clickedIndex && audio.paused){
            audio.play()
            // makeallplay();
            mastersong.innerText = songs[songindex].songname
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gifs.forEach(g => g.style.opacity = 1); 
        }
         else {
            // New song clicked or current song was paused
              makeallplay();// Reset all other buttons

            songindex = clickedIndex;
            mastersong.innerText = songs[songindex].songname
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            // audio.src = `song/${songindex + 1}.mp3`;
            audio.src = songs[songindex].filepath;

            audio.currentTime = 0;
            audio.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gifs.forEach(g => g.style.opacity = 1); // To show both gifs
            // gif.style.opacity = 1;
            // playSong();
        }
    });
});


// next.addEventListener('click',()=>{
//     if(songindex>=8){
//         songindex=0
//     }else{
//     songindex+=1
//     }
//     audio.src = `song/${songindex+1}.mp3`;
//     mastersong.innerText = songs[songindex].songname
//     // gifs.forEach(g => g.style.opacity = 1)
//     //         audio.play();
//     playSong();
//             audio.currentTime = 0;
           
// })
// prev.addEventListener('click',()=>{
//     if(songindex<=0){
//         songindex=8
//     }else{
//     songindex-=1
//     }
//     audio.src = `song/${songindex+1}.mp3`;
//     mastersong.innerText = songs[songindex].songname
//     // gifs.forEach(g => g.style.opacity = 1)
//             // audio.play();
//             playSong();
//             audio.currentTime = 0;
// })
next.addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    playSong();
    audio.currentTime = 0;
});

prev.addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    playSong();
    audio.currentTime = 0;
});




// next.addEventListener('click', () => {
//     songindex = (songindex + 1) % songs.length;
//     playSong();
// });

// prev.addEventListener('click', () => {
//     songindex = (songindex - 1 + songs.length) % songs.length;
//     playSong();


function playSong() {
    audio.src = songs[songindex].filepath;

    mastersong.innerText = songs[songindex].songname;
    // audio.currentTime = 0;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    // gif.style.opacity = 1;
    gifs.forEach(g => g.style.opacity = 1); // To show both gifs

    makeallplay(); // Optional: reset all small play buttons
    document.getElementById(songindex + 1).classList.remove("fa-circle-play");
    document.getElementById(songindex + 1).classList.add("fa-pause-circle");
}



function autoplay(){
    if(audio.currentTime==audio.duration){
     songindex = (songindex+1)%songs.length;
        playSong();
    
    }
}




function playSongresume() {
    // audio.src = `song/${songindex + 1}.mp3`;

    // mastersong.innerText = songs[songindex].songname;
    // audio.currentTime = 0;
    audio.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    // gif.style.opacity = 1;
    gifs.forEach(g => g.style.opacity = 1); // To show both gifs

    makeallplay(); // Optional: reset all small play buttons
    document.getElementById(songindex + 1).classList.remove("fa-circle-play");

    document.getElementById(songindex + 1).classList.add("fa-pause-circle");
}

})//dom load



// document.addEventListener("DOMContentLoaded", function () {
//     let songindex = 0;
//     let audio;
//     let songs = [];

//     const moon = document.getElementById("themeToggle");
//     const masterplay = document.getElementById("masterplay");
//     const myprogressbar = document.getElementById("myprogressbar");
//     const gifs = document.querySelectorAll(".cat");
//     const songitems = Array.from(document.getElementsByClassName("songitem"));
//     const songitemplay = Array.from(document.getElementsByClassName("songitenplay"));
//     const prev = document.getElementById("prev");
//     const next = document.getElementById("next");
//     const mastersong = document.getElementById("mastersong");

//     moon.addEventListener("click", () => document.body.classList.toggle("dark"));

//     fetch("songs.json")
//         .then(res => res.json())
//         .then(data => {
//             songs = data;
//             audio = new Audio(songs[songindex].filepath);
//             updateUI(false); // ⛔ Prevent autoplay visuals
//             loadsongs();

//             audio.addEventListener("timeupdate", () => {
//                 const progress = parseInt((audio.currentTime / audio.duration) * 100);
//                 myprogressbar.value = progress;
//                 document.getElementById("current-time").innerText = formatTime(audio.currentTime);
//                 document.getElementById("duration").innerText = formatTime(audio.duration);
//             });

//             audio.addEventListener("ended", autoplay);
//         });

//     function formatTime(seconds) {
//         if (isNaN(seconds)) return "0:00";
//         let mins = Math.floor(seconds / 60);
//         let secs = Math.floor(seconds % 60).toString().padStart(2, "0");
//         return `${mins}:${secs}`;
//     }

//     function makeallplay() {
//         songitemplay.forEach(el => {
//             el.classList.remove("fa-pause-circle");
//             el.classList.add("fa-play-circle");
//         });
//     }

    
//     function updateUI(isPlaying = true) {
//         mastersong.innerText = songs[songindex].songname;
//         makeallplay();
    
//         const songBtn = document.getElementById(songindex + 1);
//         if (songBtn) {
//             if (isPlaying) {
//                 songBtn.classList.remove("fa-play-circle");
//                 songBtn.classList.add("fa-pause-circle");
//             } else {
//                 songBtn.classList.remove("fa-pause-circle");
//                 songBtn.classList.add("fa-play-circle");
//             }
//         }
    
//         gifs.forEach(g => g.style.opacity = isPlaying ? 1 : 0);
//     }
    

//     function playSong() {
//         audio.src = songs[songindex].filepath;
//         audio.play();
//         updateUI(true);
//         masterplay.classList.remove("fa-circle-play");
//         masterplay.classList.add("fa-circle-pause");
//     }

//     function playSongresume() {
//         audio.play();
//         updateUI(true);
//         masterplay.classList.remove("fa-circle-play");
//         masterplay.classList.add("fa-circle-pause");
//     }

//     function autoplay() {
//         songindex = (songindex + 1) % songs.length;
//         playSong();
//     }

//     masterplay.addEventListener("click", () => {
//         if (audio.paused || audio.currentTime <= 0) {
//             playSongresume();
//         } else {
//             audio.pause();
//             masterplay.classList.remove("fa-circle-pause");
//             masterplay.classList.add("fa-circle-play");
//             gifs.forEach(g => g.style.opacity = 0);
//             const songBtn = document.getElementById(songindex + 1);
//             if (songBtn) {
//                 songBtn.classList.add("fa-play-circle");
//                 songBtn.classList.remove("fa-pause-circle");
//             }
//         }
//     });

//     myprogressbar.addEventListener("change", () => {
//         audio.currentTime = myprogressbar.value * audio.duration / 100;
//     });

//     songitemplay.forEach(btn => {
//         btn.addEventListener("click", (e) => {
//             const clickedIndex = parseInt(e.target.id) - 1;

//             if (songindex === clickedIndex && !audio.paused) {
//                 audio.pause();
//                 e.target.classList.remove("fa-pause-circle");
//                 e.target.classList.add("fa-play-circle");
//                 masterplay.classList.add("fa-circle-play");
//                 masterplay.classList.remove("fa-circle-pause");
//                 gifs.forEach(g => g.style.opacity = 0);
//             } else {
//                 songindex = clickedIndex;
//                 playSong();
//             }
//         });
//     });

//     next.addEventListener("click", () => {
//         songindex = (songindex + 1) % songs.length;
//         playSong();
//     });

//     prev.addEventListener("click", () => {
//         songindex = (songindex - 1 + songs.length) % songs.length;
//         playSong();
//     });

//     function loadsongs() {
//         songitems.forEach((el, i) => {
//             el.querySelector("img").src = songs[i].coverpath;
//             el.querySelector(".songname").innerText = songs[i].songname;

//             let tempAudio = new Audio(songs[i].filepath);
//             tempAudio.addEventListener("loadedmetadata", () => {
//                 el.querySelector(".timestamp").childNodes[0].textContent = formatTime(tempAudio.duration) + " ";
//             });
//         });
//     }
// });
