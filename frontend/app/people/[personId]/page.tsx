"use client";
import { useEffect, useState } from "react";
import { fetchPersonDetails } from "@/_api/fetchPersonDetails";
import PersonInfo from "@/_ui/components/People/PersonInfo";

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
        <div>
          <PersonInfo
            name={personData.details.name}
            imagePath={personData.details.profile_path}
            bio={personData.details.biography}
          />
        </div>
      )}
    </>
  );
}
