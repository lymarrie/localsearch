import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  alternateText?: string;
  height?: number;
  thumbnails?: Array<Thumbnail>;
  url: string;
  width?: number;
};

type ImageObj = {
  image: Image;
};

type PhotoGallery = {
  photoGallery: Array<ImageObj>;
};

const PhotoGallery = (props: PhotoGallery, display: boolean) => {
  const { photoGallery } = props;

  const images = photoGallery.map((element) => (
      <div>
        <LazyLoadImage
          height={element.image.height}
          src={element.image.url} // use normal <img> attributes as props
          width={element.image.width} className="animate rounded-xl drop-shadow-md"/>
      </div>
    ));

  return (
    <>
      <div className="section text-center grid gap-y-3">
        <a id="gallery">
          <div className="grid gap-y-8 md:grid-cols-3 gap-x-5 p-8">{images}</div>
        </a>
      </div>    </>
  );
};

export default PhotoGallery;
