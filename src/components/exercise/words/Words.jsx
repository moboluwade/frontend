/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Recorder from "../recorder/Recorder"
import {
  useQuery,
} from '@tanstack/react-query'
import { Panel } from '../panel'

const Words = () => {
  const [currentExercise, setCurrentExercise] = useState()
  const [audioBase64, setAudioBase64] = useState()
  const [customArray, setCustomArray] = useState([])
  const [demoAudio, setDemoAudio] = useState()

  const [exerciseName, setExerciseName] = useState()
  const fileReader = new FileReader();

  fileReader.onloadend = function () {
    // The result will be a data URL representing the audio in Base64
    const base64String = fileReader.result.split(',')[1];
    // Now you can use 'base64String' as needed
    setAudioBase64(base64String);
    console.log(base64String)
  }


  useEffect(() => {
    // sets the new audio reference when a new exercise is chosen.
    customArray.map((item) => {
      if (currentExercise === item.id) {
        setExerciseName(item.name)
        console.log(exerciseName)
        
        setDemoAudio(item.audio)
          // console.log(item.audio)
      }
    })
  }
    , [currentExercise, customArray])


  const audioToBase64 = (audioBlob) => {
    fileReader.readAsDataURL(audioBlob)
  };


  // send to backend
  
  // function to send a POST request
  const sendPostRequest = async () => {
    try {
      const response = await fetch('https://d20b8eef-89ec-4ee4-9f8c-e9184f13ed57.mock.pstmn.io/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({
          // Add any data you want to send in the request body
          name: 'valuew',
          key2: 'value2',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log('POST request response:', responseData);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };
 

  
  // fetch words
  const info = useQuery({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await fetch('https://d20b8eef-89ec-4ee4-9f8c-e9184f13ed57.mock.pstmn.io/get')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const jsonResponse = await response.json()
      const data = jsonResponse.data
      return data
    }
  })
  
  useEffect(() => {
    if (info.isSuccess && info.data) {
      const datum = info.data
      setCustomArray(datum)
    }
  }, [info.data, info.isSuccess, setCustomArray])



  return (
    <div className="flex flex-row w-full">
      <Panel setExercise={setCurrentExercise} arrayResponse={customArray} />
      <div className="w-5/6 px-12 py-4">
        <Recorder setAudioBase64={audioToBase64} demoAudio={demoAudio} />
      </div>
      {/* test */}
      <div className="w-full h-full text-white bg-[#6366F1]">
        <div className="pt-4 pb-12 pl-6">
          <h3 className="pb-4 text-3xl">Correct word/Sentence:</h3>
          <div className="px-4 text-lg bg-gray-800 rounded-md w-fit">
            {/* {correct-sentences} */}
            You are Patient
          </div>
        </div>
        {
          'wrong' && <div className="pl-6">
            <h3 className="pb-4 text-3xl">Wrong word/Sentence:</h3>
            <div className="px-4 text-lg bg-gray-800 rounded-md w-fit">
              {/* {correct-sentences} */}
              You are Patient
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Words