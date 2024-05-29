"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchPersonDetails } from "@/_services/fetchPersonDetails";
import PersonInfo from "@/_ui/components/People/PersonInfo/PersonInfo";
import FilmGrid from "@/_ui/components/People/FilmGrid/FilmGrid";

export default function PeoplPage({
  params,
}: {
  params: { personId: string };
}) {
  const [personData, setPersonData] = useState<any>({
    details: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPersonDetails(params.personId);
      setPersonData({ details: data, loading: false });
    };
    fetchData();
  }, [params.personId]);
  console.log(personData.details); // FOR DEBUGGING

  return (
    <>
      {!personData.loading && (
        <div className={styles.container}>
          <PersonInfo
            name={personData.details.name}
            imagePath={personData.details.profile_path}
            bio={personData.details.biography}
          />
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#8aa5ae",
            }}
          />
          <FilmGrid
            cast={personData.details.credits.cast}
            crew={personData.details.credits.crew}
          />
        </div>
      )}
    </>
  );
}
