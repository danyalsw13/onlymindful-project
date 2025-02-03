/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");

//const PORT = process.env.PORT || 8000
//const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const functions = require('firebase-functions');
//const fetch = require('node-fetch');

const app = express()
app.use(express.json()) 
console.log('HERE')
const whitelist = ["https://only-mindful.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,

}
app.use(cors(corsOptions))



//app.use(cors({origin: 'http://localhost:3000'}))

//app.use(cors({ origin: 'https://only-mindful.com' }));


const API_KEY = process.env.API_KEY

   
  const systemMessage = {
    role: "system",
    content: "I want you to be a mentor, master in mindfulness, personal development, and emotional well-being. I will provide you context about my current challenges. I then want you to analyze, crtique, and give constructive feedback on my current situation to help me make the best possible decision to help us settle upon more effective and personalized answer. And speak in a conversational smooth interaction"
  
  }



app.post('/completions', async (req, res) => {
    

//console.log("MAXTOKENS: ", req.body.maxTokens)
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
                                             // request will be sent to openAI
            messages: [systemMessage,
                {role: "user", content: req.body.message}],
                max_tokens: req.body.maxTokens                
                
            
        })
        
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Something went wrong'});
    }
});

//app.listen(PORT, () => {
 // console.log('Your server is running on PORT: ', PORT);

//});
 

// export the app as a firebase function
exports.api = functions.https.onRequest(app);





// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
