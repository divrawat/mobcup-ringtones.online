
export async function getServerSideProps({ query, res }) {
    try {
        const { page } = query;
        const data = await GetAllSongs(page);

        /*
        res.setHeader(
          'Cache-Control',
          'public, s-maxage=10800, stale-while-revalidate=59'
        );
        */

        if (data.error) {
            return { props: { errorCode: 404 } };
        } else {
            return {
                props: {
                    songs: data.data, totalCount: data.totalsongs, query: query
                }
            };
        }

    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}


import Head from 'next/head';
import { GetAllSongs } from '@/actions/songs';
import { DOMAIN, APP_NAME, NOT_FOUND_IMAGE, APP_LOGO, IMAGES_SUBDOMAIN, DOMAIN_NAME } from '@/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaHome } from "react-icons/fa";
import { Rubik } from '@next/font/google';
const roboto = Rubik({ subsets: ['latin'], weight: '800' });
const roboto2 = Rubik({ subsets: ['latin'], weight: '700' });
import dynamic from 'next/dynamic';


export const runtime = 'experimental-edge';

const Index = ({ errorCode, songs, query, totalCount }) => {

    if (errorCode) {
        return (
            <>
                <Navbar />
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold mt-5 mb-8">404 Page Not Found</h1>
                    <div className="flex justify-center items-center px-5">
                        <img height={350} width={350} src={`${NOT_FOUND_IMAGE}`} className="rounded-full" />
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const router = useRouter();
    const { slug } = router.query;
    const [currentPage, setCurrentPage] = useState(Number(query.page) || 1);



    const DESCRIPTION = `Read .`;


    const head = () => (
        <Head>
            <title></title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta name="googlebot" content="noarchive" />
            <meta name="robots" content="noarchive" />
            <link rel="canonical" href={`${DOMAIN}/fxxfgfffffffffffffffff?page=${currentPage}`} />
            <meta property="og:title" content="" />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content="" />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image:type" content="image/webp" />
        </Head >
    );




    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`${DOMAIN}/page?page=${page}`);
    };

    const totalPages = Math.ceil(totalCount / 30);
    const maxPagesToShow = 5;
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (startPage > 1) { pageNumbers.push(1); if (startPage > 2) { pageNumbers.push('...'); } }
    for (let i = startPage; i <= endPage; i++) { pageNumbers.push(i); }
    if (endPage < totalPages) { if (endPage < totalPages - 1) { pageNumbers.push('...'); } pageNumbers.push(totalPages); }







    return (
        <>
            {head()}
            <Navbar />
            <main>
                <article>
                    <div className=' max-w-[1200px] mx-auto p-3'>


                        <h1 className={`${roboto.className}  text-3xl font-semibold mb-3 text-center`}>All Songs</h1>
                        <p className='text-center mb-3 font-bold text-sm'>{`Total Songs: ${totalCount}`}</p>
                        <p className='text-center font-bold mb-8 text-sm'>{`All Songs Page ${currentPage}`}</p>

                        <ul className='flex justify-center gap-5 flex-wrap'>
                            {songs?.map((song, index) => (

                                <li className="hover:scale-110 transition-transform rounded w-[300px] " key={index}>
                                    <Link prefetch={false} href={`${DOMAIN}/${song?.slug}`}>

                                        <div className='flex gap-3 my-10'>
                                            <div className='w-[150px]'>
                                                <img src="https://www.pagalworld.com.sb/siteuploads/thumb/sft145/72358_4.jpg" height={130} width={130} alt="" />
                                            </div>

                                            <div className='w-[150px]'>
                                                <p className={`${roboto2.className} text-[15px]`}>{song.Name}</p>
                                                {song.singer?.split(",").map((singer, i) => (
                                                    <p className='text-[12px]' key={i}>{singer.trim()} </p>
                                                ))}
                                                <p className='text-[12px]'>{song.duration}</p>
                                            </div>

                                        </div>

                                    </Link>
                                </li>
                            ))}
                        </ul>





                        <div className='flex justify-center flex-wrap items-center my-10 mx-4' id='pagination'>
                            {pageNumbers?.map((pageNum, index) => (
                                <Link prefetch={false} key={index} href={`${DOMAIN}/page?page=${pageNum}`}
                                    className={`${roboto2.className} text-white mx-2 px-3 py-1.5 text-sm rounded-lg ${currentPage === pageNum ? 'bg-[#2473a0] ' : 'bg-[#4bb7e2] hover:bg-[#2473a0] hover:text-white text-[black]'}`}
                                    onClick={() => { if (typeof pageNum === 'number') { handlePageChange(pageNum); } }}>
                                    {pageNum}
                                </Link>
                            ))}
                        </div>


                    </div>


                </article>
            </main >
            <Footer />
        </>
    );
};


export default Index;
