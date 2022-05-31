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
  name: "menupage",
  hydrate: true,
  streamId: "menupage",
  stream: {
    $id: "menupage",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "c_menuItems.id",
      "c_menuItems.name",
      "c_menuItems.description",
      "c_menuItems.price",
      "c_menuItems.photoGallery",
      "c_menuItems.slug"
    ],
    filter: {
      entityTypes: ["ce_menuPage"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `menu`;
};

const MenuPage: React.FC<Data> = (props) => {
    const { document } = props;
    const { streamOutput } = document;
    const { 
        _site, 
        name, 
        description, 
        c_menuItems
      } = streamOutput;

      const items = c_menuItems.map((item:any) => (
        <a href={item.slug}>
          <div className="card p-5 border-2 rounded-xl space-y-3 bg-gray-100 drop-shadow-md">
            <img src={item.photoGallery[0].image.url} className="rounded-xl w-100 h-auto"/>
            <div className="name pt-2 text-2xl text-center font-bold">{item.name}</div>
            <div className="text-xl text-amber-700 font-semibold">${item.price.value}</div>
            <div className="">{item.description}</div>
          </div>
        </a>
      ));

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
                  <div className="section">
                    <div className="text-4xl text-center font-bold">Menu Items</div>
                    <div className="pt-10 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3 gap-x-5">
                        {items}
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
      "menupage.tsx",
      renderToString(<MenuPage {...data} />),
      true,
      false,
      "Luc's Pizza | New York City"
    );

export default MenuPage;
