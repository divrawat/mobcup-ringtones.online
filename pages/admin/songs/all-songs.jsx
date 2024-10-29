
import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { isAuth, getCookie } from '@/actions/auth';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GetAllSongsDashboard, removeSong, UpdateSong } from '@/actions/songs';
import toast, { Toaster } from 'react-hot-toast';

const token = getCookie('token');

const Allsongs = () => {

    const [currentsong, setCurrentsong] = useState({
        Name: '',
        singer: '',
        size: '',
        slug: '',
        duration: '',
        Categories: '',
        label: '',
        downloads: '',
        lyrics: '',
        size: '',
    });

    const [songs, setsongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songscount, setsongscount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const hideModel2 = () => {
        setIsOpen2(false);
    }


    const showModal2 = (song) => {
        setIsOpen2(true);
        setCurrentsong(song);
    };




    const handleCurrentsongChange = (name) => (e) => {
        const value = e.target.value;
        setCurrentsong({ ...currentsong, [name]: value });
    };



    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };




    const hideModel = () => {
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };


    const handleConfirmDelete = (id) => {
        handledelete(id);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };



    const handledelete = async (id) => {
        try {
            const data = await removeSong(id, token);
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while deleting chapter:", error);
        }
    };



    const fetchData = async () => {
        try {
            const data = await GetAllSongsDashboard(currentPage, searchQuery, token); setsongs(data?.data); setsongscount(data?.totalsongs)
        } catch (error) { console.error('Error fetching Songs:', error); }
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };


    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };





    const handleUpdate = (id) => {
        if (!token) { toast.error("Please sign in to publish or update the Chapter."); return; }

        const formdata2 = new FormData();
        formdata2.set('Name', currentsong?.Name);
        formdata2.set('singer', currentsong?.singer);
        formdata2.set('music', currentsong?.music);
        formdata2.set('slug', currentsong?.slug);
        formdata2.set('lyrics', currentsong?.lyrics);
        formdata2.set('duration', currentsong?.duration);
        formdata2.set('size', currentsong?.size);
        formdata2.set('label', currentsong?.label);
        formdata2.set('Categories', currentsong?.Categories);

        UpdateSong(formdata2, token, id).then(data => {
            if (data?.error) {
                toast.error(data?.error);
                return;
            } else {
                toast.success('Song updated successfully');
                hideModel2();
                fetchData();
            }
        });
    }



    return (
        <AdminDashboard>
            <Toaster />

            <div className="text-center text-sm text-white font-bold mb-6">Total Songs &nbsp;-&nbsp; {songscount}</div>

            <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-white rounded-lg bg-gray-900" placeholder="Search songs" value={searchQuery} onChange={handleChangeSearch} />


            <div className="flex justify-center items-center gap-10 mt-8 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[13px] hover:scale-105 text-[white] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-white">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[13px] hover:scale-105 text-[white] active:scale-95 transition-transform ${((currentPage * 100) >= songscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 100) >= songscount}>Next</button>
            </div>


            {songscount === 0 && <div className="text-center text-[white] mt-10 text-lg font-bold">No song Found</div>}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 text-white">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs  bg-gray-900 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Song Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Singer
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span >Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {songs && songs.map((blog, index) => (

                            <tr key={index} className="bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    <div>{blog?.Name}</div>
                                </th>

                                <th scope="row" className="px-[25px] py-4 font-medium  whitespace-nowrap text-white">
                                    <div>{blog?.singer}</div>
                                </th>

                                <td className="flex items-center gap-10 px-6 py-4">
                                    <div className="cursor-pointer text-white" onClick={() => showModal2(blog)}> <FaEdit size={20} /></div>
                                    <div className="cursor-pointer text-white" onClick={() => showModal(blog)}>  <MdDelete size={20} /></div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div >



            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-70"></div>
                <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.Name}</span></p>
                    <div className="text-sm text-[#d35e5e] mb-3">Type the name of the song</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-gray-600 bg-gray-800  w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.Name} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.Name ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>














            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen2 ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-90" onClick={() => hideModel2()}></div>
                <div className="bg-black p-8 rounded-lg shadow-lg z-10 border border-gray-300 h-[500px] w-[500px] overflow-y-auto">

                    <div className='text-white mb-2 text-[13px]'>Song Name</div>
                    <input type="text" required autoComplete="off" value={currentsong?.Name} onChange={handleCurrentsongChange('Name')}
                        className="bg-gray-800 border mb-5 text-[11.5px] border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />


                    {/* <div className='text-white mb-2 text-[13px]'>Singer</div>
                    <input type="text" required autoComplete="off" value={currentsong?.singer} onChange={handleCurrentsongChange('singer')}
                        className="bg-gray-800 border mb-5 text-[11.5px] border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" /> */}



                    <div className='text-white mb-2 text-[13px]'>Slug</div>
                    <input type="text" required autoComplete="off" value={currentsong?.slug} onChange={handleCurrentsongChange('slug')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />

                    {/* <div className='text-white mb-2 text-[13px]'>Duration</div>
                    <input type="text" required autoComplete="off" value={currentsong?.duration} onChange={handleCurrentsongChange('duration')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />

                    <div className='text-white mb-2 text-[13px]'>Size</div>
                    <input type="text" required autoComplete="off" value={currentsong?.size} onChange={handleCurrentsongChange('size')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" /> */}

                    {/* <div className='text-white mb-2 text-[13px]'>Music</div>
                    <input type="text" required autoComplete="off" value={currentsong?.music} onChange={handleCurrentsongChange('music')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />

                    <div className='text-white mb-2 text-[13px]'>Label</div>
                    <input type="text" required autoComplete="off" value={currentsong?.label} onChange={handleCurrentsongChange('label')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />


                    <div className='text-white mb-2 text-[13px]'>Lyrics</div>
                    <input type="text" required autoComplete="off" value={currentsong?.lyrics} onChange={handleCurrentsongChange('lyrics')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />

                    <div className='text-white mb-2 text-[13px]'>Categories</div>
                    <input type="text" required autoComplete="off" value={currentsong?.Categories} onChange={handleCurrentsongChange('Categories')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" /> */}

                    <div className='text-white mb-2 text-[13px]'>Downloads</div>
                    <input type="text" required autoComplete="off" value={currentsong?.downloads} onChange={handleCurrentsongChange('downloads')}
                        className="bg-gray-800 text-[11.5px] border mb-5 border-gray-300 text-sm rounded-lg block w-full p-1.5 text-white" />


                    <div className="flex justify-end mt-8">
                        <button onClick={() => handleUpdate(currentsong?._id)} className="bg-[green] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"> Update </button>
                        <button className="bg-[red] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2" onClick={hideModel2} >Cancel</button>
                    </div>

                </div>

            </div>





        </AdminDashboard >
    )
}



export default Allsongs