// import { useEffect, useState } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./boutonsLanguages.module.css";

function VideoPage() {
  const [actualCategory, setActualCategory] = useState("");

  function getCategory(categorySelected) {
    setActualCategory(categorySelected);
  }
  // appel de la route get avec query pour trier les resultats en fonction de la table category
  useEffect(() => {
    (async () => {
      const triedCategory = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videosSelected?category=${actualCategory}`
      );
      await triedCategory.json();
    })();
  }, [getCategory]);

  const categories = ["Javascript", "php", "Python", "Java", "css"];

  return (
    <div className={styles.buttonsContainer}>
      {categories.map((category) => (
        <Link
          to="/"
          id={styles[category]}
          className={styles.buttonsContainer__category}
          type="button"
          key={category}
          onClick={() => getCategory(category)}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

export default VideoPage;
