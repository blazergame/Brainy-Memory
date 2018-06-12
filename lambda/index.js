const fs = require('fs');
const catagory = fs.readFile('./catagory.json');

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function getWelcomeResponse(callback){
    const speechOutput = 'Welcome to Brainy Memory, the game where your memory will be stretched.' +
                         'Game is simple, repeat everything I say.' +
                         'One point per round. One round consist of lisenting to everything I say and repeating it back.' + 
                         'Please pick a catagory: Numbers or Shapes';
    
    const repromptText = 'Please pick a catagory: Numbers or Shapes';
    
    callback(speechOutput, repromptText);
}


function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thanks for playing! See you next time!';
    
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'BrainyMemoryIntent') {
       // setColorInSession(intent, session, callback); //Need 2 intents. one is to speak the words. Other one is to listent to the word
    } else if (intentName === 'WhatsMyColorIntent') {
       // getColorFromSession(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback){
    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

// -------------- Main Handler ---------------------
exports.handler = (event, context, callback) => {
    // TODO implement
    
    console.log(event);
    console.info("----------------------------------------------AHH")
    console.log(context);
    
    callback(null, 'Hello from Lambda');
};