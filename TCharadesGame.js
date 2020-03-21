var isConnected = false;
var connectedChannel = ""

var display_ChosenWord = "--Game Has Not Started--";
var chosenWord = "";
var image_ChosenWord = "";
var wordFound = false;
var intervalTimer = null;
var gameFailed;
var list_of_categories = [];
var random_word_list_keys = [];
var word_obj_concat = {};
var word_cur_index = 0;
var timer;

var pop_window = null;

//Warpper Object for tracking categories
function Category(p_id, p_state, p_words) {
  this.id = p_id;
  this.switch = p_id.toLowerCase().replace(' ', '_').replace('\'', ' ') + "_switch";
  this.state = p_state;
  this.words = p_words;
}
//Awake Function
$(".input").ready(function() {
  list_of_categories.push(new Category("Jeux vidéos", true, { "Pong": "", "Space Invaders": "", "Pac Man": "", "Donkey Kong": "", "Tetris": "", "Super Mario Bros": "", "Contra": "", "Punch Out": "", "Mega Man": "", "Prince of Persia": "", "SimCity": "", "Monkey Island": "", "Civilization": "", "Lemmings": "", "Sonic": "", "Street Fighter": "", "Mortal Kombat": "", "Wolfenstein": "", "Doom": "", "NBA Jam": "", "Star Fox": "", "Syndicate": "", "EarthBound": "", "Super Metroid": "", "Chrono Trigger": "", "Duke Nukem": "", "Final Fantasy": "", "Pokemon": "", "Quake": "", "Resident Evil": "", "Tomb Raider": "", "Castlevania": "", "GoldenEye 007": "", "Gran Turismo": "", "Tekken": "", "Fallout": "", "Half Life": "", "Metal Gear": "", "SoulCalibur": "", "StarCraft": "", "Age of Empires": "", "Homeworld": "", "Unreal Tournament": "", "Counter Strike": "", "Deus Ex": "", "Diablo": "", "The Sims": "", "Animal Crossing": "", "Grand Theft Auto": "", "Max Payne": "", "Silent Hill": "", "Super Smash Bros": "", "Kingdom Hearts": "", "Metroid Prime": "", "World of Warcraft": "", "God of War": "", "Guitar Hero": "", "Shadow of the Colossus": "", "The Elder Scrolls": "", "Gears of War": "", "Hitman": "", "Wii Sports": "", "BioShock": "", "Call of Duty": "", "Halo": "", "Portal": "", "Super Mario Galaxy": "", "Team Fortress 2": "", "Fortnite": "", "Dead Space": "", "Left 4 Dead": "", "Persona 4": "", "Assassin's Creed": "", "Uncharted": "", "Limbo": "", "Red Dead Redemption": "", "Rock Band": "", "StarCraft II": "", "Super Meat Boy": "", "Dark Souls": "", "Minecraft": "", "Portal 2": "", "The Walking Dead": "", "Dota 2": "", "The Last of Us": "", "Bloodborne": "", "The Witcher 3": "", "Inside": "", "Overwatch": "", "The Legend of Zelda": "", "League Of Legends": "", "Madden": "" }));
  list_of_categories.push(new Category("Emotes twitch", true, { "4Head": "https://static-cdn.jtvnw.net/emoticons/v1/354/3.0", "ANELE": "https://static-cdn.jtvnw.net/emoticons/v1/3792/3.0", "BabyRage": "https://static-cdn.jtvnw.net/emoticons/v1/22639/3.0", "BibleThump": "https://static-cdn.jtvnw.net/emoticons/v1/86/3.0", "BlessRNG": "https://static-cdn.jtvnw.net/emoticons/v1/153556/3.0", "BloodTrail": "https://static-cdn.jtvnw.net/emoticons/v1/69/3.0", "BOP": "https://static-cdn.jtvnw.net/emoticons/v1/301428702/3.0", "BrokeBack": "https://static-cdn.jtvnw.net/emoticons/v1/4057/3.0", "cmonBruh": "https://static-cdn.jtvnw.net/emoticons/v1/84608/3.0", "CoolCat": "https://static-cdn.jtvnw.net/emoticons/v1/58127/3.0", "CoolStoryBob": "https://static-cdn.jtvnw.net/emoticons/v1/123171/3.0", "CurseLit": "https://static-cdn.jtvnw.net/emoticons/v1/116625/3.0", "DansGame": "https://static-cdn.jtvnw.net/emoticons/v1/33/3.0", "DarkMode": "https://static-cdn.jtvnw.net/emoticons/v1/461298/3.0", "DatSheffy": "https://static-cdn.jtvnw.net/emoticons/v1/111700/3.0", "DoritosChip": "https://static-cdn.jtvnw.net/emoticons/v1/102242/3.0", "duDudu": "https://static-cdn.jtvnw.net/emoticons/v1/62834/3.0", "EleGiggle": "https://static-cdn.jtvnw.net/emoticons/v1/4339/3.0", "FailFish": "https://static-cdn.jtvnw.net/emoticons/v1/360/3.0", "FBCatch": "https://static-cdn.jtvnw.net/emoticons/v1/1441281/3.0", "FBPass": "https://static-cdn.jtvnw.net/emoticons/v1/1441271/3.0", "FBRun": "https://static-cdn.jtvnw.net/emoticons/v1/1441261/3.0", "FBSpiral": "https://static-cdn.jtvnw.net/emoticons/v1/1441273/3.0", "FBtouchdown": "https://static-cdn.jtvnw.net/emoticons/v1/626795/3.0", "FrankerZ": "https://static-cdn.jtvnw.net/emoticons/v1/65/3.0", "FutureMan": "https://static-cdn.jtvnw.net/emoticons/v1/98562/3.0", "GivePLZ": "https://static-cdn.jtvnw.net/emoticons/v1/112291/3.0", "GunRun": "https://static-cdn.jtvnw.net/emoticons/v1/1584743/3.0", "HeyGuys": "https://static-cdn.jtvnw.net/emoticons/v1/30259/3.0", "HolidaySanta": "https://static-cdn.jtvnw.net/emoticons/v1/1713822/3.0", "HolidayTree": "https://static-cdn.jtvnw.net/emoticons/v1/1713825/3.0", "HotPokket": "https://static-cdn.jtvnw.net/emoticons/v1/357/3.0", "imGlitch": "https://static-cdn.jtvnw.net/emoticons/v1/112290/3.0", "ItsBoshyTime": "https://static-cdn.jtvnw.net/emoticons/v1/133468/3.0", "Jebaited": "https://static-cdn.jtvnw.net/emoticons/v1/114836/3.0", "KAPOW": "https://static-cdn.jtvnw.net/emoticons/v1/133537/3.0", "Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0", "KappaClaus": "https://static-cdn.jtvnw.net/emoticons/v1/74510/3.0", "KappaPride": "https://static-cdn.jtvnw.net/emoticons/v1/55338/3.0", "KappaRoss": "https://static-cdn.jtvnw.net/emoticons/v1/70433/3.0", "KappaWealth": "https://static-cdn.jtvnw.net/emoticons/v1/81997/3.0", "Kappu": "https://static-cdn.jtvnw.net/emoticons/v1/160397/3.0", "Keepo": "https://static-cdn.jtvnw.net/emoticons/v1/1902/3.0", "KonCha": "https://static-cdn.jtvnw.net/emoticons/v1/160400/3.0", "Kreygasm": "https://static-cdn.jtvnw.net/emoticons/v1/41/3.0", "LUL": "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0", "Mau5": "https://static-cdn.jtvnw.net/emoticons/v1/30134/3.0", "mcaT": "https://static-cdn.jtvnw.net/emoticons/v1/35063/3.0", "MercyWing1": "https://static-cdn.jtvnw.net/emoticons/v1/1003187/3.0", "MercyWing2": "https://static-cdn.jtvnw.net/emoticons/v1/1003189/3.0", "MingLee": "https://static-cdn.jtvnw.net/emoticons/v1/68856/3.0", "MorphinTime": "https://static-cdn.jtvnw.net/emoticons/v1/156787/3.0", "MrDestructoid": "https://static-cdn.jtvnw.net/emoticons/v1/28/3.0", "NinjaGrumpy": "https://static-cdn.jtvnw.net/emoticons/v1/138325/3.0", "NotLikeThis": "https://static-cdn.jtvnw.net/emoticons/v1/58765/3.0", "OpieOP": "https://static-cdn.jtvnw.net/emoticons/v1/100590/3.0", "PartyHat": " https://static-cdn.jtvnw.net/emoticons/v1/965738/3.0", "PartyTime": "https://static-cdn.jtvnw.net/emoticons/v1/135393/3.0", "PinkMercy": "https://static-cdn.jtvnw.net/emoticons/v1/1003190/3.0", "PipeHype": "https://static-cdn.jtvnw.net/emoticons/v1/4240/3.0", "PixelBob": "https://static-cdn.jtvnw.net/emoticons/v1/1547903/3.0", "PJSalt": "https://static-cdn.jtvnw.net/emoticons/v1/36/3.0", "PJSugar": "https://static-cdn.jtvnw.net/emoticons/v1/102556/3.0", "PogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/3.0", "PopCorn": "https://static-cdn.jtvnw.net/emoticons/v1/724216/3.0", "PowerUpL": "https://static-cdn.jtvnw.net/emoticons/v1/425688/3.0", "PrimeMe": "https://static-cdn.jtvnw.net/emoticons/v1/115075/3.0", "PunchTrees": "https://static-cdn.jtvnw.net/emoticons/v1/47/3.0", "PunOko": "https://static-cdn.jtvnw.net/emoticons/v1/160401/3.0", "ResidentSleeper": "https://static-cdn.jtvnw.net/emoticons/v1/245/3.0", "riPepperonis": "https://static-cdn.jtvnw.net/emoticons/v1/62833/3.0", "SeemsGood": "https://static-cdn.jtvnw.net/emoticons/v1/64138/3.0", "SingsMic": "https://static-cdn.jtvnw.net/emoticons/v1/300116349/3.0", "SingsNote": "https://static-cdn.jtvnw.net/emoticons/v1/300116350/3.0", "SMOrc": "https://static-cdn.jtvnw.net/emoticons/v1/52/3.0", "Squid2": "https://static-cdn.jtvnw.net/emoticons/v1/191763/3.0", "Squid3": "https://static-cdn.jtvnw.net/emoticons/v1/191764/3.0", "Squid4": "https://static-cdn.jtvnw.net/emoticons/v1/191767/3.0", "SSSsss": "https://static-cdn.jtvnw.net/emoticons/v1/46/3.0", "StinkyCheese": "https://static-cdn.jtvnw.net/emoticons/v1/90076/3.0", "SwiftRage": "https://static-cdn.jtvnw.net/emoticons/v1/34/3.0", "TakeNRG": "https://static-cdn.jtvnw.net/emoticons/v1/112292/3.0", "TearGlove": "https://static-cdn.jtvnw.net/emoticons/v1/160403/3.0", "TheIlluminati": "https://static-cdn.jtvnw.net/emoticons/v1/145315/3.0", "TombRaid": "https://static-cdn.jtvnw.net/emoticons/v1/864205/3.0", "TriHard": "https://static-cdn.jtvnw.net/emoticons/v1/120232/3.0", "TwitchLit": "https://static-cdn.jtvnw.net/emoticons/v1/166263/3.0", "twitchRaid": "https://static-cdn.jtvnw.net/emoticons/v1/62836/3.0", "TwitchRPG": "https://static-cdn.jtvnw.net/emoticons/v1/1220086/3.0", "TwitchSings": "https://static-cdn.jtvnw.net/emoticons/v1/300116344/3.0", "TwitchVotes": "https://static-cdn.jtvnw.net/emoticons/v1/479745/3.0", "VoHiYo": "https://static-cdn.jtvnw.net/emoticons/v1/81274/3.0", "VoteNay": "https://static-cdn.jtvnw.net/emoticons/v1/106294/3.0", "VoteYea": "https://static-cdn.jtvnw.net/emoticons/v1/106293/3.0", "WutFace": "https://static-cdn.jtvnw.net/emoticons/v1/28087/3.0" }));
  list_of_categories.push(new Category("Films", false, {"Parasite":"","Le Parrain":"","The Dark Knight":"","La Liste de Schindler":"","Le seigneur des anneaux":"","Fight Club":"","Forrest Gump":"","Inception":"","Matrix":"","Les Affranchis":"","Interstellar":"","Il faut sauver le soldat Ryan":"","Le Voyage de Chihiro":"","Les Aventuriers de l'arche perdue":"","Terminator":"","Retour vers le futur":"","Star Wars":"","Shining":"","The Dark Knight Rises":"","Princesse Mononoke":"","Sueurs froides":"","Toy Story":"","Monty Python":"","Inside Out":"","Inglourious Basterds":"","Indiana Jones":"","Batman Begins":"","Là-haut":"","Die Hard":"","Mon voisin Totoro":"","Blade Runner":"","Le Château ambulant":"","Le Loup de Wall Street":"","The Big Lebowski":"","Dragons":"","Le Monde de Nemo":"","Kill Bill":"","Platoon":"","Seul sur Mars":"","Persona":"","Princess Bride":"","The Grand Budapest Hotel":"","Au nom du père":"","Jurassic Park":"","Le Magicien d'Oz":"","Before Sunrise":"","L'Inconnu du Nord-Express":"","The Truman Show":"","Un jour sans fin":"","Monstres et Cie":"","Les Dents de la mer":"","Rocky":"","Harry Potter":"","Avengers":"","Les Gardiens de la Galaxie":"","Pirates des Caraïbes":"","La Belle et la Bête":"","Dumbo":"","Mulan":"","Pocahontas":"","La Princesse et la Grenouille":"","Robin des Bois":"","Snow White":"","Peter Pan":"","La Belle et le Clochard":"","Aladdin":"","Hercules":"","LA LIVRE DE LA JUNGLE":"","Spiderman":"","Valentine's Day":"","Grease":"","Hunger Games":"","Castaway":"","Le Grinch":"","Lolita malgré moi":"","Skyfall":"","L'Odyssée de Pi":"","Breakfast Club":"","Titanic":"","Madagascar":"","Avatar":"","Star Trek":"","Scary Movie":"","Saw":"","Shrek":"","Very Bad Trip":"","Elfe":"","Frankenstein":"","2001, l'Odyssée de l'espace":"","Mary Poppins":"","Braveheart":"","Slumdog Millionaire":"","Wall-E":"","SOS Fantômes":"","Brokeback Mountain":"","Le Roi lion":"","Black Panther":"","Lincoln":"","Dunkerque":"","The Irishman":"","Mad Max":"","The Social Network":"","Moonlight":"","Twilight":"","N'oublie jamais":"","The Fast and the Furious":"","Mamma Mia":"","Zoolander":"","Transformers":"","La Revanche d'une blonde":"","Spy Kids":"","X-Men":"","Serial noceurs":"","Happy Feet":"","Rock Academy":"","Thor":"","Iron Man":"","Les Indestructibles":"","ET":"","Dirty Dancing":"","Top Gun":"","Beetlejuice":"","Maman, j'ai raté l'avion":"","Karaté Kid":"","Winnie l'ourson ":"","Raiponce":"","Les Mondes de Ralph":"","Alice au pays des merveilles":"","Les Nouveaux Héros":"","Tarzan":"","Zootopie":"","La Reine des neiges":"","La Petite Sirène":"","Les 101 Dalmatiens":""}));
  list_of_categories.push(new Category("Streamers", false, {Gotaga :"https://static-cdn.jtvnw.net/jtv_user_pictures/fbc5661c-7812-4b43-bf5e-16c3ba536d5d-profile_image-150x150.png",Sardoche :"https://static-cdn.jtvnw.net/jtv_user_pictures/sardoche-profile_image-96730a1ede6486f7-300x300.png",Domingo :"https://static-cdn.jtvnw.net/jtv_user_pictures/b84b2c78-9e28-4f13-b2fe-bee20a4824d5-profile_image-300x300.png",Zerator :"https://static-cdn.jtvnw.net/jtv_user_pictures/zerator-profile_image-48eee9de24a47e53-300x300.png",Locklear :"https://static-cdn.jtvnw.net/jtv_user_pictures/70d90ec14808c95f-profile_image-300x300.png",MisterMV :"https://static-cdn.jtvnw.net/jtv_user_pictures/5c8624bb-58df-4152-bde9-158487049a5f-profile_image-300x300.png",Xari :"https://static-cdn.jtvnw.net/jtv_user_pictures/86214da3-1461-44d1-a2e9-43501af29538-profile_image-300x300.jpeg",Xewer :"https://static-cdn.jtvnw.net/jtv_user_pictures/fae99f70-eb00-4b25-ba64-5ae2309c381a-profile_image-300x300.png",Corobizar :"https://static-cdn.jtvnw.net/jtv_user_pictures/38846da3-40da-4dab-9248-08ec98061b8e-profile_image-300x300.png",Maghla :"https://static-cdn.jtvnw.net/jtv_user_pictures/f11c2aa9-4420-4625-be4b-267e07b1807b-profile_image-300x300.jpg",ADZ :"https://static-cdn.jtvnw.net/jtv_user_pictures/ef1579ec-778e-48d1-9410-9f33e952e671-profile_image-300x300.png",Wankil :"https://static-cdn.jtvnw.net/jtv_user_pictures/wankilstudio-profile_image-d4aec5a11445ef41-300x300.jpeg",Moman :"https://static-cdn.jtvnw.net/jtv_user_pictures/395f85c5-042b-458e-8c7d-43057b6a60ac-profile_image-300x300.png",Shaunz :"https://static-cdn.jtvnw.net/jtv_user_pictures/9f47e0a1-3791-439f-bc16-fb5da132c375-profile_image-300x300.png",Alderiate :"https://static-cdn.jtvnw.net/jtv_user_pictures/bed29151-4319-4e3f-9f30-031d9dde1458-profile_image-300x300.png",Etoiles :"https://static-cdn.jtvnw.net/jtv_user_pictures/592b4bc9-9313-4011-9ac9-6853b9f3867a-profile_image-300x300.png",Airwaks :"https://static-cdn.jtvnw.net/jtv_user_pictures/abef0b6e-8caf-4850-ab65-f2f8f536b3ab-profile_image-300x300.png",loltyler1 :"https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png",Castro_1021 :"https://static-cdn.jtvnw.net/jtv_user_pictures/ed0f84d6-2d2d-4c4e-a5fe-7a3cc365684a-profile_image-300x300.jpg",Tfue :"https://static-cdn.jtvnw.net/jtv_user_pictures/2470b5c6-a737-4ba6-8987-c28e0ca839e1-profile_image-300x300.jpg",DrDisrespect :"https://static-cdn.jtvnw.net/jtv_user_pictures/72a69c72-14b9-4be8-b8cb-802bc3e5f8ed-profile_image-300x300.png",Pokimane :"https://static-cdn.jtvnw.net/jtv_user_pictures/beeafc17-3ebe-4e1d-b250-404f1ea56988-profile_image-300x300.png",BobRoss :"https://static-cdn.jtvnw.net/jtv_user_pictures/bobross-profile_image-0b9dd167a9bb16b5-300x300.jpeg",Narkuss :"https://pbs.twimg.com/profile_images/1200212281902141445/Yt-dG0MV_400x400.jpg","Bruce Grannec" :"https://pbs.twimg.com/profile_images/1235209766856687617/I2GEqqfc_400x400.jpg",Brak :"https://pbs.twimg.com/profile_images/1140013072406499328/J3uPtVkY_400x400.png",Brawks :"https://pbs.twimg.com/profile_images/1234815124214571008/MIxGR1LR_400x400.jpg","Manuel Ferrara":"https://pbs.twimg.com/profile_images/1078738489515040768/BHciyXWH_400x400.jpg",KennyStream:"https://pbs.twimg.com/profile_images/1113122141652881409/TnjdKOfG_400x400.png",Jbzz:"https://pbs.twimg.com/profile_images/1224461293819744256/K7Q1Ii9D_400x400.jpg",Chap:"https://pbs.twimg.com/profile_images/1233367597351088129/sSgjQCqQ_400x400.jpg",Doigby :"https://pbs.twimg.com/profile_images/1235164507657379840/I4XYA40a_400x400.jpg",LRB:"https://pbs.twimg.com/profile_images/1234133874093035520/nbUSaitp_400x400.jpg"}));
  list_of_categories.push(new Category("Youtubeurs", false, {"Squeezie" :"https://yt3.ggpht.com/a/AGF-l7_iBctP_s6zwVZyaBgXVDnS7CGbujA2PeoxvA=s900-c-k-c0xffffffff-no-rj-mo","Tibo inShape" :"https://yt3.ggpht.com/a/AATXAJyZi7LMgYuKIWhdynS5mUl3yNBQUGe1yqOC6g=s288-c-k-c0xffffffff-no-rj-mo","Mister V": "https://yt3.ggpht.com/a/AATXAJzINFYGN_DZnlgm2Nm60sWronDvgkRLqL4Q=s288-c-k-c0xffffffff-no-rj-mo","Mcfly & Carlito" :"https://yt3.ggpht.com/a/AATXAJwIY5nzr5jeeyuOKGr5sD3H4njjcwIJFL4khw=s288-c-k-c0xffffffff-no-rj-mo","Le Rire Jaune" :"https://yt3.ggpht.com/a/AATXAJxejfBHuPh0f0fzkNlDdV4iosRtiwvRpZQTdw=s288-c-k-c0xffffffff-no-rj-mo","Ibra TV" :"https://yt3.ggpht.com/a/AATXAJyyzmJpjoGPYWNeRmEYkncjcpYVJq0vlD1RsA=s288-c-k-c0xffffffff-no-rj-mo","FastGoodCuisine" :"https://yt3.ggpht.com/a/AATXAJwqf4debNVHtu6gL91Bv3Ke5pFe6onfqau58Q=s288-c-k-c0xffffffff-no-rj-mo","Golden Moustach":"https://yt3.ggpht.com/a/AATXAJx6A_XoXD8BAA5pHrZTtYcF9KBa9CbVCRX2=s288-c-k-c0xffffffff-no-rj-mo","Joueur du grenier" : "https://yt3.ggpht.com/a/AATXAJyty6uEbV0hiv9uXS0nlb3HQ8f3AIK5FucN5g=s288-c-k-c0xffffffff-no-rj-mo","TheKairi78" :"https://yt3.ggpht.com/a/AATXAJwh0RbQQ-iedphSmtSTP1UXmrVkXoZY1G2g-Q=s288-c-k-c0xffffffff-no-rj-mo","Wass Freestyle" :"https://yt3.ggpht.com/a/AATXAJzfVdJxEKstuuPr87T1PsFHCqOQEkVQ7T46sg=s288-c-k-c0xffffffff-no-rj-mo","MrLEV12" :"https://yt3.ggpht.com/a/AATXAJyySqt4G965X8lkf-SFOzU9S8Sv-my0WVEzBw=s288-c-k-c0xffffffff-no-rj-mo","Wankil Studio" :"https://yt3.ggpht.com/a/AATXAJwu4Dzu-BlRplEws_DNmACUD_TMkGeL0riWAg=s288-c-k-c0xffffffff-no-rj-mo","Cyprien": "https://pbs.twimg.com/profile_images/1216320408263237632/fcOUSnJp_400x400.jpg","Lerirejaune": "https://pbs.twimg.com/profile_images/1183595483861786625/yo7c24Zx_400x400.jpg","Prime": "https://yt3.ggpht.com/a/AATXAJz_CUaEk9e5UlHpMAsgLeKUr80spSGmnenyww=s288-c-k-c0xffffffff-no-rj-mo","Mehdi Ba": "https://pbs.twimg.com/profile_images/1205791894342492161/95i6fXxU_400x400.jpg","EnjoyPhoenix": "https://resize-elle.ladmedia.fr/r/625,,forcex/crop/625,804,center-middle,forcex,ffffff/img/var/plain_site/storage/images/beaute/news-beaute/beaute-des-stars/rencontre-la-revolution-d-enjoyphoenix-3464558/78967730-1-fre-FR/Rencontre-La-revolution-d-EnjoyPhoenix.jpg","Sofyan": "https://pbs.twimg.com/profile_images/807663208551026688/LYxbE8nE_400x400.jpg","Kenny": "https://i.ytimg.com/vi/y3pSlUuJIME/maxresdefault.jpg","PFUT" :"https://vignette.wikia.nocookie.net/youtuberfrancais/images/b/b3/DFwnIiYXgAQCs4l.jpg/revision/latest?cb=20170809031822&path-prefix=fr","IchibanJapan": "https://pbs.twimg.com/profile_images/1029611127838134272/vTXdxJ1r.jpg"}));
  list_of_categories.push(new Category("Champions LOL", false, {Aatrox: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt570145160dd39dca/5db05fa8347d1c6baa57be25/RiotX_ChampionList_aatrox.jpg?quality=90&width=250",Ahri: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1259276b6d1efa78/5db05fa86e8b0c6d038c5ca2/RiotX_ChampionList_ahri.jpg?quality=90&width=250",Akali: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt80ff58fe809777ff/5db05fa8adc8656c7d24e7d6/RiotX_ChampionList_akali.jpg?quality=90&width=250",Alistar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3b366925d2fd8fdb/5db05fa856458c6b3fc1750b/RiotX_ChampionList_alistar.jpg?quality=90&width=250",Amumu: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt40dfbe48a61c439f/5db05fa80b39e86c2f83dbf9/RiotX_ChampionList_amumu.jpg?quality=90&width=250",Anivia: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3d24a1482453088a/5db05fa8df78486c826dcce8/RiotX_ChampionList_anivia.jpg?quality=90&width=250",Annie: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt28c708665427aef6/5db05fa89481396d6bdd01a6/RiotX_ChampionList_annie.jpg?quality=90&width=250",Aphelios: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aphelios_0.jpg",Ashe: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt943aae038e2dee98/5db05fa8e9effa6ba5295f91/RiotX_ChampionList_ashe.jpg?quality=90&width=250","Aurelion Sol": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5dd3569fc67d6664/5db05fa8bd24496c390ae4d8/RiotX_ChampionList_aurelionsol.jpg?quality=90&width=250",Azir: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0e3f847946232167/5db05fa889fb926b491ed7ff/RiotX_ChampionList_azir.jpg?quality=90&width=250",Bard: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbbe3ce0c0ae1305b/5db05fb23a326d6df6c0e7b3/RiotX_ChampionList_bard.jpg?quality=90&width=250",Blitzcrank: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd7ef7e56ce1fe17b/5db05fb26af83b6d7032c8f8/RiotX_ChampionList_blitzcrank.jpg?quality=90&width=250",Brand: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc8ca2e9bba653dda/5db05fb2dc674266df3d5d30/RiotX_ChampionList_brand.jpg?quality=90&width=250",Braum: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd140e30fa86d6ddd/5db05fb2242f426df132f95d/RiotX_ChampionList_braum.jpg?quality=90&width=250",Caitlyn: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt014f4b6fc9bacd10/5db05fb00b39e86c2f83dbff/RiotX_ChampionList_caitlyn.jpg?quality=90&width=250",Camille: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt413fcd7681fe0773/5db05fb089fb926b491ed805/RiotX_ChampionList_camille.jpg?quality=90&width=250",Cassiopeia: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte189be8189da97ea/5db05fb1bd24496c390ae4de/RiotX_ChampionList_cassiopeia.jpg?quality=90&width=250","Cho'gath": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4dfb71de3ddc8166/5db05fb13a326d6df6c0e7ad/RiotX_ChampionList_chogath.jpg?quality=90&width=250",Corki: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltdd918c4d0a86347a/5db05fb1df78486c826dccee/RiotX_ChampionList_corki.jpg?quality=90&width=250",Darius: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt38b52be4a2cb1004/5db05fb19481396d6bdd01ac/RiotX_ChampionList_darius.jpg?quality=90&width=250",Diana: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt56570083d2a5e20e/5db05fbc823d426762825fdf/RiotX_ChampionList_diana.jpg?quality=90&width=250","Dr. Mundo": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte88a3d7e9e408904/5db05fbce9effa6ba5295f99/RiotX_ChampionList_drmundo.jpg?quality=90&width=250",Draven: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc0be728e4cbb8f2a/5db05fbc89fb926b491ed80b/RiotX_ChampionList_draven.jpg?quality=90&width=250",Ekko: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf22ba7e6328e4376/5db05fbd242f426df132f963/RiotX_ChampionList_ekko.jpg?quality=90&width=250",Elise: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfe21ff2ddb84d5d1/5db05fbd0b39e86c2f83dc05/RiotX_ChampionList_elise.jpg?quality=90&width=250",Evelynn: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte24b4c6ec1beebb9/5db05fbddf78486c826dccf4/RiotX_ChampionList_evelynn.jpg?quality=90&width=250",Ezreal: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt60f687c95425f73f/5db05fbd2dc72966da746704/RiotX_ChampionList_ezreal.jpg?quality=90&width=250",Fiddlesticks: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1151ac1242311053/5db05fbca6470d6ab91ce594/RiotX_ChampionList_fiddlesticks.jpg?quality=90&width=250",Fiora: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt935dd149b2617ac8/5db05fbcdc674266df3d5d36/RiotX_ChampionList_fiora.jpg?quality=90&width=250",Fizz: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6000fa69e03c25c0/5db05fbc56458c6b3fc17513/RiotX_ChampionList_fizz.jpg?quality=90&width=250",Galio: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5890d1ab5c8be01f/5db05fc6823d426762825fe5/RiotX_ChampionList_galio.jpg?quality=90&width=250",Gangplank: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfdff3781ccfb2a5c/5db05fc689fb926b491ed811/RiotX_ChampionList_gangplank.jpg?quality=90&width=250",Garen: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte41a162aed9339b7/5db05fc60b39e86c2f83dc0d/RiotX_ChampionList_garen.jpg?quality=90&width=250",Gnar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta80f79dd96ee5d30/5db05fc6df78486c826dcd00/RiotX_ChampionList_gnar.jpg?quality=90&width=250",Gragas: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt795841adba722f85/5db05fc43a326d6df6c0e7b9/RiotX_ChampionList_gragas.jpg?quality=90&width=250",Graves: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd8935c6b4025d320/5db05fc4bd24496c390ae4e4/RiotX_ChampionList_graves.jpg?quality=90&width=250",Hecarim: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blteb9ce5304ec48e19/5db05fc5df78486c826dccfa/RiotX_ChampionList_hecarim.jpg?quality=90&width=250",Heimerdinger: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd30d85446d154070/5db05fc57d28b76cfe4397ef/RiotX_ChampionList_heimerdinger.jpg?quality=90&width=250",Illaoi: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc44e90a5547120a2/5db05fc5347d1c6baa57be2b/RiotX_ChampionList_illaoi.jpg?quality=90&width=250",Irelia: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf5f2b8de93870aef/5db05fcea6470d6ab91ce59a/RiotX_ChampionList_irelia.jpg?quality=90&width=250",Ivern: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5fff73e1df1873de/5db05fce7d28b76cfe4397f5/RiotX_ChampionList_ivern.jpg?quality=90&width=250",Janna: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt02bf5329f8abe45d/5db05fcedf78486c826dcd06/RiotX_ChampionList_janna.jpg?quality=90&width=250","Jarvan IV": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5898626d7016d222/5db05fcfdc674266df3d5d3c/RiotX_ChampionList_jarvaniv.jpg?quality=90&width=250",Jax: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6b301613598c3f17/5db05fcf89fb926b491ed81d/RiotX_ChampionList_jax.jpg?quality=90&width=250",Jayce: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt51557edc36ad88a1/5db05fcf0b39e86c2f83dc13/RiotX_ChampionList_jayce.jpg?quality=90&width=250",Jhin: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbf6c70d9272a5a2a/5db05fcfe9d7526ab429e532/RiotX_ChampionList_jhin.jpg?quality=90&width=250",Jinx: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta2cba784d9fad4b8/5db05fce89fb926b491ed817/RiotX_ChampionList_jinx.jpg?quality=90&width=250","Kai'sa": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte38dc660dfe79204/5db05fce2dc72966da74670c/RiotX_ChampionList_kaisa.jpg?quality=90&width=250",Kalista: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltb7f0196921c74e8c/5db05fcee9d7526ab429e52c/RiotX_ChampionList_kalista.jpg?quality=90&width=250",Karma: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt39748c7b67252d6f/5db05fd70b39e86c2f83dc19/RiotX_ChampionList_karma.jpg?quality=90&width=250",Karthus: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt69b8fad9d1e78514/5db05fd7df78486c826dcd0c/RiotX_ChampionList_karthus.jpg?quality=90&width=250",Kassadin: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt20773f2f67e00a74/5db05fd7bd24496c390ae4ea/RiotX_ChampionList_kassadin.jpg?quality=90&width=250",Katarina: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltb73e3edb5937676a/5db05fd7823d426762825feb/RiotX_ChampionList_katarina.jpg?quality=90&width=250",Kayle: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2c7675893b5c76bc/5db05fd77d28b76cfe4397fb/RiotX_ChampionList_kayle.jpg?quality=90&width=250",Kayn: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt64edf2d3729b57c1/5db05fd656458c6b3fc17519/RiotX_ChampionList_kayn.jpg?quality=90&width=250",Kennen: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc87932e656d1076e/5db05fd6adc8656c7d24e7dc/RiotX_ChampionList_kennen.jpg?quality=90&width=250","Kha'zix": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt363d7d62846ffc87/5db05fd6e9effa6ba5295f9f/RiotX_ChampionList_khazix.jpg?quality=90&width=250",Kindred: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc0f0007660b7a07b/5db05fd689fb926b491ed823/RiotX_ChampionList_kindred.jpg?quality=90&width=250",Kled: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1670a0dd8fd5edca/5db05fd66e8b0c6d038c5ca8/RiotX_ChampionList_kled.jpg?quality=90&width=250","Kog'maw": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltaf483c8f812369fa/5db05fde823d426762825ff1/RiotX_ChampionList_kogmaw.jpg?quality=90&width=250",Leblanc: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4aaf881bb90b509f/5db05fde6e8b0c6d038c5cae/RiotX_ChampionList_leblanc.jpg?quality=90&width=250","Lee Sin": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt075d278529811445/5db05fde6af83b6d7032c8fe/RiotX_ChampionList_leesin.jpg?quality=90&width=250",Leona: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8d46ada03ea1da8c/5db05fdf347d1c6baa57be31/RiotX_ChampionList_leona.jpg?quality=90&width=250",Lissandra: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt08f869e897566c5b/5db05fdf7d28b76cfe439801/RiotX_ChampionList_lissandra.jpg?quality=90&width=250",Lucian: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3db0d62352b0b4f1/5db05fdf6e8b0c6d038c5cb4/RiotX_ChampionList_lucian.jpg?quality=90&width=250",Lulu: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt424f04814efb3aca/5db05fdfe9d7526ab429e538/RiotX_ChampionList_lulu.jpg?quality=90&width=250",Lux: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltb94b4161d8022c45/5db05fdfe9d7526ab429e53c/RiotX_ChampionList_lux.jpg?quality=90&width=250","Maître Yi": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt46e861d7e6c0ab0c/5db05fe8df78486c826dcd12/RiotX_ChampionList_masteryi.jpg?quality=90&width=250",Malphite: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4d3b4a7e4c44ced7/5db05fdeadc8656c7d24e7e2/RiotX_ChampionList_malaphite.jpg?quality=90&width=250",Malzahar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd58a3a2bf5035834/5db05fde0b39e86c2f83dc1f/RiotX_ChampionList_malzahar.jpg?quality=90&width=250",Maokai: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt757d0e8855d51e03/5db05fe72140ec675d68f4a1/RiotX_ChampionList_maokai.jpg?quality=90&width=250","Miss Fortune": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf36fa7fd7ecb59fb/5db05fe89481396d6bdd01b8/RiotX_ChampionList_missfortune.jpg?quality=90&width=250",Mordekaiser: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2392a60ff2a2d726/5db05fe8242f426df132f96d/RiotX_ChampionList_mordekaiser.jpg?quality=90&width=250",Morgana: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc81eece55f126d2d/5db05fe86af83b6d7032c904/RiotX_ChampionList_morgana.jpg?quality=90&width=250",Nami: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt13bec39f49dc35ee/5db05fe956458c6b3fc1751f/RiotX_ChampionList_nami.jpg?quality=90&width=250",Nasus: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt20a4b154b1756b56/5db05fe7a6470d6ab91ce5a0/RiotX_ChampionList_nasus.jpg?quality=90&width=250",Nautilus: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf945a57aa16cea57/5db05fe7347d1c6baa57be37/RiotX_ChampionList_nautilus.jpg?quality=90&width=250",Neeko: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta62eaac6ad26a4f5/5db05fe7adc8656c7d24e7ea/RiotX_ChampionList_neeko.jpg?quality=90&width=250",Nidalee: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5a2da06d413f7c15/5db05ff1df78486c826dcd18/RiotX_ChampionList_nidalee.jpg?quality=90&width=250",Nocturne: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfc73e3c7dda28d31/5db05ff2adc8656c7d24e7f0/RiotX_ChampionList_nocturne.jpg?quality=90&width=250","Nunu et Wiilump": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf613746635c6d3c8/5db05ff256458c6b3fc17527/RiotX_ChampionList_nunu.jpg?quality=90&width=250",Olaf: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte922bda45062964b/5db05ff0a6470d6ab91ce5a6/RiotX_ChampionList_olaf.jpg?quality=90&width=250",Orianna: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3318fc0e8103706d/5db05ff02140ec675d68f4a7/RiotX_ChampionList_orianna.jpg?quality=90&width=250",Ornn: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt639bacdfe8b1fd95/5db05ff1bd24496c390ae4f0/RiotX_ChampionList_ornn.jpg?quality=90&width=250",Pantheon: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3f84c538bd36ef02/5db05ff17d28b76cfe43980d/RiotX_ChampionList_pantheon.jpg?quality=90&width=250",Poppy: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0df0f7bcaf851737/5db05ff1242f426df132f973/RiotX_ChampionList_poppy.jpg?quality=90&width=250",Pyke: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt98269cb73e9fce70/5db05ff1347d1c6baa57be3d/RiotX_ChampionList_pyke.jpg?quality=90&width=250",Qiyana: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta6148d8dca105d6b/5db05ff1e9effa6ba5295fa7/RiotX_ChampionList_qiyana.jpg?quality=90&width=250",Quinn: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5cc3e3a189961d90/5db05ffbadc8656c7d24e7fc/RiotX_ChampionList_quinn.jpg?quality=90&width=250",Rakan: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbe844b30961ccb7c/5db05ffb2140ec675d68f4ad/RiotX_ChampionList_rakan.jpg?quality=90&width=250",Rammus: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt50cccb68a58349f5/5db05ffbdc674266df3d5d48/RiotX_ChampionList_rammus.jpg?quality=90&width=250","Rek'sai": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4affff3ef114e99b/5db05ffb347d1c6baa57be43/RiotX_ChampionList_reksai.jpg?quality=90&width=250",Renekton: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6b5bb4d917759184/5db05ffb242f426df132f979/RiotX_ChampionList_renekton.jpg?quality=90&width=250",Rengar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt282bc8e033db4123/5db05ff9adc8656c7d24e7f6/RiotX_ChampionList_rengar.jpg?quality=90&width=250",Riven: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3925b81c7462e26e/5db05ffadc674266df3d5d42/RiotX_ChampionList_riven.jpg?quality=90&width=250",Rumble: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd7c76610fa29d8d6/5db05ffa7d28b76cfe439813/RiotX_ChampionList_rumble.jpg?quality=90&width=250",Ryze: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8af977ce4fa7804b/5db05ffa2dc72966da746714/RiotX_ChampionList_ryze.jpg?quality=90&width=250",Sejuani: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blte4d521b893aa5a3e/5db05ffae9d7526ab429e544/RiotX_ChampionList_sejuani.jpg?quality=90&width=250",Senna: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt24f4735ebde3c22b/5db08d642dc72966da74686e/RiotX_ChampionList_senna.jpg?quality=90&width=250",Sett: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_0.jpg",Shaco: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc8b1d1ba926d01cc/5db060036e8b0c6d038c5cba/RiotX_ChampionList_shaco.jpg?quality=90&width=250",Shen: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd142d174831b78e9/5db06004242f426df132f97f/RiotX_ChampionList_shen.jpg?quality=90&width=250",Shyvana: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltdb320ec49e0e02a7/5db0600456458c6b3fc1752d/RiotX_ChampionList_shyvana.jpg?quality=90&width=250",Singed: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt766d98c27adfde28/5db06004347d1c6baa57be4f/RiotX_ChampionList_singed.jpg?quality=90&width=250",Sion: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt7f28f1d689e4ad3d/5db06004adc8656c7d24e802/RiotX_ChampionList_sion.jpg?quality=90&width=250",Sivir: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbe8ea8bfd98ec1f3/5db06002a6470d6ab91ce5ac/RiotX_ChampionList_sivir.jpg?quality=90&width=250",Skarner: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt842a8149ba8b7a3d/5db06003bd24496c390ae4f6/RiotX_ChampionList_skarner.jpg?quality=90&width=250",Sona: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4810827f74fc21b9/5db06003347d1c6baa57be49/RiotX_ChampionList_sona.jpg?quality=90&width=250",Soraka: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2141839fdc483592/5db06003e9effa6ba5295fad/RiotX_ChampionList_soraka.jpg?quality=90&width=250",Swain: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1a64e469280b8b9f/5db060030b39e86c2f83dc25/RiotX_ChampionList_swain.jpg?quality=90&width=250",Sylas: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltf8ea29aa48fc5e35/5db0600cadc8656c7d24e808/RiotX_ChampionList_sylas.jpg?quality=90&width=250",Syndra: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd9308eedab3a6fa5/5db0600c3a326d6df6c0e7bf/RiotX_ChampionList_syndra.jpg?quality=90&width=250","Tahm Kench": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt87be9cf38f3bc986/5db0600c56458c6b3fc17533/RiotX_ChampionList_tahmkench.jpg?quality=90&width=250",Taliyah: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt35c3537198ee86b9/5db05fc52140ec675d68f49b/RiotX_ChampionList_ialiyah.jpg?quality=90&width=250",Talon: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt20a737f99ebcd027/5db0600c89fb926b491ed829/RiotX_ChampionList_talon.jpg?quality=90&width=250",Taric: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6b2d37773c3621e1/5db0600d347d1c6baa57be55/RiotX_ChampionList_taric.jpg?quality=90&width=250",Teemo: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt30ddbbdc0549078a/5db0600da6470d6ab91ce5b8/RiotX_ChampionList_teemo.jpg?quality=90&width=250",Thresh: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt46555de3bfa94d44/5db0600b2140ec675d68f4b5/RiotX_ChampionList_thresh.jpg?quality=90&width=250",Tristana: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfbbc3205edf5207a/5db0600bdc674266df3d5d50/RiotX_ChampionList_tristana.jpg?quality=90&width=250",Trundle: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt05eb0518bbe963c0/5db0600ba6470d6ab91ce5b2/RiotX_ChampionList_trundle.jpg?quality=90&width=250",Tryndamere: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3b217144ed3a7faa/5db08d643a326d6df6c0e907/RiotX_ChampionList_tryndamere.jpg?quality=90&width=250","Twisted Fate": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltaebcdb8b21d440a7/5db0600ce9effa6ba5295fb3/RiotX_ChampionList_twistedfate.jpg?quality=90&width=250",Twitch: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt674dca7d5611ebb0/5db060159481396d6bdd01be/RiotX_ChampionList_twitch.jpg?quality=90&width=250",Udyr: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8350eda62a9ed56c/5db060150b39e86c2f83dc2b/RiotX_ChampionList_udyr.jpg?quality=90&width=250",Urgot: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt162b78ba3ece1d4f/5db060157d28b76cfe43981b/RiotX_ChampionList_urgot.jpg?quality=90&width=250",Varus: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt596158d85a8360d1/5db060132dc72966da74671a/RiotX_ChampionList_varus.jpg?quality=90&width=250",Vayne: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9eaabc908956c8b0/5db060146af83b6d7032c90a/RiotX_ChampionList_vayne.jpg?quality=90&width=250",Veigar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltda2b568b0c3e5847/5db06014e9effa6ba5295fb9/RiotX_ChampionList_veigar.jpg?quality=90&width=250","Vel'koz": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt825d0c333f6e74ae/5db060142140ec675d68f4bb/RiotX_ChampionList_velkoz.jpg?quality=90&width=250",Vi: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3bd79abf330fc807/5db06014dc674266df3d5d56/RiotX_ChampionList_vi.jpg?quality=90&width=250",Viktor: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt6e54b3de49b7bbf3/5db06015df78486c826dcd1e/RiotX_ChampionList_viktor.jpg?quality=90&width=250",Valdimir: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt39ab5027f6fa1b81/5db0601589fb926b491ed82f/RiotX_ChampionList_vladimir.jpg?quality=90&width=250",Volibear: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt41447a436267de03/5db0601d6e8b0c6d038c5cc0/RiotX_ChampionList_volibear.jpg?quality=90&width=250",Warwick: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt08a92f3897cfc8f5/5db0601ddc674266df3d5d5c/RiotX_ChampionList_warwick.jpg?quality=90&width=250",Wukong: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltaf44673e1a16af30/5db05fe87d28b76cfe439807/RiotX_ChampionList_monkeyking.jpg?quality=90&width=250",Xayah: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0d029ccdb18a4299/5db0601ba6470d6ab91ce5be/RiotX_ChampionList_xayah.jpg?quality=90&width=250",Xerath: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbda694c8890e94e5/5db0601ce9effa6ba5295fbf/RiotX_ChampionList_xeratth.jpg?quality=90&width=250","Xin Zhao": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltca4486a1630ef517/5db0601ce9d7526ab429e54a/RiotX_ChampionList_xinzhao.jpg?quality=90&width=250",Yasuo: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt3a319fc884dc6880/5db0601c242f426df132f985/RiotX_ChampionList_yasuo.jpg?quality=90&width=250",Yorick: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt570d89dd9a76ba08/5db0601c823d426762825ff9/RiotX_ChampionList_yorick.jpg?quality=90&width=250",Yuumi: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta312e7cca0e594d1/5db0601d2140ec675d68f4c1/RiotX_ChampionList_yuumi.jpg?quality=90&width=250",Zac: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9412083c2b98b9c8/5db0601d6af83b6d7032c910/RiotX_ChampionList_zac.jpg?quality=90&width=250",Zed: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt402d6da485218720/5db0601de9effa6ba5295fc5/RiotX_ChampionList_zed.jpg?quality=90&width=250",Ziggs: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0f8c12d54d8ecd28/5db0602289fb926b491ed835/RiotX_ChampionList_ziggs.jpg?quality=90&width=250",Zilean: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta32de59397f53325/5db060222dc72966da746720/RiotX_ChampionList_zilean.jpg?quality=90&width=250",Zoé: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd18587f31803441d/5db060226e8b0c6d038c5cc6/RiotX_ChampionList_zoe.jpg?quality=90&width=250",Zyra: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9bc3497cdd04f6d5/5db060229481396d6bdd01c4/RiotX_ChampionList_zyra.jpg?quality=90&width=250"}));
  list_of_categories.push(new Category("Pokémons", true, {Bulbizarre:"https://img.pokemondb.net/artwork/bulbasaur.jpg",Salamèche:"https://img.pokemondb.net/artwork/charmander.jpg",Dracaufeu:"https://img.pokemondb.net/artwork/charizard.jpg",Carapuce:"https://img.pokemondb.net/artwork/squirtle.jpg",Tortank:"https://img.pokemondb.net/artwork/blastoise.jpg",Chenipan:"https://img.pokemondb.net/artwork/caterpie.jpg",Chrysacier:"https://img.pokemondb.net/artwork/metapod.jpg",Papilusion:"https://img.pokemondb.net/artwork/butterfree.jpg",Dardagnan:"https://img.pokemondb.net/artwork/beedrill.jpg",Roucool:"https://img.pokemondb.net/artwork/pidgey.jpg",Rattata:"https://img.pokemondb.net/artwork/rattata.jpg",Abo:"https://img.pokemondb.net/artwork/ekans.jpg",Arbok:"https://img.pokemondb.net/artwork/arbok.jpg",Pikachu:"https://img.pokemondb.net/artwork/pikachu.jpg",Raichu:"https://img.pokemondb.net/artwork/raichu.jpg",Mélofée:"https://img.pokemondb.net/artwork/clefairy.jpg",Goupix:"https://img.pokemondb.net/artwork/vulpix.jpg",Feunard:"https://img.pokemondb.net/artwork/ninetales.jpg",Rondoudou:"https://img.pokemondb.net/artwork/jigglypuff.jpg",Grodoudou:"https://img.pokemondb.net/artwork/wigglytuff.jpg",Nosferapti:"https://img.pokemondb.net/artwork/zubat.jpg ",Nosferalto:"https://img.pokemondb.net/artwork/golbat.jpg",Paras:"https://img.pokemondb.net/artwork/paras.jpg",Parasect:"https://img.pokemondb.net/artwork/parasect.jpg",Taupiqueur:"https://img.pokemondb.net/artwork/diglett.jpg",Triopikeur:"https://img.pokemondb.net/artwork/dugtrio.jpg",Miaouss:"https://img.pokemondb.net/artwork/meowth.jpg",Psykokwak:"https://img.pokemondb.net/artwork/psyduck.jpg",Férosinge:"https://img.pokemondb.net/artwork/mankey.jpg",Caninos:"https://img.pokemondb.net/artwork/growlithe.jpg",Ptitard:"https://img.pokemondb.net/artwork/poliwag.jpg",Têtarte:"https://img.pokemondb.net/artwork/poliwhirl.jpg",Abra:"https://img.pokemondb.net/artwork/abra.jpg",Kadabra:"https://img.pokemondb.net/artwork/kadabra.jpg",Alakazam:"https://img.pokemondb.net/artwork/alakazam.jpg",Machoc:"https://img.pokemondb.net/artwork/machop.jpg",Chétiflor:"https://img.pokemondb.net/artwork/bellsprout.jpg",Racaillou:"https://img.pokemondb.net/artwork/geodude.jpg",Ponyta:"https://img.pokemondb.net/artwork/ponyta.jpg",Ramoloss:"https://img.pokemondb.net/artwork/slowpoke.jpg",Otaria:"https://img.pokemondb.net/artwork/seel.jpg",Grotadmorv:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/089.png",Ectoplasma:"https://img.pokemondb.net/artwork/gengar.jpg",Onix:"https://img.pokemondb.net/artwork/onix.jpg",Soporifik:"https://img.pokemondb.net/artwork/drowzee.jpg",Hypnomade:"https://img.pokemondb.net/artwork/hypno.jpg",Krabby:"https://img.pokemondb.net/artwork/krabby.jpg",Voltorb:"https://img.pokemondb.net/artwork/voltorb.jpg",Osselait:"https://img.pokemondb.net/artwork/cubone.jpg",Kicklee:"https://img.pokemondb.net/artwork/hitmonlee.jpg",Tygnon:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-Gd3i0Q3uu0DOpabAsh_V4k3srPikUQ0XZ-0TWqt6nv07G-9y",Excelangue:"https://img.pokemondb.net/artwork/lickitung.jpg",Leveinard:"https://img.pokemondb.net/artwork/chansey.jpg",Saquedeneu:"https://img.pokemondb.net/artwork/tangela.jpg",Stari:"https://img.pokemondb.net/artwork/staryu.jpg","Mr Mime":"https://img.pokemondb.net/artwork/large/mr-mime.jpg",Insécateur:"https://img.pokemondb.net/artwork/scyther.jpg",Tauros:"https://img.pokemondb.net/artwork/tauros.jpg",Magikarp:"https://img.pokemondb.net/artwork/magikarp.jpg",Métamorph:"https://img.pokemondb.net/artwork/ditto.jpg",Amonita:"https://img.pokemondb.net/artwork/omanyte.jpg",Ronflex:"https://img.pokemondb.net/artwork/snorlax.jpg",Mewtwo:"https://img.pokemondb.net/artwork/mewtwo.jpg",Mew:"https://img.pokemondb.net/artwork/mew.jpg",Absol:"https://img.pokemondb.net/artwork/absol.jpg",Lucario:"https://img.pokemondb.net/artwork/lucario.jpg",Tiplouf:"https://img.pokemondb.net/artwork/piplup.jpg",Spinda:"https://img.pokemondb.net/artwork/spinda.jpg",Spoink:"https://img.pokemondb.net/artwork/spoink.jpg",Charpenti:"https://img.pokemondb.net/artwork/timburr.jpg",Apitrini:"https://img.pokemondb.net/artwork/combee.jpg",Amphinobi:"https://img.pokemondb.net/artwork/greninja.jpg",Baggaïd:"https://img.pokemondb.net/artwork/scrafty.jpg",Qulbutoké:"https://img.pokemondb.net/artwork/wobbuffet.jpg",Trousselin:"https://img.pokemondb.net/artwork/klefki.jpg",Larméléon:"https://img.pokemondb.net/artwork/sobble.jpg",Ouistempo:"https://img.pokemondb.net/artwork/grookey.jpg",Khélocrok:"https://img.pokemondb.net/artwork/chewtle.jpg"}))
  Setup_Shuffle_Words();
})

const {
  chat,
  api
} = new TwitchJs({
  log: { enabled: false },
});

function StartGame() {
  ConnectTwitchChat();
  HideAllTabs();
  document.getElementById("hide_all_tabs_btn").style.visibility = "visible";
};

function NextRound() {
  gameFailed = false;
    PickWord();
    StopTimer();
    PopOutWord();
  StartTimer(document.getElementById("timer_Spinner").value);
  document.getElementById("NextWord_btn").style.visibility = "visible";
  document.getElementById("StartGame_btn").style.visibility = "hidden";
  document.getElementById("wb_error_msg_box").innerHTML = "";
  document.getElementById("timer_ouput").style.color = "#4682B4";
  document.getElementById("word_image_placeholder").innerHTML = "";
  var clickSound = document.getElementById("btn_click");
  clickSound.volume = 0.2;
  clickSound.play();
}

function ConnectTwitchChat() {
  const channel = document.getElementById("channelName").value;
  console.log(channel);
  if (isConnected) {
    chat.reconnect().then(() => {
      chat.part(connectedChannel);
      chat.join(channel);
      connectedChannel = channel;
    })
  } else {

    const handleMessage = message => {
        if (message.event === "PRIVMSG") {
          if (!wordFound && message.message != null) {
            if (!gameFailed) {
              var clean_message = DOMPurify.sanitize(message.message, { ALLOWED_TAGS: ['b'] })
              document.getElementById("wb_output").innerHTML = ("<strong style=\"color:" + message.tags["color"] + "; \">" + message.username + "</strong>: " + clean_message);
              if (clean_message.toLowerCase().search("^" + chosenWord) != -1 && timer < duration - 5) {
                WordGuessed();
              }

            }
          }
        };

      }
      // Listen for all events.
    chat.on(TwitchJs.Chat.Events.ALL, handleMessage);

    // Connect ...
    chat.connect().then(() => {
      chat.join(channel).then(() => {
        isConnected = true;
        connectedChannel = channel;
        NextRound();
      }).catch(function(err) {
        console.log(err);
        document.getElementById("wb_error_msg_box").innerHTML = "Error: Make Sure Channel Name Is Filled Correctly.";
      })
    }).catch(function(err) {
      console.log(err);
      document.getElementById("wb_error_msg_box").innerHTML = "Error: Could Not Connect To Twtich API.";
    });

  }
};

function StartTimer(duration) {
  timer = duration;

  var runner = function() {
    let minutes = parseInt(timer / 60, 10)
    let seconds = parseInt(timer % 60, 10);
    // console.log(pop_window);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer_ouput").innerHTML = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
      WordNotGuessed();
    }
  };
  runner();
  intervalTimer = setInterval(runner, 1000);
}

function StopTimer() {
  if (intervalTimer != null) {
    clearInterval(intervalTimer);
  }
}

function Setup_Shuffle_Words() {
  word_cur_index = 0;
  random_word_list_keys = [];
  word_obj_concat = {};
  for (var key in list_of_categories) {
    if (list_of_categories[key].state == true) {
      word_obj_concat = Object.assign(word_obj_concat, list_of_categories[key].words);
    }
  }
  random_word_list_keys = shuffleWords(Object.keys(word_obj_concat));
}

function PickWord() {
  wordFound = false;

  chosenWord = random_word_list_keys[word_cur_index];
  console.log(random_word_list_keys)
  image_ChosenWord = word_obj_concat[chosenWord];
  word_cur_index++;
  if (word_cur_index == random_word_list_keys.length) {
    Setup_Shuffle_Words();
    console.log("shuffleWords");
  }
  document.getElementById("theWord").innerHTML = "???";
  display_ChosenWord = chosenWord;
  updatePopoutWord();
  chosenWord = chosenWord.toLowerCase();
}

// //DEBUG Function
// //
// var index = 0;
// var cat_index = 0;

// function PickWord() {
//   wordFound = false;
//   var word_list;
//   var cat_list = [];
//   for (var key in list_of_categories) {
//     if (list_of_categories[key].state == true) {
//       cat_list = cat_list.concat(list_of_categories[key]);
//     }
//   }
//   var chosen_cat = cat_list[cat_index % cat_list.length];
//   cat_index++;
//   var word_keys = Object.keys(chosen_cat.words);
//   pickedAWord = false;
//   while (!pickedAWord) {
//     chosenWord = word_keys[index % word_keys.length]
//     image_ChosenWord = chosen_cat.words[chosenWord];
//     pickedAWord = WordListRepeatHolder.add(chosenWord);
//   }
//   index++

//   document.getElementById("theWord").innerHTML = "???";
//   display_ChosenWord = chosenWord;
//   updatePopoutWord();
//   chosenWord = chosenWord.toLowerCase();
// }

function shuffleWords(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function WordGuessed() {
  console.log("WORD GUEESED!");
  wordFound = true;
  document.getElementById("timer_ouput").style.color = "green";
  var winSound = document.getElementById("kids_hooray");
  winSound.volume = 0.5;
  RunConfetti();
  winSound.play();
  GameEnd();
}

async function RunConfetti() {
  confetti.maxCount = 300;
  confetti.particleSpeed = 3;
  confetti.start();
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
  confetti.stop();
}

function WordNotGuessed() {
  if (isConnected && !gameFailed && !wordFound) {
    console.log("WORD NOT GUESSED");
    gameFailed = true;
    document.getElementById("timer_ouput").style.color = "red";
    document.getElementById("wb_output").innerHTML = "...";
    var winSound = document.getElementById("lose_s");
    winSound.volume = 0.9;
    winSound.play();

    GameEnd();
  }
}

function GameEnd() {
  StopTimer();
  document.getElementById("theWord").innerHTML = display_ChosenWord;
  document.getElementById("word_image_placeholder").innerHTML = "<img style=\"display: block;max-width:150px;max-height:150px;width: auto;height: auto; top:0;left:0; right:0; bottom:0; position:absolute; margin:auto\" src=\"" + image_ChosenWord + "\"></img>"

}

//Categories All Swtiches Off Prevention, and Selection
var p = function() {
  var number_of_trues = 0;
  var this_Category_Key = -1;
  console.log("test")
  for (var key in list_of_categories) {
    if (list_of_categories[key].state == true) {
      number_of_trues++;
    }
    if (list_of_categories[key].switch == this.id) {
      this_Category_Key = key;
    }
  }
  if (number_of_trues == 1 && list_of_categories[this_Category_Key].state == true) {
    document.getElementById(this.id).checked = true;
  } else {
    list_of_categories[this_Category_Key].state = !list_of_categories[this_Category_Key].state;
    document.getElementById(this.id).checked = list_of_categories[this_Category_Key].state;
    Setup_Shuffle_Words();
  }
};


//Popout window for word
function PopOutWord() {
  if (pop_window == null || pop_window.closed) {
    pop_window = window.open('Word_PopOut.html', 'PopUpWindow_TCharadesGame', 'height=340,width=550,left=100,top=100,menubar=no,location=no,directories=no, status=yes');
  } else {
    pop_window.focus();
  }
}

window.onbeforeunload = function() {
  if (pop_window != null) {
    pop_window.close();
  }
}

function SetPopOut(ref) {
  pop_window = ref
  SetPopOutValues();

}

function updatePopoutWord() {
  if (pop_window != null) {
    SetPopOutValues();
    pop_window.focus();
  }
}

function SetPopOutValues() {
  pop_window.document.getElementById("word_image_placeholder_pop").innerHTML = "<img style=\"display: block;max-width:150px;max-height:150px;width: auto;height: auto; top:0;left:0; right:0; bottom:0; position:absolute; margin:auto\" src=\"" + image_ChosenWord + "\"></img>"
  pop_window.document.getElementById("theword_ouput").innerHTML = display_ChosenWord;

}

//Tabs hide
var tabs_hide = false;

function HideAllTabs() {
  if (!tabs_hide) {
    var elements = document.getElementsByClassName("visible_tab")
    while (elements.length > 0) {
      elements[0].classList.remove("visible_tab");
    }
    document.getElementById("donatros_acc").classList.add("hidden_tab");
    document.getElementById("wb_instruct").classList.add("hidden_tab");
    document.getElementById("Patch_Notes_DropDown").classList.add("hidden_tab");
    document.getElementById("hide_all_tabs_btn").value = "Show All";
    document.getElementById("settings_layer").classList.add("hidden_tab");

  } else {
    var elements = document.getElementsByClassName("hidden_tab")
    while (elements.length > 0) {
      elements[0].classList.remove("hidden_tab");
    }
    document.getElementById("donatros_acc").classList.add("visible_tab");
    document.getElementById("wb_instruct").classList.add("visible_tab");
    document.getElementById("Patch_Notes_DropDown").classList.add("visible_tab");
    document.getElementById("hide_all_tabs_btn").value = "Hide All";
    document.getElementById("settings_layer").classList.add("visible_tab");
  }
  tabs_hide = !tabs_hide;

}