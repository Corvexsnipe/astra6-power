import locationData from "@/config/home/locations.json";

export const getCountryCode = (name: string): string => {
  const countries: Record<string, string> = {
    "afghanistan": "af", "albania": "al", "algeria": "dz", "andorra": "ad", "angola": "ao",
    "argentina": "ar", "armenia": "am", "australia": "au", "austria": "at", "azerbaijan": "az",
    "bahamas": "bs", "bahrain": "bh", "bangladesh": "bd", "barbados": "bb", "belarus": "by",
    "belgium": "be", "belize": "bz", "benin": "bj", "bhutan": "bt", "bolivia": "bo",
    "brazil": "br", "brunei": "bn", "bulgaria": "bg", "burkina faso": "bf", "burundi": "bi",
    "cambodia": "kh", "cameroon": "cm", "canada": "ca", "cape verde": "cv", "central african republic": "cf",
    "chad": "td", "chile": "cl", "china": "cn", "colombia": "co", "comoros": "km",
    "congo": "cg", "costa rica": "cr", "croatia": "hr", "cuba": "cu", "cyprus": "cy",
    "czech republic": "cz", "denmark": "dk", "djibouti": "dj", "dominica": "dm", "dominican republic": "do",
    "east timor": "tl", "ecuador": "ec", "egypt": "eg", "el salvador": "sv", "equatorial guinea": "gq",
    "eritrea": "er", "estonia": "ee", "ethiopia": "et", "fiji": "fj", "finland": "fi",
    "france": "fr", "gabon": "ga", "gambia": "gm", "georgia": "ge", "germany": "de",
    "ghana": "gh", "greece": "gr", "grenada": "gd", "guatemala": "gt", "guinea": "gn",
    "guyana": "gy", "haiti": "ht", "honduras": "hn", "hungary": "hu", "iceland": "is",
    "india": "in", "indonesia": "id", "iran": "ir", "iraq": "iq", "ireland": "ie",
    "israel": "il", "italy": "it", "ivory coast": "ci", "jamaica": "jm", "japan": "jp",
    "jordan": "jo", "kazakhstan": "kz", "kenya": "ke", "kiribati": "ki", "north korea": "kp",
    "south korea": "kr", "kuwait": "kw", "kyrgyzstan": "kg", "laos": "la", "latvia": "lv",
    "lebanon": "lb", "lesotho": "ls", "liberia": "lr", "libya": "ly", "liechtenstein": "li",
    "lithuania": "lt", "luxembourg": "lu", "macedonia": "mk", "madagascar": "mg", "malawi": "mw",
    "malaysia": "my", "maldives": "mv", "mali": "ml", "malta": "mt", "marshall islands": "mh",
    "mauritania": "mr", "mauritius": "mu", "mexico": "mx", "micronesia": "fm", "moldova": "md",
    "monaco": "mc", "mongolia": "mn", "montenegro": "me", "morocco": "ma", "mozambique": "mz",
    "myanmar": "mm", "namibia": "na", "nauru": "nr", "nepal": "np", "netherlands": "nl",
    "amsterdam": "nl", "new zealand": "nz", "nicaragua": "ni", "niger": "ne", "nigeria": "ng",
    "norway": "no", "oman": "om", "pakistan": "pk", "palau": "pw", "panama": "pa",
    "papua new guinea": "pg", "paraguay": "py", "peru": "pe", "philippines": "ph", "poland": "pl",
    "portugal": "pt", "qatar": "qa", "romania": "ro", "russia": "ru", "rwanda": "rw",
    "st kitts & nevis": "kn", "st lucia": "lc", "st vincent": "vc", "samoa": "ws", "san marino": "sm",
    "sao tome & principe": "st", "saudi arabia": "sa", "senegal": "sn", "serbia": "rs", "seychelles": "sc",
    "sierra leone": "sl", "singapore": "sg", "slovakia": "sk", "slovenia": "si", "solomon islands": "sb",
    "somalia": "so", "south africa": "za", "spain": "es", "sri lanka": "lk", "sudan": "sd",
    "suriname": "sr", "swaziland": "sz", "sweden": "se", "switzerland": "ch", "syria": "sy",
    "taiwan": "tw", "tajikistan": "tj", "tanzania": "tz", "thailand": "th", "togo": "tg",
    "tonga": "to", "trinidad & tobago": "tt", "tunisia": "tn", "turkey": "tr", "turkmenistan": "tm",
    "tuvalu": "tv", "uganda": "ug", "ukraine": "ua", "united arab emirates": "ae", "uae": "ae",
    "united kingdom": "gb", "uk": "gb", "united states": "us", "usa": "us", "uruguay": "uy",
    "uzbekistan": "uz", "vanuatu": "vu", "vatican city": "va", "venezuela": "ve", "vietnam": "vn",
    "yemen": "ye", "zambia": "zm", "zimbabwe": "zw"
  };

  return countries[name.toLowerCase().trim()] || "un";
};

export const getLocationsConfig = () => locationData;