import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import bgPattern from '../assets/background.svg';
import Navbar from './Navbar';

const JobList = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/api/jobs/')
            .then(response => response.json())
            .then(data => {
                const sampleData = data.map((job, index) => ({
                    ...job,
                    tags: index % 3 === 0 ? ['Full-time', 'Remote'] : index % 3 === 1 ? ['Contract'] : ['Full-time', 'On-site']
                }));
                setAllJobs(sampleData);
                setFilteredJobs(sampleData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const results = allJobs.filter(job =>
            job.title.toLowerCase().includes(term.toLowerCase()) ||
            job.company.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredJobs(results);
    };

    const SkeletonCard = () => (
        <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg animate-pulse">
            <div className="h-6 bg-slate-300/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-300/50 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-slate-300/50 rounded w-1/4 mb-6"></div>
            <div className="flex space-x-2">
                <div className="h-6 w-20 bg-slate-300/50 rounded-full"></div>
                <div className="h-6 w-20 bg-slate-300/50 rounded-full"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" style={{ backgroundImage: `url(${bgPattern})` }}>
            <Navbar />
            <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
                <div className="container mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Find Your Next Opportunity</h1>
                    <p className="mt-4 text-lg text-indigo-200">The best jobs from top companies, right at your fingertips.</p>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8 -mt-16">
                <div className="relative flex items-center mb-8">
                    <MagnifyingGlassIcon className="absolute left-4 h-6 w-6 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by job title, company, or skill..."
                        className="w-full py-4 pl-12 pr-4 text-lg bg-white/50 text-gray-800 placeholder-gray-500 backdrop-blur-xl border border-white/30 rounded-full shadow-lg focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                {isLoading ? (
                    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {filteredJobs.length > 0 ? filteredJobs.map(job => (
                             <div key={job.id} className="bg-white/60 backdrop-blur-xl p-6 rounded-xl border border-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                                    <Link to={`/job/${job.id}`} className="hover:text-indigo-600 transition-colors duration-300">{job.title}</Link>
                                </h2>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-400" />
                                    <p className="font-semibold">{job.company}</p>
                                </div>
                                <div className="flex items-center text-gray-500 mb-4">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                                    <p>{job.location}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-gray-200 text-right">
                                    <Link to={`/job/${job.id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">View Details</Link>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-12 bg-white/50 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-700">No Jobs Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search term.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default JobList;