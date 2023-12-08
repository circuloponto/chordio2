//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chord from '@/components/Chord';
//import ChordSaved from '@/components/ChordSaved';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/SavedChords.module.scss'
import 'react-tabs/style/react-tabs.css';
import dynamic from 'next/dynamic'
import axios from 'axios'
import cookie from "cookie";
import AppContext from '@/components/AppContext'
import { useContext } from 'react'
const ChordSaved = dynamic(() => import('../../components/ChordSaved'), { ssr: false })
const xano = [
  {
    chords: [
      { positions: ['x', 'x', '0', '2', '1', '2'], chordName: 'D7' },
      { positions: ['3', '2', '0', '0', '0', '1'], chordName: 'G7' },
      { positions: ['x', '3', '2', '3', '1', '0'], chordName: 'C7' },
      { positions: ['1', '0', '1', 'x', '1', '1'], chordName: 'F7' },
      { positions: ['0', '2', '0', '1', '0', '0'], chordName: 'E7' },
    ],
    lyrics: "TAXMAN  One two three fourOne two D7 D7                            G7 D7Let me tell you how it will be                                     G7 D7there's one for you, nineteen for me                 C7'cause I'm the taxman              G7   D7yeah, I'm the taxman                                      G7 D7Should five percent appear too small                                G7 D7be thankful I don't take it all               C7'cause I'm the taxman               G7   D7yeah, I'm the taxman          D7                C7(if you drive a car) I'll tax the street        D7               C7(if you try to sit) I'll tax your seat        D7                 C7(if you get too cold) I'll tax the heat        D7                C7(if you take a walk) I'll tax your feet D7taxman!! solo                C7'cause I'm the taxman              G7   D7yeah, I'm the taxman        D7                       G7 D7Don't ask me what I want it for  (Haha! Mister Wilson!)                                  G7 D7if you don't want to pay some more (Haha! Mister Heath!),               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  solo     D7            C7              D7Now my advice for those who die, (Taxman!)  D7                C7             D7Declare the pennies on your eyes, (Taxman!)               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  D7         F7             E7      D7And you're working for no one but me  D7(Taxman).. .",
    name: 'TAXMAN',
    id: 0,
  },
  {
    chords: [
      { positions: ['x', '3', '2', '0', '1', '0'], chordName: 'C' },
      { positions: ['0', '2', '2', '0', '0', '0'], chordName: 'Em' },
      { positions: ['0', '2', '0', '0', '0', '0'], chordName: 'Em7' },
      { positions: ['0', '2', '2', '0', '2', '0'], chordName: 'Em6' },

    ],
    lyrics: "ELEANOR RIGBY  C                             EmAh, look at all the lonely peopleC                             EmAh, look at all the lonely people [Verse 1]Em                                                                                 CEleanor rigby picks up the rice in the church where a wedding has been Lives in a dreamEm                                                                                  CWaits at the window, wearing the face that she keeps in a jar by the door           EmWho is it for?(Chorus)Em7            Em6All the lonely peopleC                               EmWhere do they all come from ?Em7            Em6All the lonely peopleC                         EmWhere do they all belong ?  [Verse 2] Em                                                                                CFather mckenzie writing the words of a sermon that no one will hear No one comes near.Em                                                                                 CLook at him working. darning his socks in the night when there's nobody there                    EmWhat does he care?  [Chorus] Em7            Em6All the lonely peopleC                               EmWhere do they all come from?Em7            Em6All the lonely peopleC                       EmWhere do they all belong? C                            EmAh, Look at all the lonely PeopleC                            EmAh Look at All the lonely people  [Verse 3] Em                                                                             CEleanor rigby died in the church and was buried along with her name Nobody cameEm                                                                              CFather mckenzie wiping the dirt from his hands as he walks from the grave              EmNo one was saved(Chorus)Em7          Em6All the lonely peopleC                          EmWhere do they all come from?Em7          Em6All the lonely peopleC               EmWhere do they all belong?",
    name: 'ELEANOR RIGBY',
    id: 1,

  },
  {
    chords: [
      { positions: ['x', 'x', '0', '2', '1', '2'], chordName: 'D7' },
      { positions: ['3', '2', '0', '0', '0', '1'], chordName: 'G7' },
      { positions: ['x', '3', '2', '3', '1', '0'], chordName: 'C7' },
      { positions: ['1', '0', '1', 'x', '1', '1'], chordName: 'F7' },
      { positions: ['0', '2', '0', '1', '0', '0'], chordName: 'E7' },
    ],
    lyrics: "TAXMAN  One two three fourOne two D7 D7                            G7 D7Let me tell you how it will be                                     G7 D7there's one for you, nineteen for me                 C7'cause I'm the taxman              G7   D7yeah, I'm the taxman                                      G7 D7Should five percent appear too small                                G7 D7be thankful I don't take it all               C7'cause I'm the taxman               G7   D7yeah, I'm the taxman          D7                C7(if you drive a car) I'll tax the street        D7               C7(if you try to sit) I'll tax your seat        D7                 C7(if you get too cold) I'll tax the heat        D7                C7(if you take a walk) I'll tax your feet D7taxman!! solo                C7'cause I'm the taxman              G7   D7yeah, I'm the taxman        D7                       G7 D7Don't ask me what I want it for  (Haha! Mister Wilson!)                                  G7 D7if you don't want to pay some more (Haha! Mister Heath!),               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  solo     D7            C7              D7Now my advice for those who die, (Taxman!)  D7                C7             D7Declare the pennies on your eyes, (Taxman!)               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  D7         F7             E7      D7And you're working for no one but me  D7(Taxman).. .",
    name: 'TAXMAN',
    id: 2,
  },
  {
    chords: [
      { positions: ['x', '3', '2', '0', '1', '0'], chordName: 'C' },
      { positions: ['0', '2', '2', '0', '0', '0'], chordName: 'Em' },
      { positions: ['0', '2', '0', '0', '0', '0'], chordName: 'Em7' },
      { positions: ['0', '2', '2', '0', '2', '0'], chordName: 'Em6' },

    ],
    lyrics: "ELEANOR RIGBY  C                             EmAh, look at all the lonely peopleC                             EmAh, look at all the lonely people [Verse 1]Em                                                                                 CEleanor rigby picks up the rice in the church where a wedding has been Lives in a dreamEm                                                                                  CWaits at the window, wearing the face that she keeps in a jar by the door           EmWho is it for?(Chorus)Em7            Em6All the lonely peopleC                               EmWhere do they all come from ?Em7            Em6All the lonely peopleC                         EmWhere do they all belong ?  [Verse 2] Em                                                                                CFather mckenzie writing the words of a sermon that no one will hear No one comes near.Em                                                                                 CLook at him working. darning his socks in the night when there's nobody there                    EmWhat does he care?  [Chorus] Em7            Em6All the lonely peopleC                               EmWhere do they all come from?Em7            Em6All the lonely peopleC                       EmWhere do they all belong? C                            EmAh, Look at all the lonely PeopleC                            EmAh Look at All the lonely people  [Verse 3] Em                                                                             CEleanor rigby died in the church and was buried along with her name Nobody cameEm                                                                              CFather mckenzie wiping the dirt from his hands as he walks from the grave              EmNo one was saved(Chorus)Em7          Em6All the lonely peopleC                          EmWhere do they all come from?Em7          Em6All the lonely peopleC               EmWhere do they all belong?",
    name: 'ELEANOR RIGBY',
    id: 3,

  },
  {
    chords: [
      { positions: ['x', 'x', '0', '2', '1', '2'], chordName: 'D7' },
      { positions: ['3', '2', '0', '0', '0', '1'], chordName: 'G7' },
      { positions: ['x', '3', '2', '3', '1', '0'], chordName: 'C7' },
      { positions: ['1', '0', '1', 'x', '1', '1'], chordName: 'F7' },
      { positions: ['0', '2', '0', '1', '0', '0'], chordName: 'E7' },
    ],
    lyrics: "TAXMAN  One two three fourOne two D7 D7                            G7 D7Let me tell you how it will be                                     G7 D7there's one for you, nineteen for me                 C7'cause I'm the taxman              G7   D7yeah, I'm the taxman                                      G7 D7Should five percent appear too small                                G7 D7be thankful I don't take it all               C7'cause I'm the taxman               G7   D7yeah, I'm the taxman          D7                C7(if you drive a car) I'll tax the street        D7               C7(if you try to sit) I'll tax your seat        D7                 C7(if you get too cold) I'll tax the heat        D7                C7(if you take a walk) I'll tax your feet D7taxman!! solo                C7'cause I'm the taxman              G7   D7yeah, I'm the taxman        D7                       G7 D7Don't ask me what I want it for  (Haha! Mister Wilson!)                                  G7 D7if you don't want to pay some more (Haha! Mister Heath!),               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  solo     D7            C7              D7Now my advice for those who die, (Taxman!)  D7                C7             D7Declare the pennies on your eyes, (Taxman!)               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  D7         F7             E7      D7And you're working for no one but me  D7(Taxman).. .",
    name: 'TAXMAN',
    id: 4,
  },
  {
    chords: [
      { positions: ['x', '3', '2', '0', '1', '0'], chordName: 'C' },
      { positions: ['0', '2', '2', '0', '0', '0'], chordName: 'Em' },
      { positions: ['0', '2', '0', '0', '0', '0'], chordName: 'Em7' },
      { positions: ['0', '2', '2', '0', '2', '0'], chordName: 'Em6' },

    ],
    lyrics: "ELEANOR RIGBY  C                             EmAh, look at all the lonely peopleC                             EmAh, look at all the lonely people [Verse 1]Em                                                                                 CEleanor rigby picks up the rice in the church where a wedding has been Lives in a dreamEm                                                                                  CWaits at the window, wearing the face that she keeps in a jar by the door           EmWho is it for?(Chorus)Em7            Em6All the lonely peopleC                               EmWhere do they all come from ?Em7            Em6All the lonely peopleC                         EmWhere do they all belong ?  [Verse 2] Em                                                                                CFather mckenzie writing the words of a sermon that no one will hear No one comes near.Em                                                                                 CLook at him working. darning his socks in the night when there's nobody there                    EmWhat does he care?  [Chorus] Em7            Em6All the lonely peopleC                               EmWhere do they all come from?Em7            Em6All the lonely peopleC                       EmWhere do they all belong? C                            EmAh, Look at all the lonely PeopleC                            EmAh Look at All the lonely people  [Verse 3] Em                                                                             CEleanor rigby died in the church and was buried along with her name Nobody cameEm                                                                              CFather mckenzie wiping the dirt from his hands as he walks from the grave              EmNo one was saved(Chorus)Em7          Em6All the lonely peopleC                          EmWhere do they all come from?Em7          Em6All the lonely peopleC               EmWhere do they all belong?",
    name: 'ELEANOR RIGBY',
    id: 5,

  },
  {
    chords: [
      { positions: ['x', 'x', '0', '2', '1', '2'], chordName: 'D7' },
      { positions: ['3', '2', '0', '0', '0', '1'], chordName: 'G7' },
      { positions: ['x', '3', '2', '3', '1', '0'], chordName: 'C7' },
      { positions: ['1', '0', '1', 'x', '1', '1'], chordName: 'F7' },
      { positions: ['0', '2', '0', '1', '0', '0'], chordName: 'E7' },
    ],
    lyrics: "TAXMAN  One two three fourOne two D7 D7                            G7 D7Let me tell you how it will be                                     G7 D7there's one for you, nineteen for me                 C7'cause I'm the taxman              G7   D7yeah, I'm the taxman                                      G7 D7Should five percent appear too small                                G7 D7be thankful I don't take it all               C7'cause I'm the taxman               G7   D7yeah, I'm the taxman          D7                C7(if you drive a car) I'll tax the street        D7               C7(if you try to sit) I'll tax your seat        D7                 C7(if you get too cold) I'll tax the heat        D7                C7(if you take a walk) I'll tax your feet D7taxman!! solo                C7'cause I'm the taxman              G7   D7yeah, I'm the taxman        D7                       G7 D7Don't ask me what I want it for  (Haha! Mister Wilson!)                                  G7 D7if you don't want to pay some more (Haha! Mister Heath!),               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  solo     D7            C7              D7Now my advice for those who die, (Taxman!)  D7                C7             D7Declare the pennies on your eyes, (Taxman!)               C7'cause I'm the taxman              G7   D7yeah, I'm the taxman  D7         F7             E7      D7And you're working for no one but me  D7(Taxman).. .",
    name: 'TAXMAN',
    id: 6,
  },
  {
    chords: [
      { positions: ['x', '3', '2', '0', '1', '0'], chordName: 'C' },
      { positions: ['0', '2', '2', '0', '0', '0'], chordName: 'Em' },
      { positions: ['0', '2', '0', '0', '0', '0'], chordName: 'Em7' },
      { positions: ['0', '2', '2', '0', '2', '0'], chordName: 'Em6' },

    ],
    lyrics: "ELEANOR RIGBY  C                             EmAh, look at all the lonely peopleC                             EmAh, look at all the lonely people [Verse 1]Em                                                                                 CEleanor rigby picks up the rice in the church where a wedding has been Lives in a dreamEm                                                                                  CWaits at the window, wearing the face that she keeps in a jar by the door           EmWho is it for?(Chorus)Em7            Em6All the lonely peopleC                               EmWhere do they all come from ?Em7            Em6All the lonely peopleC                         EmWhere do they all belong ?  [Verse 2] Em                                                                                CFather mckenzie writing the words of a sermon that no one will hear No one comes near.Em                                                                                 CLook at him working. darning his socks in the night when there's nobody there                    EmWhat does he care?  [Chorus] Em7            Em6All the lonely peopleC                               EmWhere do they all come from?Em7            Em6All the lonely peopleC                       EmWhere do they all belong? C                            EmAh, Look at all the lonely PeopleC                            EmAh Look at All the lonely people  [Verse 3] Em                                                                             CEleanor rigby died in the church and was buried along with her name Nobody cameEm                                                                              CFather mckenzie wiping the dirt from his hands as he walks from the grave              EmNo one was saved(Chorus)Em7          Em6All the lonely peopleC                          EmWhere do they all come from?Em7          Em6All the lonely peopleC               EmWhere do they all belong?",
    name: 'ELEANOR RIGBY',
    id: 7,

  },

]
export const getServerSideProps = (async (context) => {

  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );

  let cookieNameData = '';
  if (mycookie.authToken) {
    cookieNameData = mycookie.authToken;
  }
  console.log('cookieNameData', cookieNameData)
  console.log('cookie data typeof', typeof cookieNameData)

  const me = await axios.get(
    'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/me',

    { headers: { Authorization: 'Bearer ' + cookieNameData } },
  );
  /* const response = await axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/user/${me.id}`,
    { headers: { Authorization: 'Bearer ' + cookieNameData } },
  ); */
  // const responseX = response.data
  const meX = me.data
  //console.log('response', response)
  console.log('me', me)
  return { props: { meX } }


})

export default function MySongs({ meX }) {
  const contextApi = useContext(AppContext)
  const [input, setInput] = useState<string>();
  const [tab, setTab] = useState(0)
  const [data, setData] = useState()
  console.log('meX', meX)
  const handleTabClick = (e) => {
    console.log('e.target.tabIndex', e.target.tabIndex)
    const tabIndex = e.target.getAttribute("data-tabIndex");
    console.log('tabIndex', tabIndex)
    setTab(tabIndex)
    console.log('tab', tab)
  }
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/user/${meX.id}`,
        { headers: { Authorization: 'Bearer ' + contextApi.nameContext } },
      );
      const list = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists/${meX.lists_id}`,
        { headers: { Authorization: 'Bearer ' + contextApi.nameContext } },
      );
      const responseX = response.data
      setData(list.data)
      console.log('responseX', responseX)
      console.log('list', list)
    }
    getUser()

  }, [contextApi.nameContext, meX.id, meX.lists_id])
  console.log('data', data)
  const onlySongs = data//?.flat()
  console.log('onlySongs', onlySongs)
  return (
    <div className="container">

      <div className={styles.tabs}>
        {onlySongs?.actual_songs.map((obj, i) => {
          console.log('obj.id', obj.id)
          console.log('typeof', typeof obj.id)
          return <>
            <div key={i} data-tabIndex={obj.id} onClick={handleTabClick} className={styles.tabTitle}>{obj.name}</div>
          </>
        })}
      </div>
      <div className='content'>
        {onlySongs?.actual_songs?.map((obj, j) => {
          console.log('tab', tab, 'obj.id', obj.id)
          return <>
            {tab === obj.id &&
              <>
                <div className={styles.chords}>
                  {obj.chords.map((chord, i) => {
                    console.log
                    return tab === obj.id &&

                      <ChordSaved key={i} chord={chord} />
                  })}

                </div>
                {tab === obj.id &&

                  <div className="lyrics">
                    <div className="layout">
                      <div className="inputcontainer">
                        <textarea
                          value={obj.lyrics}
                          //onChange={(e) => setInput(e.target.value)}
                          name=""
                          id=""
                          cols={30}
                          rows={10}
                          className="textArea"
                          placeholder="paste your lyrics and chords here"
                        ></textarea>
                      </div>
                    </div>

                  </div>
                }
              </>
            }
          </>
        })}
      </div>

    </div >

  )
}