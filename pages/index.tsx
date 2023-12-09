/* eslint no-use-before-define: 0 */  // --> OFF
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import styles from '../styles/Transposer.module.scss'
import guitar from '../public/guitar.jpg'
const inter = Inter({ subsets: ['latin'] })
import AppContext from '@/components/AppContext'
import { useContext, useState } from 'react'
import { chords } from '../chords';
import Chord from '../components/Chord';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import Modal from '../components/Modal'
import Overlay from '@/components/Overlay'
export default function Home() {
  const context = useContext(AppContext)
  function changeNameContext() {
    context.setNameContext('nuno')
  }
  const router = useRouter()
  const [input, setInput] = useState<string>('');
  const [chordObj, setChordObj] = useState<{ positions: string[], chordName: string }[] | []>([]);
  const [foundX, setFoundX] = useState<string[] | null>(null);
  const [newLine, setNewLine] = useState<string[]>([]);
  const [howMuch, setHowMuch] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<boolean>(false);
  const regex =
    /\b(?:G,C,D|A,B,C|E,C,D)|([ABCDEFG](?:#|b)?)(?:\/[ABCDEFG][b|#]?)?(?:(?:(?:maj|min|sus|add|aug|dim)(?:\d{0,2}(?:#\d{1,2}|sus\d)?)?)|(?:m\d{0,2}(?:(?:maj|add|#)\d{0,2})?)|(?:-?\d{0,2}(?:\([^)]*\)|#\d{1,2})?))?\b/g;
  const regex2 =
    /[A-G]{1}([5])?([#b]{1})?(mM|Mm|m|M)?([679]|11)?((sus|aug|dim|add)([24]))?/gm;
  //const regex = /^[A-Ga-g](#|b)?(?:maj|min|aug|dim)?(?:[0-9]|sus|add)?(?:\/[A-Ga-g](#|b)?)?$/

  let found: string[] | null = input.match(regex);
  console.log('found', found);


  const filterdFound: Set<string> = new Set(found);
  console.log('filterdFound', filterdFound);
  console.log('input', input)
  const sanitizedInput = input.replace(/\n/g, '')
  console.log('sanitizedInput', sanitizedInput)
  const arraySanitized = sanitizedInput.split(' ')
  console.log('arraySanitized', arraySanitized)
  const filterdSanitized = arraySanitized.filter(n => n)
  console.log('filterdSanitized', filterdSanitized)
  const title = filterdSanitized[0]
  console.log('title', title)
  const handleCheck = () => {
    setChordObj([]);
    filterdFound?.forEach((chord, i) => {
      console.log('chord', chord);
      const chordRes = chords(chord);
      console.log('chordRes', chordRes)
      const positions = chordRes[0].positions;
      console.log('positions', positions);
      console.log('chordRes', chordRes);
      setChordObj((prev) => [...prev, { positions, chordName: chord }]);

      setFoundX(found);
      const result = input.split(/\r?\n/);
      console.log('result', result);
      setNewLine(result);
    });

    console.log('chordObj', chordObj);
  };
  const handleUpOneTone = ({ target, currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    const matrixSharp = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const matrixFlat = [
      'C',
      'Db',
      'D',
      'Eb',
      'E',
      'F',
      'Gb',
      'G',
      'Ab',
      'A',
      'Bb',
      'B',
    ];
    const transcribeInterval = currentTarget.getAttribute('data-tone');
    setHowMuch(prev => prev += Number(transcribeInterval))
    console.log(currentTarget.getAttribute('data-tone'));
    const onlyNotes = /([ABCDEFG](?:#|b)?)/gm;
    //const onlyChord = //([a-z]+)/g;
    setFoundX(found);
    let foundChords;
    if (foundX) {

      foundChords = [...foundX];

      console.log(foundChords);
      const parsedNotes = foundChords.map((chord) => {
        //.log('chord', chord);
        const parsed = chord.match(onlyNotes);
        //console.log('parsed', parsed);
        return parsed;
      });
      const parsedNotesSharp = parsedNotes
        .map((note: any) => {
          //console.log('note', note);
          //if (note !== null) {
          if (note[0].endsWith('#')) {
            const index = matrixSharp.indexOf(note[0]);
            note = matrixFlat[index];
            console.log('index from parsedNotesSharp', index);
          }
          //}

          return note;
        })
        .flat();
      console.log('parsedNotesSharp', parsedNotesSharp);
      console.log('parsedNotes', parsedNotes);
      const parsedChord = foundChords.map((chord) => {
        const parsed = chord.replace(/([ABCDEFG](?:#|b)?)/g, '');
        //console.log('parsed', parsed);
        return parsed;
      });
      console.log('parsedChord', parsedChord);
      const transposedRoots = parsedNotesSharp.map((note, i) => {
        //console.log('note', note);
        let index;
        if (note !== null) {
          index = matrixFlat.indexOf(note);
        }

        /*  console.log(
           'index + transcribeInterval',
           index + Number(transcribeInterval),
           'index',
           index
         ); */
        let newIndex: number = 0;
        if (index !== undefined) {
          newIndex = index + Number(transcribeInterval)
        }

        let val =
          matrixFlat[
          ((newIndex % matrixFlat.length) + matrixFlat.length) %
          matrixFlat.length
          ];
        //const newNote = matrixFlat[index + transcribeInterval];
        // console.log('newNote', newNote);
        //console.log('val', val);

        return val;
      });
      setChordObj([]);
      console.log('transposedRoots', transposedRoots);
      const join: string[] = transposedRoots.map((note, i) => note + parsedChord[i]);
      console.log('join', join);
      interface MyObjLayout {
        [key: string]: string;
      }
      let foundJoinObj: MyObjLayout = {};
      if (found) {
        const foundJoin = found.map((chord, i) => {
          foundJoinObj[chord] = join[i];
          return { [chord]: join[i] };
        });
      }
      console.log('foundJoinobj', foundJoinObj);
      const filterdFoundFinal = new Set(join);
      console.log('filterdFoundFinal', filterdFoundFinal);
      filterdFoundFinal.forEach((chord, i) => {
        console.log('chord', chord);
        const chordRes = chords(chord);
        const positions = chordRes[0].positions;
        console.log('positions', positions);
        console.log('chordRes', chordRes);
        setChordObj((prev) => [...prev, { positions, chordName: chord }]);
        //found = join;
        setFoundX(join);
      });

      setFoundX(join);
      console.log('foundX', foundX);
      console.log('join', join);
      console.log('input', input);
      console.log('newLine', newLine);
      const obj = {}
      const arrayLines: string[] | undefined = input.split(/\n/)
      console.log('arrayLines', arrayLines)
      /* for (let i = 0; i < foundX.length; i++) {
        const element = foundX[i];
        obj[foundX[i]] = join[i]
  
      } */

      const founXSet = new Set(foundX)
      const finalFoundX = Array.from(founXSet);
      const joinSet = new Set(join)
      const finalJoin = Array.from(joinSet);
      console.log('finalFoundX', finalFoundX)
      console.log('finalJoin', finalJoin)
      console.log('obj', obj)
      let newInput = input
      arrayLines.forEach((item, i) => {
        console.log('item', item)
        for (let j = 0; j < finalFoundX.length; j++) {
          const chord = finalFoundX[j];
          console.log('chord', chord)
          if (item.includes(chord)) {
            let chords = item.match(regex);
            const changedChords: string[] | undefined = chords?.map((chord, i) => {
              const index = finalFoundX.indexOf(chord)
              return finalJoin[index]
            })
            console.log('chords', chords)
            console.log('changedChords', changedChords)
            if (changedChords) {

              arrayLines[i] = changedChords.join(' ')
            }
            //arrayLines[i].replace(chord, finalJoin[j])
          }

        }
        console.log('arrayLines', arrayLines)
        setInput(arrayLines.join('\n'))
      })
      // foundX.forEach((chord, i) => {

      //   // newInput.replaceAll(chord, join[i]);
      //   newInput.split(chord).join(join[i])
      //   setInput(newInput)
      // })
      console.log('founXSet', founXSet)
      finalFoundX.forEach((chord, i) => {
        console.log('target chord', chord, 'new chord', finalJoin[i])
        //newInput = newInput.replaceAll(chord, finalJoin[i]);
        while (newInput.includes(chord)) {

          newInput = newInput.replace(chord, finalJoin[i]);
        }
      })

      console.log('inputFinal', input)
      console.log('newInput', newInput)
    }
  }
  const handleRedirectModal = () => {

    setModal(true)
    setOverlay(true)
  }
  return (
    <>
      <Head>
        <title>Chordio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='landingPage'>
        {overlay && (
          <Overlay />
        )}
        {modal && (
          <Modal setOverlay={setOverlay} setModal={setModal} />
        )}

        {/* <h1>Context value: {context.nameContext}</h1>
        <button onClick={changeNameContext}>update context state</button> */}
        <div className='container'>

          <div className={styles.chords}>

            {chordObj?.map((chor) => {
              return <Chord key={chor.chordName} chord={chor} howMuch={howMuch} />;
            })}
          </div>
          <div className="layout">
            <div className="inputcontainer">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                name=""
                id=""
                cols={30}
                rows={10}
                className="textArea"
                placeholder="paste your lyrics and chords here"
              ></textarea>
              <div className="buttons">
                <button onClick={handleCheck}>Check Song</button>
                <button data-tone={2} onClick={handleUpOneTone}>
                  <MdKeyboardDoubleArrowUp />
                  <span className="tooltiptext">move a tone up</span>
                </button>
                <button data-tone={1} onClick={handleUpOneTone}>
                  <MdKeyboardArrowUp />
                  <span className="tooltiptext">move a semitone up</span>
                </button>
                <button data-tone={-1} onClick={handleUpOneTone}>
                  <MdKeyboardArrowDown />
                  <span className="tooltiptext">move a semitone down</span>
                </button>
                <button data-tone={-2} onClick={handleUpOneTone}>
                  <MdKeyboardDoubleArrowDown />
                  <span className="tooltiptext">move a tone down</span>
                </button>
                <button onClick={handleRedirectModal}>SAVE</button>
              </div>

              <div className="title">transposed semitones: <span className="howMuch">{howMuch}</span></div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
