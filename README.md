
<div dir="rtl" align="center">
  <h1>SHAT — الشَّت</h1>
  <p><em>Hassaniya Arabic dataset + web editor + translator</em></p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/960px-Flag_of_Mauritania.svg.png?_=20230723171118" width="160" alt="Flag of Mauritania">
</div>

---

## What is SHAT?

**SHAT** (الشَّت) is an open-source dataset and toolchain for **Hassaniya Arabic** — the dialect of Mauritania and parts of the Sahara. It includes:

- **A growing dictionary** (~700+ English↔Hassaniya entries and growing)
- **A web-based editor** for managing translations, prompts, and stories
- **A grammar-aware translator** that applies real Arabic linguistic rules
- **Training data** for building chat models in Hassaniya

---

## What is Hassaniya?

**Hassaniya** (حسانية) is the Arabic dialect spoken by millions across:

| Region | Notes |
|--------|-------|
| 🇲🇷 **Mauritania** | Official language, spoken by most of the population |
| 🇪🇭 Western Sahara | Widely spoken |
| 🇩🇿 Southwest Algeria | Tindouf area |
| 🇲🇱 Northern Mali | Azawad region |
| 🇳🇪 Western Niger | Border areas |
| 🇸🇳 Northern Senegal | River region |

Hassaniya preserves many features of classical Arabic that were lost in other dialects, including the full use of Arabic's consonantal root system and gender/number agreement.

### Example

| English | Hassaniya (Latin script) |
|---------|--------------------------|
| Hello | Slm |
| How are you? | Ch7alak / Chmassy |
| Good night | Leyle zeine |
| I don't know | Ane man3rav |
| See you later | Nchovak ba3din |

---

## About Mauritania

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/960px-Flag_of_Mauritania.svg.png?_=20230723171118" width="200" alt="Flag of Mauritania">
  <br>
  <a href="https://en.wikipedia.org/wiki/Mauritania"><strong>Islamic Republic of Mauritania</strong></a>
  <br>
  <em>جمهورية موريتانيا الإسلامية</em>
</div>

**Mauritania** is a country in **Northwest Africa**, bordered by the Atlantic Ocean, Western Sahara, Algeria, Mali, and Senegal. It is a crossroads between Arab North Africa and Sub-Saharan Africa, and its culture reflects both identities.

- **Capital**: Nouakchott (نواكشوط)
- **Official language**: Arabic (Hassaniya is the spoken dialect)
- **Population**: ~4.5 million
- **Known for**: The Sahara desert, the Senegal River, ancient trading cities like Chinguetti and Ouadane

---

## Features

### 📖 Dictionary
- **700+ entries** covering greetings, daily life, emotions, food, travel, tech, emergencies, and more
- Real-time search by English or Hassaniya
- Add, edit, and delete entries from the web UI

### 🔤 Translator
- **Longest-phrase-first matching** — multi-word phrases like "how are you" → "ch7alak" are matched before individual words
- **Grammar-aware** — adjective-noun reordering (noun comes first, like Arabic)
- **Definite article rules** — sun letters (`s, r, t, ch, 8, n, p, w, 2, d, f, j`) get the `e-` prefix with gemination; moon letters get `l-`
- **Question handling** — sentence-initial "is/are" removed and replaced with `?` at clause end
- **Idiomatic replacements** — "you guys" → "ntome", "X ago" → reordered before translation
- **Missing word detection** — clickable missing words navigate directly to the add-translation form

### 📝 Training Data
- **Prompt/Answer pairs** for fine-tuning chat models
- **Story corpus** — narrative text in Hassaniya for language modeling
- All data stored as plain JSON / text files — easy to export and use with ML pipelines

### 🖥️ Web Editor
Full CRUD interface for all datasets:

| View | Purpose |
|------|---------|
| Translator | Type English, get Hassaniya in real-time |
| Prompts & Answers | Browse, edit, and delete training pairs |
| Story | Read and edit the Hassaniya story corpus |
| Dictionary | Card view of all entries with search |
| Add Translation | Add new word pairs |
| Edit Translations | Search, edit, or delete entries |
| Add Prompt/Answer | Create new training pairs |
| Edit Story | Edit the story corpus |
| Shat Rules | Grammar reference (20 rules) |

---

## Grammar Rules (Highlights)

The translator applies these **Hassaniya/Arabic grammar rules** automatically:

| # | Rule | Example |
|---|------|---------|
| 1 | SVO word order | *Ane nvakar 7oulm* = "I think a dream" |
| 2 | Post-nominal adjectives | *wete zeine* (car beautiful) NOT *zeine wete* |
| 3 | Definite article: sun letters → `e-` + gemination | *chems* → *echems* (the sun) |
| 4 | Definite article: moon letters → `l-` | *9amar* → *l9amar* (the moon) |
| 5 | Past tense `-t` suffix | *kal* → *kelt* (I ate) |
| 6 | Future `ndor-` prefix | *ndor nmchi* (I will go) |
| 7 | 1st person `n-` prefix | *n3rav* (I know), *nged* (I can) |
| 8 | Negation `ma...4i` | *man3rav* (I don't know) |
| 9 | Broken plurals | *ktab* → *ktoub* (books) |
| 10 | Feminine `-e` suffix | *mu3alim* → *mu3alima* (teacher f.) |

Full reference available in the web editor under the **Shat Rules** view.

---

## Setup

```bash
# 1. Clone or download the repository
cd shat

# 2. Install Node.js (if not already installed)
#    Download from https://nodejs.org/

# 3. Start the server
node server.js

# 4. Open in browser
#    http://localhost:3000
```

No dependencies beyond Node.js — the server uses only built-in modules (`http`, `fs`, `path`).

---

## Project Structure

```
shat/
├── server.js                  # Node.js HTTP server (port 3000)
├── index.html                 # Full web editor UI
├── translations_shat.json     # English↔Hassaniya dictionary
├── prompts_answers.json       # Training prompt/answer pairs
├── shat_story.txt             # Story corpus
├── README.md                  # This file
└── start_server.bat           # Windows launcher shortcut
```

---

## Usage

### Adding translations
1. Open the **Add Translation** view in the sidebar
2. Type the English word and its Hassaniya equivalent
3. Click **Save to JSON**
4. The word is immediately available in the translator

### Translating text
1. Switch to the **Translator** view
2. Type or paste English text
3. The Hassaniya translation appears in real-time
4. Missing words are shown in red — click them to jump to the add form

### Editing data
- Use **Edit Translations** to modify or delete dictionary entries
- Use **Edit Story** to modify the story corpus
- All changes are saved directly to the JSON/text files

---

## Planned Features

- [ ] Export dictionary to CSV / Anki format
- [ ] Audio pronunciation recordings
- [ ] Reverse translation (Hassaniya → English)
- [ ] Part-of-speech tagging in the dictionary
- [ ] Verb conjugation tables
- [ ] Mobile-friendly UI
- [ ] Import/export for ML training pipelines

---

## License

This project is open source. Feel free to use, modify, and share.

---

<div align="center">
  <p><strong>الشَّت</strong> — preserving Hassaniya through technology</p>
  <p>
    <a href="https://en.wikipedia.org/wiki/Mauritania">Mauritania 🇲🇷</a>
    ·
    <a href="https://en.wikipedia.org/wiki/Hassaniya_Arabic">Hassaniya Arabic</a>
  </p>
</div>
