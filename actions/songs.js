import fetch from 'isomorphic-fetch';
import { BACKEND_DOMAIN } from '@/config';

export const GetAllSongs = async (page) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/getallsongs?page=${page}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}

export const SongsSitemap = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/songs-sitemap`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const GetAllSongsDashboard = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/getallsongsdashboard?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const GetSingleSong = async (slug) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/get-single-song/${slug}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}




export const UpdateSong = async (data, token, id) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/updatesong/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const createSong = async (data, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/add-song`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const removeSong = async (id, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/delete-song/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const fetchSongsByCategory = async (slug, page) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/category/get-songs?slug=${slug}&page=${page}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const SearchSongs = async (songname, page) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/search-songs?songname=${songname}&page=${page}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}