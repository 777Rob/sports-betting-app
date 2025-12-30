import { Match, Standing, Team, LeagueType } from "../types";

export const checkMatchExists = (
  matches: Match[],
  league: LeagueType,
  homeId: string,
  awayId: string
): boolean => {
  return matches.some(
    (m) =>
      m.league === league &&
      ((m.homeTeamId === homeId && m.awayTeamId === awayId) ||
        (m.homeTeamId === awayId && m.awayTeamId === homeId))
  );
};

export const calculateStandings = (
  teams: Team[],
  matches: Match[]
): Standing[] => {
  const stats: Record<string, Standing> = {};

  // Initialize stats for all teams
  teams.forEach((t) => {
    stats[t.id] = {
      teamId: t.id,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  });

  // Calculate stats based on matches
  matches.forEach((m) => {
    const home = stats[m.homeTeamId];
    const away = stats[m.awayTeamId];

    // Skip if team IDs don't exist in the current list (e.g. deleted teams)
    if (!home || !away) return;

    home.played++;
    away.played++;

    home.goalsFor += m.homeScore;
    home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore;
    away.goalsAgainst += m.homeScore;

    if (m.homeScore > m.awayScore) {
      // Home Win
      home.wins++;
      home.points += 3;
      away.losses++;
    } else if (m.homeScore < m.awayScore) {
      // Away Win
      away.wins++;
      away.points += 3;
      home.losses++;
    } else {
      // Draw
      home.draws++;
      home.points += 1;
      away.draws++;
      away.points += 1;
    }
  });

  // Sort by Points (Descending), then Goals Difference (optional, but good practice), then Goals For
  return Object.values(stats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    return b.goalsFor - a.goalsFor;
  });
};

export const getTeamName = (teams: Team[], id: string): string => {
  return teams.find((t) => t.id === id)?.name || "Unknown";
};

export const getCountryCode = (name: string): string | undefined => {
  const mapping: Record<string, string> = {
    // --- COUNTRIES ---
    Afghanistan: "af",
    Albania: "al",
    Algeria: "dz",
    Andorra: "ad",
    Angola: "ao",
    Argentina: "ar",
    Armenia: "am",
    Australia: "au",
    Austria: "at",
    Azerbaijan: "az",
    Bahamas: "bs",
    Bahrain: "bh",
    Bangladesh: "bd",
    Barbados: "bb",
    Belarus: "by",
    Belgium: "be",
    Belize: "bz",
    Benin: "bj",
    Bhutan: "bt",
    Bolivia: "bo",
    Bosnia: "ba",
    "Bosnia and Herzegovina": "ba",
    Botswana: "bw",
    Brazil: "br",
    Brunei: "bn",
    Bulgaria: "bg",
    "Burkina Faso": "bf",
    Burundi: "bi",
    Cambodia: "kh",
    Cameroon: "cm",
    Canada: "ca",
    "Cape Verde": "cv",
    "Central African Republic": "cf",
    Chad: "td",
    Chile: "cl",
    China: "cn",
    Colombia: "co",
    Comoros: "km",
    Congo: "cg",
    "Costa Rica": "cr",
    Croatia: "hr",
    Cuba: "cu",
    Cyprus: "cy",
    "Czech Republic": "cz",
    Czechia: "cz",
    Denmark: "dk",
    Djibouti: "dj",
    Dominica: "dm",
    "Dominican Republic": "do",
    Ecuador: "ec",
    Egypt: "eg",
    "El Salvador": "sv",
    "Equatorial Guinea": "gq",
    Eritrea: "er",
    Estonia: "ee",
    Ethiopia: "et",
    Fiji: "fj",
    Finland: "fi",
    France: "fr",
    Gabon: "ga",
    Gambia: "gm",
    Georgia: "ge",
    Germany: "de",
    Ghana: "gh",
    Greece: "gr",
    Grenada: "gd",
    Guatemala: "gt",
    Guinea: "gn",
    "Guinea-Bissau": "gw",
    Guyana: "gy",
    Haiti: "ht",
    Honduras: "hn",
    Hungary: "hu",
    Iceland: "is",
    India: "in",
    Indonesia: "id",
    Iran: "ir",
    Iraq: "iq",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    "Ivory Coast": "ci",
    Jamaica: "jm",
    Japan: "jp",
    Jordan: "jo",
    Kazakhstan: "kz",
    Kenya: "ke",
    Kiribati: "ki",
    Kosovo: "xk",
    Kuwait: "kw",
    Kyrgyzstan: "kg",
    Laos: "la",
    Latvia: "lv",
    Lebanon: "lb",
    Lesotho: "ls",
    Liberia: "lr",
    Libya: "ly",
    Liechtenstein: "li",
    Lithuania: "lt",
    Luxembourg: "lu",
    Macedonia: "mk",
    "North Macedonia": "mk",
    Madagascar: "mg",
    Malawi: "mw",
    Malaysia: "my",
    Maldives: "mv",
    Mali: "ml",
    Malta: "mt",
    "Marshall Islands": "mh",
    Mauritania: "mr",
    Mauritius: "mu",
    Mexico: "mx",
    Micronesia: "fm",
    Moldova: "md",
    Monaco: "mc",
    Mongolia: "mn",
    Montenegro: "me",
    Morocco: "ma",
    Mozambique: "mz",
    Myanmar: "mm",
    Namibia: "na",
    Nauru: "nr",
    Nepal: "np",
    Netherlands: "nl",
    "New Zealand": "nz",
    Nicaragua: "ni",
    Niger: "ne",
    Nigeria: "ng",
    "North Korea": "kp",
    Norway: "no",
    Oman: "om",
    Pakistan: "pk",
    Palau: "pw",
    Palestine: "ps",
    Panama: "pa",
    "Papua New Guinea": "pg",
    Paraguay: "py",
    Peru: "pe",
    Philippines: "ph",
    Poland: "pl",
    Portugal: "pt",
    Qatar: "qa",
    Romania: "ro",
    Russia: "ru",
    Rwanda: "rw",
    "Saint Kitts and Nevis": "kn",
    "Saint Lucia": "lc",
    "Saint Vincent and the Grenadines": "vc",
    Samoa: "ws",
    "San Marino": "sm",
    "Sao Tome and Principe": "st",
    "Saudi Arabia": "sa",
    Senegal: "sn",
    Serbia: "rs",
    Seychelles: "sc",
    "Sierra Leone": "sl",
    Singapore: "sg",
    Slovakia: "sk",
    Slovenia: "si",
    "Solomon Islands": "sb",
    Somalia: "so",
    "South Africa": "za",
    "South Korea": "kr",
    "South Sudan": "ss",
    Spain: "es",
    "Sri Lanka": "lk",
    Sudan: "sd",
    Suriname: "sr",
    Sweden: "se",
    Switzerland: "ch",
    Syria: "sy",
    Taiwan: "tw",
    Tajikistan: "tj",
    Tanzania: "tz",
    Thailand: "th",
    "Timor-Leste": "tl",
    Togo: "tg",
    Tonga: "to",
    "Trinidad and Tobago": "tt",
    Tunisia: "tn",
    Turkey: "tr",
    Turkmenistan: "tm",
    Tuvalu: "tv",
    Uganda: "ug",
    Ukraine: "ua",
    UAE: "ae",
    "United Arab Emirates": "ae",
    "United Kingdom": "gb",
    UK: "gb",
    "Great Britain": "gb",
    England: "gb-eng",
    Scotland: "gb-sct",
    Wales: "gb-wls",
    USA: "us",
    "United States": "us",
    Uruguay: "uy",
    Uzbekistan: "uz",
    Vanuatu: "vu",
    "Vatican City": "va",
    Venezuela: "ve",
    Vietnam: "vn",
    Yemen: "ye",
    Zambia: "zm",
    Zimbabwe: "zw",

    // --- TENNIS PLAYERS (ATP/WTA Top & Legends) ---
    // Big Three + Murray
    Djokovic: "rs",
    Nadal: "es",
    Federer: "ch",
    Murray: "gb",

    // Top ATP
    Sinner: "it",
    Alcaraz: "es",
    Medvedev: "ru",
    Zverev: "de",
    Rublev: "ru",
    Rune: "dk",
    Hurkacz: "pl",
    Ruud: "no",
    Tsitsipas: "gr",
    "De Minaur": "au",
    Dimitrov: "bg",
    Fritz: "us",
    Paul: "us",
    Shelton: "us",
    Tiafoe: "us",
    Khachanov: "ru",
    Bublik: "kz",
    "Auger-Aliassime": "ca",
    Shapovalov: "ca",
    Norrie: "gb",
    Draper: "gb",
    Kyrgios: "au",
    Berrettini: "it",
    Musetti: "it",
    Arnaldi: "it",
    Fils: "fr",
    Humbert: "fr",
    Monfils: "fr",
    Wawrinka: "ch",
    Thiem: "at",
    Nishikori: "jp",

    // Top WTA
    Swiatek: "pl",
    Sabalenka: "by",
    Gauff: "us",
    Rybakina: "kz",
    Pegula: "us",
    Jabeur: "tn",
    Vondrousova: "cz",
    Sakkari: "gr",
    Muchova: "cz",
    Krejcikova: "cz",
    Ostapenko: "lv",
    Collins: "us",
    Keys: "us",
    Navarro: "us",
    Boulter: "gb",
    Raducanu: "gb",
    Osaka: "jp",
    Andreescu: "ca",
    Fernandez: "ca",
    Wozniacki: "dk",
    Kerber: "de",
    Azarenka: "by",
    Svitolina: "ua",
    Kostyuk: "ua",
    Yastremska: "ua",
    Zheng: "cn",
    "Haddad Maia": "br",
    Garcia: "fr",
  };

  // Case-insensitive check just in case
  const key = Object.keys(mapping).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? mapping[key] : mapping[name];
};
