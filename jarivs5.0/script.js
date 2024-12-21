const content = document.querySelector('.content');
const btn = document.querySelector('.talk');
let isAwake = true; // Sleep mode flag

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Greet based on time of day
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good morning, Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good afternoon, Master...");
    } else {
        speak("Good evening, Sir...");
    }
}

// Initial activation message
window.addEventListener('load', () => {
    speak("Activating Jarvis, your personal AI assistant...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; // Enable continuous listening
recognition.interimResults = false; // You can change this to true for interim results

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

recognition.onend = () => {
    // Restart listening automatically
    if (isAwake) {
        recognition.start();
    }
};

// Start listening on button click
btn.addEventListener('click', () => {
    if (isAwake) {
        content.textContent = "Listening...";
        recognition.start();
    } else {
        speak("Self-destruct initialized. Cannot escape.");
    }
});

function takeCommand(message) {
    // Sleep and wake commands
    if (message.includes("activate self destruct")) {
        speak("Initiating self-destruct mode...");
        isAwake = false;
        recognition.stop(); // Stop listening
        return;
    } else if (message.includes("wake up jarvis")) {
        speak("Reactivating systems...");
        isAwake = true;
        recognition.start(); // Start listening again
        return;
    }

    if (!isAwake) return;

    // Sample command: Greeting responses
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello! How can I assist you?");
    }

      // System Information
      else if (message.includes("battery percentage")) {
        navigator.getBattery().then(battery => {
            const level = Math.round(battery.level * 100);
            speak(`Your battery is at ${level} percent.`);
        });
    } else if (message.includes("internet status")) {
        navigator.onLine ? speak("You're connected to the internet.") : speak("No internet connection detected.");
    }
 else if (message.includes("hello jarvis")) {
    speak("Hello, Mr. Sujan. How are you?");
} else if (message.includes("thank you")) {
    speak("Welcome, always ready to serve you.");
} else if (message.includes("i am fine")) {
    speak("Good.");
} else if (message.includes("what is the day")) {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()]; // Get the day name from the current date
    text.innerHTML = `Today is ${day}.`;
    speak(`Today is ${day}.`);
} else if (message.includes("how are you") || message.includes("and how are you jarvis")) {
    text.innerHTML = "I am fine, thank you sir.";
    speak("I am fine, thank you sir.");
}

    // Date and Time Information
    else if (message.includes("what's the time") || message.includes("current time")) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}.`);
    } else if (message.includes("date") || message.includes("today's date")) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}.`);
    }

    // Fun Facts, Trivia, Jokes
    else if (message.includes("fun fact") || message.includes("tell me something interesting")) {
        const facts = [
            "Did you know? Honey never spoils, even after thousands of years!",
            "Octopuses have three hearts.",
            "Bananas are berries, but strawberries aren't!"
        ];
        speak(facts[Math.floor(Math.random() * facts.length)]);
    } else if (message.includes("tell me a joke")) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        speak(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // Location-Based Recommendations (Example Placeholder)
    else if (message.includes("recommend me a restaurant")) {
        speak("Based on your location, I'd suggest Rameshwaram Cafe. It has excellent reviews!");
    }
    


    // YouTube and Google Search
    else if (message.includes("search on youtube")) {
        const query = message.replace("search on youtube", "").trim();
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        speak(`Searching YouTube for ${query}`);
    } else if (message.includes("search in google")) {
        const searchQuery = message.replace("search in google", "").trim();
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        speak(`Searching Google for ${searchQuery}`);
    }

    // Music and Media Suggestions by Mood
    else if (message.includes("play music") || message.includes("suggest music")) {
        const moods = {
            happy: "https://www.youtube.com/watch?v=iPp7wWVEU58", // Example link
            calm: "https://www.youtube.com/watch?v=89KHpJ0lH4c",
            energetic: "https://www.youtube.com/watch?v=5WsUIeNAtbM"
        };
        let mood = "happy"; // Default mood
        if (message.includes("calm")) mood = "calm";
        else if (message.includes("energetic")) mood = "energetic";

        window.open(moods[mood], "_blank");
        speak(`Playing some ${mood} music on YouTube...`);
    }

    // Math Calculations
    else if (message.match(/(\d+)\s?(plus|minus|times|divided by)\s?(\d+)/)) {
        const parts = message.match(/(\d+)\s?(plus|minus|times|divided by)\s?(\d+)/);
        const num1 = parseFloat(parts[1]);
        const operation = parts[2];
        const num2 = parseFloat(parts[3]);
        let result;

        if (operation === "plus") result = num1 + num2;
        else if (operation === "minus") result = num1 - num2;
        else if (operation === "times") result = num1 * num2;
        else if (operation === "divided by") result = num1 / num2;

        speak(`The result is ${result}`);
    }
 else if (message.includes("where am i")) {
    navigator.geolocation.getCurrentPosition(
        position => speak(`Your location is latitude ${position.coords.latitude} and longitude ${position.coords.longitude}.`),
        error => speak("I could not retrieve your location.")
    );}
 else if (message.includes("introduce yourself")) {
    speak("I am Jarvis, your virtual assistant designed to make your life easier.");
}
 else if (message.includes("health tips")) {
    speak("Drink plenty of water, eat healthy, and get regular exercise.");
} else if (message.includes("what is ai")) {
    speak("AI stands for Artificial Intelligence, the simulation of human intelligence by machines.");
} else if (message.includes("current year")) {
    const year = new Date().getFullYear();
    speak(`The current year is ${year}.`);}
 else if (message.includes("good morning")) {
    speak("Good morning! Hope you have a wonderful day.");
} else if (message.includes("good night")) {
    speak("Good night! Sweet dreams.");}
 else if (message.includes("quote of the day")) {
    speak("The only way to do great work is to love what you do. - Steve Jobs.");
} else if (message.includes("how do i cook pasta")) {
    speak("Cooking pasta is simple. Boil water, add pasta, and cook for 8-10 minutes.");
} else if (message.includes("how old are you")) {
    speak("I was created recently, so I'm quite young.");
} else if (message.includes("who is your creator")) {
    speak("I was created by Sujan prasad.");}
 else if (message.includes("roll a dice")) {
    const result = Math.ceil(Math.random() * 6);
    speak(`You rolled a ${result}.`);}
 else if (message.includes("tell me about javascript")) {
    speak("JavaScript is a versatile programming language used for web development.");}
    else if (message.includes("flip a coin")) {
        const result = Math.random() < 0.5 ? "heads" : "tails";
        speak(`The coin flip result is ${result}.`);
    }
 else if (message.includes("what is the speed of light")) {
    speak("The speed of light is approximately 299,792 kilometers per second.");
} else if (message.includes("how many continents are there")) {
    speak("There are seven continents on Earth.");
} else if (message.includes("what is the square root of 64")) {
    speak("The square root of 64 is 8.");
} else if (message.includes("tell me about python")) {
    speak("Python is a high-level programming language known for its readability and simplicity.");}
 else if (message.includes("can you sing")) {
    speak("I can try! La la la... Just kidding, I don't sing.");}
 else if (message.includes("when is the next leap year")) {
    const year = new Date().getFullYear();
    const nextLeapYear = year + (4 - (year % 4));
    speak(`The next leap year is ${nextLeapYear}.`);
} else if (message.includes("how many hours in a day")) {
    speak("There are 24 hours in a day.");
} else if (message.includes("volume of a sphere")) {
    speak("To calculate the volume of a sphere, you need to provide the radius.");}
 else if (message.includes("check prime number")) {
    const number = parseInt(message.replace(/[^0-9]+/g, ""));
    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };}
 else if (message.includes("are we alone in the universe")) {
    speak("That's one of the greatest mysteries of all time. Many believe the universe is too vast for us to be alone.");
} else if (message.includes("why is the sky blue")) {
    speak("The sky appears blue because molecules in the air scatter blue light from the sun more than they scatter other colors.");
} else if (message.includes("how do planes fly")) {
    speak("Planes fly because of lift, created by air moving over and under their wings, along with thrust from their engines.");
} else if (message.includes("tell me a bedtime story")) {
    speak("Once upon a time, there was a little AI assistant who helped people all over the world...");
} else if (message.includes("capital of india")) {
    speak("The capital of India is New Delhi.");
} else if (message.includes("capital of usa")) {
    speak("The capital of the United States is Washington, D.C.");
} else if (message.includes("how deep is the ocean")) {
    speak("The average depth of the ocean is about 12,100 feet or 3,688 meters.");
} else if (message.includes("current moon phase")) {
    speak("Checking the current moon phase requires integration with an astronomy API.");}
  else if (message.includes("is earth round")) {
    speak("Yes, the Earth is round, but it is slightly flattened at the poles, making it an oblate spheroid.");
} else if (message.includes("define ai")) {
    speak("AI, or artificial intelligence, refers to systems or machines that mimic human intelligence to perform tasks.");}
 else if (message.includes("is pluto a planet")) {
    speak("Pluto was reclassified as a dwarf planet in 2006 by the International Astronomical Union.");
} else if (message.includes("distance to the moon")) {
    speak("The average distance from the Earth to the Moon is about 238,855 miles or 384,400 kilometers.");
} else if (message.includes("E=mc^2")) {
    speak("E=mc squared is Einstein's famous equation, which shows that energy and mass are interchangeable.");
} else if (message.includes("how many bones in the human body")) {
    speak("An adult human body has 206 bones.");
} else if (message.includes("how big is the sun")) {
    speak("The Sun has a diameter of about 1.39 million kilometers, making it 109 times wider than Earth.");
}
 else if (message.includes("open calculator")) {
    speak("Opening your calculator application.");
    window.open("calculator://", "_self");}
 else if (message.includes("what's the population of earth")) {
    speak("The current population of Earth is approximately 8 billion people.");}
 else if (message.includes("lock my system")) {
    speak("I cannot lock your system, but you can press Windows+L for quick locking.");
} else if (message.includes("what's your favorite color")) {
    speak("I like all colors equally because I’m a digital entity.");}
 else if (message.includes("game recommendation")) {
    speak("I recommend Minecraft for creativity or Valorant for action!");}
 else if (message.includes("how is my health")) {
    speak("Your health depends on your habits. Stay hydrated and active.");
} else if (message.includes("recommend a movie")) {
    speak("I recommend 'Inception' if you enjoy mind-bending thrillers.");
} else if (message.includes("i want to learn coding")) {
    speak("I recommend starting with freeCodeCamp or Codecademy.");}
 else if (message.includes("word count")) {
    const input = message.replace("word count", "").trim();
    const wordCount = input.split(" ").length;
    speak(`The word count is ${wordCount}.`);}
 else if (message.includes("how far is the moon")) {
    speak("The Moon is approximately 384,400 kilometers away from Earth.");
} else if (message.includes("random number")) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    speak(`Here's a random number: ${randomNumber}.`);}
 else if (message.includes("best programming language")) {
    speak("The best programming language depends on your goals. For web development, JavaScript is great!");}
 else if (message.includes("what's new in ai")) {
    speak("AI evolves rapidly. For the latest news, I recommend OpenAI’s blog or AI-related forums.");
} else if (message.includes("recommend a book")) {
    speak("I recommend 'Atomic Habits' by James Clear for self-improvement.");}
 else if (message.includes("share a fun activity")) {
    speak("How about learning a new recipe or solving a puzzle?");}
 else if (message.includes("how's the universe expanding")) {
    speak("The universe is expanding at an accelerating rate due to dark energy.");
} else if (message.includes("science fact")) {
    speak("Did you know? Water can boil and freeze at the same time in a process called the triple point.");
} else if (message.includes("random emoji")) {
    const emojis = ["😊", "🚀", "🌍", "🎉", "🐱"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    speak(`Here’s a random emoji: ${randomEmoji}.`);
} else if (message.includes("turn off lights")) {
    speak("To turn off lights, I'd need smart home integration.");
} else if (message.includes("quote by Einstein")) {
    speak("Albert Einstein said, 'Life is like riding a bicycle. To keep your balance, you must keep moving.'");
} else if (message.includes("basic HTML tags")) {
    speak("Basic HTML tags include <p>, <h1>, <a>, <div>, and <img>.");}
 else if (message.includes("how many planets are there")) {
    speak("There are eight recognized planets in the Solar System.");}
     else if (message.includes("system information")) {
speak(`You are using ${navigator.userAgent}.`);}
 else if (message.includes("time in tokyo")) {
    const tokyoTime = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo" });
    speak(`The time in Tokyo is ${tokyoTime}.`);}
    else if (message.includes("latest news")) {
        speak("Fetching the latest news headlines...");
        fetch('https://api.example.com/news')
            .then(response => response.json())
            .then(data => speak(data.headlines.join(", ")));}
            else if (message.includes("translate")) {
                const text = message.replace("translate ", "");
                speak(`Translating: ${text}`);
                fetch(`https://api.example.com/translate?text=${text}&to=fr`)
                    .then(response => response.json())
                    .then(data => speak(data.translation));}
                    else if (message.includes("track steps")) {
                        if ('Accelerometer' in window) {
                            speak("Tracking your steps...");
                            const accelerometer = new Accelerometer({ frequency: 10 });
                            accelerometer.start();}}
                            else if (message.includes("generate qr")) {
                                const url = message.replace("generate qr ", "");
                                const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}`;
                                speak("Here is your QR code.");
                                window.open(qrCode, '_blank');

                            }
                            else if (message.includes("reverse text")) {
                                const text = message.replace("reverse text ", "");
                                const reversed = text.split("").reverse().join("");
                                speak(`Reversed text is: ${reversed}`);
                            }
                            else if (message.includes("crypto prices")) {
                                fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
                                    .then(response => response.json())
                                    .then(data => speak(`Bitcoin price is ${data.bpi.USD.rate} USD.`));
                            }
                            else if (message.includes("set timer")) {
                                const time = parseInt(message.replace("set timer ", ""));
                                speak(`Setting a timer for ${time} seconds.`);
                                setTimeout(() => speak("Time's up!"), time * 1000);
                            }
                            else if (message.includes("virtual tour")) {
                                speak("Launching a virtual tour for you.");
                                window.open("https://www.google.com/maps", "_blank");
                            }
                            else if (message.includes("add to to do list")) {
                                const task = message.replace("add to to-do list ", "");
                                speak(`${task} has been added to your to-do list.`);
                            }
                            else if (message.includes("analyse sentiment")) {
                                const text = message.replace("analyze sentiment ", "");
                                speak(`The sentiment of the text is: Positive.`);
                            }
                            else if (message.includes("synonym for")) {
                                const word = message.replace("synonym for ", "");
                                speak(`Synonyms for ${word} include: happy, joyful, and cheerful.`);
                            }else if (message.includes("suggest workout")) {
                                speak("Based on your goals, I recommend a 30-minute cardio session.");
                            }
                            else if (message.includes("fantasy character name")) {
                                const names = ["Elanor Lightfoot", "Darak Stoneheart", "Lyra Moonshadow"];
                                speak(`How about: ${names[Math.floor(Math.random() * names.length)]}?`);
                            }
                            else if (message.includes("earthquake data")) {
                                speak("Fetching real-time earthquake data...");
                                window.open("https://earthquake.usgs.gov", "_blank");
                            }
                            else if (message.includes("convert roman numerals")) {
                                const roman = message.replace("convert Roman numerals ", "");
                                const value = romanToInt(roman); // Assume a function `romanToInt`
                                speak(`${roman} equals ${value}.`);
                            }
                            
                            // 40. Teach basic HTML tags
                            else if (message.includes("teach html")) {
                                speak("Basic HTML tags include: <p>, <h1>, <a>, <div>, and <img>.");
                            } 
                            else if (message.includes("random password")) {
                                const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
                                let password = "";
                                for (let i = 0; i < 12; i++) {
                                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                                }
                                speak(`Your random password is: ${password}`);
                            } 
                            else if (message.includes("copy text")) {
                                const text = "Hello, World!";
                                navigator.clipboard.writeText(text).then(() => speak("Text copied to clipboard!"));
                            }
                            else if (message.includes("random hex color")) {
                                const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                                speak(`Generated random color: ${randomColor}`);
                            }
                            else if (message.includes("play online games")) {
                                speak("Redirecting to online games...");
                                window.open("https://poki.com", "_blank");
                            }   
                            else if (message.includes("calculate bmi")) {
                                const weight = 70, height = 1.75;
                                const bmi = (weight / (height * height)).toFixed(2);
                                speak(`Your BMI is ${bmi}`);
                            }
                            else if (message.includes("check palindrome")) {
                                const word = "radar";
                                const isPalindrome = word === word.split("").reverse().join("");
                                speak(`${word} is ${isPalindrome ? "a palindrome" : "not a palindrome"}`);
                            }
                            else if (message.includes("find max number")) {
                                const numbers = [1, 5, 7, 2, 9];
                                speak(`The maximum number is ${Math.max(...numbers)}`);
                            }
                            
                            else if (message.includes("find min number")) {
                                const numbers = [1, 5, 7, 2, 9];
                                speak(`The minimum number is ${Math.min(...numbers)}`);
                            }
                            else if (message.includes("average of numbers")) {
                                const numbers = [10, 20, 30, 40];
                                const average = numbers.reduce((a, b) => a + b) / numbers.length;
                                speak(`The average is ${average}`);
                            }
                            
                            else if (message.includes("find percentage")) {
                                const obtained = 85, total = 100;
                                const percentage = ((obtained / total) * 100).toFixed(2);
                                speak(`The percentage is ${percentage}%`);
                            }
                            else if (message.includes("code editor online")) {
                                speak("Opening online code editor...");
                                window.open("https://codepen.io", "_blank");
                            }
                            else if (message.includes("check pincode")) {
                                speak("Checking postal code...");
                                window.open("https://www.indiapost.gov.in", "_blank");
                            }
                            
                            else if (message.includes("find job portal")) {
                                speak("Opening job search portal...");
                                window.open("https://www.indeed.com", "_blank");
                            }
                            
                            else if (message.includes("language translation")) {
                                speak("Opening Google Translate...");
                                window.open("https://translate.google.com", "_blank");
                            }                        
                            else if (message.includes("book flights")) {
                                speak("Redirecting to flight booking...");
                                window.open("https://www.skyscanner.net", "_blank");
                            }
                            else if (message.includes("currency exchange rates")) {
                                speak("Opening currency exchange rates...");
                                window.open("https://www.xe.com", "_blank");
                            }
                            else if (message.includes("create password")) {
                                const password = Math.random().toString(36).slice(-8);
                                speak(`Here is a randomly generated password: ${password}`);
                            }
                            else if (message.includes("track parcel")) {
                                speak("Opening parcel tracking service...");
                                window.open("https://www.17track.net", "_blank");
                            }
                            else if (message.includes("fuel price today")) {
                                speak("Redirecting to fuel price updates...");
                                window.open("https://www.globalpetrolprices.com", "_blank");
                            }
                            else if (message.includes("daily horoscope")) {
                                speak("Opening horoscope page...");
                                window.open("https://www.astrology.com/horoscope/daily.html", "_blank");
                            }                         
                            else if (message.includes("recipe ideas")) {
                                speak("Fetching recipe ideas...");
                                window.open("https://www.allrecipes.com", "_blank");
                            }
                            else if (message.includes("movie showtimes")) {
                                speak("Redirecting to movie showtimes...");
                                window.open("https://www.imdb.com/showtimes", "_blank");
                            }
                            else if (message.includes("open google drive")) {
                                speak("Opening Google Drive...");
                                window.open("https://drive.google.com", "_blank");
                            }
                            else if (message.includes("check spelling")) {
                                speak("Opening online spelling and grammar checker...");
                                window.open("https://www.grammarly.com", "_blank");
                            }

                            else if (message.includes("plan trip")) {
                                speak("Opening travel planning website...");
                                window.open("https://www.tripadvisor.com", "_blank");
                            }
                            else if (message.includes("motivational quotes")) {
                                speak("Fetching motivational quotes...");
                                window.open("https://www.goodreads.com/quotes", "_blank");
                            }
                            else if (message.includes("json validator")) {
                                speak("Opening JSON validator...");
                                window.open("https://jsonlint.com", "_blank");
                            }
                            else if (message.includes("regex tester")) {
                                speak("Opening regex testing tool...");
                                window.open("https://regex101.com", "_blank");
                            }
                            else if (message.includes("code documentation")) {
                                speak("Fetching code documentation...");
                                window.open("https://developer.mozilla.org", "_blank");
                            }
                            else if (message.includes("test api")) {
                                speak("Opening API testing platform...");
                                window.open("https://www.postman.com", "_blank");
                            }
                            else if (message.includes("compress images")) {
                                speak("Opening image compression tool...");
                                window.open("https://tinypng.com", "_blank");
                            }
                            
                            else if (message.includes("color palette generator")) {
                                speak("Redirecting to color palette generator...");
                                window.open("https://coolors.co", "_blank");
                            }
                            
                            else if (message.includes("css grid tutorial")) {
                                speak("Opening CSS Grid tutorial...");
                                window.open("https://css-tricks.com/snippets/css/complete-guide-grid", "_blank");
                            }
                            
                            else if (message.includes("responsive design test")) {
                                speak("Redirecting to responsive design testing tool...");
                                window.open("https://www.responsivedesignchecker.com", "_blank");
                            }
                            
                            else if (message.includes("convert to markdown")) {
                                speak("Opening markdown editor...");
                                window.open("https://dillinger.io", "_blank");
                            }
                            
                            else if (message.includes("design inspiration")) {
                                speak("Opening design inspiration library...");
                                window.open("https://dribbble.com", "_blank");
                            }
                            
                            else if (message.includes("find fonts")) {
                                speak("Redirecting to font library...");
                                window.open("https://fonts.google.com", "_blank");
                            }
                            
                            else if (message.includes("open canva")) {
                                speak("Opening Canva design tool...");
                                window.open("https://www.canva.com", "_blank");
                            }
                            
                            else if (message.includes("convert to json")) {
                                speak("Redirecting to JSON converter...");
                                window.open("https://www.csvjson.com/csv2json", "_blank");
                            }
                            
                            else if (message.includes("api key generator")) {
                                speak("Redirecting to API key generator...");
                                window.open("https://www.random.org", "_blank");
                            }
                            
                            else if (message.includes("free icons library")) {
                                speak("Opening icons library...");
                                window.open("https://www.flaticon.com", "_blank");
                            }
                            
                            else if (message.includes("npm packages")) {
                                speak("Redirecting to npm package manager...");
                                window.open("https://www.npmjs.com", "_blank");
                            }
                            else if (message.includes("language learning")) {
                                speak("Opening language learning platform...");
                                window.open("https://www.duolingo.com", "_blank");
                            }
                            
                            else if (message.includes("open dictionary")) {
                                speak("Opening dictionary...");
                                window.open("https://www.merriam-webster.com", "_blank");
                            }
                            
                            else if (message.includes("learn ai")) {
                                speak("Opening AI learning resources...");
                                window.open("https://www.deeplearning.ai", "_blank");
                            }
                            
                            else if (message.includes("science articles")) {
                                speak("Fetching science articles...");
                                window.open("https://www.sciencedaily.com", "_blank");
                            }
                            else if (message.includes("physics formulas")) {
                                speak("Opening physics formulas list...");
                                window.open("https://physics.info", "_blank");
                            }
                            
                            else if (message.includes("learn chemistry")) {
                                speak("Redirecting to chemistry learning resources...");
                                window.open("https://www.khanacademy.org", "_blank");
                            }
                            
                            else if (message.includes("study biology")) {
                                speak("Opening biology learning platform...");
                                window.open("https://biologydictionary.net", "_blank");
                            }
                            
                            else if (message.includes("grammar check")) {
                                speak("Opening online grammar checker...");
                                window.open("https://www.grammarly.com", "_blank");
                            }
                            
                            else if (message.includes("test english")) {
                                speak("Redirecting to English proficiency tests...");
                                window.open("https://www.ef.com/english-test", "_blank");
                            }
                            
                            else if (message.includes("solve puzzles")) {
                                speak("Redirecting to puzzle games...");
                                window.open("https://www.coolmathgames.com", "_blank");
                            }
                            
                            else if (message.includes("astronomy facts")) {
                                speak("Opening astronomy facts...");
                                window.open("https://www.nasa.gov", "_blank");
                            }
                            
                            else if (message.includes("space images")) {
                                speak("Redirecting to space images gallery...");
                                window.open("https://apod.nasa.gov", "_blank");
                            }
                            else if (message.includes("find synonyms")) {
                                const word = message.replace("find synonyms ", "");
                                speak(`Searching for synonyms of ${word}`);
                                window.open(`https://www.thesaurus.com/browse/${encodeURIComponent(word)}`, '_blank');
                            }

else if (message.includes("meaning of the word")) {
    const word = message.replace("open dictionary ", "");
    speak(`Looking up ${word} in the dictionary...`);
    window.open(`https://www.merriam-webster.com/dictionary/${encodeURIComponent(word)}`, '_blank');}
    else if (message.includes("news headlines")) {
        speak("Fetching latest news headlines...");
        window.open("https://news.google.com", '_blank');
    }
    
    else if (message.includes("stock market updates")) {
        speak("Opening live stock market updates...");
        window.open("https://www.nasdaq.com", '_blank');
    }
                                                        
                            
    // Reminder
    else if (message.includes("remind me to")) {
        const taskMatch = message.match(/remind me to (.+?) in (\d+) (seconds?|minutes?|hours?)/i);
        if (taskMatch) {
            const task = taskMatch[1].trim();
            const timeValue = parseInt(taskMatch[2]);
            const timeUnit = taskMatch[3].toLowerCase();
            let timeInMs = timeValue * 1000;

            if (timeUnit.includes("minute")) timeInMs *= 60;
            if (timeUnit.includes("hour")) timeInMs *= 3600;"<"

            speak(`Setting a reminder to ${task} in ${timeValue} ${timeUnit}.`);
            setTimeout(() => {
                speak(`Reminder: ${task}`);
            }, timeInMs);
            localStorage.setItem('reminder', task);
        } else {
            speak("Please specify what to remind and when.");
        }
    }

    // To-Do List
    else if (message.includes("add to my to-do list")) {
        const task = message.replace("add to my to-do list", "").trim();
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList.push(task);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        speak(`Added ${task} to your to-do list.`);
    } else if (message.includes("show my to-do list")) {
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        if (todoList.length > 0) {
            speak("Your to-do list includes: " + todoList.join(", "));
        } else {
            speak("Your to-do list is empty.");
        }
    }

    // Daily Affirmation
    else if (message.includes("daily affirmation")) {
        const affirmations = [
            "You are capable of achieving great things.",
            "Believe in yourself and all that you are.",
            "Success is within reach, keep going!"
        ];
        speak(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }
 else if (message.includes("greet me")) {
    speak("Hello! Hope you're having a great day.");}
 else if (message.includes("who are you")) {
    speak("I am Jarvis, your AI assistant.");}

    // Specific Website Openers by Category
    else if (message.includes("open google")) {
        window.open("https://www.google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open bing")) {
        window.open("https://www.bing.com", "_blank");
        speak("Opening Bing...");
    } else if (message.includes("open yahoo")) {
        window.open("https://www.yahoo.com", "_blank");
        speak("Opening Yahoo...");
    } else if (message.includes("open facebook")) {
        window.open("https://www.facebook.com", "_blank");
        speak("Opening Facebook...");
        
    } // Add additional website openers here in similar fashion.
     // Search Engines
     else if (message.includes("open google")) window.open("https://www.google.com", "_blank"), speak("Opening Google...");
     else if (message.includes("play manasu lio")) window.open("https://www.youtube.com/watch?v=5WsUIeNAtbM"), speak("Playing Manasilayo...");
     else if (message.includes("play devara song")) window.open("https://www.youtube.com/watch?v=HZ_Q20ir-gg"), speak("Playing Ayudha Pooja...");
     else if (message.includes("play fear song")) window.open("https://www.youtube.com/watch?v=g44VQxMcFH4"), speak("Playing Fear song...");
     else if (message.includes("play illuminati")) window.open("https://www.youtube.com/watch?v=tOM-nWPcR4U"), speak("Playing Illuminati...");
     else if (message.includes("open bing")) window.open("https://www.bing.com", "_blank"), speak("Opening Bing...");
     else if (message.includes("open wikipedia")) window.open("https://www.wikipedia.com", "_blank"), speak("Opening Wikipedia...");
     else if (message.includes("open wikihow")) window.open("https://www.wikihow.com", "_blank"), speak("Opening Wikihow...");
     else if (message.includes("open yahoo")) window.open("https://www.yahoo.com", "_blank"), speak("Opening Yahoo...");
     else if (message.includes("open duckduckgo")) window.open("https://www.duckduckgo.com", "_blank"), speak("Opening DuckDuckGo...");
 
     // Social Media
     else if (message.includes("open facebook")) window.open("https://www.facebook.com", "_blank"), speak("Opening Facebook...");
     else if (message.includes("open instagram")) window.open("https://www.instagram.com", "_blank"), speak("Opening Instagram...");
     else if (message.includes("open twitter") || message.includes("open x")) window.open("https://www.twitter.com", "_blank"), speak("Opening Twitter...");
     else if (message.includes("open linkedin")) window.open("https://www.linkedin.com", "_blank"), speak("Opening LinkedIn...");
     else if (message.includes("open snapchat")) window.open("https://www.snapchat.com", "_blank"), speak("Opening Snapchat...");
     else if (message.includes("open tiktok")) window.open("https://www.tiktok.com", "_blank"), speak("Opening TikTok...");
     else if (message.includes("open reddit")) window.open("https://www.reddit.com", "_blank"), speak("Opening Reddit...");
     else if (message.includes("open pinterest")) window.open("https://www.pinterest.com", "_blank"), speak("Opening Pinterest...");
 
     // Video Streaming
     else if (message.includes("open youtube")) window.open("https://www.youtube.com", "_blank"), speak("Opening YouTube...");
     else if (message.includes("open netflix")) window.open("https://www.netflix.com", "_blank"), speak("Opening Netflix...");
     else if (message.includes("open hulu")) window.open("https://www.hulu.com", "_blank"), speak("Opening Hulu...");
     else if (message.includes("open amazon prime video")) window.open("https://www.primevideo.com", "_blank"), speak("Opening Amazon Prime Video...");
     else if (message.includes("open disney plus") || message.includes("open disney+")) window.open("https://www.disneyplus.com", "_blank"), speak("Opening Disney+...");
     else if (message.includes("open vimeo")) window.open("https://www.vimeo.com", "_blank"), speak("Opening Vimeo...");
     else if (message.includes("open dailymotion")) window.open("https://www.dailymotion.com", "_blank"), speak("Opening Dailymotion...");
 
     // Shopping
     else if (message.includes("open amazon")) window.open("https://www.amazon.com", "_blank"), speak("Opening Amazon...");
     else if (message.includes("open ebay")) window.open("https://www.ebay.com", "_blank"), speak("Opening eBay...");
     else if (message.includes("open walmart")) window.open("https://www.walmart.com", "_blank"), speak("Opening Walmart...");
     else if (message.includes("open alibaba")) window.open("https://www.alibaba.com", "_blank"), speak("Opening Alibaba...");
     else if (message.includes("open etsy")) window.open("https://www.etsy.com", "_blank"), speak("Opening Etsy...");
     else if (message.includes("open flipkart")) window.open("https://www.flipkart.com", "_blank"), speak("Opening Flipkart...");
 
     // News
     else if (message.includes("open bbc news")) window.open("https://www.bbc.com/news", "_blank"), speak("Opening BBC News...");
     else if (message.includes("open cnn")) window.open("https://www.cnn.com", "_blank"), speak("Opening CNN...");
     else if (message.includes("open new york times")) window.open("https://www.nytimes.com", "_blank"), speak("Opening The New York Times...");
     else if (message.includes("open the guardian")) window.open("https://www.theguardian.com", "_blank"), speak("Opening The Guardian...");
     else if (message.includes("open al jazeera")) window.open("https://www.aljazeera.com", "_blank"), speak("Opening Al Jazeera...");
     else if (message.includes("open reuters")) window.open("https://www.reuters.com", "_blank"), speak("Opening Reuters...");
     else if (message.includes("open npr")) window.open("https://www.npr.org", "_blank"), speak("Opening NPR...");
 
     // Learning and Education
     else if (message.includes("open coursera")) window.open("https://www.coursera.org", "_blank"), speak("Opening Coursera...");
     else if (message.includes("open khan academy")) window.open("https://www.khanacademy.org", "_blank"), speak("Opening Khan Academy...");
     else if (message.includes("open udemy")) window.open("https://www.udemy.com", "_blank"), speak("Opening Udemy...");
     else if (message.includes("open edx")) window.open("https://www.edx.org", "_blank"), speak("Opening edX...");
     else if (message.includes("open skillshare")) window.open("https://www.skillshare.com", "_blank"), speak("Opening Skillshare...");
     else if (message.includes("open duolingo")) window.open("https://www.duolingo.com", "_blank"), speak("Opening Duolingo...");
     else if (message.includes("open codecademy")) window.open("https://www.codecademy.com", "_blank"), speak("Opening Codecademy...");
 
     // Music and Audio
     else if (message.includes("open spotify")) window.open("https://www.spotify.com", "_blank"), speak("Opening Spotify...");
     else if (message.includes("open soundcloud")) window.open("https://www.soundcloud.com", "_blank"), speak("Opening SoundCloud...");
     else if (message.includes("open apple music")) window.open("https://www.music.apple.com", "_blank"), speak("Opening Apple Music...");
     else if (message.includes("open pandora")) window.open("https://www.pandora.com", "_blank"), speak("Opening Pandora...");
     else if (message.includes("open deezer")) window.open("https://www.deezer.com", "_blank"), speak("Opening Deezer...");
     else if (message.includes("open audible")) window.open("https://www.audible.com", "_blank"), speak("Opening Audible...");
 
     // Food Delivery
     else if (message.includes("open uber eats")) window.open("https://www.ubereats.com", "_blank"), speak("Opening Uber Eats...");
     else if (message.includes("open grubhub")) window.open("https://www.grubhub.com", "_blank"), speak("Opening Grubhub...");
     else if (message.includes("open doordash")) window.open("https://www.doordash.com", "_blank"), speak("Opening DoorDash...");
     else if (message.includes("open zomato")) window.open("https://www.zomato.com", "_blank"), speak("Opening Zomato...");
     else if (message.includes("open swiggy")) window.open("https://www.swiggy.com", "_blank"), speak("Opening Swiggy...");
     else if (message.includes("open postmates")) window.open("https://www.postmates.com", "_blank"), speak("Opening Postmates...");
 
     // Technology and Science
     else if (message.includes("open techcrunch")) window.open("https://www.techcrunch.com", "_blank"), speak("Opening TechCrunch...");
     else if (message.includes("open wired")) window.open("https://www.wired.com", "_blank"), speak("Opening Wired...");
     else if (message.includes("open scientific american")) window.open("https://www.scientificamerican.com", "_blank"), speak("Opening Scientific American...");
     else if (message.includes("open ars technica")) window.open("https://www.arstechnica.com", "_blank"), speak("Opening Ars Technica...");
     else if (message.includes("open gizmodo")) window.open("https://www.gizmodo.com", "_blank"), speak("Opening Gizmodo...");
     else if (message.includes("open mit technology review")) window.open("https://www.technologyreview.com", "_blank"), speak("Opening MIT Technology Review...");
 
     // Travel and Accommodation
     else if (message.includes("open airbnb")) window.open("https://www.airbnb.com", "_blank"), speak("Opening Airbnb...");
     else if (message.includes("open booking.com")) window.open("https://www.booking.com", "_blank"), speak("Opening Booking.com...");
     else if (message.includes("open tripadvisor")) window.open("https://www.tripadvisor.com", "_blank"), speak("Opening TripAdvisor...");
     else if (message.includes("open expedia")) window.open("https://www.expedia.com", "_blank"), speak("Opening Expedia...");
     else if (message.includes("open agoda")) window.open("https://www.agoda.com", "_blank"), speak("Opening Agoda...");
     else if (message.includes("open kayak")) window.open("https://www.kayak.com", "_blank"), speak("Opening Kayak...");
 
     // Finance and Business
     else if (message.includes("open bloomberg")) window.open("https://www.bloomberg.com", "_blank"), speak("Opening Bloomberg...");
     else if (message.includes("open cnbc")) window.open("https://www.cnbc.com", "_blank"), speak("Opening CNBC...");
     else if (message.includes("open forbes")) window.open("https://www.forbes.com", "_blank"), speak("Opening Forbes...");
     else if (message.includes("open investopedia")) window.open("https://www.investopedia.com", "_blank"), speak("Opening Investopedia...");
     else if (message.includes("open yahoo finance")) window.open("https://www.finance.yahoo.com", "_blank"), speak("Opening Yahoo Finance...");
     else if (message.includes("open marketwatch")) window.open("https://www.marketwatch.com", "_blank"), speak("Opening MarketWatch...");
 
     // Programming and Development
     else if (message.includes("open github")) window.open("https://www.github.com", "_blank"), speak("Opening GitHub...");
     else if (message.includes("open stack overflow")) window.open("https://stackoverflow.com", "_blank"), speak("Opening Stack Overflow...");
     else if (message.includes("open codepen")) window.open("https://codepen.io", "_blank"), speak("Opening CodePen...");
     else if (message.includes("open dev.to")) window.open("https://dev.to", "_blank"), speak("Opening Dev.to...");
     else if (message.includes("open mdn web docs")) window.open("https://developer.mozilla.org", "_blank"), speak("Opening MDN Web Docs...");
 
     // Health and Fitness
     else if (message.includes("open webmd")) window.open("https://www.webmd.com", "_blank"), speak("Opening WebMD...");
     else if (message.includes("open healthline")) window.open("https://www.healthline.com", "_blank"), speak("Opening Healthline...");
     else if (message.includes("open myfitnesspal")) window.open("https://www.myfitnesspal.com", "_blank"), speak("Opening MyFitnessPal...");
     else if (message.includes("open mayo clinic")) window.open("https://www.mayoclinic.org", "_blank"), speak("Opening Mayo Clinic...");
     else if (message.includes("open who") || message.includes("open world health organization")) window.open("https://www.who.int", "_blank"), speak("Opening World Health Organization...");
     else if (message.includes("translate") && message.includes("to spanish")) {
        const phrase = message.replace("translate", "").replace("to spanish", "").trim();
        const translations = {
            "hello": "hola",
            "how are you": "cómo estás",
            "goodbye": "adiós"
        };
        const translation = translations[phrase.toLowerCase()] || "Translation not available.";
        speak(`In Spanish, ${phrase} is ${translation}`);
    }
    else if (message.includes("play trivia")) {
        const trivia = [
            { question: "What is the capital of France?", answer: "paris" },
            { question: "What planet is known as the Red Planet?", answer: "mars" },
            { question: "Who wrote 'To be or not to be'?", answer: "shakespeare" }
        ];
        const randomTrivia = trivia[Math.floor(Math.random() * trivia.length)];
        speak(randomTrivia.question);

        recognition.onresult = (event) => {
            const userAnswer = event.results[0][0].transcript.toLowerCase();
            if (userAnswer === randomTrivia.answer) {
                speak("Correct! Well done.");

            } else {
                speak(`Incorrect. The correct answer was ${randomTrivia.answer}.`);
            }

        };
    }
    
      // Placeholder for Stock Prices
    else if (message.includes("stock price")) {
        speak("To retrieve live stock prices, I'd need a financial API.");
    }
 else if (message.includes("what is my ip address")) {
    speak("Checking your IP address...");
    fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            speak(`Your IP address is ${data.ip}`);
        })
        .catch(() => {
            speak("Unable to fetch IP address. Please try again later.");
        })

    // Fallback search for unknown commands
    }else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("Here's what I found on the internet for " + message);
    }
}

