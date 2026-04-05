const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const contextQrContainer = document.getElementById('context-quick-replies');
const globalQrContainer = document.getElementById('global-quick-replies');
const globalBtns = document.querySelectorAll('.g-qr-btn');

let state = 'LANG_SELECTION';
let lang = 'en';
const leadData = {};

const STRINGS = {
    en: {
        welcome: `Hi 👋 Welcome to Mierae Solar<br><br>Please choose your language to continue:<br><br>• Check subsidy<br>• Estimate savings<br>• Explore EMI options<br>• Book free site visit`,
        interest: "I can help you check subsidy, savings, and eligibility. Are you exploring solar for your home?",
        bill: "What is your approximate monthly electricity bill?",
        own_house: "Is this your own house?",
        roof: "Do you have usable rooftop space?",
        city: "Which city are you from?",
        pitch: "Based on what you shared, rooftop solar could help reduce your electricity bill significantly. Government subsidy can also be up to ₹78,000 depending on eligibility. Would you like me to arrange a free site visit?",
        obj_cost: "I understand. Many homeowners feel the same initially. EMI / finance options may help make solar more affordable month-to-month. Some customers compare it to what they already pay as monthly electricity bill. A free site visit helps you know exact savings — no commitment. May I have your name and phone number?",
        obj_default: "No problem at all. A free site visit can help you understand savings and feasibility first — no commitment. May I have your name and number?",
        lead_name: "Great. May I have your name?",
        lead_phone: "Thanks. Please share your phone number.",
        lead_city_house: "Thank you. Could you share your city and house type (e.g. Independent House)?",
        closing: "Perfect. Our solar advisor will connect with you shortly. If you’re eligible, checking subsidy earlier is better. Thanks! Our solar advisor will contact you shortly.",
        fallback: "I can help you with solar savings, subsidy, or a free site visit. Which one would you like to know?",
        global_subsidy: "Government subsidy may be available up to 40%, and in some cases up to ₹78,000 depending on eligibility and system size. Would you like me to help check if your home may be suitable for solar?",
        global_benefits: "Solar can help reduce electricity bills, create long-term savings, and provide value over 20–25 years. To check whether solar may suit your home, what is your approximate monthly electricity bill?",
        global_emi: "EMI / finance options may help make solar more affordable month-to-month. Some homeowners compare it to what they already pay as monthly electricity bill. Would you like to know whether solar could fit your home?",
        global_site_visit: "Great! I can help arrange a free site visit. May I take a few details first?",
        global_advisor: "Sure — I can help our solar advisor connect with you. May I have your name and phone number?"
    },
    hi: {
        welcome: `Hi 👋 Welcome to Mierae Solar<br><br>Please choose your language to continue:<br><br>• Check subsidy<br>• Estimate savings<br>• Explore EMI options<br>• Book free site visit`,
        interest: "मैं आपको subsidy, savings, और eligibility चेक करने में मदद कर सकता हूँ। क्या आप अपने घर के लिए solar लगवाना सोच रहे हैं?",
        bill: "आपका monthly बिजली बिल लगभग कितना आता है?",
        own_house: "क्या यह आपका खुद का घर है?",
        roof: "क्या आपकी छत खाली है?",
        city: "आप किस शहर से हैं?",
        pitch: "जो आपने बताया उसके हिसाब से rooftop solar आपके बिजली बिल को काफी कम कर सकता है। Eligibility के हिसाब से government subsidy ₹78,000 तक मिल सकती है। क्या मैं आपके लिए free site visit arrange कर दूँ?",
        obj_cost: "समझ सकता हूँ। शुरुआत में बहुत लोगों को ऐसा लगता है। EMI / finance options से solar को आसान बनाया जा सकता है। Free site visit से पहले exact savings समझ सकते हैं — कोई commitment नहीं। क्या आप अपना नाम और number share करेंगे?",
        obj_default: "कोई बात नहीं। Free site visit से पहले savings और feasibility समझ सकते हैं — कोई commitment नहीं। क्या आप अपना नाम और number share करेंगे?",
        lead_name: "ठीक है, क्या मैं आपका नाम जान सकता हूँ?",
        lead_phone: "धन्यवाद। कृपया अपना phone number बताएं।",
        lead_city_house: "धन्यवाद। कृपया अपना शहर और घर का प्रकार (जैसे Independent House) बताएं।",
        closing: "Perfect. हमारी team जल्द ही आपसे संपर्क करेगी। अगर आप eligible हैं, तो earlier check करना बेहतर है। Thanks! Our solar advisor will contact you shortly.",
        fallback: "मैं आपको solar savings, subsidy, या free site visit के बारे में बता सकता हूँ। आप क्या जानना चाहेंगे?",
        global_subsidy: "Government subsidy eligibility के हिसाब से ₹78,000 तक मिल सकती है। क्या आप चेक करना चाहेंगे कि आपका घर solar के लिए suitable है?",
        global_benefits: "Solar से 20-25 साल तक बिजली बिल की बचत होती है। Eligibility check करने के लिए, आपका monthly बिजली बिल लगभग कितना आता है?",
        global_emi: "EMI / finance options से solar को आसान बनाया जा सकता है। क्या आप जानना चाहेंगे कि solar आपके घर के लिए सही है?",
        global_site_visit: "ज़रूर! मैं एक free site visit arrange कर सकता हूँ। क्या मैं आपका नाम और फ़ोन नंबर जान सकता हूँ?",
        global_advisor: "ज़रूर! हमारे advisor आपकी मदद करेंगे। अपना नाम और फ़ोन नंबर बताएं?"
    },
    te: {
        welcome: `Hi 👋 Welcome to Mierae Solar<br><br>Please choose your language to continue:<br><br>• Check subsidy<br>• Estimate savings<br>• Explore EMI options<br>• Book free site visit`,
        interest: "చాలా బాగుంది. నేను మీకు subsidy, savings, eligibility గురించి help చేయగలను. ముందుగా మీ monthly current bill సుమారుగా ఎంత వస్తుంది?",
        bill: "మీ monthly current bill సుమారుగా ఎంత వస్తుంది?",
        own_house: "సరే. ఇది మీ సొంత ఇల్లేనా?",
        roof: "మీ ఇంటి మీద ఖాళీ roof / terrace ఉందా?",
        city: "అద్భుతం. మీరు ఏ city నుండి మాట్లాడుతున్నారు?",
        pitch: "మీరు చెప్పిన వివరాల ప్రకారం rooftop solar మీ current bill ని బాగా తగ్గించే అవకాశం ఉంది. Government subsidy కూడా eligibility బట్టి ₹78,000 వరకు రావచ్చు. మీకు free site visit arrange చేయాలా?",
        obj_cost: "అది చాలామందికి ఉండే common concern. EMI / finance options వల్ల monthly burden తగ్గే అవకాశం ఉంటుంది. ముందుగా free site visit ద్వారా exact savings తెలుసుకోవచ్చు — ఎలాంటి commitment అవసరం లేదు. మీ పేరు మరియు number share చేస్తారా?",
        obj_default: "పర్లేదు. ముందుగా free site visit ద్వారా savings మరియు feasibility check చేసుకోవచ్చు — ఎలాంటి commitment అవసరం లేదు. మీ పేరు మరియు number share చేస్తారా?",
        lead_name: "దయచేసి మీ పేరు చెప్పండి.",
        lead_phone: "ధన్యవాదాలు. దయచేసి మీ phone number ఇవ్వండి.",
        lead_city_house: "ధన్యవాదాలు. మీ city మరియు house type కూడా share చేస్తారా?",
        closing: "Perfect. మా solar advisor త్వరలో మీతో connect అవుతారు. If you’re eligible, checking subsidy earlier is better. Thanks! Our solar advisor will contact you shortly.",
        fallback: "నేను మీకు solar savings, subsidy, లేదా free site visit గురించి సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
        global_subsidy: "Government subsidy eligibility బట్టి ₹78,000 వరకు రావచ్చు. మీ ఇల్లు solar కి సరిపోతుందో లేదో check చేయమంటారా?",
        global_benefits: "Solar వల్ల 20-25 years long-term savings ఉంటాయి. మీ ఇల్లు eligibility check చేయడానికి, ముందుగా మీ monthly current bill సుమారుగా ఎంత వస్తుంది?",
        global_emi: "Affordable EMI options వల్ల monthly burden తగ్గే అవకాశం ఉంటుంది. మీ ఇంటికి solar సరిపోతుందో లేదో తెలుసుకోవాలనుకుంటున్నారా?",
        global_site_visit: "తప్పకుండా! నేను free site visit arrange చేయగలను. దయచేసి మీ పేరు మరియు నెంబర్ ఇస్తారా?",
        global_advisor: "తప్పకుండా, మా advisor మీకు కాల్ చేస్తారు. దయచేసి మీ పేరు మరియు ఫోన్ నెంబర్ ఇస్తారా?"
    }
};

function t(key) {
    return STRINGS[lang][key];
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'User' ? 'user-msg' : 'bot-msg');
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
}

function botSay(text) {
    appendMessage(text, 'Bot');
}

function showContextQR(options) {
    contextQrContainer.innerHTML = '';
    if (options.length === 0) {
        contextQrContainer.style.display = 'none';
        return;
    }
    contextQrContainer.style.display = 'flex';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('c-qr-btn');
        btn.innerText = opt;
        btn.onclick = () => {
            appendMessage(opt, 'User');
            processInput(opt);
        };
        contextQrContainer.appendChild(btn);
    });
}

// Global Quick Replies
globalBtns.forEach(btn => {
    btn.onclick = () => {
        const text = btn.innerText;
        appendMessage(text, 'User');
        handleGlobalFeature(text);
    };
});

function handleGlobalFeature(text) {
    const lower = text.toLowerCase();
    if(lower.includes('subsidy')) {
        botSay(t('global_subsidy'));
        if(lang === 'en') showContextQR(['Yes', 'No']);
        else if(lang === 'hi') showContextQR(['हाँ', 'नहीं']);
        else showContextQR(['అవును', 'లేదు']);
        state = 'GREETING'; 
    }
    else if(lower.includes('benefits')) {
        botSay(t('global_benefits'));
        showContextQR([]);
        state = 'BILL';
    }
    else if(lower.includes('emi')) {
        botSay(t('global_emi'));
        if(lang === 'en') showContextQR(['Yes', 'Tell me cost']);
        else if(lang === 'hi') showContextQR(['हाँ', 'नहीं']);
        else showContextQR(['అవును', 'లేదు']);
        state = 'GREETING'; 
    }
    else if(lower.includes('site visit')) {
        botSay(t('global_site_visit'));
        showContextQR([]);
        state = 'LEAD_CONTACT';
    }
    else if(lower.includes('advisor')) {
        botSay(t('global_advisor'));
        showContextQR([]);
        state = 'LEAD_CONTACT';
    }
}

function initChat() {
    botSay(STRINGS['en'].welcome);
    showContextQR(['1. English', '2. हिंदी', '3. తెలుగు']);
}

function processInput(input) {
    const lower = input.toLowerCase().trim();
    if (!lower) return;

    if (state !== 'LANG_SELECTION' && state !== 'GREETING') {
        globalQrContainer.classList.remove('hidden');
    }

    switch(state) {
        case 'LANG_SELECTION':
            if (lower.includes('1') || lower.includes('english')) { lang = 'en'; }
            else if (lower.includes('2') || lower.includes('hindi') || lower.includes('हिंदी')) { lang = 'hi'; }
            else if (lower.includes('3') || lower.includes('telugu') || lower.includes('తెలుగు')) { lang = 'te'; }
            else { lang = 'en'; } // default
            botSay(lang === 'en' ? "Hi! Want to reduce your electricity bill with solar?" : (lang === 'hi' ? "नमस्ते! क्या आप अपना बिजली बिल कम करना चाहते हैं?" : "నమస్కారం! మీ కరెంట్ బిల్ తగ్గించుకోవాలనుకుంటున్నారా?"));
            if(lang === 'en') showContextQR(['Yes', 'Just checking']);
            else if(lang === 'hi') showContextQR(['हाँ', 'नहीं']);
            else showContextQR(['అవును', 'కాదు']);
            state = 'GREETING';
            break;
            
        case 'GREETING':
            // Move direct to bill asking for the demo flow in Telugu, or show interest text.
            if(lang === 'te' && lower.includes('అవును')) {
                botSay(t('interest'));
                showContextQR([]);
                state = 'BILL';
            } else {
                botSay(t('interest'));
                if(lang === 'en') showContextQR(['Yes', 'Tell me cost', 'Subsidy info']);
                else showContextQR(['हाँ', 'नहीं']);
                state = 'INTEREST';
            }
            break;

        case 'INTEREST':
            botSay(t('bill'));
            showContextQR([]);
            state = 'BILL';
            break;

        case 'BILL':
            leadData.bill = input;
            botSay(t('own_house'));
            if(lang === 'en') showContextQR(['Yes', 'No']);
            else if(lang === 'hi') showContextQR(['हाँ', 'नहीं']);
            else showContextQR(['అవును', 'కాదు']);
            state = 'OWN_HOUSE';
            break;

        case 'OWN_HOUSE':
            leadData.ownHouse = input;
            botSay(t('roof'));
            if(lang === 'en') showContextQR(['Yes', 'No', 'Not sure']);
            else if(lang === 'hi') showContextQR(['हाँ', 'नहीं']);
            else showContextQR(['ఉంది', 'లేదు']);
            state = 'ROOF';
            break;

        case 'ROOF':
            leadData.roof = input;
            botSay(t('city'));
            showContextQR([]);
            state = 'CITY';
            break;

        case 'CITY':
            leadData.city = input;
            botSay(t('pitch'));
            if(lang === 'en') showContextQR(['Yes', 'Tell me cost', 'Not sure']);
            else if(lang === 'hi') showContextQR(['हाँ', 'Cost कितना होगा?', 'Not sure']);
            else showContextQR(['అవును', 'Cost ekkuva untundi kada']);
            state = 'PITCH';
            break;

        case 'PITCH':
            if (lower.includes('cost') || lower.includes('ekkuva') || lower.includes('कितना')) {
                botSay(t('obj_cost'));
            } else if (lower.includes('no') || lower.includes('not sure') || lower.includes('లేదు')) {
                botSay(t('obj_default'));
            } else {
                botSay("Great! May I have your name and number?");
            }
            showContextQR([]);
            state = 'LEAD_CONTACT';
            break;

        case 'LEAD_CONTACT':
            leadData.contact = input;
            botSay(t('lead_city_house'));
            showContextQR([]);
            state = 'LEAD_META';
            break;

        case 'LEAD_META':
            botSay(t('closing'));
            showContextQR([]);
            state = 'DONE';
            break;

        case 'DONE':
            botSay(t('fallback'));
            break;
    }
}

sendBtn.addEventListener('click', () => {
    const val = userInput.value;
    if (val.trim()) {
        appendMessage(val, 'User');
        userInput.value = '';
        setTimeout(() => processInput(val), 400); // Small delay for realism
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

window.onload = initChat;
