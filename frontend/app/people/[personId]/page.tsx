"use client";
import { useEffect, useState } from "react";
import { fetchPersonDetails } from "@/_api/fetchPersonDetails";

export default function PeoplPage({params}: {params: {personId: string}}) {
  const [personData, setPersonData] = useState<any>({
    personDetails: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPersonDetails(params.personId);
      setPersonData({personDetails: data, loading: false});
      console.log(data); // FOR DEBUGGING
    }
    fetchData();

  }, [params.personId])  
}