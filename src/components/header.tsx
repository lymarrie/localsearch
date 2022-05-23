import React from "react";
import Cta from '../components/cta';

type Link = {
  label: string;
  uRL: string;
};

type Image = {
  url: string;
}

type Logo = {
  height?: number;
  width?: number;
  image: Image;
}

type Header = {
  name: string;
  header: Array<Link>;
  relatedPages?: any;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  googleAnalytics: Array<Link>;
  logo: Logo;
}


const Header = (props: Header) => {
  const { name, header, relatedPages, primaryColor, secondaryColor, font, googleAnalytics, logo } = props;
  const headerLinks = header.map((link) => (
    <div>
      <a key="uRL" href={link.uRL} className="hover:underline">
        {link.label}
      </a>
    </div>
  ));
  var relatedPageLinks;
  if (relatedPages) {
    relatedPageLinks = relatedPages.map((page: any) => (
      <div>
        <a key="uRL" href={page.id} className="hover:underline">
          {page.name}
        </a>
      </div>
    ));
  }

  return (
    <>
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <a href="/"><img src={logo.image.url} width="120" height="120"></img></a>
          <div className="flex gap-x-10 text-lg font-semibold">{headerLinks}{relatedPageLinks}</div>
          <Cta buttonText={'Online Reservations'} url={'#'} color={'black'}></Cta>
        </nav>
      </div>
    </>
  );
};

export default Header;
