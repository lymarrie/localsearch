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

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config = {
  // The name of the feature.
  // NOTE: A future change may remove this and the feature name would use the name of the template by default.
  name: "index",
  stream: {
    $id: "locations",
    // Required for now, but the plugin could set this automatically for you.
    source: "knowledgeGraph",
    // Required for now, but the plugin could set this automatically for you.
    destination: "pages",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "description",
      "hours",
      "mainPhone",
      "geocodedCoordinate",
      "services",
      "logo",
      "photoGallery",
      "c_displayPhotoGallery",
      "c_displayStaticMap",
      "c_primaryColor",
      "c_secondaryColor",
      "c_font",
      "c_header",
      "c_footer",
      "c_googleAnalytics",
      "c_metaDescription"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath = (data: Data) => {
  return `index.html`;
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Index: React.FC<Data> = (props) => {
  const { document } = props;
  const { streamOutput } = document;
  const {
    _site,
    name,
    address,
    description,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    logo,
    photoGallery,
    c_displayPhotoGallery,
    c_displayStaticMap,
    c_primaryColor,
    c_secondaryColor,
    c_font,
    c_header,
    c_footer,
    c_googleAnalytics,
    c_metaDescription,
  } = streamOutput;

  return (
    <>
      <body className="font-main">
        <div className="centered-container">
          <Header
            name={name}
            header={c_header}
            relatedPages={_site.c_relatedPages}
            primaryColor={c_primaryColor}
            secondaryColor={c_secondaryColor}
            font={c_font}
            googleAnalytics={c_googleAnalytics}
            logo={logo}
          ></Header>
        </div>
        <Banner 
          name={name}
          secondaryColor="blue"
          photo={photoGallery[0].image.url}
          position="bg-center"
        ></Banner>
        <About description={description}></About>
        <div className="w-full bg-gray-200">
          <div className="centered-container">
            <h2 className="pt-10 text-4xl text-center">
              <a id="contact">Contact</a>
            </h2>
            <Contact
              address={address}
              mainPhone={mainPhone}
              hours={hours}
            ></Contact>
            {c_displayPhotoGallery && (
              <PhotoGallery photoGallery={photoGallery.slice(1, -1)}></PhotoGallery>
            )}
            {c_displayStaticMap && (
              <StaticMap
                latitude={geocodedCoordinate.latitude}
                longitude={geocodedCoordinate.longitude}
              ></StaticMap>
            )}
          </div>
        </div>
        <Footer footer={c_footer}></Footer>
      </body>
    </>
  );
};

/**
 * Defines how the plugin will render the template for the production build. This has no
 * impact on local dev.
 *
 * A convenient function is currently defined in src/wrapper.ts.
 *
 * NOTE: Future changes may impact how this is used.
 */
export const render = (data: Data) =>
  reactWrapper(data, "index.tsx", renderToString(<Index {...data} />), true);

export default Index;
