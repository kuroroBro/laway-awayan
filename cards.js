// Laway-awayan — the deck.
// Every card is ONE clue phrase of exactly one or two words — nothing
// longer. There is no top/full-phrase split (see specs/001-laway-awayan
// for why): the mouther mouths this phrase silently, their team lip-reads
// it and shouts a guess. Points are derived from word count at score time
// in app.js, not stored here.
const CATEGORIES = {
  "Big Mouth Basics": [
    { phrase: "Banana" }, { phrase: "Pizza" }, { phrase: "Umbrella" },
    { phrase: "Elephant" }, { phrase: "Toothbrush" }, { phrase: "Balloon" },
    { phrase: "Spaghetti" }, { phrase: "Bicycle" }, { phrase: "Sandwich" },
    { phrase: "Pillow" }, { phrase: "Volcano" }, { phrase: "Butterfly" },
    { phrase: "Skateboard" }, { phrase: "Waterfall" }, { phrase: "Popcorn" },
    { phrase: "Sunglasses" }, { phrase: "Watermelon" }, { phrase: "Flashlight" },
    { phrase: "Backpack" }, { phrase: "Rainbow" }, { phrase: "Octopus" },
    { phrase: "Trampoline" }, { phrase: "Refrigerator" }, { phrase: "Helicopter" }
  ],
  "Filipino Eats": [
    { phrase: "Adobo" }, { phrase: "Sinigang" }, { phrase: "Lechon" },
    { phrase: "Halo-Halo" }, { phrase: "Pancit" }, { phrase: "Lumpia" },
    { phrase: "Sisig" }, { phrase: "Tocino" }, { phrase: "Bibingka" },
    { phrase: "Kwek Kwek" }, { phrase: "Taho" }, { phrase: "Balut" },
    { phrase: "Longganisa" }, { phrase: "Kare-Kare" }, { phrase: "Champorado" },
    { phrase: "Turon" }, { phrase: "Sorbetes" }, { phrase: "Dinuguan" },
    { phrase: "Palabok" }, { phrase: "Tapsilog" }, { phrase: "Buko Juice" },
    { phrase: "Fishball" }, { phrase: "Isaw" }, { phrase: "Puto" }
  ],
  "Star Power": [
    { phrase: "Beyonce" }, { phrase: "Manny Pacquiao" }, { phrase: "Taylor Swift" },
    { phrase: "Dwayne Johnson" }, { phrase: "Rihanna" }, { phrase: "Kobe Bryant" },
    { phrase: "Oprah" }, { phrase: "Messi" }, { phrase: "Adele" },
    { phrase: "Elon Musk" }, { phrase: "Beckham" }, { phrase: "Madonna" },
    { phrase: "LeBron James" }, { phrase: "Shakira" }, { phrase: "Ronaldo" },
    { phrase: "Jackie Chan" }, { phrase: "Serena Williams" }, { phrase: "Drake" },
    { phrase: "Ed Sheeran" }, { phrase: "Vice Ganda" }, { phrase: "Darna" },
    { phrase: "Judy Ann" }, { phrase: "Coco Martin" }
  ],
  "Screen Time": [
    { phrase: "Frozen" }, { phrase: "Moana" }, { phrase: "Encanto" },
    { phrase: "Barbie" }, { phrase: "Shrek" }, { phrase: "Titanic" },
    { phrase: "Avatar" }, { phrase: "Aladdin" }, { phrase: "Coco" },
    { phrase: "Toy Story" }, { phrase: "Iron Man" }, { phrase: "Batman" },
    { phrase: "Zootopia" }, { phrase: "Ratatouille" }, { phrase: "Squid Game" },
    { phrase: "Wednesday" }, { phrase: "Inception" }, { phrase: "Gladiator" },
    { phrase: "Minions" }, { phrase: "Up" }, { phrase: "Cars" },
    { phrase: "Jaws" }, { phrase: "Ted" }
  ],
  "Wild Kingdom": [
    { phrase: "Giraffe" }, { phrase: "Penguin" }, { phrase: "Kangaroo" },
    { phrase: "Crocodile" }, { phrase: "Flamingo" }, { phrase: "Hedgehog" },
    { phrase: "Chameleon" }, { phrase: "Peacock" }, { phrase: "Gorilla" },
    { phrase: "Jellyfish" }, { phrase: "Rhinoceros" }, { phrase: "Ostrich" },
    { phrase: "Squirrel" }, { phrase: "Tarsier" }, { phrase: "Carabao" },
    { phrase: "Komodo Dragon" }, { phrase: "Sea Turtle" }, { phrase: "Manta Ray" },
    { phrase: "Anteater" }, { phrase: "Platypus" }, { phrase: "Armadillo" },
    { phrase: "Mongoose" }, { phrase: "Walrus" }
  ],
  "Sports & Games": [
    { phrase: "Basketball" }, { phrase: "Swimming" }, { phrase: "Boxing" },
    { phrase: "Push-Up" }, { phrase: "Jump Rope" }, { phrase: "Patintero" },
    { phrase: "Rope Pull" }, { phrase: "Sipa" }, { phrase: "Piko" },
    { phrase: "Bowling" }, { phrase: "Skateboarding" }, { phrase: "Yoga" },
    { phrase: "Volleyball" }, { phrase: "Badminton" }, { phrase: "Wrestling" },
    { phrase: "Karate" }, { phrase: "Cheer Dance" }, { phrase: "Arm Wrestle" },
    { phrase: "Sepak Takraw" }, { phrase: "Chess" }, { phrase: "Zumba" },
    { phrase: "Marathon" }, { phrase: "Surfing" }
  ],
  "Internet Famous": [
    { phrase: "Selfie" }, { phrase: "Viral Video" }, { phrase: "Hashtag" },
    { phrase: "Livestream" }, { phrase: "Group Chat" }, { phrase: "Meme" },
    { phrase: "Podcast" }, { phrase: "Influencer" }, { phrase: "Screenshot" },
    { phrase: "Emoji" }, { phrase: "Wifi Password" }, { phrase: "Airdrop" },
    { phrase: "Ring Light" }, { phrase: "Voice Note" }, { phrase: "Blue Check" },
    { phrase: "Data Plan" }, { phrase: "QR Code" }, { phrase: "Trending" },
    { phrase: "Buffering" }, { phrase: "Low Battery" }, { phrase: "Airplane Mode" },
    { phrase: "Slow Motion" }, { phrase: "Face Filter" }
  ],
  "Places to Go": [
    { phrase: "Boracay" }, { phrase: "Palawan" }, { phrase: "Baguio" },
    { phrase: "Tokyo" }, { phrase: "Paris" }, { phrase: "New York" },
    { phrase: "Dubai" }, { phrase: "Cebu" }, { phrase: "Siargao" },
    { phrase: "Batanes" }, { phrase: "Bali" }, { phrase: "Venice" },
    { phrase: "Sagada" }, { phrase: "Vigan" }, { phrase: "Bohol" },
    { phrase: "Seoul" }, { phrase: "London" }, { phrase: "Grand Canyon" },
    { phrase: "Mount Fuji" }, { phrase: "Niagara Falls" }, { phrase: "Antarctica" },
    { phrase: "Machu Picchu" }, { phrase: "Sahara" }
  ],
  "Everyday Chaos": [
    { phrase: "Alarm Clock" }, { phrase: "Traffic Jam" }, { phrase: "Karaoke" },
    { phrase: "Brownout" }, { phrase: "Tricycle" }, { phrase: "Jeepney" },
    { phrase: "Sari-Sari Store" }, { phrase: "Rubber Slippers" }, { phrase: "Fiesta" },
    { phrase: "Mosquito Net" }, { phrase: "Sack Race" }, { phrase: "Videoke" },
    { phrase: "Umbrella Stand" }, { phrase: "Parking Ticket" }, { phrase: "Extension Cord" },
    { phrase: "Dishwashing Liquid" }, { phrase: "Aircon Remote" }, { phrase: "Charging Cable" },
    { phrase: "Grocery List" }, { phrase: "Piggy Bank" }, { phrase: "Photobomb" },
    { phrase: "Tissue Paper" }, { phrase: "House Key" }
  ]
};
