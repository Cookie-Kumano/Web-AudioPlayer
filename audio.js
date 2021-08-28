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
    }

}

function playMusic() {
    let audio = musicbox[this.name].children[0];
    let seekbar = musicbox[this.name].getElementsByClassName("seekbar")[0];
    let slider_volume = musicbox[this.name].getElementsByClassName("volume")[0];

    let current = Math.floor(audio.currentTime);
    let duration = Math.round(audio.duration);

    // 音量の設定
    audio.volume = slider_volume.value;

    if (audio.paused) {
        audio.play();
    }   else {
        audio.pause();
    }

    // 現在の再生位置を表示
    audio.addEventListener("timeupdate", (e) => {
        seekbar.max = duration;
        if (!isNaN(duration)) {
            current = Math.floor(audio.currentTime);
            $(musicbox[this.name]).find("#current").text(playTime(current));
            $(musicbox[this.name]).find("#duration").text(playTime(duration));
            // const percent = Math.round((audio.currentTime/audio.duration)*1000)/10;
            // seekbar.style.backgroundSize = percent + "%";
            seekbar.value = Math.floor((audio.currentTime / audio.duration) * audio.duration) 
        }
    });

    // プログレスバーを引っ叩くと再生位置を変えられる
    seekbar.addEventListener("input", (e) => {
        audio.currentTime = seekbar.value;
    });

    // 音量スライダーの実装
    slider_volume.addEventListener("input", (e) => {
        audio.volume = slider_volume.value;
    })

    // 再生終了判定
    audio.addEventListener("ended", (e) => {
        seekbar.value = 0;
        $(musicbox[this.name]).find("#current").text("00:00");
    });
}

function playTime (t) {
    let hms = '';
    const h = t / 3600 | 0;
    const m = t % 3600 / 60 | 0;
    const s = t % 60;
    const z2 = (v) => {
      const s = '00' + v;
      return s.substr(s.length - 2, 2);
    }
    if(h != 0){
      hms = h + ':' + z2(m) + ':' + z2(s);
    }else if(m != 0){
      hms = z2(m) + ':' + z2(s);
    }else{
      hms = '00:' + z2(s);
    }
    return hms;
  }