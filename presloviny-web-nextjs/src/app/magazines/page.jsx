"use client"
import React, { useState, useEffect, useRef } from 'react';
import ImageGallery from '@/components/GalleryMegazine/ImageGallery';
import { BASE_URL } from '@/app/config';
import { getMagazines } from '@/lib/api';
import Pagination from '@/components/pagination/pagination';
import BigTextDot from '@/components/textStyles/BigTextDot';
import { IoMdDownload } from "react-icons/io";

export default function MagazinePage() {
    const galleryRef = useRef(null);
    const [imageGalleryOpened, setImageGalleryOpened] = useState(false);
    const [imageGalleryActiveUrl, setImageGalleryActiveUrl] = useState(null);
    const [magazines, setMagazines] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMagazines = async () => {
            const magazines = await getMagazines(page, pageSize);
            setMagazines(magazines.magazines);
            {
                magazines && magazines.length > 0 && (
                    setTotalPages(Math.ceil(magazines.meta.pagination.total / pageSize))
                )
            }
        };
        fetchMagazines();
    }, [page, pageSize]);

    const imageGalleryOpen = (url) => {
        setImageGalleryActiveUrl(url);
        setImageGalleryOpened(true);
    };

    const imageGalleryClose = () => {
        setImageGalleryOpened(false);
        setTimeout(() => setImageGalleryActiveUrl(null), 300);
    };

    useEffect(() => {
        const imageGalleryPhotos = galleryRef.current.querySelectorAll('img');
        for (let i = 0; i < imageGalleryPhotos.length; i++) {
            imageGalleryPhotos[i].setAttribute('data-index', i + 1);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                imageGalleryClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <section className="w-11/12 min-h-screen pb-20 select-none">
                <BigTextDot text="Časopisy" />
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                <div className="min-h-[80vh] duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" style={{ translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)' }}>
                    <ul ref={galleryRef} id="gallery" className="grid grid-cols-2 gap-10 lg:grid-cols-4">
                        {magazines && magazines.map((magazine, index) => (
                            <li key={magazine.id} className="relative hover:text-white group">
                                <img
                                    onClick={() => imageGalleryOpen(magazine.attributes.magazineEmbedUrl)}
                                    src={BASE_URL + magazine.attributes.cover.data.attributes.url}
                                    className="object-cover select-none w-full h-auto bg-gray-200 rounded aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4] hover:scale-105 transition-all duration-300"
                                    alt={`photo gallery image ${index + 1}`}
                                    data-index={index + 1}
                                />
                                <a
                                    href={BASE_URL + magazine.attributes.pdf.data.attributes.url}
                                    download="magazine.pdf"
                                    className="absolute bottom-3 right-5 p-1 rounded text-2xl hover:text-presloviny-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <IoMdDownload />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <ImageGallery
                imageGalleryOpened={imageGalleryOpened}
                imageGalleryClose={imageGalleryClose}
                imageGalleryActiveUrl={imageGalleryActiveUrl}
            />
        </>
    );
}