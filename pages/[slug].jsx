export async function getServerSideProps({ params, res }) {
    try {
        const response = await GetSingleSong(params?.slug);
        if (response?.error) { return { props: { errorcode: true } }; }

        res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');

        return { props: { response } };

    } catch (error) {
        console.error('Error fetching song data:', error);
        return { props: { errorcode: true } };
    }
}




import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { GetSingleSong } from '@/actions/songs';
import { DOMAIN, APP_NAME, NOT_FOUND_IMAGE, APP_LOGO, R2_SUBDOMAIN, BACKEND_DOMAIN, DOMAIN_NAME } from '@/config';
import { FaHome } from "react-icons/fa";
import { Rubik } from '@next/font/google';
import { AiFillChrome } from "react-icons/ai";
const roboto = Rubik({ subsets: ['latin'], weight: '800' });
const roboto2 = Rubik({ subsets: ['latin'], weight: '600', });
const roboto3 = Rubik({ subsets: ['latin'], weight: '300', });
import { useState } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import dynamic from 'next/dynamic';
// const MyDynamicComp = dynamic(() => import('@/components/MyDynamicComp'), { ssr: false });
export const runtime = 'experimental-edge';


const SongPage = ({ errorcode, response }) => {

    const song = response;


    if (errorcode) {
        const head = () => (
            <Head>
                <title>{`404 Page Not Found: ${APP_NAME}`}</title>
            </Head >
        );
        return (
            <>
                {head()}
                <Navbar />
                <div className="text-cente">
                    <h1 className="text-3xl font-bold mt-5 mb-8 text-center">404 Page Not Found</h1>
                    <div className="flex justify-center items-center px-5">
                        <img height={350} width={350} src={`${NOT_FOUND_IMAGE}`} className="rounded-full" />
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const DESCRIPTION = `${song?.Name} download Mp3 for Android and Iphone only on ${DOMAIN_NAME}. `;

    const audioSchema = {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        "name": `${song?.Name}`,
        "description": `${song?.Name} Download Mp3 For Free`,
        "contentUrl": `${R2_SUBDOMAIN}/${song?.slug}`,
        "duration": `${song?.duration} seconds`,
        "encodingFormat": "mp3",
        "inLanguage": "en",
    };

    const head = () => (
        <Head>
            <title>{`${song?.Name} Download Mp3: ${APP_NAME}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta name="googlebot" content="noarchive" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <link rel="canonical" href={`${DOMAIN}/${song?.slug}`} />
            <meta property="og:title" content={`${song?.Name} Download Mp3: ${APP_NAME}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/${song?.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/ringtone-img.webp`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/ringtone-img.webp`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioSchema) }} />
        </Head >
    );


    const router = useRouter();
    const [query2, setQuery2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const myquery = slugify(query2, { lower: true, remove: /[*+~.()'"!:@]/g });
        router.push(`/search/${myquery}?page=1`);
    };



    const categoryList = song?.Categories.split(',').map(category => category.trim());
    // const title = song?.Name.split('-')[0].trim();
    const title = song?.Name.replace(/[-|,|–].*/, '').trim();



    return (
        <>
            {head()}
            <Navbar />

            <main>
                <article className='px-5'>


                    <form className="max-w-[700px] mx-auto px-5 mt-5" onSubmit={handleSubmit}>
                        <label htmlFor='default-search' className="mb-2 text-sm font-medium  sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input autoComplete='off' value={query2} onChange={(e) => setQuery2(e.target.value)} placeholder="Search for a Singer or Song ..." type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border outline-none border-gray-300 rounded-lg " required />
                            <button type="submit" className="text-white absolute end-2.5 font-bold bottom-2.5 bg-[#150411] hover:scale-110 transition-transform rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>


                    <div className='flex justify-center text-[13px] px-4 flex-wrap items-center gap-3 mt-5 mb-5 text-blue-600'>
                        <div className='flex items-center gap-2'>
                            <div><FaHome /></div>
                            <div><Link prefetch={false} href={`${DOMAIN}`}>Home</Link></div>
                        </div>
                        <div>{`>`}</div>
                        <div className='flex items-center gap-2'>
                            <div><AiFillChrome /></div>
                            <div><Link prefetch={false} href={`${DOMAIN}/${song?.slug}`}>{`${song?.Name} Download Mp3`}</Link></div>
                        </div>
                    </div>


                    <div className='border border-[#dddcdc] max-w-[600px] rounded-md mx-auto px-8 bg-white'>
                        <h1 className={`${roboto.className} text-[23px] px-2 font-bold tracking-wider text-center mt-5 mb-5`}>{`${song?.Name} Downlaod Mp3`}</h1>


                        <div className=" max-w-[800px] mx-auto">

                            <div className='flex justify-center mb-3'> <img src={`${DOMAIN}/ringtone-img.webp`} height={80} width={80} alt={`${song?.Name} Image`} /></div>

                            <div className='flex justify-center text-[13px] mb-2'>{`${song?.duration} Seconds`}</div>

                            <div className='flex justify-center flex-wrap'>
                                {categoryList.map((category, index) => (
                                    <button key={index} className=' border text-[12px] border-gray-400 px-2 py-1 m-1 rounded-md hover:scale-110 transition-transform'>
                                        {category}
                                    </button>
                                ))}
                            </div>


                            <div className='flex justify-center mt-5'>
                                <audio src={`${R2_SUBDOMAIN}/${song?.slug}.mp3`} preload="auto" controls></audio>
                            </div>

                            <div className='flex justify-center hover:scale-110 transition-transform py-5'>
                                <a href={`${BACKEND_DOMAIN}/api/download/${song?.slug}/${title}`}
                                    className={`${roboto2.className} bg-[#150411] text-white px-2 py-1 text-[14px] rounded-md`}>
                                    Download Mp3
                                </a>
                            </div>
                        </div>


                    </div>





                </article >
            </main>
            <Footer />
        </>
    );
}


export default SongPage;