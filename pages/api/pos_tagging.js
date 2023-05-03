// Import the necessary libraries
import posTagger from 'wink-pos-tagger';

// Initialize the POS tagger
const tagger = posTagger();

function tokenizeWithSpaces(text) {
  const tokens = [];
  let currentWord = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === ' ' || char === '\n') {
      if (currentWord.length > 0) {
        tokens.push(currentWord);
        currentWord = '';
      }
      tokens.push(char);
    } else {
      currentWord += char;
    }
  }

  if (currentWord.length > 0) {
    tokens.push(currentWord);
  }

  return tokens;
}

function coloredHtml(taggedTokens) {
  return taggedTokens
    .map(({ value, pos }) => {
      const color = getColor(pos);
      console.log(pos);

      if (value === ' ') {
        return value;
      } else if (value === '\n') {
        return '<br>';
      } else {
        return `<span style="color:${color}">${value}</span>`;
      }
    })
    .join('');
}

// Define a function to get colors for different POS tags
function getColor(tag) {
  switch (tag) {
    case 'NN': // Singular noun (e.g., dog, table, book)
    case 'NNS': // Plural noun (e.g., dogs, tables, books)
    case 'NNP': // Singular proper noun (e.g., Alice, New York, Jupiter)
    case 'NNPS': // Plural proper noun (e.g., Americans, Europeans, Asians)
    case 'PRP': // Personal pronoun (e.g., I, you, he, she)
      return 'blue';
    case 'VB': // Base form verb (e.g., eat, play, work)
    case 'VBD': // Past tense verb (e.g., ate, played, worked)
    case 'VBG': // Gerund or present participle verb (e.g., eating, playing, working)
    case 'VBN': // Past participle verb (e.g., eaten, played, worked)
    case 'VBP': // Non-3rd person singular present verb (e.g., eat, play, work)
    case 'VBZ': // 3rd person singular present verb (e.g., eats, plays, works)
    case 'AUX': // Auxiliary verb (e.g., is, am, were)
      return 'green';
    case 'JJ': // Adjective (e.g., happy, tall, beautiful)
    case 'JJR': // Comparative adjective (e.g., happier, taller, more beautiful)
    case 'JJS': // Superlative adjective (e.g., happiest, tallest, most beautiful)
      return 'orange';
    case 'RB': // Adverb (e.g., quickly, always, very)
    case 'RBR': // Comparative adverb (e.g., more quickly, less frequently)
    case 'RBS': // Superlative adverb (e.g., most quickly, least frequently)
    case 'WRB': // Wh-adverb (e.g., when, where, why)
      return 'purple';
    case 'IN': // Preposition (e.g., in, on, at)
    case 'CC': // Conjunction (e.g., and, or, but)
      return 'pink';
    case 'DT': // Determiner (e.g., the, a, an)
    case 'CD': // Cardinal number (e.g., one, two, three)
    case 'MD': // Modal verb (e.g., can, could, should)
      return 'brown';
    case 'PRP$': // Possessive pronoun (e.g., my, your, his)
    case 'TO': // Particle "to" (e.g., to run, to eat)
    case 'WDT': // Demonstrative (e.g., this, these, that)
      return 'teal';
    case 'EX': // Existential "there" (e.g., there is, there are)
      return 'yellow';
    default:
      return 'black';
  }
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Text is required.' });
      return;
    }

    const tokens = tokenizeWithSpaces(text);
    const taggedTokens = tagger.tagRawTokens(tokens);

    // Generate colored HTML
    const result = coloredHtml(taggedTokens);

    res.status(200).json({ result });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
