import React, { useEffect } from 'react'
import useRequest from '../hooks/useRequest';
import SourcesContainer from '../components/SourcesContainer';
import useAuth from '../hooks/useAuth';

export default function MostSources() {
  const { data_, loading_, error, requestApi } = useRequest();
  const { subs } = useAuth();

  useEffect(() => {
    const fetchSources = async () => {
      await requestApi("/sources/top-sources", { method: "GET" });
    };
    fetchSources();
  }, []);

  const subscriptions = JSON.parse(subs() ? subs() : "[]");

  
  return (
    <div className=" relative pt-20">
    <SourcesContainer
        sources={data_?.commonSubscriptions}
        subscriptions={subscriptions}
      />
      </div>
  )
}
