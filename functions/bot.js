exports.handler = async function(event, context){
    const params = event.queryStringParameters;
    

    const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

/*import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';*/

const BOT_TOKEN = "6260165248:AAEanaxH7oSUoIJjBXM1FxIIvO-RCfUasdI"

const bot = new Telegraf(BOT_TOKEN);

/**
 * docker tag local-image:tagname new-repo:tagname
docker push new-repo:tagname
 */
bot.start((ctx) => {
  ctx.deleteMessage()
  ctx.reply("🦅BIENVENUE SUR PKP RNE🌍", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Francophone 🇫🇷", callback_data: "langue" }, { text: "Anglophone 🏴󠁧󠁢󠁥󠁮󠁧󠁿", callback_data: "langue" }],
        [{ text: "Hispanohablante 🇪🇦", callback_data: "langue" }, { text: "Lusofonos 🇵🇹", callback_data: "langue" }],
        //[{text:"QUITTER", callback_data: "QUITTER"}]
      ]
    }
  });
});


//Les actions à faire
bot.on("callback_query", (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  ctx.deleteMessage()

  if (callbackData.startsWith("lien_continent")) {
    const liste_continent = ["Afrique", "Europe", "Amerique", "Asie", "Antartique", "Océanie"]
    const continent = callbackData.split(":")[1]
    const index = liste_continent.indexOf(continent)

    ctx.reply(`${index + 1}. ${continent}\n
      ${LIENS_CONTINENTS[index]}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Retour", callback_data: "continent" }]
        ]
      }
    });
  }
  else if (callbackData.startsWith("PF")) {
    const liste_pays_francophones = ["Benin", "Belgique", "Burkina", "Burundi", "Cameroun", "Canada", "Comores", "Congo", "Rdc", "Cote d'Ivoire", "Djibouti", "France", "Gabon", "Guadeloupe", "Haîti", "Luxembourg", "Madagascar", "Mali", "Martinique", "Monaco", "Niger", "Calédonie", "Polynésie", "Rwanda", "Sénégal", "Seychelles", "Suisse", "Togo", "Wallis et Futuna"]
    const pays = callbackData.split(":")[1]
    const index = liste_pays_francophones.indexOf(pays)
    PF[index].forEach((element, i) => {
      ctx.reply(`${index + 1}. ${pays}\n
        ${element}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Retour", callback_data: "pays francophones" }]
          ]
        }
      });
    })
  }

  // Traitez les différentes valeurs de callbackData en fonction de vos besoins
  if (callbackData === "langue") {
    // Gérer l'action du bouton "Langues"
    ctx.reply("Choisissez une option", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Continents", callback_data: "continent" }, { text: "Pays Francophones", callback_data: "pays francophones" }],
          //[{ text: "Amérique", callback_data: "continent" },{ text: "Asie", callback_data: "continent" }],
          [{ text: "Retour", callback_data: "menu" }]
        ]
      }
    });
  }
  else if (callbackData === "menu") {
    ctx.reply("🦅BIENVENUE SUR PKP RNE🌍", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Francophone 🇫🇷", callback_data: "langue" }, { text: "Anglophone 🏴󠁧󠁢󠁥󠁮󠁧󠁿", callback_data: "langue" }],
          [{ text: "Hispanohablante 🇪🇦", callback_data: "langue" }, { text: "Lusofonos 🇵🇹", callback_data: "langue" }],
          //[{text:"QUITTER", callback_data: "QUITTER"}]
        ]
      }
    });
  }
  else if (callbackData == "continent") {
    ctx.reply("Choisissez une option", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "1. Afrique", callback_data: "lien_continent:Afrique" }, { text: "2. Europe", callback_data: "lien_continent:Europe" }],
          [{ text: "3. Amérique du nord/sud", callback_data: "lien_continent:Amerique" }, { text: "4. Asie", callback_data: "lien_continent:Asie" }],
          [{ text: "5. Antartique", callback_data: "lien_continent:Antartique" }, { text: "6. Océanie", callback_data: "lien_continent:Océanie" }],
          [{ text: "Retour", callback_data: "langue" }]
        ]
      }
    });
  }

  else if (callbackData == "pays francophones") {
    ctx.reply("Les pays francophones 🇫🇷", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "1. Bénin", callback_data: "PF:Benin" }, { text: "2. Belgique", callback_data: "PF:Belgique" }],
          [{ text: "3. Burkina Faso", callback_data: "PF:Burkina" }, { text: "4. Burundi", callback_data: "PF:Burundi" }],
          [{ text: "5. Cameroun", callback_data: "PF:Cameroun" }, { text: "6. Canada", callback_data: "PF:Canada" }],
          [{ text: "7. Comores", callback_data: "PF:Comores" }, { text: "8. Congo-Brazzaville (République du Congo)", callback_data: "PF:Congo" }],
          [{ text: "9. Congo-Kinshasa (République démocratique du Congo)", callback_data: "PF:Rdc" }, { text: "10. Côte d'Ivoire", callback_data: "PF:Cote d'Ivoire" }],
          [{ text: "11. Djibouti", callback_data: "PF:Djibouti" }, { text: "12. France", callback_data: "PF:France" }],
          [{ text: "13. Gabon", callback_data: "PF:Gabon" }, { text: "14. Guadeloupe (région d'outre-mer de la France)", callback_data: "PF:Guadeloupe" }],
          [{ text: "15. Haîti", callback_data: "PF:Haîti" }, { text: "16. Luxembourg", callback_data: "PF:Luxembourg" }],
          [{ text: "17. Madagascar", callback_data: "PF:Madagascar" }, { text: "18. Mali", callback_data: "PF:Mali" }],
          [{ text: "19. Martinique (région d'outre-mer de la France)", callback_data: "PF:Martinique" }, { text: "20. Monaco", callback_data: "PF:Monaco" }],
          [{ text: "21. Niger", callback_data: "PF:Niger" }, { text: "22. Nouvelle-Calédonie (région d'outre-mer de la France)", callback_data: "PF:Calédonie" }],
          [{ text: "23. Polynésie française (région d'outre-mer de la France)", callback_data: "PF:Polynésie" }, { text: "24. Rwanda", callback_data: "PF:Rwanda" }],
          [{ text: "25. Sénégal", callback_data: "PF:Sénégal" }, { text: "26. Seychelles", callback_data: "PF:Seychelles" }],
          [{ text: "27. Suisse", callback_data: "PF:Suisse" }, { text: "28. Togo", callback_data: "PF:Togo" }],
          [{ text: "29. Wallis et Futuna (région d'outre-mer de la France)", callback_data: "PF:Wallis et Futuna" }],
          [{ text: "Retour", callback_data: "langue" }]
        ]
      }
    });
  }

  else if (callbackData == "afrique") {

  }


  else if (callbackData === "aides") {
    // Gérer l'action du bouton "Aides"
  } else if (callbackData === "recherche") {
    // Gérer l'action du bouton "Recherche"
  }

});


bot.launch();

const LIENS_CONTINENTS = [

  //AFRIQUE
  `
1.1 https://www.facebook.com/groups/1484720455134038/
1.2 https://www.facebook.com/groups/470713840331/
1.3 https://www.facebook.com/groups/325611895901672/
1.4 https://www.facebook.com/groups/africainsdefrance/
1.5 https://www.facebook.com/groups/1636255639953941/
1.6 https://www.facebook.com/groups/burkina2015/
1.7 https://www.facebook.com/groups/lajeunesseafricainedaujourdhui/
1.8 https://www.facebook.com/groups/761824107211744/
1.9 https://www.facebook.com/groups/alphablondy30ans/
1.10 https://www.facebook.com/groups/581316375342371/
1.11 https://www.facebook.com/groups/923279308023891/
1.12 https://www.facebook.com/groups/473512369895138/
1.13 https://www.facebook.com/groups/841879096310309/
1.14 https://www.facebook.com/groups/awa.gueye.3975/
1.15 https://www.facebook.com/groups/516591652103741/
1.16 https://www.facebook.com/groups/305077060233603/
1.17 https://www.facebook.com/groups/1344870302920978/
1.18 https://www.facebook.com/groups/jadorelacuisineafricaine.jaipasunemeilleu/
1.19 https://www.facebook.com/groups/640911907727288/
1.20 https://www.facebook.com/groups/403183196933093/
1.21 https://www.facebook.com/groups/233371411847843/
1.22 https://www.facebook.com/groups/571894844871121/
1.23 https://www.facebook.com/groups/203487110530330/
1.24 https://www.facebook.com/groups/2810026952655422/
1.25 https://www.facebook.com/groups/442784229929272/
1.26 https://www.facebook.com/groups/1355332437933485/
1.27 https://www.facebook.com/groups/2374995242757655/
1.28 https://www.facebook.com/groups/325296558108382/
1.29 https://www.facebook.com/groups/1012897762127101/
1.30 https://www.facebook.com/groups/546075009333314/
1.31 https://www.facebook.com/groups/168359318816645/
1.32 https://www.facebook.com/groups/251987678516651/
1.33 https://www.facebook.com/groups/973920189762711/
1.34 https://www.facebook.com/groups/205476009552286/
1.35 https://www.facebook.com/groups/3887184978062718/
1.36 https://www.facebook.com/groups/426619500717580/
1.37 https://www.facebook.com/groups/374761301163487/
1.38 https://www.facebook.com/groups/1901906896518736/
1.39 https://www.facebook.com/groups/1819734488418586/
1.40 https://www.facebook.com/groups/143714316312000/
1.41 https://www.facebook.com/groups/1300052023531579/
1.42 https://www.facebook.com/groups/2221335917969424/
1.43 https://www.facebook.com/groups/172872183356456/
1.44 https://www.facebook.com/groups/373459089493184/
1.45 https://www.facebook.com/groups/2959596041022947/
1.46 https://www.facebook.com/groups/1900965146761949/
1.47 https://www.facebook.com/groups/558510515068551/
1.48 https://www.facebook.com/groups/1486076028212635/
1.49 https://www.facebook.com/groups/1158220641346060/
1.50 https://www.facebook.com/groups/1108627305864074/
1.51 https://www.facebook.com/groups/773818502738021/
1.52 https://www.facebook.com/groups/coiffureafricaine/
1.53 https://www.facebook.com/groups/digitalcommunitygroup/
1.54 https://www.facebook.com/groups/legroupefacebookwhatsappamitiamourfra/
1.55 https://www.facebook.com/groups/165375660683574/
1.56 https://www.facebook.com/groups/237455143345902/
1.57 https://www.facebook.com/groups/884370691677513/
1.58 https://www.facebook.com/groups/destockantiquedesign/
1.59 https://www.facebook.com/groups/601271146693623/
1.60 https://www.facebook.com/groups/1698291773809053/
1.61 https://www.facebook.com/groups/442431372541122/
1.62 https://www.facebook.com/groups/afriqsolidariteemploiformat/
1.63 https://www.facebook.com/groups/562636791082705/
1.64 https://www.facebook.com/groups/1027590327604244/
1.65 https://www.facebook.com/groups/2788298878100832/
1.66 https://www.facebook.com/groups/386386361534688/
1.67 https://www.facebook.com/groups/405364750239500/
1.68 https://www.facebook.com/groups/279434073057124/
1.69 https://www.facebook.com/groups/CLUBLEDEBATPANAFRICAIN
1.68 https://www.facebook.com/groups/279434073057124/
1.69 https://www.facebook.com/groups/CLUBLEDEBATPANAFRICAIN/
1.70 https://www.facebook.com/groups/histoiredelafrique/
`,

  //EUROPE
  `
2.1 https://www.facebook.com/groups/1646280389077334/

2.2 https://www.facebook.com/groups/42755481346/

2.3 https://www.facebook.com/groups/863440824872278/

2.4 https://www.facebook.com/groups/sitederencontreentreeuropeenmalgacheafri/

2.5 https://www.facebook.com/groups/365383673604121/

2.6 https://www.facebook.com/groups/388129851531192/

2.7 https://www.facebook.com/groups/405620766251349/

2.8 https://www.facebook.com/groups/2169067223105560/

2.9 https://www.facebook.com/groups/anciensnancy/

2.10 https://www.facebook.com/groups/1411688822577478/

2.11 https://www.facebook.com/groups/grouperencontreamoureuxpourmariagefrancomalg/

2.12 https://www.facebook.com/groups/1006659439885759/

2.13 https://www.facebook.com/groups/11527822946/

2.14 https://www.facebook.com/groups/euroschools/

2.15 https://www.facebook.com/groups/720963979686992/

2.16 https://www.facebook.com/groups/1293234027397712/

2.17 https://www.facebook.com/groups/3902816226397642/

2.18 https://www.facebook.com/groups/711346715658061/

2.19 https://www.facebook.com/groups/398516014712267/

2.20 https://www.facebook.com/groups/1713685978641564/

2.21 https://www.facebook.com/groups/1726782087467122/

2.22 https://www.facebook.com/groups/1711863079068212/

2.23 https://www.facebook.com/groups/killenmanzano/

2.24 https://www.facebook.com/groups/3699295430120804/

2.25 https://www.facebook.com/groups/ecologiecentraleurope/

2.26 https://www.facebook.com/groups/491869575357626/

2.27 https://www.facebook.com/groups/wydadclub1937/

2.28 https://www.facebook.com/groups/2920930064674828/

2.29 https://www.facebook.com/groups/823321061334925/

2.30 https://www.facebook.com/groups/1390395861321736/

2.31 https://www.facebook.com/groups/1001381246734882/

2.32 https://www.facebook.com/groups/138130263003030/

2.33 https://www.facebook.com/groups/1706153512964342/

2.34 https://www.facebook.com/groups/1675608739191481/

2.35 https://www.facebook.com/groups/835696589801497/

2.36 https://www.facebook.com/groups/2055782921411635/

2.37 https://www.facebook.com/groups/3935880446440625/

2.38 https://www.facebook.com/groups/poureuropefederale/

2.39 https://www.facebook.com/groups/1180878078970897/
`,

  //AMERIQUE
  `
3.1 https://www.facebook.com/groups/nordamerique/

3.2 https://www.facebook.com/groups/178513668858395/

3.3 https://www.facebook.com/groups/1012702942595011/

3.4 https://www.facebook.com/groups/599178664593674/

3.5 https://www.facebook.com/groups/180130813984622/

3.6 https://www.facebook.com/groups/1609783836002231/

3.7 https://www.facebook.com/groups/vieamerique/

3.8 https://www.facebook.com/groups/753482398410689/

3.9 https://www.facebook.com/groups/592983152674256/

3.10 https://www.facebook.com/groups/bpvoa/

3.11 https://www.facebook.com/groups/702605217222609/

3.12 https://www.facebook.com/groups/destinationouestamericain/

3.13 https://www.facebook.com/groups/508631704043366/

3.14 https://www.facebook.com/groups/410795955751189/

3.15 https://www.facebook.com/groups/3428077857469175/

3.16 https://www.facebook.com/groups/234487623593737/

3.17 https://www.facebook.com/groups/50032510784/

3.18 https://www.facebook.com/groups/347568798982139/

3.19 https://www.facebook.com/groups/552212082284331/

3.20 https://www.facebook.com/groups/9226671594071147/

3.21 https://www.facebook.com/groups/ufelosangeles/

3.22 https://www.facebook.com/groups/802421289851368/

3.23 https://www.facebook.com/groups/1225080204932183/

3.24 https://www.facebook.com/groups/577648996080491/

3.25 https://www.facebook.com/groups/1419019164949542/

3.26 https://www.facebook.com/groups/VoyagesresponsablesAmeriqueLatine/

3.27 https://www.facebook.com/groups/415751859253781/

3.28 https://www.facebook.com/groups/295874311952118/

3.29 https://www.facebook.com/groups/998081154076373/

3.30 https://www.facebook.com/groups/1388707724512352/

3.31 https://www.facebook.com/groups/303660174090090/

3.32 https://www.facebook.com/groups/AmnestyAmeriqueLatine/

3.33 https://www.facebook.com/groups/998081154076373/

3.34 https://www.facebook.com/groups/1898706687038135/

3.35 https://www.facebook.com/groups/1419019164949542/
`,

  //ASIE
  `
4.1 https://www.facebook.com/groups/Francophonesenasie/

4.2 https://www.facebook.com/groups/616234962485472/

4.3 https://www.facebook.com/groups/564126381443604/

4.4 https://www.facebook.com/groups/1720069318056456/

4.5 https://www.facebook.com/groups/1012702942595011/

4.6 https://www.facebook.com/groups/asiatiquepower/

4.7 https://www.facebook.com/groups/francaisdasie/

4.8 https://www.facebook.com/groups/1923352857887322/

4.9 https://www.facebook.com/groups/cuisineasie/

4.10 https://www.facebook.com/groups/auditorium.guimet/

4.11 https://www.facebook.com/groups/314403600621638/

4.12 https://www.facebook.com/groups/222495857936222/

4.13 https://www.facebook.com/groups/676015866372204/

4.14 https://www.facebook.com/groups/1734787540199831/

4.15 https://www.facebook.com/groups/adopteunasiatique/

4.16 https://www.facebook.com/groups/union.asiatiques.france/

4.17 https://www.facebook.com/groups/550146229204634/

4.18 https://www.facebook.com/groups/cuisine.vegan.asiatique/

4.19 https://www.facebook.com/groups/1936800543256569/

4.20 https://www.facebook.com/groups/femme.asiatique/

4.21 https://www.facebook.com/groups/amsea.bzh/

4.22 https://www.facebook.com/groups/cuisine.asiatique.recettes.faciles/

4.23 https://www.facebook.com/groups/3402344306526314/

4.24 https://www.facebook.com/groups/426647637524566/

4.25 https://www.facebook.com/groups/1042773109134961/
`,

  //ANTARTIQUE
  `
5.1 https://www.facebook.com/groups/165720260507964/
5.2 https://www.facebook.com/groups/129347383835985/
`,

  //OCEANIE
  `
6.1 https://www.facebook.com/groups/1012702942595011/

6.2 https://www.facebook.com/groups/565907891366016/

6.3 https://www.facebook.com/groups/UFFONC/

6.4 https://www.facebook.com/groups/741396911002428/

6.5 https://www.facebook.com/groups/232604662992980/

6.6 https://www.facebook.com/groups/411644176343987/

6.7 https://www.facebook.com/groups/126505108047779/

6.8 https://www.facebook.com/groups/259222880804572/

6.9 https://www.facebook.com/groups/283713813508033/
`
];

const PF = [
  //Benin
  [
    `
    1.1 https://www.facebook.com/groups/598358983976435/
    
    1.2 https://www.facebook.com/groups/2404882269616269/
    
    1.3 https://www.facebook.com/groups/175337226705986/
    
    1.4 https://www.facebook.com/groups/lebenindedemain/
    
    1.5 https://www.facebook.com/groups/462655477202834/
    
    1.6 https://www.facebook.com/groups/cavenirbenin/
    
    1.7 https://www.facebook.com/groups/1230160210345882/

    1.8 https://www.facebook.com/groups/183934062023866/

    1.9 https://www.facebook.com/groups/allezlesguepards/

    1.10 https://www.facebook.com/groups/1259198528332623/

    1.11 https://www.facebook.com/groups/1722437214640288/
    
    1.12 https://www.facebook.com/groups/1202622653539109/
    
    1.13 https://www.facebook.com/groups/316511755659107/
    
    1.14 https://www.facebook.com/groups/1507907589447606/
    
    1.15 https://www.facebook.com/groups/271653762847601/
    
    1.16 https://www.facebook.com/groups/773926386784830/
    
    1.17 https://www.facebook.com/groups/502627094051980/
    
    1.18 https://www.facebook.com/groups/188109168271382/
    
    1.19 https://www.facebook.com/groups/385608041925528/
    
    1.20 https://www.facebook.com/groups/288141128779660/
    
    1.21 https://www.facebook.com/groups/995322850506819/
    
    1.22 https://www.facebook.com/groups/159821312827905/
    
    1.23 https://www.facebook.com/groups/321511471829942/
    
    1.24 https://www.facebook.com/groups/508070869311507/
    
    1.25 https://www.facebook.com/groups/1806851229543336/
    
    1.26 https://www.facebook.com/groups/1555726601391694/
    
    1.27 https://www.facebook.com/groups/1854932018012412/
    
    1.28 https://www.facebook.com/groups/973963950171227/
    
    1.29 https://www.facebook.com/groups/3149365582011575/
    
    1.30 https://www.facebook.com/groups/1048490055787130/
    
    1.31 https://www.facebook.com/groups/626652607395847/
    
    1.32 https://www.facebook.com/groups/332322564723325
    
    1.33 https://www.facebook.com/groups/942553042616152/
    
    1.34 https://www.facebook.com/groups/laurea2011/
    
    1.35 https://www.facebook.com/groups/1149485645754316/
    
    1.36 https://www.facebook.com/groups/564929333561594/
    
    1.37 https://www.facebook.com/groups/1296586004188317/
    
    1.38 https://www.facebook.com/groups/766148710245141/
    
    1.39 https://www.facebook.com/groups/965637147612742/
    
    1.40 https://www.facebook.com/groups/415583699891300/
`
  ],

  //Belgique
  [
    `
    2.1 https://www.facebook.com/groups/836881490429441/

    2.2 https://www.facebook.com/groups/87279245288/

    2.3 https://www.facebook.com/groups/1423877401118265/

    2.4 https://www.facebook.com/groups/122268605062785/

    2.5 https://www.facebook.com/groups/126040200788076/

    2.6 https://www.facebook.com/groups/344615987103207/

    2.7 https://www.facebook.com/groups/407962505897960/

    2.8 https://www.facebook.com/groups/belgiqueetudes/

    2.9 https://www.facebook.com/groups/269567066815775/

    2.10 https://www.facebook.com/groups/1271592032933292/

    2.11 https://www.facebook.com/groups/entraidedesetudiantsdebelgique/

    2.12 https://www.facebook.com/groups/303727371677261/

    2.13 https://www.facebook.com/groups/1697625273897859/

    2.14 https://www.facebook.com/groups/523287581166333/

    2.15 https://www.facebook.com/groups/273705573151803/

    2.16 https://www.facebook.com/groups/521200424974225/

    2.17 https://www.facebook.com/groups/692285244764616/

    2.18 https://www.facebook.com/groups/Annoncesbelg/

    2.19 https://www.facebook.com/groups/702019417193337/

    2.20 https://www.facebook.com/groups/emplois.belgique/

    2.21 https://www.facebook.com/groups/285863354758252/

    2.22 https://www.facebook.com/groups/768307339849249/

    2.23 https://www.facebook.com/groups/1042258892524344/

    2.24 https://www.facebook.com/groups/464281393926301/

    2.25 https://www.facebook.com/groups/722751708385253/

    2.26 https://www.facebook.com/groups/262628518441357/

    2.27 https://www.facebook.com/groups/XXBELGIQUEVENTESDETOUTXX/

    2.28 https://www.facebook.com/groups/cobefa/

    2.29 https://www.facebook.com/groups/1291993277553946/
    `
  ],

  //Burkina
  [
    `
    3.1 https://www.facebook.com/groups/150143622286526/

    3.2 https://www.facebook.com/groups/329013221624059/

    3.3 https://www.facebook.com/groups/1189025681840512/

    3.4 https://www.facebook.com/groups/212013485507087/

    3.5 https://www.facebook.com/groups/1746340032058197/

    3.6 https://www.facebook.com/groups/1799298147006943/

    3.7 https://www.facebook.com/groups/349405262769876/

    3.8 https://www.facebook.com/groups/431913541631412/

    3.9 https://www.facebook.com/groups/1643044552611184/

    3.10 https://www.facebook.com/groups/1469992956777472/

    3.11 https://www.facebook.com/groups/489828348024778/

    3.12 https://www.facebook.com/groups/1592588334369938/
    `
  ],

  //Burundi
  [

    `
    4.1 https://www.facebook.com/groups/195110799035077/

    4.2 https://www.facebook.com/groups/400311881233941/

    4.3 https://www.facebook.com/groups/687375501320979/

    4.4 https://www.facebook.com/groups/798604083585129/

    4.5 https://www.facebook.com/groups/313579903431889/

    4.6 https://www.facebook.com/groups/727050077953704/

    4.7 https://www.facebook.com/groups/820844861353806/

    4.8 https://www.facebook.com/groups/376579065880215/

    4.9 https://www.facebook.com/groups/614517015250571/

    4.10 https://www.facebook.com/groups/500871624884152/
    `
  ],

  //Cameroun
  [
    `
    5.1 https://www.facebook.com/groups/cameroes/

    5.2 https://www.facebook.com/groups/700966170018252/

    5.3 https://www.facebook.com/groups/ventespriveesetbraderiesaucameroun/

    5.4 https://www.facebook.com/groups/1270496113536829/

    5.5 https://www.facebook.com/groups/365022920496615/

    5.6 https://www.facebook.com/groups/368510743569254/

    5.7 https://www.facebook.com/groups/335904140307626/

    5.8 https://www.facebook.com/groups/lesamisducameroun/

    5.9 https://www.facebook.com/groups/255252368152994/

    5.10 https://www.facebook.com/groups/173108744554632/

    5.11 https://www.facebook.com/groups/1483302625302058/

    5.12 https://www.facebook.com/groups/400087756823977/

    5.13 https://www.facebook.com/groups/1471862506458558/

    5.14 https://www.facebook.com/groups/lesmusiquesducameroun/

    5.15 https://www.facebook.com/groups/1900483433553704/

    5.16 https://www.facebook.com/groups/292234317550048/

    5.17 https://www.facebook.com/groups/1053982534660840/

    5.18 https://www.facebook.com/groups/musiquesducameroun/

    5.19 https://www.facebook.com/groups/1662020677167549/

    5.20 https://www.facebook.com/groups/1508474742779565/

    5.21 https://www.facebook.com/groups/eleveursducameroun.net/

    5.22 https://www.facebook.com/groups/jaimelecameroun/

    5.23 https://www.facebook.com/groups/1798445787112765/

    5.24 https://www.facebook.com/groups/322191684811142/

    5.25 https://www.facebook.com/groups/203875833733244/

    5.26 https://www.facebook.com/groups/2095704480643164/

    5.27 https://www.facebook.com/groups/1770131929896329/

    5.28 https://www.facebook.com/groups/491779901223503/

    5.29 https://www.facebook.com/groups/1776200555884605/

    5.30 https://www.facebook.com/groups/305152843410732/

    5.31 https://www.facebook.com/groups/422215331553535/

    5.32 https://www.facebook.com/groups/190198723046208/

    5.33 https://www.facebook.com/groups/335253926858747/
    `
  ],

  //Canada
  [
    `
    6.1 https://www.facebook.com/groups/501446189984094/

    6.2 https://www.facebook.com/groups/2866895476938487/

    6.3 https://www.facebook.com/groups/ImmigrerCanada/

    6.4 https://www.facebook.com/groups/189897276674354/

    6.5 https://www.facebook.com/groups/emploisaucanada/

    6.6 https://www.facebook.com/groups/878169752925079/

    6.7 https://www.facebook.com/groups/TunisiensauCanada/

    6.8 https://www.facebook.com/groups/348889382553669/

    6.9 https://www.facebook.com/groups/5299249310168331/

    6.10 https://www.facebook.com/groups/chercheunjobcanada/

    6.11 https://www.facebook.com/groups/217832043712192/

    6.12 https://www.facebook.com/groups/428489501583497/

    6.13 https://www.facebook.com/groups/659546785311012/

    6.14 https://www.facebook.com/groups/100570700382018/

    6.15 https://www.facebook.com/groups/645894817224732/

    6.16 https://www.facebook.com/groups/228146011235369/

    6.17 https://www.facebook.com/groups/permisdetudesaucanada/

    6.18 https://www.facebook.com/groups/416607856689914/

    6.19 https://www.facebook.com/groups/groupe.canada.france/

    6.20 https://www.facebook.com/groups/1093647194631914/

    6.21 https://www.facebook.com/groups/354540429890383/

    6.22 https://www.facebook.com/groups/378805947740972/

    6.23 https://www.facebook.com/groups/486533560116368/

    6.24 https://www.facebook.com/groups/482270702585887/

    6.25 https://www.facebook.com/groups/273290456084457/

    6.26 https://www.facebook.com/groups/166425205258756/
    `
  ],

  //Comores
  [
    `
    7.1 https://www.facebook.com/groups/822395291923956/

    7.2 https://www.facebook.com/groups/442638013700723/

    7.3 https://www.facebook.com/groups/190227248951453/

    7.4 https://www.facebook.com/groups/723919728650513/

    7.5 https://www.facebook.com/groups/COMORE/

    7.6 https://www.facebook.com/groups/330873162282518/

    7.7 https://www.facebook.com/groups/333209504861702/

    7.8 https://www.facebook.com/groups/139576436875168/

    7.9 https://www.facebook.com/groups/310048790054783/

    7.10 https://www.facebook.com/groups/304838506200262/

    7.11 https://www.facebook.com/groups/ComexpatComores/

    7.12 https://www.facebook.com/groups/637429897256577/

    7.13 https://www.facebook.com/groups/volovolo/

    7.14 https://www.facebook.com/groups/674597616628729/

    7.15 https://www.facebook.com/groups/897715500907257/

    7.16 https://www.facebook.com/groups/345095873217835/

    7.17 https://www.facebook.com/groups/969741976556445/

    7.18 https://www.facebook.com/groups/278060766949296/

    7.19 https://www.facebook.com/groups/358442260868891/

    7.20 https://www.facebook.com/groups/256339822183341/

    7.21 https://www.facebook.com/groups/3003994033246057/

    7.22 https://www.facebook.com/groups/202954143801646/

    7.23 https://www.facebook.com/groups/1632412376772531/

    7.24 https://www.facebook.com/groups/1632412376772531/

    7.25 https://www.facebook.com/groups/278060766949296/

    7.26 https://www.facebook.com/groups/202954143801646/

    7.27 https://www.facebook.com/groups/245407505513076/

    7.28 https://www.facebook.com/groups/256129265581269/

    7.29 https://www.facebook.com/groups/100913840070530/

    7.30 https://www.facebook.com/groups/952982455561122/

    7.31 https://www.facebook.com/groups/comores.United/

    7.32 https://www.facebook.com/groups/2956009741321371/

    7.33 https://www.facebook.com/groups/869509713059920/

    7.34 https://www.facebook.com/groups/1636720699974730/

    7.35 https://www.facebook.com/groups/268711083302757/

    7.36 https://www.facebook.com/groups/1837492959877081/

    7.37 https://www.facebook.com/groups/852018908176402/

    7.38 https://www.facebook.com/groups/576912279624231/

    7.39 https://www.facebook.com/groups/azaliassoumani/

    7.40 https://www.facebook.com/groups/666924986661348/

    7.41 https://www.facebook.com/groups/191900401460722/

    7.42 https://www.facebook.com/groups/338250187184799/

    7.43 https://www.facebook.com/groups/1040517492822283/

    7.44 https://www.facebook.com/groups/434262686767229/

    7.45 https://www.facebook.com/groups/1650165671780777/

    7.46 https://www.facebook.com/groups/1745681999068200/

    7.47 https://www.facebook.com/groups/137969391508962/

    7.48 https://www.facebook.com/groups/comoresgroup/

    7.49 https://www.facebook.com/groups/hazikom/
    
    7.50 https://www.facebook.com/groups/comoresactualites/
    `
  ],

  //Congo
  [
    `
    8.1 https://www.facebook.com/groups/1590327104538084/

    8.2 https://www.facebook.com/groups/1120254008639705/

    8.3 https://www.facebook.com/groups/477709736064461/

    8.4 https://www.facebook.com/groups/1180888619043663/

    8.5 https://www.facebook.com/groups/1391021101085204/

    8.6 https://www.facebook.com/groups/728539200665290/

    8.7 https://www.facebook.com/groups/4254071747978089/

    8.8 https://www.facebook.com/groups/959815667480291/

    8.9 https://www.facebook.com/groups/1633850093352450/

    8.10 https://www.facebook.com/groups/246357438897039/

    8.11 https://www.facebook.com/groups/791491690986390/

    8.12 https://www.facebook.com/groups/444700083510155/

    8.13 https://www.facebook.com/groups/1771950276228488/

    8.14 https://www.facebook.com/groups/760830058220029/

    8.15 https://www.facebook.com/groups/541650082635970/

    8.16 https://www.facebook.com/groups/463641694730569/

    8.17 https://www.facebook.com/groups/1858368241053740/

    8.18 https://www.facebook.com/groups/1490889834428590/

    8.19 https://www.facebook.com/groups/849362608494050/

    8.20 https://www.facebook.com/groups/2457412054536048/

    8.21 https://www.facebook.com/groups/668617321320031/

    8.22 https://www.facebook.com/groups/326261638347249/

    8.23 https://www.facebook.com/groups/774572145906800/

    8.24 https://www.facebook.com/groups/622960875802472/

    8.25 https://www.facebook.com/groups/327737965724510/

    8.26 https://www.facebook.com/groups/1563103457280272/

    8.27 https://www.facebook.com/groups/1655174724717582/

    8.28 https://www.facebook.com/groups/1656419957956492/

    8.29 https://www.facebook.com/groups/2512326015596366/

    8.30 https://www.facebook.com/groups/931382553931998/

    8.31 https://www.facebook.com/groups/449724021825483/

    8.32 https://www.facebook.com/groups/1847927048616573/

    8.33 https://www.facebook.com/groups/876728113089880/

    8.34 https://www.facebook.com/groups/1781466088823862/
    `
  ],

  //RDC
  [
    `
   9.1 https://www.facebook.com/groups/1734174633645657/

   9.2 https://www.facebook.com/groups/279957104097946/

   9.3 https://www.facebook.com/groups/143967999473044/

   9.4 https://www.facebook.com/groups/741398412999638/

   9.5 https://www.facebook.com/groups/478034292407057/

   9.6 https://www.facebook.com/groups/741398412999638/

   9.7 https://www.facebook.com/groups/375598999969658/

   9.8 https://www.facebook.com/groups/192329787464107/

   9.9 https://www.facebook.com/groups/590641572583994/

   9.10 https://www.facebook.com/groups/546926813438540/

   9.11 https://www.facebook.com/groups/1130907401129276/

   9.12 https://www.facebook.com/groups/231517401337159/

   9.13 https://www.facebook.com/groups/495235454792570/

   9.14 https://www.facebook.com/groups/143967999473044/

   9.15 https://www.facebook.com/groups/1734174633645657/

   9.16 https://www.facebook.com/groups/564103981355345/

   9.17 https://www.facebook.com/groups/611790219564454/

   9.18 https://www.facebook.com/groups/2932337986980828/

   9.19 https://www.facebook.com/groups/470500843733709/

   9.20 https://www.facebook.com/groups/846161162183721/

   9.21 https://www.facebook.com/groups/897780867757995/

   9.22 https://www.facebook.com/groups/229842537057623/

   9.23 https://www.facebook.com/groups/713615519627148/

   9.24 https://www.facebook.com/groups/1113564192808777/

   9.25 https://www.facebook.com/groups/920970141738962/

   9.26 https://www.facebook.com/groups/830852723627873/

   9.27 https://www.facebook.com/groups/1656419957956492/

   9.28 https://www.facebook.com/groups/279957104097946/

   9.29 https://www.facebook.com/groups/478034292407057/

   9.30 https://www.facebook.com/groups/129195247423454/

   9.31 https://www.facebook.com/groups/375598999969658/

   9.32 https://www.facebook.com/groups/784458831919720/

   9.33 https://www.facebook.com/groups/375598999969658/

   9.34 https://www.facebook.com/groups/2282448445414609/

   9.35 https://www.facebook.com/groups/1847927048616573/

   9.36 https://www.facebook.com/groups/1023372218061116/

   9.37 https://www.facebook.com/groups/457059631562048/

   9.38 https://www.facebook.com/groups/158730598167462/

   9.39 https://www.facebook.com/groups/8299126100/

   9.40 https://www.facebook.com/groups/2040664786216393/

   9.41 https://www.facebook.com/groups/1205265463004057/

   9.42 https://www.facebook.com/groups/belleepoquesducongo/

   9.43 https://www.facebook.com/groups/2880599315571385/

   9.44 https://www.facebook.com/groups/673902253072885/

   9.45 https://www.facebook.com/groups/192329787464107/
   `
  ],

  //Cote d'Ivoire
  [
    `
    10.1 https://www.facebook.com/groups/252621096060662/

    10.2 https://www.facebook.com/groups/1472549686536491/

    10.3 https://www.facebook.com/groups/825579868557117/

    10.4 https://www.facebook.com/groups/190785784288352/

    10.5 https://www.facebook.com/groups/189029913378353/

    10.6 https://www.facebook.com/groups/935427360304754/

    10.7 https://www.facebook.com/groups/2362803670531580/

    10.8 https://www.facebook.com/groups/312065139487695/

    10.9 https://www.facebook.com/groups/551027553815635/

    10.10 https://www.facebook.com/groups/92009575727/

    10.11 https://www.facebook.com/groups/158363190893058/

    10.12 https://www.facebook.com/groups/2600594040228191/

    10.13 https://www.facebook.com/groups/cancotedivoire2023/

    10.14 https://www.facebook.com/groups/3070936139788385/

    10.15 https://www.facebook.com/groups/1260352944916917/

    10.16 https://www.facebook.com/groups/2717897475099994/

    10.17 https://www.facebook.com/groups/coupedafriquedesnations/

    10.18 https://www.facebook.com/groups/mlmcotedivoire/

    10.19 https://www.facebook.com/groups/macotedivoirejtm/

    10.20 https://www.facebook.com/groups/407149516871093/

    10.21 https://www.facebook.com/groups/betcliccivofficiel/

    10.22 https://www.facebook.com/groups/2376997602508573/

    10.23 https://www.facebook.com/groups/331849385438152/

    10.24 https://www.facebook.com/groups/523857718234230/

    10.25 https://www.facebook.com/groups/3140213236202533/

    10.26 https://www.facebook.com/groups/368652234607819/

    10.27 https://www.facebook.com/groups/339273683319402/

    10.28 https://www.facebook.com/groups/1471578759988399/

    10.29 https://www.facebook.com/groups/3096311400601186/

    10.30 https://www.facebook.com/groups/2817916655010764/

    10.31 https://www.facebook.com/groups/1109627353156761/

    10.32 https://www.facebook.com/groups/915042059588975/

    10.33 https://www.facebook.com/groups/730844424363622/

    10.34 https://www.facebook.com/groups/1454021571633320/

    10.35 https://www.facebook.com/groups/510710440553509/

    10.36 https://www.facebook.com/groups/256203645289974/

    10.37 https://www.facebook.com/groups/215304849598440/

    10.38 https://www.facebook.com/groups/268197114243909/

    10.39 https://www.facebook.com/groups/2166173230214545/

    10.40 https://www.facebook.com/groups/882166522265896/

    10.41 https://www.facebook.com/groups/412234600608852/

    10.42 https://www.facebook.com/groups/339690537746577/

    10.43 https://www.facebook.com/groups/444587226833067/

    10.44 https://www.facebook.com/groups/1926654974047749/

    10.45 https://www.facebook.com/groups/501529176901200/

    10.46 https://www.facebook.com/groups/3132640816779649/

    10.47 https://www.facebook.com/groups/669191298066385/

    10.48 https://www.facebook.com/groups/3190944847587900/

    10.49 https://www.facebook.com/groups/1167508987235984/

    10.50 https://www.facebook.com/groups/432752655279901/

    10.51 https://www.facebook.com/groups/1013096865987760/

    10.52 https://www.facebook.com/groups/1836259733304703/

    10.53 https://www.facebook.com/groups/337837626941775/

    10.54 https://www.facebook.com/groups/157514637390698/

    10.55 https://www.facebook.com/groups/325017645006763/

    10.56 https://www.facebook.com/groups/marcheporc/

    10.57 https://www.facebook.com/groups/124742863909802/

    10.58 https://www.facebook.com/groups/588879742742205/

    10.59 https://www.facebook.com/groups/3763019387082410/

    10.60 https://www.facebook.com/groups/1074534239619340/
    `,
    `
    10.61 https://www.facebook.com/groups/1611074815922599/

    10.62 https://www.facebook.com/groups/236160718865509/

    10.63 https://www.facebook.com/groups/1578655842212375/

    10.64 https://www.facebook.com/groups/537057931881925/

    10.65 https://www.facebook.com/groups/387202013546534/

    10.66 https://www.facebook.com/groups/1230257007683321/

    10.67 https://www.facebook.com/groups/3371220892907166/

    10.68 https://www.facebook.com/groups/92009575727/

    10.69 https://www.facebook.com/groups/1905924139636739/

    10.70 https://www.facebook.com/groups/1257939874996720/

    10.71 https://www.facebook.com/groups/114548169236304/

    10.72 https://www.facebook.com/groups/1529774713771807/
    10.73 https://www.facebook.com/groups/2231143363827911/

    10.74 https://www.facebook.com/groups/1034812187318392/
    `
  ]
];



    return {
        statusCode : 200,
        body : JSON.stringify({
            name : "rne-bot"
        })
    }
}