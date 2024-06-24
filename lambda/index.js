/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {  
    en: {
        translation: {
          WELCOME_MESSAGE: 'Welcome to Curiosities about Video Games, to start you can say: Tell me a curious fact about Video Games... or if you want to stop me just say, Cancel!... then How can I help you?',
          HELLO_MESSAGE: 'Hello! And welcome to Videogames Curiosities',
          HELP_MESSAGE: 'You can say hello to me! How can I help Angel?',
          GOODBYE_MESSAGE: 'Goodbye Angel!',
          REFLECTOR_MESSAGE: 'You just triggered %s',
          FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again Angel.',
          ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
          GET_FRASES_MSG: 'A fun fact is... ',
          ASK_FACT: ' If you want a curious fact you can say... Tell me a fact about Video Games... or if you want to stop me just say, Cancel! ...then how can I help you?',
          
          FACTS: [
            "Did you know that Mario, from the Mario series, was originally known as Jumpman in the 1981 game Donkey Kong?",
            "Pac-Man's design was inspired by a pizza with a missing slice.",
            "The first The Legend of Zelda game, released in 1986, allowed players to save their progress, a groundbreaking feature at the time.",
            "The first esports tournament took place in 1972 at Stanford University, where students competed in Spacewar!",
            "Minecraft is the best-selling video game of all time, with over 200 million copies sold worldwide.",
            "The creator of Tetris, Alexey Pajitnov, originally did not receive royalties for the game because he developed it while working for the Soviet government.",
            "The Pokémon franchise is the highest-grossing media franchise of all time, surpassing even Star Wars and Marvel.",
            "The original Final Fantasy game was named as such because its creator, Hironobu Sakaguchi, thought it would be his last game if it wasn't successful."
          ]
        }
    },  
    es: {
        translation: {
          WELCOME_MESSAGE: 'Bienvenido a Curiosidades sobre Videojuegos, para comenzar puedes decir: Dime un dato curioso de los Videojuegos... o si deseas detenerme solo di, ¡Cancela!... entonces ¿Cómo te puedo ayudar?',
          HELLO_MESSAGE: 'Hola! Y bienvenido a Curiosidades sobre Videojuegos',
          HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar Angel?',
          GOODBYE_MESSAGE: 'Adiós Angel!',
          REFLECTOR_MESSAGE: 'Acabas de activar %s',
          FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez Angel.',
          ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
          GET_FRASES_MSG: 'Un dato curioso es... ',
          ASK_FACT: 'Si quieres un dato curioso puedes decir... Dime un dato sobre los Videojuegos... o si quieres detenerme solo di ¡Cancelar! ...entonces ¿en qué puedo ayudarte?',
          
          FACTS: [
            "¿Sabías que Mario, de la serie Mario, originalmente se llamaba Jumpman en el juego Donkey Kong de 1981?",
            "El diseño de Pac-Man se inspiró en una pizza con una porción faltante.",
            "El primer juego de The Legend of Zelda, lanzado en 1986, permitía a los jugadores guardar su progreso, una característica innovadora en ese momento.",
            "El primer torneo de deportes electrónicos tuvo lugar en 1972 en la Universidad de Stanford, donde los estudiantes compitieron en Spacewar!",
            "Minecraft es el videojuego más vendido de todos los tiempos, con más de 200 millones de copias vendidas en todo el mundo.",
            "El creador de Tetris, Alexey Pajitnov, originalmente no recibió regalías por el juego porque lo desarrolló mientras trabajaba para el gobierno soviético.",
            "La franquicia Pokémon es la franquicia de medios más lucrativa de todos los tiempos, superando incluso a Star Wars y Marvel.",
            "El juego original de Final Fantasy se llamó así porque su creador, Hironobu Sakaguchi, pensó que sería su último juego si no tenía éxito."
          ]
        }
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const factArr = requestAttributes.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        
        const speakOutput = requestAttributes.t('GET_FRASES_MSG') + randomFact + requestAttributes.t('ASK_FACT');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        FrasesIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();