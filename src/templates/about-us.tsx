/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

 import * as React from "react";
 import Banner from "../components/banner";
 import Footer from "../components/footer";
 import Header from "../components/header";
 import PhotoGallery from "../components/photo-gallery";
 import { LazyLoadImage } from 'react-lazy-load-image-component';
 
 import { reactWrapper } from "../wrapper";
 import { renderToString } from "react-dom/server";
 import "../index.css";
 import { Data } from "../types/data";

export const config = {
  name: 'about-us',
  hydrate: true,
  streamId: 'about-us',
  stream: {
    $id: 'about-us',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: [
        'id',
        'uid',
        'meta',
        'name',
        'richTextDescription',
        'photoGallery',
        'slug'
    ],
    filter: {
      entityTypes: ['ce_aboutUsPage'],
    },
    localization: {
      locales: ['en'],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `about`;
};

const AboutUs: React.FC<Data> = (props) => {
  const { document } = props;
  const { streamOutput } = document;
  const { 
      _site, 
      name, 
      richTextDescription, 
      photoGallery, 
      slug 
    } = streamOutput;

  return (
    <>
      <body className="font-main">
        <div className="centered-container">
            <Header
                name={_site.name}
                basicHeader={_site.c_header}
                relatedPages={_site.c_relatedPages}
                primaryColor={_site.c_primaryColor}
                secondaryColor={_site.c_secondaryColor}
                font={_site.c_font}
                googleAnalytics={_site.c_googleAnalytics}
                logo={_site.logo}
            ></Header>
        </div>
        <div className="w-full">
            <Banner 
                name="About Us"
                secondaryColor="blue"
                photo={photoGallery[0].image.url}
            ></Banner>
        </div>
            <div className="centered-container">
                <div className="section px-10 flex flex-col space-y-8 lg:grid lg:grid-cols-2 lg:gap-x-10">
                    {photoGallery && (
                        <div>
                            <LazyLoadImage
                                height={photoGallery[1].image.height}
                                src={photoGallery[1].image.url} // use normal <img> attributes as props
                                width={photoGallery[1].image.width} className=""/>
                        </div>    
                    )}
                    {richTextDescription && (<div>{richTextDescription}</div>)}
                </div>
                {photoGallery && (<PhotoGallery photoGallery={photoGallery.slice(2)}></PhotoGallery>)}
            </div>
        <Footer footer={_site.c_footer}></Footer>
      </body>
    </>
  );
};

export const render = (data: Data) =>
  reactWrapper(
    data,
    "about-us.tsx",
    renderToString(<AboutUs {...data} />),
    true
  );

export default AboutUs;
