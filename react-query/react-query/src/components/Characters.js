import { useState } from 'react';
import { useQuery } from 'react-query'
import Character from './Character';

export default function Characters() {

  // Boomer way using react fetch (build-in)
  // const [characters, setCharacters] = useState([]);

  // const fetchCharacters = async () => {
  //   const response = await fetch("https://rickandmortyapi.com/api/character");
  //   const data = await response.json();
  //   console.log(data);
  //   setCharacters(data.results); 
  // }

  // useEffect(() => {
  //   fetchCharacters();
  //   console.log("beep")
  // }, []);

  const [page, setPage] = useState(2);

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
    return response.json();
  };

  const {data, status} = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true
  });

  if (status === "loading") {
    return <div>Loading .... </div>
  }

  if (status === "error") {
    return <div>Error !</div>
  }
    
  return (
    <div className='characters'>
      {data.results.map(character => (
        <Character character={character} />
      ))}
      <div>
        <button  
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data.info.next}
        >
          Next
        </button>
      </div>
    </div>
  )
}
