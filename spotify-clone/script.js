console.log("Welcome to FakeSpotify");

// Initialzing the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {
        songName: "Phenomenon-Unknown Brain",
        filePath: "songs/1.mp3", coverPath: "covers/c1.jpg"
    },
    {
        songName: "Close-Izecold (Brooks Remix)",
        filePath: "songs/2.mp3", coverPath: "covers/c2.jpg"
    },
    {
        songName: "Linked-Jim Yosef (feat Anna Yvette)",
        filePath: "songs/3.mp3", coverPath: "covers/c3.jpg"
    },
    {
        songName: "Light It Up-Robin Hustin & Tobimorrow",
        filePath: "songs/4.mp3", coverPath: "covers/c4.jpg"
    },
    {
        songName: "Mortals-Warriyo",
        filePath: "songs/5.mp3", coverPath: "covers/c5.jpg"
    },
    {
        songName: "Don't Surrender-Ezgod ",
        filePath: "songs/6.mp3", coverPath: "covers/c6.jpg"
    },
    {
        songName: "Words-Feint",
        filePath: "songs/7.mp3", coverPath: "covers/c7.jpg"
    },
    {
        songName: "Say Goodbye-Unknown Brain",
        filePath: "songs/8.mp3", coverPath: "covers/c8.jpg"
    },
    {
        songName: "On & On-Cartoon (feat Daniel Levi)",
        filePath: "songs/9.mp3", coverPath: "covers/c9.jpg"
    },
    {
        songName: "Control-Unknown Brain (feat Jex)",
        filePath: "songs/10.mp3", coverPath: "covers/c10.jpg"
    },
]

// Handling play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // //4 new lines added to get both play buttons in sync in 1st song
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
            // console.log(Element);
            if (Element.id == songIndex) {
                Element.src = 'pause.png';
            }
        })

        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.src = 'pause.png';
        gif.style.opacity = 1;
    }
    else {
        // //4 new lines added to get both play buttons in sync in 1st song
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
            // console.log(Element);
            if (Element.id == songIndex) {
                Element.src = 'play.png';
            }
        })
        audioElement.pause();
        masterPlay.src = 'play.png';
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
//update music acc to seekbar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
        Element.src = 'play.png';
    })
}
//From songlist if you wanna play, click play icon and this is the code behind that and above fn helps below eventListener
Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
    Element.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target.id == songIndex && !audioElement.paused) {
            audioElement.pause();
            masterPlay.src = 'play.png';
            gif.style.opacity = 0;
            e.target.src = 'play.png';
        }
        else {
            makeAllPlays();
            let oldSongIndex = songIndex;
            songIndex = parseInt(e.target.id);

            if (oldSongIndex === songIndex) {
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.src = 'pause.png';
                e.target.src = 'pause.png';
            }
            else {
                masterSongName.innerText = songs[songIndex].songName;
                e.target.src = 'pause.png';
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.src = 'pause.png';
            }

        }
    })
})


//adding Event listener to next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex == 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    //SAME 4 LINES COPIED FROM ABOVE
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = 'pause.png';

    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
        // console.log(Element);
        if (Element.id == songIndex) {
            Element.src = 'pause.png';
        }
    })
})

//previous button. FULLY copied from above
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex == 0) {
        songIndex = 10;
    }
    else {
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    //SAME 4 LINES COPIED FROM ABOVE
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = 'pause.png';

    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
        // console.log(Element);
        if (Element.id == songIndex) {
            Element.src = 'pause.png';
        }
    })
})