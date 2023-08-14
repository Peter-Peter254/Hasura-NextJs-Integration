'use client'
import { useEffect, useState } from 'react';
import { fetchData } from './graphql/graphql';
interface Job {
  id: number;
  jobtitle: string;
  jobdescription: string;
}
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = `
          query MyQuery {
            jobs {
              id
              jobtitle
              jobdescription
            }
          }
        `;

        const jobsData = await fetchData(query);
        setJobs(jobsData.jobs);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <div>
        <h2 className='text-center mt-16'>Find the Right Jobs right Here</h2>
      </div>
      <div className="grid max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 grid-cols-3">
      {jobs.map((job) => ( 
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-10 pt-4 pb-2">
        <div key={job.id}>
          <h2>{job.jobtitle}</h2>
          <p>{job.jobdescription}</p>
        </div>   
        </div>
      </div>
      
        
      ))}
      </div>
    </div>
  );
}
