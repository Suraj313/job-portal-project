import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import bgPattern from '../assets/background.svg';
import Navbar from './Navbar'; // Import the Navbar

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/jobs/${id}/`)
            .then(response => response.json())
            .then(data => {
                setJob({
                    ...data,
                    tags: id % 3 === 0 ? ['Full-time', 'Remote', 'Engineering'] : id % 3 === 1 ? ['Contract', 'Design'] : ['Full-time', 'On-site', 'Marketing']
                });
            })
            .catch(error => console.error('Error fetching job details:', error));
    }, [id]);

    if (!job) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50" style={{ backgroundImage: `url(${bgPattern})` }}>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" style={{ backgroundImage: `url(${bgPattern})` }}>
             <Navbar />
             
            <main className="container mx-auto px-6 py-8">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-semibold">
                         <ArrowLeftIcon className="h-5 w-5 mr-2" />
                         Back to Listings
                    </Link>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">{job.title}</h2>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 text-lg text-gray-600 mb-6">
                            <div className="flex items-center">
                                <BriefcaseIcon className="h-6 w-6 mr-2 text-gray-400" />
                                <span className="font-semibold">{job.company}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPinIcon className="h-6 w-6 mr-2 text-gray-400" />
                                <span>{job.location}</span>
                            </div>
                        </div>

                         <div className="flex flex-wrap gap-2 mb-8">
                            {job.tags.map(tag => (
                                <span key={tag} className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="prose max-w-none text-gray-800 leading-relaxed text-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Job Description</h3>
                            <p>{job.description}</p>
                        </div>
                        
                        <div className="mt-10 pt-6 border-t border-gray-200">
                             <a href="#" className="w-full md:w-auto text-center inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg shadow-lg">
                                Apply Now
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobDetail;