"""
PAN-INDIA ADMINISTRATIVE BOUNDARY DATA
Comprehensive coverage of all 36 States & Union Territories of India,
with hierarchical administrative levels: State -> District -> Circle/Anchal/Tehsil -> Mauza/Village.
Used by NIRVIVAAD for cascading dropdowns and authentic cadastral verification.
"""

ALL_INDIAN_LOCATIONS = {
    "Andhra Pradesh": {
        "Visakhapatnam": {
            "Visakhapatnam Rural": [
                "Bheemunipatnam",
                "Madhurawada",
                "Rushikonda",
                "Yendada",
                "Anandapuram"
            ],
            "Visakhapatnam Urban": [
                "Gajuwaka",
                "Gopalapatnam",
                "Maharanipeta",
                "Seethammadhara"
            ],
            "Anakapalle": [
                "Kasimkota",
                "Munagapaka",
                "Parawada",
                "Atchutapuram"
            ]
        },
        "Vijayawada (NTR)": {
            "Vijayawada Urban": [
                "Bhavanipuram",
                "Gunadala",
                "Patamata",
                "Satyanarayanapuram"
            ],
            "Vijayawada Rural": [
                "Gollapudi",
                "Nunna",
                "Enikepadu",
                "Prasadampadu"
            ],
            "Jaggayyapeta": [
                "Chillakallu",
                "Shermohammadpeta",
                "Muktyala"
            ]
        },
        "Guntur": {
            "Guntur East": [
                "Nallapadu",
                "Pedakakani",
                "Kaza",
                "Mangalagiri"
            ],
            "Guntur West": [
                "Gorantla",
                "Perecherla",
                "Medikonduru",
                "Prathipadu"
            ],
            "Tenali": [
                "Angalakuduru",
                "Chinaravuru",
                "Pinapadu"
            ]
        },
        "Tirupati": {
            "Tirupati Urban": [
                "Renigunta",
                "Chandragiri",
                "Alipiri",
                "Tiruchanur"
            ],
            "Srikalahasti": [
                "Thottambedu",
                "Yerpedu",
                "Kothapeta"
            ]
        }
    },
    "Arunachal Pradesh": {
        "Papum Pare": {
            "Itanagar Capital": [
                "Chimpu",
                "Ganga",
                "Naharlagun",
                "Nirjuli",
                "Doimukh"
            ],
            "Sagalee": [
                "Leporiang",
                "Mengio",
                "Toru"
            ]
        },
        "Tawang": {
            "Tawang Tehsil": [
                "Lhou",
                "Mukto",
                "Kipchar",
                "Kitpi",
                "Lumla"
            ]
        },
        "Changlang": {
            "Changlang Tehsil": [
                "Jairampur",
                "Miao",
                "Bordumsa",
                "Diyun"
            ]
        }
    },
    "Assam": {
        "Kamrup Metropolitan": {
            "Guwahati Sadar": [
                "Dispur",
                "Beltola",
                "Panbazar",
                "Jalukbari",
                "Noonmati"
            ],
            "Azara": [
                "Dharapur",
                "Kahikuchi",
                "Mirza",
                "Rani"
            ],
            "Sonapur": [
                "Khetri",
                "Dimoria",
                "Hatimura"
            ]
        },
        "Cachar (Silchar)": {
            "Silchar Sadar": [
                "Rongpur",
                "Tarapur",
                "Meherpur",
                "Udarbond"
            ],
            "Sonai": [
                "Kachudaram",
                "Palonghat",
                "Dholai"
            ]
        },
        "Dibrugarh": {
            "Dibrugarh East": [
                "Chabua",
                "Tingkhong",
                "Naharkatia"
            ],
            "Dibrugarh West": [
                "Barbaruah",
                "Khowang",
                "Moran"
            ]
        },
        "Jorhat": {
            "Jorhat Sadar": [
                "Titabar",
                "Mariani",
                "Teok",
                "Majuli Ghat"
            ]
        }
    },
    "Bihar": {
        "Muzaffarpur": {
            "Muzaffarpur Sadar": [
                "Kanti",
                "Damodarpur",
                "Mustafapur",
                "Bhikhanpur",
                "Japaha"
            ],
            "Kanti": [
                "Kanti Kasba",
                "Bela",
                "Kolhua",
                "Jaitpur",
                "Sarairanjan"
            ],
            "Motipur": [
                "Motipur Bazar",
                "Baruraj",
                "Mahmadpur",
                "Patepur"
            ],
            "Sakra": [
                "Sakra Kasba",
                "Dholi",
                "Pochha",
                "Ramsheela"
            ],
            "Sahebganj": [
                "Bishunpur",
                "Bangra",
                "Pahar Chak"
            ]
        },
        "Patna": {
            "Patna Sadar": [
                "Digha",
                "Bankipur",
                "Kankarbagh",
                "Rajvanshi Nagar",
                "Pataliputra"
            ],
            "Danapur": [
                "Danapur Cantt",
                "Saguna",
                "Khagaul",
                "Mustafapur"
            ],
            "Phulwari Sharif": [
                "Phulwari",
                "Nohsa",
                "Sampatchak",
                "Janipur"
            ],
            "Barh": [
                "Mokama",
                "Bakhtiyarpur",
                "Athmalgola",
                "Pandarak"
            ],
            "Masaurhi": [
                "Taregna",
                "Dhanarua",
                "Punpun",
                "Kadirganj"
            ]
        },
        "Gaya": {
            "Gaya Sadar": [
                "Bodhgaya",
                "Tekari",
                "Manpur",
                "Civil Lines",
                "Chandauti"
            ],
            "Sherghati": [
                "Dobhi",
                "Barachatti",
                "Gurua",
                "Amas"
            ],
            "Wazirganj": [
                "Atri",
                "Neemchak Bathani",
                "Khizirsarai"
            ]
        },
        "Bhagalpur": {
            "Bhagalpur Sadar": [
                "Sabour",
                "Nathnagar",
                "Jagdishpur",
                "Champanagar"
            ],
            "Kahalgaon": [
                "Pirpainti",
                "Colgong",
                "Sanokhar"
            ],
            "Naugachhia": [
                "Gopalpur",
                "Bihpur",
                "Ismailpur"
            ]
        },
        "Darbhanga": {
            "Darbhanga Sadar": [
                "Laheriasarai",
                "Bahadurpur",
                "Keoti",
                "Hayaghat"
            ],
            "Benipur": [
                "Alinagar",
                "Baheri",
                "Biraul"
            ]
        },
        "Purnia": {
            "Purnia Sadar": [
                "Kasba",
                "Krittanand Nagar",
                "Maranga"
            ],
            "Banmankhi": [
                "Dhamdaha",
                "Bada Hara",
                "Rupauli"
            ]
        }
    },
    "Chhattisgarh": {
        "Raipur": {
            "Raipur Sadar": [
                "Telibandha",
                "Pandri",
                "Devendra Nagar",
                "Shankar Nagar"
            ],
            "Abhanpur": [
                "Naya Raipur",
                "Utai",
                "Khorpa"
            ],
            "Arang": [
                "Mandir Hasaud",
                "Gullu",
                "Rasni"
            ]
        },
        "Durg": {
            "Durg Tehsil": [
                "Bhilai Nagar",
                "Bhilai Charoda",
                "Risali",
                "Supela"
            ],
            "Patan": [
                "Jamgaon",
                "Ranitarai",
                "Selud"
            ]
        },
        "Bilaspur": {
            "Bilaspur Sadar": [
                "Tifra",
                "Sarkanda",
                "Bodri",
                "Sirgitti"
            ],
            "Kota": [
                "Ratanpur",
                "Lormi",
                "Belgahna"
            ]
        }
    },
    "Goa": {
        "North Goa": {
            "Tiswadi": [
                "Panaji",
                "Old Goa",
                "Ribandar",
                "Santa Cruz",
                "Bambolim"
            ],
            "Bardez": [
                "Mapusa",
                "Calangute",
                "Candolim",
                "Porvorim",
                "Anjuna"
            ],
            "Pernem": [
                "Arambol",
                "Mandrem",
                "Morjim",
                "Dhargalim"
            ]
        },
        "South Goa": {
            "Salcete": [
                "Margao",
                "Colva",
                "Benaulim",
                "Fatorda",
                "Navelim"
            ],
            "Mormugao": [
                "Vasco da Gama",
                "Dabolim",
                "Chicalim",
                "Cortalim"
            ]
        }
    },
    "Gujarat": {
        "Ahmedabad": {
            "Ahmedabad City": [
                "Navrangpura",
                "Maninagar",
                "Paldi",
                "Satellite",
                "Vastrapur"
            ],
            "Daskroi": [
                "Bopal",
                "Ghatlodia",
                "Chandkheda",
                "Sanand Road"
            ],
            "Sanand": [
                "Kundal",
                "Charodi",
                "Nidhrad",
                "Chekhla"
            ]
        },
        "Surat": {
            "Surat City": [
                "Adajan",
                "Vesu",
                "Katargam",
                "Varachha",
                "Rander"
            ],
            "Chorasi": [
                "Dumas",
                "Sachin",
                "Magdalla",
                "Hazira"
            ],
            "Olpad": [
                "Sayan",
                "Karanj",
                "Hathisa"
            ]
        },
        "Vadodara": {
            "Vadodara East": [
                "Sayajigunj",
                "Alkapuri",
                "Fatehgunj",
                "Karelibaug"
            ],
            "Vadodara Rural": [
                "Padra",
                "Waghodia",
                "Savli",
                "Dabhoi"
            ]
        },
        "Rajkot": {
            "Rajkot Urban": [
                "University Road",
                "Kalawad Road",
                "Bhaktinagar",
                "Morbi Road"
            ],
            "Kotda Sangani": [
                "Gondal",
                "Shapar Veraval",
                "Ribda"
            ]
        }
    },
    "Haryana": {
        "Gurugram": {
            "Gurugram Wazirabad": [
                "DLF Phase 1-5",
                "Sushant Lok",
                "Sector 54",
                "Wazirabad"
            ],
            "Badshahpur": [
                "Sohna Road",
                "Sector 48",
                "Tigra",
                "Ghata",
                "Fazilpur"
            ],
            "Pataudi": [
                "Haileymandi",
                "Manesar",
                "Bilaspur",
                "Bhorakalan"
            ]
        },
        "Faridabad": {
            "Faridabad NIT": [
                "Sector 15",
                "Sector 16",
                "Old Faridabad",
                "Ballabhgarh"
            ],
            "Badkhal": [
                "Ankhir",
                "Surajkund",
                "Mewla Maharajpur"
            ]
        },
        "Panipat": {
            "Panipat City": [
                "Model Town",
                "Samalkha",
                "Israna",
                "Madlauda"
            ]
        },
        "Ambala": {
            "Ambala City": [
                "Ambala Cantt",
                "Barara",
                "Naraingarh",
                "Saha"
            ]
        }
    },
    "Himachal Pradesh": {
        "Shimla": {
            "Shimla Urban": [
                "Mall Road",
                "Chotta Shimla",
                "Sanjauli",
                "Kasumpti",
                "Dhalli"
            ],
            "Shimla Rural": [
                "Theog",
                "Mashobra",
                "Kufri",
                "Rampur Bushahr"
            ]
        },
        "Kangra": {
            "Dharamshala": [
                "McLeod Ganj",
                "Yol Cantt",
                "Palampur",
                "Kangra Town"
            ],
            "Nurpur": [
                "Jawali",
                "Fatehpur",
                "Indora"
            ]
        },
        "Mandi": {
            "Mandi Sadar": [
                "Sundernagar",
                "Sarkaghat",
                "Jogindernagar",
                "Karsog"
            ]
        }
    },
    "Jharkhand": {
        "Ranchi": {
            "Ranchi Sadar": [
                "Doranda",
                "Hinoo",
                "Morabadi",
                "Bariatu",
                "Harmu"
            ],
            "Kanke": [
                "Arsande",
                "Mesra",
                "Pithoria",
                "Boreya"
            ],
            "Namkum": [
                "Tatisilwai",
                "Chutia",
                "Lalpur",
                "Khunti Road"
            ],
            "Ratu": [
                "Tungri",
                "Kamre",
                "Simalia"
            ]
        },
        "Dhanbad": {
            "Dhanbad Sadar": [
                "Jharia",
                "Katras",
                "Govindpur",
                "Saraidhela"
            ],
            "Nirsa": [
                "Chirkunda",
                "Barakar Border",
                "Mugma"
            ]
        },
        "East Singhbhum (Jamshedpur)": {
            "Jamshedpur Urban": [
                "Bistupur",
                "Sakchi",
                "Kadma",
                "Telco",
                "Sonari"
            ],
            "Ghatshila": [
                "Chakulia",
                "Musabani",
                "Dhalbhumgarh"
            ]
        },
        "Bokaro": {
            "Chas": [
                "Sector 4",
                "Sector 9",
                "Chas Town",
                "Pindrajora"
            ],
            "Bermo": [
                "Phusro",
                "Gomia",
                "Chandrapura"
            ]
        }
    },
    "Karnataka": {
        "Bengaluru Urban": {
            "Bengaluru North": [
                "Yelahanka",
                "Hebbal",
                "Jalahalli",
                "Peenya",
                "Malleshwaram"
            ],
            "Bengaluru South": [
                "Jayanagar",
                "JP Nagar",
                "BTM Layout",
                "Electronic City",
                "Bannerghatta"
            ],
            "Bengaluru East": [
                "Indiranagar",
                "Whitefield",
                "Marathahalli",
                "K.R. Puram",
                "Bellandur"
            ],
            "Anekal": [
                "Sarjapur",
                "Attibele",
                "Chandapura",
                "Bommasandra"
            ]
        },
        "Belagavi": {
            "Belagavi Taluka": [
                "Yadgir",
                "Vadgaon",
                "Shahapur",
                "Tilakwadi",
                "Khasbag"
            ],
            "Gokak": [
                "Gokak Falls",
                "Konnur",
                "Ankalgi"
            ],
            "Chikkodi": [
                "Nipani",
                "Sadalga",
                "Examba"
            ]
        },
        "Mysuru": {
            "Mysuru Urban": [
                "Kuvempunagar",
                "Vijayanagar",
                "Jayalakshmipuram",
                "Gokulam"
            ],
            "Nanjangud": [
                "Hunsur",
                "T. Narasipura",
                "K.R. Nagar"
            ]
        },
        "Dharwad": {
            "Hubballi Urban": [
                "Vidyanagar",
                "Keshwapur",
                "Old Hubballi",
                "Navanagar"
            ],
            "Dharwad Sadar": [
                "Saptapur",
                "Sadhankeri",
                "Navalur"
            ]
        }
    },
    "Kerala": {
        "Thiruvananthapuram": {
            "Thiruvananthapuram Taluk": [
                "Pattom",
                "Kowdiar",
                "Vellayambalam",
                "Palayam",
                "Pazhavangadi"
            ],
            "Neyyattinkara": [
                "Balaramapuram",
                "Poovar",
                "Parassala",
                "Vizhinjam"
            ],
            "Nedumangad": [
                "Vembayam",
                "Aruvikkara",
                "Vithura"
            ]
        },
        "Ernakulam (Kochi)": {
            "Kanayannur": [
                "Ernakulam North",
                "Edappally",
                "Kakkanad",
                "Kaloor",
                "Thrikkakara"
            ],
            "Kochi Taluk": [
                "Fort Kochi",
                "Mattancherry",
                "Palluruthy",
                "Willingdon Island"
            ],
            "Aluva": [
                "Angamaly",
                "Paravur",
                "Kalamassery"
            ]
        },
        "Kozhikode": {
            "Kozhikode Taluk": [
                "Feroke",
                "Beypore",
                "Mavoor",
                "Chevayur",
                "Elathur"
            ],
            "Vadakara": [
                "Koyilandy",
                "Thamarassery"
            ]
        }
    },
    "Madhya Pradesh": {
        "Bhopal": {
            "Huzur": [
                "MP Nagar",
                "Arera Colony",
                "Kolar Road",
                "Bairagarh",
                "Govindpura"
            ],
            "Berasia": [
                "Nazeerabad",
                "Runaha",
                "Damkheda"
            ]
        },
        "Indore": {
            "Indore Urban": [
                "Vijay Nagar",
                "Palasia",
                "Bhawarkuan",
                "Rajwada",
                "Rau"
            ],
            "Sanwer": [
                "Dharampuri",
                "Kshipra",
                "Manglia"
            ],
            "Mhow": [
                "Dr. Ambedkar Nagar",
                "Pithampur Link",
                "Manpur"
            ]
        },
        "Gwalior": {
            "Gwalior City": [
                "Lashkar",
                "Morar",
                "Thatipur",
                "City Centre"
            ],
            "Dabra": [
                "Bhitarwar",
                "Pichhore"
            ]
        },
        "Jabalpur": {
            "Jabalpur Urban": [
                "Civil Lines",
                "Wright Town",
                "Gorakhpur",
                "Adhartal"
            ],
            "Sihora": [
                "Patan",
                "Majholi",
                "Panagar"
            ]
        }
    },
    "Maharashtra": {
        "Mumbai Suburban": {
            "Andheri": [
                "Andheri East",
                "Andheri West",
                "Vile Parle",
                "Juhu",
                "Versova"
            ],
            "Borivali": [
                "Kandivali",
                "Dahisar",
                "Malad",
                "Charkop",
                "Gorai"
            ],
            "Kurla": [
                "Ghatkopar",
                "Powai",
                "Vidyavihar",
                "Chembur",
                "Trombay"
            ]
        },
        "Pune": {
            "Haveli (Pune City)": [
                "Shivajinagar",
                "Kothrud",
                "Hadapsar",
                "Viman Nagar",
                "Baner",
                "Hinjawadi"
            ],
            "Khed": [
                "Chakan",
                "Alandi",
                "Rajgurunagar"
            ],
            "Baramati": [
                "Daund",
                "Indapur",
                "Shirur"
            ],
            "Maval": [
                "Lonavala",
                "Talegaon",
                "Dehu Road"
            ]
        },
        "Nashik": {
            "Nashik Taluka": [
                "Ojhar",
                "Deolali",
                "Satpur",
                "Panchavati",
                "CIDCO"
            ],
            "Dindori": [
                "Vani",
                "Nanashi",
                "Khedgaon"
            ],
            "Sinnar": [
                "Musgaon",
                "Pangri",
                "Wavi"
            ],
            "Malegaon": [
                "Manmad",
                "Nandgaon",
                "Chandwad"
            ]
        },
        "Nagpur": {
            "Nagpur Urban": [
                "Dharampeth",
                "Sitabuldi",
                "Manish Nagar",
                "Wardhaman Nagar"
            ],
            "Hingna": [
                "MIDC Hingna",
                "Wadi",
                "Wanadongri"
            ],
            "Kamptee": [
                "Kanhan",
                "Mansar",
                "Mouda"
            ]
        },
        "Thane": {
            "Thane Taluka": [
                "Ghodbunder Road",
                "Naupada",
                "Wagle Estate",
                "Kopri"
            ],
            "Kalyan": [
                "Dombivli",
                "Titwala",
                "Shahapur"
            ],
            "Mira Bhayandar": [
                "Mira Road",
                "Bhayandar East",
                "Uttan"
            ]
        }
    },
    "Manipur": {
        "Imphal West": {
            "Lamphelpat": [
                "Uripok",
                "Thangmeiband",
                "Sagolband",
                "Keishamthong"
            ],
            "Patsoi": [
                "Langjing",
                "Takyel",
                "Awang Khunou"
            ]
        },
        "Imphal East": {
            "Porompat": [
                "Wangkhei",
                "Khurai",
                "Heingang",
                "Lamlai"
            ]
        },
        "Churachandpur": {
            "Churachandpur Sadar": [
                "Tuibong",
                "Hiangtam Lamka",
                "Saikot"
            ]
        }
    },
    "Meghalaya": {
        "East Khasi Hills (Shillong)": {
            "Shillong Urban": [
                "Laitumkhrah",
                "Police Bazar",
                "Mawkhar",
                "Labar",
                "Nongthymmai"
            ],
            "Mylliem": [
                "Upper Shillong",
                "Mawphlang",
                "Elephant Falls Area"
            ]
        },
        "West Garo Hills": {
            "Tura": [
                "Rongram",
                "Dalu",
                "Tikrikilla"
            ]
        }
    },
    "Mizoram": {
        "Aizawl": {
            "Aizawl Urban": [
                "Bawngkawn",
                "Khatla",
                "Zarkawt",
                "Durtlang",
                "Chaltlang"
            ],
            "Tlangnuam": [
                "Sairang",
                "Lengpui",
                "Selesih"
            ]
        },
        "Lunglei": {
            "Lunglei Sadar": [
                "Hnahthial",
                "Tlabung"
            ]
        }
    },
    "Nagaland": {
        "Kohima": {
            "Kohima Sadar": [
                "High School Colony",
                "Midland",
                "Jakhama",
                "Chiephobozou"
            ],
            "Tseminyu": [
                "Ghaspani",
                "Botsa"
            ]
        },
        "Dimapur": {
            "Dimapur Sadar": [
                "Chumukedima",
                "Purana Bazar",
                "Medziphema",
                "Padumpukhuri"
            ]
        }
    },
    "Odisha": {
        "Khordha (Bhubaneswar)": {
            "Bhubaneswar Tehsil": [
                "Saheed Nagar",
                "Nayapalli",
                "Chandrasekharpur",
                "Khandagiri",
                "Patia"
            ],
            "Jatni": [
                "Khordha Sadar",
                "Begunia",
                "Bolagarh"
            ],
            "Balianta": [
                "Balipatna",
                "Hanspal",
                "Phulnakhara"
            ]
        },
        "Cuttack": {
            "Cuttack Sadar": [
                "Choudwar",
                "Barabati",
                "Bidanasi",
                "Madhupatna"
            ],
            "Salipur": [
                "Nischintakoili",
                "Mahanga",
                "Tangi"
            ]
        },
        "Ganjam": {
            "Berhampur": [
                "Chatrapur",
                "Hinjilicut",
                "Gopalpur"
            ],
            "Bhanjanagar": [
                "Aska",
                "Bellaguntha",
                "Surada"
            ]
        },
        "Puri": {
            "Puri Sadar": [
                "Konark",
                "Pipili",
                "Satyabadi",
                "Brahmagiri"
            ]
        }
    },
    "Punjab": {
        "Ludhiana": {
            "Ludhiana East": [
                "Model Town",
                "Civil Lines",
                "BRS Nagar",
                "Sarabha Nagar"
            ],
            "Ludhiana West": [
                "Jagraon",
                "Khanna",
                "Samrala",
                "Raikot"
            ]
        },
        "Amritsar": {
            "Amritsar Urban": [
                "Lawrence Road",
                "Ranjit Avenue",
                "Civil Lines",
                "Majitha Road"
            ],
            "Baba Bakala": [
                "Rayya",
                "Majitha",
                "Ajnala"
            ]
        },
        "Jalandhar": {
            "Jalandhar 1": [
                "Model Town",
                "Cantt Area",
                "Rama Mandi",
                "Basti Nau"
            ],
            "Phillaur": [
                "Nakodar",
                "Shahkot",
                "Kartarpur"
            ]
        },
        "SAS Nagar (Mohali)": {
            "Mohali Tehsil": [
                "Phase 1-11",
                "Kharar",
                "Kurali",
                "Derabassi",
                "Zirakpur"
            ]
        }
    },
    "Rajasthan": {
        "Jaipur": {
            "Jaipur Tehsil": [
                "Sanganer",
                "Amer",
                "Jhotwara",
                "Malviya Nagar",
                "Mansarovar"
            ],
            "Chaksu": [
                "Kotkhawada",
                "Kothun",
                "Shivdaspura"
            ],
            "Bassi": [
                "Tunga",
                "Jamwa Ramgarh",
                "Bhatton Ki Gali"
            ],
            "Shahpura": [
                "Chomu",
                "Govindgarh",
                "Viratnagar"
            ]
        },
        "Jodhpur": {
            "Jodhpur Urban": [
                "Ratanada",
                "Shastri Nagar",
                "Sardarpura",
                "Paota"
            ],
            "Mandore": [
                "Luni",
                "Bilara",
                "Bhopalgarh",
                "Osian"
            ]
        },
        "Udaipur": {
            "Girwa (Udaipur)": [
                "Fatehpura",
                "Hiran Magri",
                "Panchwati",
                "Sukher"
            ],
            "Mavli": [
                "Vallabhnagar",
                "Salumber",
                "Gogunda"
            ]
        },
        "Kota": {
            "Kota Ladpura": [
                "Vigyan Nagar",
                "Talwandi",
                "Dadabari",
                "Mahaveer Nagar"
            ],
            "Ramganj Mandi": [
                "Sangod",
                "Pipalda",
                "Digod"
            ]
        }
    },
    "Sikkim": {
        "East Sikkim (Gangtok)": {
            "Gangtok Sub-Division": [
                "Deorali",
                "Tadong",
                "Burtuk",
                "Ranka",
                "Singtam"
            ],
            "Pakyong": [
                "Rangpo",
                "Rhenock",
                "Rongli"
            ]
        },
        "South Sikkim (Namchi)": {
            "Namchi Sub-Division": [
                "Jorethang",
                "Ravangla",
                "Melli"
            ]
        }
    },
    "Tamil Nadu": {
        "Chennai": {
            "Chennai Central": [
                "Mylapore",
                "T. Nagar",
                "Nungambakkam",
                "Egmore",
                "Triplicane"
            ],
            "Chennai South": [
                "Adyar",
                "Velachery",
                "Guindy",
                "Besant Nagar",
                "Thiruvanmiyur"
            ],
            "Chennai North": [
                "Royapuram",
                "George Town",
                "Tondiarpet",
                "Perambur",
                "Kolathur"
            ]
        },
        "Coimbatore": {
            "Coimbatore North": [
                "Gandhipuram",
                "RS Puram",
                "Saibaba Colony",
                "Saravanampatti"
            ],
            "Coimbatore South": [
                "Singanallur",
                "Ramanathapuram",
                "Podanur",
                "Ukkadam"
            ],
            "Pollachi": [
                "Sulur",
                "Mettupalayam",
                "Annur"
            ]
        },
        "Madurai": {
            "Madurai North": [
                "Anna Nagar",
                "K.K. Nagar",
                "Othakadai",
                "Thallakulam"
            ],
            "Madurai South": [
                "Villapuram",
                "Thirunagar",
                "Tirumangalam",
                "Usilampatti"
            ]
        },
        "Tiruchirappalli": {
            "Tiruchirappalli Town": [
                "Srirangam",
                "Thillai Nagar",
                "Cantonment",
                "Ponmalai"
            ],
            "Lalgudi": [
                "Manachanallur",
                "Musiri",
                "Thuraiyur"
            ]
        }
    },
    "Telangana": {
        "Hyderabad": {
            "Shaikpet": [
                "Banjara Hills",
                "Jubilee Hills",
                "Tolichowki",
                "Filmnagar"
            ],
            "Khairatabad": [
                "Somajiguda",
                "Ameerpet",
                "Punjagutta",
                "Himayatnagar"
            ],
            "Secunderabad": [
                "Begumpet",
                "Marredpally",
                "Tarnaka",
                "Trimulgherry"
            ],
            "Charminar": [
                "Old City",
                "Falaknuma",
                "Bahadurpura",
                "Chandrayangutta"
            ]
        },
        "Ranga Reddy": {
            "Rajendranagar": [
                "Attapur",
                "Gachibowli",
                "Madhapur",
                "Kondapur",
                "Narsingi"
            ],
            "Serilingampally": [
                "Hafeezpet",
                "Miyapur",
                "Chandanagar"
            ],
            "Ibrahimpatnam": [
                "Adibatla",
                "Hayathnagar",
                "Maheshwaram"
            ]
        },
        "Medchal-Malkajgiri": {
            "Malkajgiri": [
                "Alwal",
                "Kukatpally",
                "Nizampet",
                "Kompally",
                "Medchal"
            ],
            "Uppal": [
                "Ghatkesar",
                "Keesara",
                "Boduppal"
            ]
        },
        "Warangal": {
            "Warangal Urban": [
                "Hanamkonda",
                "Kazipet",
                "Subedari",
                "Kakatiya University"
            ]
        }
    },
    "Tripura": {
        "West Tripura (Agartala)": {
            "Sadar Sub-Division": [
                "Banamalipur",
                "Kunjaban",
                "Indranagar",
                "Badharghat",
                "Ranirbazar"
            ],
            "Mohanpur": [
                "Hezamara",
                "Lefunga"
            ]
        },
        "Gomati": {
            "Udaipur": [
                "Matabari",
                "Kakraban",
                "Killa"
            ]
        }
    },
    "Uttar Pradesh": {
        "Lucknow": {
            "Lucknow Sadar": [
                "Hazratganj",
                "Alambagh",
                "Gomti Nagar",
                "Chowk",
                "Mahanagar",
                "Indira Nagar"
            ],
            "Bakshi Ka Talab": [
                "BKT Kasba",
                "Itaunja",
                "Mahona",
                "Kathwara"
            ],
            "Sarojini Nagar": [
                "Amausi",
                "Banthra",
                "Gosainganj",
                "Mohanlalganj"
            ],
            "Malihabad": [
                "Rahimabad",
                "Kakori",
                "Malihabad Kasba"
            ]
        },
        "Varanasi": {
            "Varanasi Sadar": [
                "Dashashwamedh",
                "Bhelupur",
                "Shivpur",
                "Sarnath",
                "Pandeypur"
            ],
            "Pindra": [
                "Babatpur",
                "Phulpur",
                "Sindhora"
            ],
            "Raja Talab": [
                "Rohaniya",
                "Araziline",
                "Mirzamurad",
                "Chiraigaon"
            ]
        },
        "Kanpur Nagar": {
            "Kanpur Sadar": [
                "Civil Lines",
                "Swaroop Nagar",
                "Govind Nagar",
                "Kidwai Nagar"
            ],
            "Kalyanpur": [
                "Bithoor",
                "Panki",
                "Rawatpur",
                "Mandhana"
            ],
            "Ghatampur": [
                "Bilhaur",
                "Shivrajpur",
                "Choubepur"
            ]
        },
        "Prayagraj (Allahabad)": {
            "Prayagraj Sadar": [
                "Civil Lines",
                "George Town",
                "Katrat",
                "Kareli",
                "Naini"
            ],
            "Phulpur": [
                "Jhunsi",
                "Soraon",
                "Baharia"
            ],
            "Karchana": [
                "Meja",
                "Bara",
                "Shankargarh"
            ]
        },
        "Agra": {
            "Agra Sadar": [
                "Tajganj",
                "Sanjay Place",
                "Shahganj",
                "Dayalbagh",
                "Kamla Nagar"
            ],
            "Fatehabad": [
                "Bah",
                "Etmadpur",
                "Kheragarh"
            ]
        },
        "Gorakhpur": {
            "Gorakhpur Sadar": [
                "Golghar",
                "Mohaddipur",
                "Medical College Area",
                "Shahpur"
            ],
            "Sahjanwa": [
                "Bansgaon",
                "Campierganj",
                "Chauri Chaura"
            ]
        },
        "Meerut": {
            "Meerut Sadar": [
                "Shastri Nagar",
                "Cantt Area",
                "Ganga Nagar",
                "Kanker Khera"
            ],
            "Mawana": [
                "Sardhana",
                "Hastinapur",
                "Daurala"
            ]
        },
        "Ayodhya": {
            "Ayodhya Sadar": [
                "Ram Janmabhoomi Marg",
                "Faizabad City",
                "Devkali",
                "Sahadatganj"
            ],
            "Bikapur": [
                "Rudauli",
                "Sohawal",
                "Milkipur"
            ]
        }
    },
    "Uttarakhand": {
        "Dehradun": {
            "Dehradun Sadar": [
                "Rajpur Road",
                "Dalanwala",
                "Ballupur",
                "Premnagar",
                "Clement Town"
            ],
            "Rishikesh": [
                "Raiwala",
                "Virbhadra",
                "Doiwala"
            ],
            "Vikasnagar": [
                "Dakpathar",
                "Herbertpur",
                "Chakrata"
            ]
        },
        "Haridwar": {
            "Haridwar Sadar": [
                "Kankhal",
                "Jwalapur",
                "BHEL Ranipur",
                "Shivalik Nagar"
            ],
            "Roorkee": [
                "Bhagwanpur",
                "Laksar",
                "Manglaur"
            ]
        },
        "Nainital": {
            "Nainital Sadar": [
                "Mallital",
                "Tallital",
                "Bhowali",
                "Bhimtal"
            ],
            "Haldwani": [
                "Kathgodam",
                "Kaladhungi",
                "Lalkuan"
            ]
        }
    },
    "West Bengal": {
        "Kolkata": {
            "Kolkata North": [
                "Shyambazar",
                "Bagbazar",
                "Sovabazar",
                "Maniktala",
                "Burrabazar"
            ],
            "Kolkata South": [
                "Ballygunge",
                "Alipore",
                "Bhowanipore",
                "Gariahat",
                "Tollygunge"
            ],
            "Kolkata East": [
                "Salt Lake (Bidhannagar)",
                "New Town",
                "Kasba",
                "Ruby Area"
            ]
        },
        "Howrah": {
            "Howrah Sadar": [
                "Bally",
                "Shibpur",
                "Uluberia",
                "Liluah",
                "Salkia"
            ],
            "Uluberia": [
                "Bagnan",
                "Amta",
                "Shyampur"
            ]
        },
        "North 24 Parganas": {
            "Barasat": [
                "Madhyamgram",
                "Habra",
                "Dum Dum",
                "Rajarhat"
            ],
            "Barrackpore": [
                "Naihati",
                "Kanchrapara",
                "Bhatpara",
                "Titagarh"
            ]
        },
        "South 24 Parganas": {
            "Alipore Sadar": [
                "Behala",
                "Jadavpur",
                "Garia",
                "Baruipur"
            ],
            "Diamond Harbour": [
                "Canning",
                "Kakdwip",
                "Sonarpur"
            ]
        },
        "Darjeeling": {
            "Darjeeling Sadar": [
                "Mall Road",
                "Ghum",
                "Kurseong",
                "Mirik"
            ],
            "Siliguri": [
                "Matigara",
                "Naxalbari",
                "Pradhan Nagar"
            ]
        }
    },
    "Delhi (NCT)": {
        "New Delhi": {
            "Chanakyapuri": [
                "Connaught Place",
                "Barakhamba",
                "Gole Market",
                "Lutyens Zone"
            ],
            "Delhi Cantonment": [
                "Vasant Vihar",
                "Dhaula Kuan",
                "R.K. Puram"
            ]
        },
        "South Delhi": {
            "Hauz Khas": [
                "Greater Kailash",
                "Green Park",
                "Malviya Nagar",
                "Saket"
            ],
            "Mehrauli": [
                "Vasant Kunj",
                "Chhatarpur",
                "Fatehpur Beri",
                "Sainik Farm"
            ]
        },
        "Central Delhi": {
            "Civil Lines": [
                "Karol Bagh",
                "Pahar Ganj",
                "Rajendra Nagar",
                "Patel Nagar"
            ],
            "Kotwali": [
                "Chandni Chowk",
                "Daryaganj",
                "Kashmere Gate"
            ]
        },
        "East Delhi": {
            "Preet Vihar": [
                "Laxmi Nagar",
                "Mayur Vihar",
                "Patparganj",
                "Shakarpur"
            ],
            "Gandhi Nagar": [
                "Geeta Colony",
                "Krishna Nagar",
                "Anand Vihar"
            ]
        },
        "North West Delhi": {
            "Rohini": [
                "Pitampura",
                "Shalimar Bagh",
                "Prashant Vihar",
                "Sector 1-25 Rohini"
            ],
            "Kanjhawala": [
                "Bawana",
                "Narela",
                "Alipur"
            ]
        },
        "South West Delhi": {
            "Dwarka": [
                "Dwarka Sector 1-24",
                "Najafgarh",
                "Palam",
                "Bijwasan"
            ]
        }
    },
    "Jammu and Kashmir": {
        "Srinagar": {
            "Srinagar Central": [
                "Lal Chowk",
                "Karan Nagar",
                "Rajbagh",
                "Dalgate",
                "Hazratbal"
            ],
            "Srinagar North": [
                "Soura",
                "Zadibal",
                "Bemina"
            ]
        },
        "Jammu": {
            "Jammu Sadar": [
                "Gandhi Nagar",
                "Trikuta Nagar",
                "Janipur",
                "Bahu Fort"
            ],
            "R.S. Pura": [
                "Bishnah",
                "Akhnoor",
                "Marh"
            ]
        },
        "Anantnag": {
            "Anantnag Town": [
                "Bijbehara",
                "Pahalgam",
                "Dooru",
                "Kokernag"
            ]
        }
    },
    "Ladakh": {
        "Leh": {
            "Leh Tehsil": [
                "Choglamsar",
                "Shey",
                "Thiksey",
                "Nubra",
                "Khaltsi"
            ]
        },
        "Kargil": {
            "Kargil Tehsil": [
                "Drass",
                "Sankoo",
                "Zanskar"
            ]
        }
    },
    "Chandigarh": {
        "Chandigarh": {
            "Chandigarh Sectoral": [
                "Sector 1-17 (Capitol/City Centre)",
                "Sector 18-30",
                "Sector 31-47",
                "Mani Majra"
            ]
        }
    },
    "Puducherry": {
        "Puducherry": {
            "Puducherry Municipality": [
                "White Town",
                "Heritage Town",
                "Oulgaret",
                "Villianur"
            ],
            "Karaikal": [
                "Kottucherry",
                "Nedungadu",
                "Thirunallar"
            ]
        }
    },
    "Andaman and Nicobar Islands": {
        "South Andaman": {
            "Port Blair": [
                "Aberdeen Bazar",
                "Haddo",
                "Garacharma",
                "Prothrapur",
                "Ferrargunj"
            ]
        }
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
        "Daman": {
            "Daman": [
                "Moti Daman",
                "Nani Daman",
                "Devka",
                "Kadaiya"
            ]
        },
        "Dadra and Nagar Haveli": {
            "Silvassa": [
                "Amli",
                "Dadra",
                "Khanvel",
                "Naroli"
            ]
        }
    },
    "Lakshadweep": {
        "Lakshadweep": {
            "Kavaratti": [
                "Agatti",
                "Amini",
                "Andrott",
                "Minicoy"
            ]
        }
    }
}

def get_all_states():
    return sorted(list(ALL_INDIAN_LOCATIONS.keys()))

def get_districts(state):
    return sorted(list(ALL_INDIAN_LOCATIONS.get(state, {}).keys()))

def get_circles(state, district):
    return sorted(list(ALL_INDIAN_LOCATIONS.get(state, {}).get(district, {}).keys()))

def get_villages(state, district, circle):
    return ALL_INDIAN_LOCATIONS.get(state, {}).get(district, {}).get(circle, [])
