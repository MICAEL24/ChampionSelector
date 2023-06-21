import { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios'

function App() {
  const [champions, setChampions] = useState([])
  const [selected, setSelected] = useState("")

  const getChampions = async() => {
    try {
      const response = await axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
      const data = response.data.data;
      setChampions(data)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    getChampions();
  }, [])

  return (
    <div className='container'>
      <div className="titulo">
        <h1>Champion Selector</h1>
      </div>
        <div className='tudo'>
          <div className="content">
          {champions.map((champ) => (
            <div className='btn' key={champ.uuid} onClick={() => {setSelected(champ.uuid)}}>
                <img className="icon" src={champ.displayIcon}/>
                <h1>{champ.displayName}</h1>
            </div>
          ))}
          </div>
          {champions.map((champ) => (
            selected ===  champ.uuid ? (
              <div className='info'>
                <div>
                  <img src={champ.fullPortrait}/>
                </div>
                <div>
                  <h1>{champ.displayName}</h1>
                  <p>{champ.description}</p> 
                </div>
              </div> ) : (null)
            ))}
        </div>
    </div>
  )
}

export default App
