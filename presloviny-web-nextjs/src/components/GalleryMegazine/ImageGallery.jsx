import { IoClose } from "react-icons/io5";
function ImageGallery({ imageGalleryOpened, imageGalleryClose, imageGalleryActiveUrl }) {

    return (
        imageGalleryOpened && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-20 backdrop-blur-sm">
                <div className="lg:relative  pt-[max(60%,324px)] w-full  lg:h-screen">
                    <iframe
                        className="absolute border-none w-full h-full left-0 top-0"
                        src={imageGalleryActiveUrl}
                        seamless="seamless"
                        allowtransparency="true"
                    ></iframe>
                </div>
                <IoClose onClick={imageGalleryClose} className="absolute top-10 lg:right-32 right-5 text-white z-60 text-4xl hover:text-presloviny-gold transition-all duration-300" />
            </div>
        )
    );
}

export default ImageGallery;