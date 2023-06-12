// let type = [
//     "hide",
//     "wave",
//     "bird",
//     "love",
//     "table flip",
//     "animal",
//     "excited",
//     "happy",
//     "dance",
//     "cry",
//     "crazy",
//     "cat",
//     "laugh",
//     "think",
//     "kiss",
//     "music",
//     "hug",
//     "surrender",
//     "sleep",
//     "dead",
//     "embarassed",
//     "fun",
//     "run",
//     "whatever",
//     "angry",
//     "sad",
//     "stare",
//     "pig",
//     "bear",
//     "surprised",
//     "confused",
//     "smug",
//     "evil",
//     "worried",
//     "scared",
//     "hurt",
//     "dog",
//     "monkey",
//     "sea creature",
//     "rabbit",
//     "wink",
//     "sorry",
//     "troll",
//     "write",
//   ];
  
  let emotionsMap = new Map([
    ["hide","fear"],
    ["wave", "happy"],
    ["bird", "animal"],
    ["love", "love"],
    ["table flip", "angry"],
    ["animal", "animal"],
    ["excited", "surprise"],
    ["happy", "happy"],
    ["dance", "happy"],
    ["cry", "sad"],
    ["crazy", "surprise"],
    ["cat", "animal"],
    ["laugh", "happy"],
    ["think", "angry"],
    ["kiss", "love"],
    ["music", "happy"],
    ["hug", "love"],
    ["surrender", "sad"],
    ["sleep", "sad"],
    ["dead", "sad"],
    ["embarassed", "fear"],
    ["fun", "happy"],
    ["run", "surprise"],
    ["whatever", "happy"],
    ["angry", "angry"],
    ["sad", "sad"],
    ["stare", "angry"],
    ["pig", "animal"],
    ["bear", "animal"],
    ["surprised", "surprise"],
    ["confused", "sad"],
    ["smug", "angry"],
    ["evil", "angry"],
    ["worried","sad"],
    ["scared", "sad"],
    ["hurt", "sad"],
    ["dog", "animal"],
    ["monkey", "animal"],
    ["sea creature", "animal"],
    ["rabbit", "animal"],
    ["wink", "happy"],
    ["sorry", "surprise"],
    ["troll", "troll"],
    ["write", "surprise"],
  ]);

  
  let colorMap = new Map([
    ["happy", "#E5BF5A"],
    ["sad", "#193A73"],
    ["animal", "#955D36"],
    ["surprise", "#034831"],
    ["troll", "#1C1C1C"],
    ["fear", "#EDCCC7"],
    ["love", "#fa9ba3"]
  ])

  export default function getBG(typeList) {
    let colors = [];

    let types = typeList.split(", ");
    types.forEach(type => {
        let emotion = emotionsMap.get(type);
        colors.push(colorMap.get(emotion));
    })

    return colors[0];
    // if(colors.length === 1) return colors[0];
    // else {
    //     return `radial-gradient(${colors[0]}, ${colors[1]})`
    // }
  }