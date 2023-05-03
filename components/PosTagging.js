// Import the necessary libraries
import React, { useState } from 'react';

const PosTagging = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/pos_tagging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      setResult(data.result);
    } else {
      console.error('Error fetching colored text');
    }
  };

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <h2>Part-of-Speech Tagging</h2>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
      <table
        style={{
          border: '1px solid black',
          borderCollapse: 'collapse',
          padding: '10px',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'left',
              }}
            >
              Color
            </th>
            <th
              style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'left',
              }}
            >
              Part of Speech
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                color: 'blue',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Blue
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Singular noun, plural noun, singular proper noun, plural proper
              noun, or personal pronoun
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'green',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Green
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Base form verb, past tense verb, gerund or present participle
              verb, past participle verb, non-3rd person singular present verb,
              3rd person singular present verb, or auxiliary verb
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'orange',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Orange
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Adjective, comparative adjective, or superlative adjective
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'purple',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Purple
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Adverb, comparative adverb, superlative adverb, or wh-adverb
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'pink',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Pink
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Preposition, conjunction, determiner, cardinal number, or modal
              verb
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'teal',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Teal
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Possessive pronoun, particle "to," or demonstrative
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'yellow',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Yellow
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Existential "there"
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'brown',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Brown
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Modal verb (e.g., can, could, should)
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: 'black',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              Black
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Anything else that doesn't fit into the other categories
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PosTagging;
