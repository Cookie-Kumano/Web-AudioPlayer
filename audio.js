let musicbox;

window.addEventListener("DOMContentLoaded", nyan, false);

// 読み込み次第走らせる
function nyan() {
    $(document).ready(function() {
        setMusicBox();
    });
}

function setMusicBox() {
    musicbox = document.getElementsByClassName("musicbox");

    for (let i = 0; i < musicbox.length; i++) {
        musicbox[i].getElementsByClassName("play")[0].addEventListener("click", {name: i, handleEvent: playMusic}, false);
        musicbox[i].getElementsByClassName("seekbar")[0].value = 0; 
        musicbox[i].getElementsByClassName("seekbar")[0].style.backgroundSize = "0%";
        musicbox[i].getElementsByClassName("seekbar")[0].disabled = true;
        musicbox[i].getElementsByClassName("volume")[0].style.backgroundSize = "80%"
        musicbox[i].getElementsByClassName("volume")[0].disabled = true;
    }

}

function playMusic() {
    let audio = musicbox[this.name].children[0];
    let seekbar = musicbox[this.name].getElementsByClassName("seekbar")[0];
    let slider_volume = musicbox[this.name].getElementsByClassName("volume")[0];

    // 音量の設定
    audio.volume = slider_volume.value;

    //スライドバー類の操作許可
    seekbar.disabled  = false;
    slider_volume.disabled = false;

    if (audio.paused) {
        audio.play();
    }   else {
        audio.pause();
    }

    // 現在の再生位置を表示
    audio.addEventListener("timeupdate", (e) => {
        const current = Math.floor(audio.currentTime);
        const duration = Math.round(audio.duration);
        seekbar.max = Math.round(duration);
        if (!isNaN(duration)) {
            $(musicbox[this.name]).find("#current").text(playTime(current));
            $(musicbox[this.name]).find("#duration").text(playTime(duration));
            seekbar.value = Math.floor((audio.currentTime / audio.duration) * audio.duration);
            seekbar.style.backgroundSize = Math.floor((seekbar.value / seekbar.max) * 100) + "%"; 
        }
    });

    // プログレスバーを引っ叩くと再生位置を変えられる
    seekbar.addEventListener("input", (e) => {
        audio.currentTime = seekbar.value;
        console.log("操作" + seekbar.value);
    });

    // 音量スライダーの実装
    slider_volume.addEventListener("input", (e) => {
        audio.volume = slider_volume.value;
        slider_volume.style.backgroundSize = Math.floor((slider_volume.value / 1)*100) + "%";
    })

    // 再生終了判定
    audio.addEventListener("ended", (e) => {
        seekbar.value = 0;
        seekbar.style.backgroundSize = "0%";
        $(musicbox[this.name]).find("#current").text("00:00");
    });
}

// 時間を整形して返す
function playTime (t) {
    let resTime = '';
    t = Math.floor(t)

    if ( 60 <= t) {
        resTime = Math.floor(t / 60);
        resTime += ":" + Math.floor(t % 60).toString().padStart(2, "0");
    }
    else {
        resTime = "00:" + Math.floor(t % 60).toString().padStart(2, "0");
    }

    return resTime;
  }