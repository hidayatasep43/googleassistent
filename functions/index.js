'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');

const {
  dialogflow,
  Suggestions,
  BasicCard,
  Button,
  SimpleResponse,
} = require('actions-on-google');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
var db = admin.firestore();

const hewan = [
  {
    "category": "gajah",
    "suggestion": "Gajah",
    "facts": [
        "Hewan ini berkaki 4.",
        "Hewan ini memiliki belalai.",
        "Hewan ini memakan rumput.",
        "Hewan ini termasuk mamalia.",
    ],
  },
  {
    "category": "jerapah",
    "suggestion": "Jerapah",
    "facts": [
        "Hewan ini berkaki 4.",
        "Hewan ini memiliki tubuh yang sangat tinggi.",
        "Hewan ini memakan rumput.",
        "Hewan ini termasuk mamalia.",
    ],
  },
];

const kataKasar = [
    "Salah, bego lu!",
    "Salah, belegug sia!",
]

const app = dialogflow({
  debug: true,
  init: () => ({
    
  }),
});

app.intent('MulaiTes', (conv) => {
      conv.ask(new SimpleResponse({
        speech: "Oke noob, kita main",
        text: "Oke noob, kita main",
      }));
    
    var pertanyaan = hewan[0].facts[0]
    conv.ask(new SimpleResponse({
        speech: pertanyaan,
        text: pertanyaan,
    }));

});

app.intent('JawabanHewan', (conv) => {
      var jawabanHewan = conv.parameters['hewan'];
      jawabanHewan = jawabanHewan.toLowerCase();
      console.log(jawabanHewan);
      if (jawabanHewan === hewan[0].category){
          conv.ask(new SimpleResponse({
            speech: "Benar! Mau main lagi atau gak?",
            text: "Benar! Mau main lagi atau gak?",
          }));
      }else{
          conv.ask(new SimpleResponse({
            speech: kataKasar[1],
            text: kataKasar[1],
          }));
      }

      /*conv.ask(new SimpleResponse({
        speech: jawabanHewan,
        text: jawabanHewan,
      }));*/


});

exports.senpaimain = functions.https.onRequest(app);
