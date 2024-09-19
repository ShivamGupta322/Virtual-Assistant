let btn=document.querySelector("#btn");
let content=document.querySelector("#content");

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="hi-IN"
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day=new Date();
    let hour=day.getHours();
    if(hour>=0 && hour<12){
        speak("Good Morning Sir ");
    }
    else if(hour>=12 && hour<16){
        speak("Good Afternoon Sir ");
    }
    else{
        speak("Good Evening Sir ");
    }
}

window.addEventListener('load',()=>{
    wishMe();
})


let speechRecognition=window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex;
   let transcript= event.results[currentIndex][0].transcript;
   content.innerHTML=transcript;
    console.log(event);
    console.log(transcript);
}

btn.addEventListener('click',()=>{
    // content.textContent="I'm listening..."
    
    recognition.start();
})