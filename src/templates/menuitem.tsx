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
 
 import { reactWrapper } from "../wrapper";
 import { renderToString } from "react-dom/server";
 import "../index.css";
 import { Data } from "../types/data";


export const config = {
  name: "menuitem",
  hydrate: true,
  streamId: "menuitem",
  stream: {
    $id: "menuitem",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "price",
      "photoGallery",
      "slug"
    ],
    filter: {
      entityTypes: ["ce_menuItem"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
    return `${data.document.streamOutput.slug.toString()}`;
};

const MenuItem: React.FC<Data> = (props) => {
    const { document } = props;
    const { streamOutput } = document;
    const { 
        _site, 
        name, 
        description, 
        price,
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
            </div>
            <div className="centered-container">
              <div><a href="/menu" className="text-xl font-semibold hover:underline">&lsaquo; View All Menu Items</a></div>
                  <div className="py-10 flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                    <img src={photoGallery[0].image.url} className="rounded-xl lg:w-3/5"></img>
                    <div className="flex flex-col space-y-8 lg:pt-2">
                      <h1 className="text-3xl font-bold">{name}</h1>
                      <div className="text-amber-700 text-2xl font-semibold">${price.value}</div>
                      <div className="space-y-3">
                        <div className="text-xl font-semibold">Description</div>
                        <div className="text-gray-800">{description}</div>
                      </div>
                    </div>
                  </div>
                </div>
            <Footer footer={_site.c_footer}></Footer>
          </body>
        </>
      );
    };

    export const render = (data: Data) =>
    reactWrapper(
      data,
      "menuitem.tsx",
      renderToString(<MenuItem {...data} />),
      true
    );

export default MenuItem;