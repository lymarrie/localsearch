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
 import About from "../components/about";
 import Banner from "../components/banner";
 import Cta from "../components/cta";
 import Contact from "../components/contact";
 import Footer from "../components/footer";
 import Header from "../components/header";
 import Hours from "../components/hours";
 import List from "../components/list";
 import PhotoGallery from "../components/photo-gallery";
 import StaticMap from "../components/static-map";
 import { SchemaWrapper } from "../components/schema/jsonld";
 
 import { reactWrapper } from "../wrapper";
 import { renderToString } from "react-dom/server";
 import "../index.css";
 import { Data } from "../types/data";


export const config = {
  name: "gallery",
  hydrate: true,
  streamId: "gallery",
  stream: {
    $id: "gallery",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "richTextDescription",
      "photoGallery",
      "slug"
    ],
    filter: {
      entityTypes: ["ce_photoGalleryPage"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `gallery`;
};

const Gallery = (props: any) => {
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
                {photoGallery && (<Banner 
                    name={name}
                    secondaryColor="blue"
                    photo={photoGallery[0].image.url}
                    position="bg-center"
                ></Banner>)}
            </div>
                <div className="centered-container">
                    {photoGallery && (<PhotoGallery photoGallery={photoGallery.slice(1)}></PhotoGallery>)}
                </div>
            <Footer footer={_site.c_footer}></Footer>
          </body>
        </>
      );
    };

export const render = (data: Data) =>
  reactWrapper(
    data,
    "gallery.tsx",
    renderToString(<Gallery {...data} />),
    true,
    false,
    "Luc's Pizza | New York City"
  );

export default Gallery;
