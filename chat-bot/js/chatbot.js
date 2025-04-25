const Gemini_Key = "AIzaSyC4k_eIKojbKs5ccVMMzMZpdnXA_BWqEJ4"
document.querySelector(".inputarea button").addEventListener("click", sendMessage);

const conversations = [
    // {
    //     "role": "user",
    //     "parts": [
    //       {
    //         "text": "Hello"
    //       }
    //     ]
    // },
    // {
    //     "role": "model",
    //     "parts": [
    //     {
    //         "text": "Great to meet you. What would you like to know?"
    //     }
    //     ]
    // },
    // {
    //     "role": "user",
    //     "parts": [
    //       {
    //         "text": "I have two dogs in my house. How many paws are in my house?"
    //       }
    //     ]
    // }
]

function sendMessage(){
    const userMessage = document.querySelector(".inputarea input").value;
    if(userMessage.length){
        document.querySelector(".inputarea input").value="";
        document.querySelector(".chatwindow .chat").insertAdjacentHTML("beforeend",`<div class="user">
                <p>${userMessage}</p>
            </div>`)
    }

    conversations.push(
        {
        "role": "user",
        "parts": [
          {
            "text": userMessage
          }
        ]
        }
    );

    goiDuLieu(conversations);
}

async function goiDuLieu(conversations) {
    console.log(conversations);
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+Gemini_Key, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: conversations,
        }),
    });
    const data = await response.json();
    console.log(data);

    document.querySelector(".chatwindow .chat").insertAdjacentHTML("beforeend",`<div class="model">
                <p>${data.candidates[0].content.parts[0].text}</p>
            </div>`)

    conversations.push(
        {
        "role": "model",
        "parts": [
        {
            "text": data.candidates[0].content.parts[0].text,
        }
        ]
    },
    )
}