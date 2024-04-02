import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    if (userInput.length >= 3) {
      setTimeout(() => {
        findSynonyms(userInput);
      }, 1000);
    }
  }, [userInput]);

  const findSynonyms = async (input: string) => {
    const url = `https://api.datamuse.com/words?ml=${input}`;
    try {
      const response = await fetch(url);
      const synonyms = await response.json();
      setSynonyms(synonyms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <div>
        <form>
          <input
            value={userInput}
            className="input"
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <button className="button">find</button>
        </form>
        <div className="synonyms">
          <div className="results">
            {synonyms.slice(0, 10).map((synonym, i) => (
              <p className="synonym" key={synonym.word}>
                {`${i + 1}: ${synonym.word}`}
              </p>
            ))}
          </div>
          {showMore && (
            <div className="results">
              {synonyms.slice(10, 20).map((synonym, i) => (
                <p className="synonym" key={synonym.word}>
                  {`${i + 11}: ${synonym.word}, `}
                </p>
              ))}
            </div>
          )}
          <div></div>
        </div>
        {synonyms.length > 10 && ( // Only display "Show more" if there are more than 10 synonyms
          <button onClick={handleClick} className="button">
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </>
  );
}

export default App;
