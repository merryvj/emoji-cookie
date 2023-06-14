import React, { useState, useEffect } from "react";

const faces = ["(o^▽^o)", "( ; ω ; )", "(*≧ω≦*)", "(„• ᴗ •„)", "( ° ∀ ° )"];

export default function Loader() {
  const [index, setIndex] = useState(0);
 
  useEffect(() => {
    let t, newIndex;
    if (index == faces.length - 1) newIndex = 0;
    else newIndex = index + 1;

    t = setTimeout(() => setIndex(newIndex), 1000);

    return () => {
      clearTimeout(t);
    };
  }, [faces, index]);

  return (
    <div style={{textAlign: "center"}}>{faces[index]}</div>
  )
  
}
