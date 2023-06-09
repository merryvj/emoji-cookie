import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Scene from "./cookie";

export default function Home() {
  const [fortunes, setFortunes] = useState();
  const [result, setResult] = useState();
  const [isGenerated, setIsGenerated] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    fetchFortune();
  }, []);

  async function fetchFortune() {
    const response = await fetch(`https://kaomoji-server.onrender.com/fortune`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const fortunes = await response.json();
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setResult(fortune.emoji);
    console.log(fortune);
  }

  const onSubmit = () => {
    setIsGenerated(!isGenerated);
  };

  return (
    <div
    >
       <style global jsx>{`
          html,
          body{
            height: 100%;
            padding: 0;
            margin: 0;
          }
        `}</style>

      <Head>
        <title> ^_^ </title>
        <meta charset="utf-16"></meta>
       
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <title>My page title</title>
          <Scene
            isGenerated={isGenerated}
            fortuneText={result}
            handleClick={onSubmit}
          ></Scene>
        </div>
      </main>
    </div>
  );
}
