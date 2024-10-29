import { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import toast, { Toaster } from 'react-hot-toast';
import { createSong } from '@/actions/songs';
import { isAuth, getCookie } from '@/actions/auth';
const token = getCookie('token');

const songForm = () => {
    const [Name, setName] = useState('');
    const [singer, setSinger] = useState('');
    const [size, setSize] = useState('');
    const [slug, setSlug] = useState('');
    const [music, setMusic] = useState('');
    const [label, setLabel] = useState('');
    const [duration, setDuration] = useState('');
    const [Categories, setCategories] = useState('');
    const [lyrics, setLyrics] = useState('');

    const handleNameChange = (e) => {
        const capitalizedName = e.target.value
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        setName(capitalizedName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) { toast.error('Please login to continue'); return; }

        const formdata2 = new FormData();

        formdata2.append('Name', Name);
        formdata2.append('singer', singer);
        formdata2.append('music', music);
        formdata2.append('slug', slug);
        formdata2.append('lyrics', lyrics);
        formdata2.append('duration', duration);
        formdata2.append('size', size);
        formdata2.append('label', label);
        formdata2.append('Categories', Categories);


        try {
            const response = await createSong(formdata2, token);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success("Song Added Successfully");
            }
        } catch (error) {
        }
    };

    return (
        <AdminDashboard>
            <Toaster />
            <form onSubmit={handleSubmit} className='max-w-[600px] mx-auto  p-6 rounded-lg'>

                <h2 className='text-2xl font-bold text-white text-center mb-6'>Add New Songs</h2>

                <div className="block mb-2 text-sm font-medium text-white">Song Name</div>
                <input type="text" value={Name} onChange={handleNameChange} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <div className="block mb-2 text-sm font-medium text-white">Singer</div>
                <input type="text" value={singer} onChange={(e) => setSinger(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Size</div>
                <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />



                <div className="block mb-2 text-sm font-medium text-white">Duration</div>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />


                <div className="block mb-2 text-sm font-medium text-white">Label</div>
                <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Lyrics</div>
                <input type="text" value={lyrics} onChange={(e) => setLyrics(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Music</div>
                <input type="text" value={music} onChange={(e) => setMusic(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Slug</div>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Categories</div>
                <input type="text" value={Categories} onChange={(e) => setCategories(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />



                <button type="submit" className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    Submit
                </button>

            </form>

        </AdminDashboard>
    );
};

export default songForm;
