let btn=document.querySelector("#btn");
let content=document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="hi-IN";
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
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click',()=>{
    // content.textContent="I'm listening..."
    btn.style.display="none";
    voice.style.display="block";
    recognition.start();
})

function takeCommand(message){
    btn.style.display="flex";
    voice.style.display="none";


    if(message.includes("hello") || message.includes("Hey") ){
        speak("Hello Sir, How can i Help You!");
    }
    else if(message.includes("Who are you")){
        speak("I'm a Virtual Assistant, developed by Shivam Gupta. I can help you with various tasks like searching, weather forecast, playing music, and more.");
    }

    else if(message.includes("open Youtube")){
        speak("Opening Youtube in your browser...");
        window.open("https://www.youtube.com/","_blank");
    }

    else if(message.includes("open Google")){
        speak("Opening Google in your browser...");
        window.open("https://www.google.com/","_blank");
    }
     else if(message.includes("open Instagram")){
        speak("Opening Instagram in your browser...");
        window.open("https://www.instagram.com/","_blank");
    }
     else if(message.includes("open Facebook")){
        speak("Opening facebook in your browser...");
        window.open("https://www.facebook.com/","_blank");
    }

     else if(message.includes("open linkedin")){
        speak("Opening linkedin in your browser...");
        window.open("https://www.linkedin.com/","_blank");
    }
     else if(message.includes("open github")){
        speak("Opening github in your browser...");
        window.open("https://www.github.com/","_blank");
    }
     
     else if(message.includes("take me to your developer's instagram account")){
        speak("Here we go");
        window.open("https://www.instagram.com/shivamgupta322/","_blank");
    }

     else if(message.includes("take me to your developer's github account")){
        speak("Here we go");
        window.open("https://github.com/ShivamGupta322","_blank");
    }
     else if(message.includes("take me to your developer's linkedin account")){
        speak("Here we go");
        window.open("https://www.linkedin.com/in/shivam-gupta-sg322/","_blank");
    }

    else if(message.includes("open calculator")){
        speak("opening calculator");
        window.open("calculator://");
    }

    else if(message.includes("open whatsapp")){
        speak("opening whatsapp");
        window.open("whatsapp://");
    }
    else if(message.includes("play music")){
        speak("taking you there");
        window.open("https://www.youtube.com/results?search_query=music");
    }

    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric",second:"numeric"});
        speak("The current time is "+time);
    }
    else if(message.includes("time")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak("The current time is "+time);
    }

    // else if(message.includes("search")){
    //     let searchQuery=message.split("search")[1].trim();
    //     speak("Searching for "+searchQuery+"...");
    //     window.open("https://www.google.com/search?q="+searchQuery,"_blank");
    // }
    else if(message.includes("weather")){
        let city=message.split("weather")[1].trim();
        speak("Fetching weather for "+city+"...");
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=your_api_key")
       .then(response=>response.json())
       .then(data=>{
            let temp=Math.floor(data.main.temp-273.15);
            let description=data.weather[0].description;
            speak("The weather in "+city+" is "+description+". Temperature is "+temp+"°C");
        })
       .catch(error=>speak("Error fetching weather data!"));
    }
    else{
        speak(`This is what i found on internet regarding ${message.replace("shifra","") || message.replace("shipra","")}`)
        window.open(`https://www.google.com/search?q=${message.replace("shifra","") || message.replace("shipra","")}`,"_blank");
    }
}