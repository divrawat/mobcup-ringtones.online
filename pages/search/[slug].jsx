import { SearchSongs } from "@/actions/songs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DOMAIN, APP_NAME, R2_SUBDOMAIN, DOMAIN_NAME, APP_LOGO } from "@/config";
import { Rubik } from '@next/font/google';
const roboto = Rubik({ subsets: ['latin'], weight: '800' });
const roboto2 = Rubik({ subsets: ['latin'], weight: '600' });
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import slugify from 'slugify';
import { FaHome } from "react-icons/fa";
export const runtime = 'experimental-edge';

const SearchPage = ({ songs, totalCount, page, errorCode, query }) => {


    const cleanedquery = query.replace(/-/g, ' ');
    const capitalizedQuery = cleanedquery
        .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    const [query2, setQuery2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const myquery = slugify(query2, { lower: true, remove: /[*+~.()'"!:@]/g });
        router.push(`/search/${myquery}?page=1`);
    };





    const router = useRouter();
    const { slug } = router.query;
    const [currentPage, setCurrentPage] = useState(Number(query.page) || 1);


    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`${DOMAIN}/search/${slug}?page=${page}`);
    };


    const totalPages = Math.ceil(totalCount / 30);
    const maxPagesToShow = 5;
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (startPage > 1) { pageNumbers.push(1); if (startPage > 2) { pageNumbers.push('...'); } }
    for (let i = startPage; i <= endPage; i++) { pageNumbers.push(i); }
    if (endPage < totalPages) { if (endPage < totalPages - 1) { pageNumbers.push('...'); } pageNumbers.push(totalPages); }



    const DESCRIPTION = `${capitalizedQuery} Ringtones Download Mp3 for Free only on ${DOMAIN_NAME}`

    const ringtoneSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${capitalizedQuery} Ringtones Download Mp3 Page ${page}`,
        "description": `Download free ${capitalizedQuery} ringtones from our collection for Android or Iphone`,
        "url": `${DOMAIN}/search/${slug}?page=${page}`,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${DOMAIN}/search/{search_term_string}?page=1`,
            },
            "query-input": `required name=search_term_string`,
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${DOMAIN}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Ringtones",
                    "item": `${DOMAIN}/search/${slug}?page=${page}`
                },
            ]
        },
        "mainEntityOfPage": {
            "@type": "Collection",
            "name": `${capitalizedQuery} Ringtones Download Mp3 Page ${page}`,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mobcup",
            "logo": {
                "@type": "ImageObject",
                "url": `${DOMAIN}/logo.png`
            }
        }
    };



    const head = () => (
        <Head>
            <title>{`${capitalizedQuery} Songs Downlaod Mp3 Page ${page}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta name="googlebot" content="noarchive" />
            <meta name="robots" content="noarchive" />
            <link rel="canonical" href={`${DOMAIN}/search/${slug}?page=${page}`} />
            <meta property="og:title" content={`${capitalizedQuery} Downlaod Mp3 Page ${page}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/search/${slug}?page=${page}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ringtoneSchema) }} />
        </Head >
    );


    if (errorCode) {
        return (
            <>
                {/* {head()} */}
                <Navbar />
                <form className="max-w-[700px] mx-auto px-5 mt-5" onSubmit={handleSubmit}>
                    <label htmlFor='default-search' className="mb-2 text-sm font-medium  sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input autoComplete='off' value={query2} onChange={(e) => setQuery2(e.target.value)} placeholder="Search for a Singer or Song ..." type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border outline-none border-gray-300 rounded-lg " required />
                        <button type="submit" className="text-white absolute end-2.5 font-bold bottom-2.5 bg-[#2683a8] hover:scale-110 transition-transform rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>
                <h1 className="font-bold text-3xl text-center mt-10">{`404 Page or Songs not Found`}</h1>
                <Footer />
            </>
        );
    }


    return (
        <div>
            <Navbar />
            {head()}

            <form className="max-w-[700px] mx-auto px-5 mt-5" onSubmit={handleSubmit}>
                <label htmlFor='default-search' className="mb-2 text-sm font-medium  sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input autoComplete='off' value={query2} onChange={(e) => setQuery2(e.target.value)} placeholder="Search for a Singer or Song ..." type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border outline-none border-gray-300 rounded-lg " required />
                    <button type="submit" className="text-white absolute end-2.5 font-bold bottom-2.5 bg-[#2683a8] hover:scale-110 transition-transform rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>




            <h1 className={`${roboto.className} text-center mt-5 text-2xl font-extrabold`}>{`${capitalizedQuery} Songs Download Mp3`}</h1>
            <p className="text-center my-3">{`${totalCount} ${capitalizedQuery} Songs Found`}</p>


            <p className='text-center font-bold mb-2'>{`Page ${page}`}</p>



            <div className="max-w-[1000px] mx-auto">
                <ul className='flex justify-center gap-5 flex-wrap'>
                    {songs?.map((song, index) => (

                        <li className="hover:scale-110 transition-transform rounded w-[300px] " key={index}>
                            <Link prefetch={false} href={`${DOMAIN}/${song?.slug}`}>

                                <div className='flex gap-3 my-10'>
                                    <div className='w-[80px]'>
                                        <img src={`${DOMAIN}/ringtone-img.webp`} height={70} width={70} alt={`${song?.Name} Cover`} />
                                    </div>

                                    <div className='w-[150px]'>
                                        <p className={`${roboto2.className} text-[15px]`}>{song?.Name}</p>
                                        <p className="text-[11px] mt-2 inline-block border border-gray-400 px-2 py-1 rounded-md">
                                            {`${song?.duration} seconds`}
                                        </p>
                                    </div>

                                </div>

                            </Link>
                        </li>
                    ))}
                </ul>
            </div>



            {/* <div className='flex justify-center flex-wrap items-center my-10 mx-4' id='pagination'>
                {pageNumbers?.map((pageNum, index) => (
                    <Link prefetch={false} key={index} href={`${DOMAIN}/search/${slug}?page=${pageNum}`}
                        className={`${roboto2.className} mx-2 px-3 py-1.5 text-sm rounded-lg ${page === pageNum ? 'bg-[#0f2a33] text-white' : 'bg-[white] hover:bg-[#0f2a33] hover:text-white text-[black]'}`}
                        onClick={() => { if (typeof pageNum === 'number') { handlePageChange(pageNum); } }}>
                        {pageNum}
                    </Link>
                ))}
            </div> */}


            <div className='flex justify-center flex-wrap items-center my-10 mx-4' id='pagination'>
                {pageNumbers?.map((pageNum, index) => (
                    typeof pageNum === 'number' ? (
                        <Link
                            prefetch={false}
                            key={index}
                            href={`${DOMAIN}/search/${slug}?page=${pageNum}`}
                            className={`${roboto2.className} mx-2 px-3 py-1.5 text-sm rounded-lg ${page === pageNum ? 'bg-[#0f2a33] text-white' : 'bg-[white] hover:bg-[#0f2a33] hover:text-white text-[black]'}`}
                            onClick={() => handlePageChange(pageNum)}
                        >
                            {pageNum}
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className={`${roboto2.className} mx-2 px-3 py-1.5 text-sm rounded-lg text-[black]`}
                        >
                            {pageNum}
                        </span>
                    )
                ))}
            </div>


            <Footer />
        </div>
    );
};

export async function getServerSideProps({ query }) {
    const { slug, page } = query;
    try {

        const data = await SearchSongs(slug, page);

        if (data.error) { return { props: { errorCode: 404, query: query.slug } }; }

        return { props: { songs: data.songs, totalCount: data.totalCount, page: data.page, query: query.slug }, };

    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

export default SearchPage;
