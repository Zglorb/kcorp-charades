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

var pop_window = null;

//Warpper Object for tracking categories
function Category(p_id, p_state, p_words) {
  this.id = p_id;
  this.state = p_state;
  this.words = p_words;
}
//Awake Function
$(".input").ready(function() {
  list_of_categories.push(new Category("Game_Switch", true, { "Pong": "", "Space Invaders": "", "Pac Man": "", "Donkey Kong": "", "Tetris": "", "Super Mario Bros": "", "Contra": "", "Punch Out": "", "Mega Man": "", "Prince of Persia": "", "SimCity": "", "Monkey Island": "", "Civilization": "", "Lemmings": "", "Sonic": "", "Street Fighter": "", "Mortal Kombat": "", "Wolfenstein": "", "Doom": "", "NBA Jam": "", "Star Fox": "", "Syndicate": "", "EarthBound": "", "Super Metroid": "", "Chrono Trigger": "", "Duke Nukem": "", "Final Fantasy": "", "Pokemon": "", "Quake": "", "Resident Evil": "", "Tomb Raider": "", "Castlevania": "", "GoldenEye 007": "", "Gran Turismo": "", "Tekken": "", "Fallout": "", "Half Life": "", "Metal Gear": "", "SoulCalibur": "", "StarCraft": "", "Age of Empires": "", "Homeworld": "", "Unreal Tournament": "", "Counter Strike": "", "Deus Ex": "", "Diablo": "", "The Sims": "", "Animal Crossing": "", "Grand Theft Auto": "", "Max Payne": "", "Silent Hill": "", "Super Smash Bros": "", "Kingdom Hearts": "", "Metroid Prime": "", "World of Warcraft": "", "God of War": "", "Guitar Hero": "", "Shadow of the Colossus": "", "The Elder Scrolls": "", "Gears of War": "", "Hitman": "", "Wii Sports": "", "BioShock": "", "Call of Duty": "", "Halo": "", "Portal": "", "Super Mario Galaxy": "", "Team Fortress 2": "", "Fortnite": "", "Dead Space": "", "Left 4 Dead": "", "Persona 4": "", "Assassin's Creed": "", "Uncharted": "", "Limbo": "", "Red Dead Redemption": "", "Rock Band": "", "StarCraft II": "", "Super Meat Boy": "", "Dark Souls": "", "Minecraft": "", "Portal 2": "", "The Walking Dead": "", "Dota 2": "", "The Last of Us": "", "Bloodborne": "", "The Witcher 3": "", "Inside": "", "Overwatch": "", "The Legend of Zelda": "", "League Of Legends": "", "Madden": "" }));
  list_of_categories.push(new Category("Twitch_Emotes_Switch", true, { "4Head": "https://static-cdn.jtvnw.net/emoticons/v1/354/3.0", "ANELE": "https://static-cdn.jtvnw.net/emoticons/v1/3792/3.0", "BabyRage": "https://static-cdn.jtvnw.net/emoticons/v1/22639/3.0", "BibleThump": "https://static-cdn.jtvnw.net/emoticons/v1/86/3.0", "BlessRNG": "https://static-cdn.jtvnw.net/emoticons/v1/153556/3.0", "BloodTrail": "https://static-cdn.jtvnw.net/emoticons/v1/69/3.0", "BOP": "https://static-cdn.jtvnw.net/emoticons/v1/301428702/3.0", "BrokeBack": "https://static-cdn.jtvnw.net/emoticons/v1/4057/3.0", "cmonBruh": "https://static-cdn.jtvnw.net/emoticons/v1/84608/3.0", "CoolCat": "https://static-cdn.jtvnw.net/emoticons/v1/58127/3.0", "CoolStoryBob": "https://static-cdn.jtvnw.net/emoticons/v1/123171/3.0", "CurseLit": "https://static-cdn.jtvnw.net/emoticons/v1/116625/3.0", "DansGame": "https://static-cdn.jtvnw.net/emoticons/v1/33/3.0", "DarkMode": "https://static-cdn.jtvnw.net/emoticons/v1/461298/3.0", "DatSheffy": "https://static-cdn.jtvnw.net/emoticons/v1/111700/3.0", "DoritosChip": "https://static-cdn.jtvnw.net/emoticons/v1/102242/3.0", "duDudu": "https://static-cdn.jtvnw.net/emoticons/v1/62834/3.0", "EleGiggle": "https://static-cdn.jtvnw.net/emoticons/v1/4339/3.0", "FailFish": "https://static-cdn.jtvnw.net/emoticons/v1/360/3.0", "FBCatch": "https://static-cdn.jtvnw.net/emoticons/v1/1441281/3.0", "FBPass": "https://static-cdn.jtvnw.net/emoticons/v1/1441271/3.0", "FBRun": "https://static-cdn.jtvnw.net/emoticons/v1/1441261/3.0", "FBSpiral": "https://static-cdn.jtvnw.net/emoticons/v1/1441273/3.0", "FBtouchdown": "https://static-cdn.jtvnw.net/emoticons/v1/626795/3.0", "FrankerZ": "https://static-cdn.jtvnw.net/emoticons/v1/65/3.0", "FutureMan": "https://static-cdn.jtvnw.net/emoticons/v1/98562/3.0", "GivePLZ": "https://static-cdn.jtvnw.net/emoticons/v1/112291/3.0", "GunRun": "https://static-cdn.jtvnw.net/emoticons/v1/1584743/3.0", "HeyGuys": "https://static-cdn.jtvnw.net/emoticons/v1/30259/3.0", "HolidaySanta": "https://static-cdn.jtvnw.net/emoticons/v1/1713822/3.0", "HolidayTree": "https://static-cdn.jtvnw.net/emoticons/v1/1713825/3.0", "HotPokket": "https://static-cdn.jtvnw.net/emoticons/v1/357/3.0", "imGlitch": "https://static-cdn.jtvnw.net/emoticons/v1/112290/3.0", "ItsBoshyTime": "https://static-cdn.jtvnw.net/emoticons/v1/133468/3.0", "Jebaited": "https://static-cdn.jtvnw.net/emoticons/v1/114836/3.0", "KAPOW": "https://static-cdn.jtvnw.net/emoticons/v1/133537/3.0", "Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0", "KappaClaus": "https://static-cdn.jtvnw.net/emoticons/v1/74510/3.0", "KappaPride": "https://static-cdn.jtvnw.net/emoticons/v1/55338/3.0", "KappaRoss": "https://static-cdn.jtvnw.net/emoticons/v1/70433/3.0", "KappaWealth": "https://static-cdn.jtvnw.net/emoticons/v1/81997/3.0", "Kappu": "https://static-cdn.jtvnw.net/emoticons/v1/160397/3.0", "Keepo": "https://static-cdn.jtvnw.net/emoticons/v1/1902/3.0", "KonCha": "https://static-cdn.jtvnw.net/emoticons/v1/160400/3.0", "Kreygasm": "https://static-cdn.jtvnw.net/emoticons/v1/41/3.0", "LUL": "https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0", "Mau5": "https://static-cdn.jtvnw.net/emoticons/v1/30134/3.0", "mcaT": "https://static-cdn.jtvnw.net/emoticons/v1/35063/3.0", "MercyWing1": "https://static-cdn.jtvnw.net/emoticons/v1/1003187/3.0", "MercyWing2": "https://static-cdn.jtvnw.net/emoticons/v1/1003189/3.0", "MingLee": "https://static-cdn.jtvnw.net/emoticons/v1/68856/3.0", "MorphinTime": "https://static-cdn.jtvnw.net/emoticons/v1/156787/3.0", "MrDestructoid": "https://static-cdn.jtvnw.net/emoticons/v1/28/3.0", "NinjaGrumpy": "https://static-cdn.jtvnw.net/emoticons/v1/138325/3.0", "NotLikeThis": "https://static-cdn.jtvnw.net/emoticons/v1/58765/3.0", "OpieOP": "https://static-cdn.jtvnw.net/emoticons/v1/100590/3.0", "PartyHat": " https://static-cdn.jtvnw.net/emoticons/v1/965738/3.0", "PartyTime": "https://static-cdn.jtvnw.net/emoticons/v1/135393/3.0", "PinkMercy": "https://static-cdn.jtvnw.net/emoticons/v1/1003190/3.0", "PipeHype": "https://static-cdn.jtvnw.net/emoticons/v1/4240/3.0", "PixelBob": "https://static-cdn.jtvnw.net/emoticons/v1/1547903/3.0", "PJSalt": "https://static-cdn.jtvnw.net/emoticons/v1/36/3.0", "PJSugar": "https://static-cdn.jtvnw.net/emoticons/v1/102556/3.0", "PogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/3.0", "PopCorn": "https://static-cdn.jtvnw.net/emoticons/v1/724216/3.0", "PowerUpL": "https://static-cdn.jtvnw.net/emoticons/v1/425688/3.0", "PrimeMe": "https://static-cdn.jtvnw.net/emoticons/v1/115075/3.0", "PunchTrees": "https://static-cdn.jtvnw.net/emoticons/v1/47/3.0", "PunOko": "https://static-cdn.jtvnw.net/emoticons/v1/160401/3.0", "ResidentSleeper": "https://static-cdn.jtvnw.net/emoticons/v1/245/3.0", "riPepperonis": "https://static-cdn.jtvnw.net/emoticons/v1/62833/3.0", "SeemsGood": "https://static-cdn.jtvnw.net/emoticons/v1/64138/3.0", "SingsMic": "https://static-cdn.jtvnw.net/emoticons/v1/300116349/3.0", "SingsNote": "https://static-cdn.jtvnw.net/emoticons/v1/300116350/3.0", "SMOrc": "https://static-cdn.jtvnw.net/emoticons/v1/52/3.0", "Squid2": "https://static-cdn.jtvnw.net/emoticons/v1/191763/3.0", "Squid3": "https://static-cdn.jtvnw.net/emoticons/v1/191764/3.0", "Squid4": "https://static-cdn.jtvnw.net/emoticons/v1/191767/3.0", "SSSsss": "https://static-cdn.jtvnw.net/emoticons/v1/46/3.0", "StinkyCheese": "https://static-cdn.jtvnw.net/emoticons/v1/90076/3.0", "SwiftRage": "https://static-cdn.jtvnw.net/emoticons/v1/34/3.0", "TakeNRG": "https://static-cdn.jtvnw.net/emoticons/v1/112292/3.0", "TearGlove": "https://static-cdn.jtvnw.net/emoticons/v1/160403/3.0", "TheIlluminati": "https://static-cdn.jtvnw.net/emoticons/v1/145315/3.0", "TombRaid": "https://static-cdn.jtvnw.net/emoticons/v1/864205/3.0", "TriHard": "https://static-cdn.jtvnw.net/emoticons/v1/120232/3.0", "TwitchLit": "https://static-cdn.jtvnw.net/emoticons/v1/166263/3.0", "twitchRaid": "https://static-cdn.jtvnw.net/emoticons/v1/62836/3.0", "TwitchRPG": "https://static-cdn.jtvnw.net/emoticons/v1/1220086/3.0", "TwitchSings": "https://static-cdn.jtvnw.net/emoticons/v1/300116344/3.0", "TwitchVotes": "https://static-cdn.jtvnw.net/emoticons/v1/479745/3.0", "VoHiYo": "https://static-cdn.jtvnw.net/emoticons/v1/81274/3.0", "VoteNay": "https://static-cdn.jtvnw.net/emoticons/v1/106294/3.0", "VoteYea": "https://static-cdn.jtvnw.net/emoticons/v1/106293/3.0", "WutFace": "https://static-cdn.jtvnw.net/emoticons/v1/28087/3.0" }));
  list_of_categories.push(new Category("Movies_Switch", false, {"Parasite":"","Le Parrain":"","The Dark Knight":"","La Liste de Schindler":"","Le seigneur des anneaux":"","Fight Club":"","Forrest Gump":"","Inception":"","Matrix":"","Les Affranchis":"","Interstellar":"","Il faut sauver le soldat Ryan":"","Le Voyage de Chihiro":"","Les Aventuriers de l'arche perdue":"","Terminator":"","Retour vers le futur":"","Star Wars":"","Shining":"","The Dark Knight Rises":"","Princesse Mononoke":"","Sueurs froides":"","Toy Story":"","Monty Python":"","Inside Out":"","Inglourious Basterds":"","Indiana Jones":"","Batman Begins":"","Là-haut":"","Die Hard":"","Mon voisin Totoro":"","Blade Runner":"","Le Château ambulant":"","Le Loup de Wall Street":"","The Big Lebowski":"","Dragons":"","Le Monde de Nemo":"","Kill Bill":"","Platoon":"","Seul sur Mars":"","Persona":"","Princess Bride":"","The Grand Budapest Hotel":"","Au nom du père":"","Jurassic Park":"","Le Magicien d'Oz":"","Before Sunrise":"","L'Inconnu du Nord-Express":"","The Truman Show":"","Un jour sans fin":"","Monstres et Cie":"","Les Dents de la mer":"","Rocky":"","Harry Potter":"","Avengers":"","Les Gardiens de la Galaxie":"","Pirates des Caraïbes":"","La Belle et la Bête":"","Dumbo":"","Mulan":"","Pocahontas":"","La Princesse et la Grenouille":"","Robin des Bois":"","Snow White":"","Peter Pan":"","La Belle et le Clochard":"","Aladdin":"","Hercules":"","LA LIVRE DE LA JUNGLE":"","Spiderman":"","Valentine's Day":"","Grease":"","Hunger Games":"","Castaway":"","Le Grinch":"","Lolita malgré moi":"","Skyfall":"","L'Odyssée de Pi":"","Breakfast Club":"","Titanic":"","Madagascar":"","Avatar":"","Star Trek":"","Scary Movie":"","Saw":"","Shrek":"","Very Bad Trip":"","Elfe":"","Frankenstein":"","2001, l'Odyssée de l'espace":"","Mary Poppins":"","Braveheart":"","Slumdog Millionaire":"","Wall-E":"","SOS Fantômes":"","Brokeback Mountain":"","Le Roi lion":"","Black Panther":"","Lincoln":"","Dunkerque":"","The Irishman":"","Mad Max":"","The Social Network":"","Moonlight":"","Twilight":"","N'oublie jamais":"","The Fast and the Furious":"","Mamma Mia":"","Zoolander":"","Transformers":"","La Revanche d'une blonde":"","Spy Kids":"","X-Men":"","Serial noceurs":"","Happy Feet":"","Rock Academy":"","Thor":"","Iron Man":"","Les Indestructibles":"","ET":"","Dirty Dancing":"","Top Gun":"","Beetlejuice":"","Maman, j'ai raté l'avion":"","Karaté Kid":"","Winnie l'ourson ":"","Raiponce":"","Les Mondes de Ralph":"","Alice au pays des merveilles":"","Les Nouveaux Héros":"","Tarzan":"","Zootopie":"","La Reine des neiges":"","La Petite Sirène":"","Les 101 Dalmatiens":""}));
  list_of_categories.push(new Category("Live_Streamers_Switch", false, {Gotaga :"https://static-cdn.jtvnw.net/jtv_user_pictures/fbc5661c-7812-4b43-bf5e-16c3ba536d5d-profile_image-150x150.png",Sardoche :"https://static-cdn.jtvnw.net/jtv_user_pictures/sardoche-profile_image-96730a1ede6486f7-300x300.png",Domingo :"https://static-cdn.jtvnw.net/jtv_user_pictures/b84b2c78-9e28-4f13-b2fe-bee20a4824d5-profile_image-300x300.png",Zerator :"https://static-cdn.jtvnw.net/jtv_user_pictures/zerator-profile_image-48eee9de24a47e53-300x300.png",Locklear :"https://static-cdn.jtvnw.net/jtv_user_pictures/70d90ec14808c95f-profile_image-300x300.png",MisterMV :"https://static-cdn.jtvnw.net/jtv_user_pictures/5c8624bb-58df-4152-bde9-158487049a5f-profile_image-300x300.png",Xari :"https://static-cdn.jtvnw.net/jtv_user_pictures/86214da3-1461-44d1-a2e9-43501af29538-profile_image-300x300.jpeg",Xewer :"https://static-cdn.jtvnw.net/jtv_user_pictures/fae99f70-eb00-4b25-ba64-5ae2309c381a-profile_image-300x300.png",Corobizar :"https://static-cdn.jtvnw.net/jtv_user_pictures/38846da3-40da-4dab-9248-08ec98061b8e-profile_image-300x300.png",Maghla :"https://static-cdn.jtvnw.net/jtv_user_pictures/f11c2aa9-4420-4625-be4b-267e07b1807b-profile_image-300x300.jpg",ADZ :"https://static-cdn.jtvnw.net/jtv_user_pictures/ef1579ec-778e-48d1-9410-9f33e952e671-profile_image-300x300.png",Wankil :"https://static-cdn.jtvnw.net/jtv_user_pictures/wankilstudio-profile_image-d4aec5a11445ef41-300x300.jpeg",Moman :"https://static-cdn.jtvnw.net/jtv_user_pictures/395f85c5-042b-458e-8c7d-43057b6a60ac-profile_image-300x300.png",Shaunz :"https://static-cdn.jtvnw.net/jtv_user_pictures/9f47e0a1-3791-439f-bc16-fb5da132c375-profile_image-300x300.png",Alderiate :"https://static-cdn.jtvnw.net/jtv_user_pictures/bed29151-4319-4e3f-9f30-031d9dde1458-profile_image-300x300.png",Etoiles :"https://static-cdn.jtvnw.net/jtv_user_pictures/592b4bc9-9313-4011-9ac9-6853b9f3867a-profile_image-300x300.png",Airwaks :"https://static-cdn.jtvnw.net/jtv_user_pictures/abef0b6e-8caf-4850-ab65-f2f8f536b3ab-profile_image-300x300.png",loltyler1 :"https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png",Castro_1021 :"https://static-cdn.jtvnw.net/jtv_user_pictures/ed0f84d6-2d2d-4c4e-a5fe-7a3cc365684a-profile_image-300x300.jpg",Tfue :"https://static-cdn.jtvnw.net/jtv_user_pictures/2470b5c6-a737-4ba6-8987-c28e0ca839e1-profile_image-300x300.jpg",DrDisrespect :"https://static-cdn.jtvnw.net/jtv_user_pictures/72a69c72-14b9-4be8-b8cb-802bc3e5f8ed-profile_image-300x300.png",Pokimane :"https://static-cdn.jtvnw.net/jtv_user_pictures/beeafc17-3ebe-4e1d-b250-404f1ea56988-profile_image-300x300.png",BobRoss :"https://static-cdn.jtvnw.net/jtv_user_pictures/bobross-profile_image-0b9dd167a9bb16b5-300x300.jpeg",Narkuss :"https://pbs.twimg.com/profile_images/1200212281902141445/Yt-dG0MV_400x400.jpg","Bruce Grannec" :"https://pbs.twimg.com/profile_images/1235209766856687617/I2GEqqfc_400x400.jpg",Brak :"https://pbs.twimg.com/profile_images/1140013072406499328/J3uPtVkY_400x400.png",Brawks :"https://pbs.twimg.com/profile_images/1234815124214571008/MIxGR1LR_400x400.jpg","Manuel Ferrara":"https://pbs.twimg.com/profile_images/1078738489515040768/BHciyXWH_400x400.jpg",KennyStream:"https://pbs.twimg.com/profile_images/1113122141652881409/TnjdKOfG_400x400.png",Jbzz:"https://pbs.twimg.com/profile_images/1224461293819744256/K7Q1Ii9D_400x400.jpg",Chap:"https://pbs.twimg.com/profile_images/1233367597351088129/sSgjQCqQ_400x400.jpg",Doigby :"https://pbs.twimg.com/profile_images/1235164507657379840/I4XYA40a_400x400.jpg",LRB:"https://pbs.twimg.com/profile_images/1234133874093035520/nbUSaitp_400x400.jpg"}));
  list_of_categories.push(new Category("Youtube_Channels_Switch", false, {"Squeezie" :"https://yt3.ggpht.com/a/AGF-l7_iBctP_s6zwVZyaBgXVDnS7CGbujA2PeoxvA=s900-c-k-c0xffffffff-no-rj-mo","Tibo inShape" :"https://yt3.ggpht.com/a/AATXAJyZi7LMgYuKIWhdynS5mUl3yNBQUGe1yqOC6g=s288-c-k-c0xffffffff-no-rj-mo","Mister V": "https://yt3.ggpht.com/a/AATXAJzINFYGN_DZnlgm2Nm60sWronDvgkRLqL4Q=s288-c-k-c0xffffffff-no-rj-mo","Mcfly & Carlito" :"https://yt3.ggpht.com/a/AATXAJwIY5nzr5jeeyuOKGr5sD3H4njjcwIJFL4khw=s288-c-k-c0xffffffff-no-rj-mo","Le Rire Jaune" :"https://yt3.ggpht.com/a/AATXAJxejfBHuPh0f0fzkNlDdV4iosRtiwvRpZQTdw=s288-c-k-c0xffffffff-no-rj-mo","Ibra TV" :"https://yt3.ggpht.com/a/AATXAJyyzmJpjoGPYWNeRmEYkncjcpYVJq0vlD1RsA=s288-c-k-c0xffffffff-no-rj-mo","FastGoodCuisine" :"https://yt3.ggpht.com/a/AATXAJwqf4debNVHtu6gL91Bv3Ke5pFe6onfqau58Q=s288-c-k-c0xffffffff-no-rj-mo","Golden Moustach":"https://yt3.ggpht.com/a/AATXAJx6A_XoXD8BAA5pHrZTtYcF9KBa9CbVCRX2=s288-c-k-c0xffffffff-no-rj-mo","Joueur du grenier" : "https://yt3.ggpht.com/a/AATXAJyty6uEbV0hiv9uXS0nlb3HQ8f3AIK5FucN5g=s288-c-k-c0xffffffff-no-rj-mo","TheKairi78" :"https://yt3.ggpht.com/a/AATXAJwh0RbQQ-iedphSmtSTP1UXmrVkXoZY1G2g-Q=s288-c-k-c0xffffffff-no-rj-mo","Wass Freestyle" :"https://yt3.ggpht.com/a/AATXAJzfVdJxEKstuuPr87T1PsFHCqOQEkVQ7T46sg=s288-c-k-c0xffffffff-no-rj-mo","MrLEV12" :"https://yt3.ggpht.com/a/AATXAJyySqt4G965X8lkf-SFOzU9S8Sv-my0WVEzBw=s288-c-k-c0xffffffff-no-rj-mo","Wankil Studio" :"https://yt3.ggpht.com/a/AATXAJwu4Dzu-BlRplEws_DNmACUD_TMkGeL0riWAg=s288-c-k-c0xffffffff-no-rj-mo","Cyprien": "https://pbs.twimg.com/profile_images/1216320408263237632/fcOUSnJp_400x400.jpg","Lerirejaune": "https://pbs.twimg.com/profile_images/1183595483861786625/yo7c24Zx_400x400.jpg","Prime": "https://yt3.ggpht.com/a/AATXAJz_CUaEk9e5UlHpMAsgLeKUr80spSGmnenyww=s288-c-k-c0xffffffff-no-rj-mo","Mehdi Ba": "https://pbs.twimg.com/profile_images/1205791894342492161/95i6fXxU_400x400.jpg","EnjoyPhoenix": "https://resize-elle.ladmedia.fr/r/625,,forcex/crop/625,804,center-middle,forcex,ffffff/img/var/plain_site/storage/images/beaute/news-beaute/beaute-des-stars/rencontre-la-revolution-d-enjoyphoenix-3464558/78967730-1-fre-FR/Rencontre-La-revolution-d-EnjoyPhoenix.jpg","Sofyan": "https://pbs.twimg.com/profile_images/807663208551026688/LYxbE8nE_400x400.jpg","Kenny": "https://i.ytimg.com/vi/y3pSlUuJIME/maxresdefault.jpg","PFUT" :"https://vignette.wikia.nocookie.net/youtuberfrancais/images/b/b3/DFwnIiYXgAQCs4l.jpg/revision/latest?cb=20170809031822&path-prefix=fr","IchibanJapan": "https://pbs.twimg.com/profile_images/1029611127838134272/vTXdxJ1r.jpg"}));
  list_of_categories.push(new Category("Pokemon_Switch", false, {Bulbizarre:"https://img.pokemondb.net/artwork/bulbasaur.jpg",Salamèche:"https://img.pokemondb.net/artwork/charmander.jpg",Dracaufeu:"https://img.pokemondb.net/artwork/charizard.jpg",Carapuce:"https://img.pokemondb.net/artwork/squirtle.jpg",Tortank:"https://img.pokemondb.net/artwork/blastoise.jpg",Chenipan:"https://img.pokemondb.net/artwork/caterpie.jpg",Chrysacier:"https://img.pokemondb.net/artwork/metapod.jpg",Papilusion:"https://img.pokemondb.net/artwork/butterfree.jpg",Dardagnan:"https://img.pokemondb.net/artwork/beedrill.jpg",Roucool:"https://img.pokemondb.net/artwork/pidgey.jpg",Rattata:"https://img.pokemondb.net/artwork/rattata.jpg",Abo:"https://img.pokemondb.net/artwork/ekans.jpg",Arbok:"https://img.pokemondb.net/artwork/arbok.jpg",Pikachu:"https://img.pokemondb.net/artwork/pikachu.jpg",Raichu:"https://img.pokemondb.net/artwork/raichu.jpg",Mélofée:"https://img.pokemondb.net/artwork/clefairy.jpg",Goupix:"https://img.pokemondb.net/artwork/vulpix.jpg",Feunard:"https://img.pokemondb.net/artwork/ninetales.jpg",Rondoudou:"https://img.pokemondb.net/artwork/jigglypuff.jpg",Grodoudou:"https://img.pokemondb.net/artwork/wigglytuff.jpg",Nosferapti:"https://img.pokemondb.net/artwork/zubat.jpg ",Nosferalto:"https://img.pokemondb.net/artwork/golbat.jpg",Paras:"https://img.pokemondb.net/artwork/paras.jpg",Parasect:"https://img.pokemondb.net/artwork/parasect.jpg",Taupiqueur:"https://img.pokemondb.net/artwork/diglett.jpg",Triopikeur:"https://img.pokemondb.net/artwork/dugtrio.jpg",Miaouss:"https://img.pokemondb.net/artwork/meowth.jpg",Psykokwak:"https://img.pokemondb.net/artwork/psyduck.jpg",Férosinge:"https://img.pokemondb.net/artwork/mankey.jpg",Caninos:"https://img.pokemondb.net/artwork/growlithe.jpg",Ptitard:"https://img.pokemondb.net/artwork/poliwag.jpg",Têtarte:"https://img.pokemondb.net/artwork/poliwhirl.jpg",Abra:"https://img.pokemondb.net/artwork/abra.jpg",Kadabra:"https://img.pokemondb.net/artwork/kadabra.jpg",Alakazam:"https://img.pokemondb.net/artwork/alakazam.jpg",Machoc:"https://img.pokemondb.net/artwork/machop.jpg",Chétiflor:"https://img.pokemondb.net/artwork/bellsprout.jpg",Racaillou:"https://img.pokemondb.net/artwork/geodude.jpg",Ponyta:"https://img.pokemondb.net/artwork/ponyta.jpg",Ramoloss:"https://img.pokemondb.net/artwork/slowpoke.jpg",Otaria:"https://img.pokemondb.net/artwork/seel.jpg",Grotadmorv:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/089.png",Ectoplasma:"https://img.pokemondb.net/artwork/gengar.jpg",Onix:"https://img.pokemondb.net/artwork/onix.jpg",Soporifik:"https://img.pokemondb.net/artwork/drowzee.jpg",Hypnomade:"https://img.pokemondb.net/artwork/hypno.jpg",Krabby:"https://img.pokemondb.net/artwork/krabby.jpg",Voltorb:"https://img.pokemondb.net/artwork/voltorb.jpg",Osselait:"https://img.pokemondb.net/artwork/cubone.jpg",Kicklee:"https://img.pokemondb.net/artwork/hitmonlee.jpg",Tygnon:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-Gd3i0Q3uu0DOpabAsh_V4k3srPikUQ0XZ-0TWqt6nv07G-9y",Excelangue:"https://img.pokemondb.net/artwork/lickitung.jpg",Leveinard:"https://img.pokemondb.net/artwork/chansey.jpg",Saquedeneu:"https://img.pokemondb.net/artwork/tangela.jpg",Stari:"https://img.pokemondb.net/artwork/staryu.jpg","Mr Mime":"https://img.pokemondb.net/artwork/large/mr-mime.jpg",Insécateur:"https://img.pokemondb.net/artwork/scyther.jpg",Tauros:"https://img.pokemondb.net/artwork/tauros.jpg",Magikarp:"https://img.pokemondb.net/artwork/magikarp.jpg",Métamorph:"https://img.pokemondb.net/artwork/ditto.jpg",Amonita:"https://img.pokemondb.net/artwork/omanyte.jpg",Ronflex:"https://img.pokemondb.net/artwork/snorlax.jpg",Mewtwo:"https://img.pokemondb.net/artwork/mewtwo.jpg",Mew:"https://img.pokemondb.net/artwork/mew.jpg",Absol:"https://img.pokemondb.net/artwork/absol.jpg",Lucario:"https://img.pokemondb.net/artwork/lucario.jpg",Tiplouf:"https://img.pokemondb.net/artwork/piplup.jpg",Spinda:"https://img.pokemondb.net/artwork/spinda.jpg",Spoink:"https://img.pokemondb.net/artwork/spoink.jpg",Charpenti:"https://img.pokemondb.net/artwork/timburr.jpg",Apitrini:"https://img.pokemondb.net/artwork/combee.jpg",Amphinobi:"https://img.pokemondb.net/artwork/greninja.jpg",Baggaïd:"https://img.pokemondb.net/artwork/scrafty.jpg",Qulbutoké:"https://img.pokemondb.net/artwork/wobbuffet.jpg",Trousselin:"https://img.pokemondb.net/artwork/klefki.jpg",Larméléon:"https://img.pokemondb.net/artwork/sobble.jpg",Ouistempo:"https://img.pokemondb.net/artwork/grookey.jpg",Khélocrok:"https://img.pokemondb.net/artwork/chewtle.jpg"}))
  for (var cate in list_of_categories) {
    list_of_categories[cate].state = document.getElementById(list_of_categories[cate].id).checked
  };
  Setup_Shuffle_Words();
})

const {
  chat,
  api
} = new TwitchJs({
  log: { enabled: false },
});

function StartGame() {
  ConnectTwtichChat();
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

function ConnectTwtichChat() {
  const channel = document.getElementById("channelName").value;

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
              if (clean_message.toLowerCase().search("^" + chosenWord) != -1) {
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
  var timer = duration,
    minutes, seconds;

  var runner = function() {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);
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
  image_ChosenWord = word_obj_concat[chosenWord];
  word_cur_index++;
  if (word_cur_index == random_word_list_keys.length) {
    Setup_Shuffle_Words();
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

  for (var key in list_of_categories) {
    if (list_of_categories[key].state == true) {
      number_of_trues++;
    }
    if (list_of_categories[key].id == this.id) {
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
    document.getElementById("hide_all_tabs_btn").value = "Show All";;
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