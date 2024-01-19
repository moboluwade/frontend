/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { diffWords } from 'diff';
import { diff } from 'semver';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const correctText = 'The quick brown fox jumps over the lazy dog.';
// const transcribedText = 'The quick brown fox jumps over the lazy cat.';

//  {diffInput, correct_sentence, wrong_sentence}
const DiffUse = ({ diffInput }) => {
  const goedRef = useRef(null);
  const probeerRef = useRef(null);
  const [correctText, setCorrectText] = useState(diffInput.correct_sentence)
  const [transcribedText, setTranscribedText] = useState(diffInput.transcribed_sentence)
  const [phoneme, setPhoneme] = useState(diffInput.missing_phonemes)
  // const correctText = diffInput.correct_sentence
  // const transcribedText = diffInput.transcribed_sentence
  // const correctText = 'something'
  // const transcribedText = 'somethinmm'
  const differences = diffWords(correctText, transcribedText);

  useEffect(()=>{
    setCorrectText(diffInput.correct_sentence)
    setTranscribedText(diff.transcribedText)
    setPhoneme(diffInput.missing_phonemes)
  },[diffInput])
  // const array = [2, -9, 0, 5, 12, -25, 22, 9, 8, 12]

  const highlightedText = differences.map((difference, index) => {
    const color = difference.added ? 'red' : difference.removed ? '#00C55E' : '#00C55E';
    return <span key={index} style={{ color }}>{difference.value}</span>;
  });

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  useEffect(() => {
    const areTextsEqual = correctText === transcribedText;
    console.log(correctText)
    console.log(transcribedText)
    if (areTextsEqual) {
      playAudio(goedRef);
    } else {
      playAudio(probeerRef);
    }
  }, [correctText, transcribedText]); // This effect runs once on component mount

  return (
    <div className='pt-4 text-3xl'>
      <div className="pt-4 pb-4 pl-6">
        <h3 className="pb-4 text-3xl">Correct word/Sentence:</h3>
        <div className="px-4 text-lg text-green-500 bg-gray-800 rounded-md w-fit">
          {/* {correct-sentences} */}
          {correctText}
        </div>
      </div>
      {
        'wrong' && (
          <div>
            <div className="pl-6">
              <h3 className="pb-4 text-3xl">Corrections:</h3>
              <div className="px-4 text-lg bg-gray-800 rounded-md w-fit">
                {/* {correct-sentences} */}
                {highlightedText}
              </div>
              <div className="pt-4">
                <h3 className="pb-4 text-3xl">Missing Phonemes:</h3>
                <div className="px-4 text-lg text-green-500 bg-gray-800 rounded-md w-fit">
                  {/* missing phonemes*/}
                  {phoneme.map((item) => {
                    return (
                      <div key={item.name + Math.random()}>
                        {item}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          )}
    </div>
  );
};

export default DiffUse;