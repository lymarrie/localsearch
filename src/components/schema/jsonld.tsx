import {LocalBusiness, Thing, WithContext, PostalAddress} from 'schema-dts';
import PhotoGallery from '../photo-gallery';

export function JsonLd<T extends Thing>(json: WithContext<T>): string {
  return `<script type="application/ld+json">
${JSON.stringify(json)}
</script>`;
}

export const SchemaWrapper = (data: any) => {
  return LocalBusinessSchemaWrapper(data)
}

export const LocalBusinessSchemaWrapper = (data: any) => {
  return JsonLd<LocalBusiness>({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // TODO: change this to match the current project's business type
    name: data.document.streamOutput.name,
    address: parseAddress(data.document.streamOutput.address),
    description: data.document.streamOutput.description,
    telephone: data.document.streamOutput.mainPhone,
    image: parsePhotoGallery(data.document.streamOutput.photoGallery),
    openingHours: parseOpeningHours(data.document.streamOutput.hours)
  });  
}

// takes in a list of yext images and return a list of image urls
export const parsePhotoGallery = (gallery: any) => {
  let imageArray = new Array<string>();

  for (const photo of gallery) {
    imageArray.push(photo.image.url)
  }

  return imageArray;
}

export const parseAddress = (address: any): PostalAddress => {
  return {
    "@type": "PostalAddress",
    "streetAddress": address.line1,
    "addressLocality": address.city,
    "addressRegion": address.region,
    "postalCode": address.postalCode,
    "addressCountry": address.countryCode,
  };
}

// example output: ["Mo-Fr 10:00-19:00", "Sa 10:00-22:00", "Su 10:00-21:00"]
// weekdays are indicated as Mo, Tu, We, Th, Fr, Sa, Su
export const parseOpeningHours = (hours: any) => {
  let hoursMap = new Map<string, Array<string>>();

  hoursMap = getHoursByDay(hours.monday, hoursMap, "Mo")
  hoursMap = getHoursByDay(hours.tuesday, hoursMap, "Tu")
  hoursMap = getHoursByDay(hours.wednesday, hoursMap, "We")
  hoursMap = getHoursByDay(hours.thursday, hoursMap, "Th")
  hoursMap = getHoursByDay(hours.friday, hoursMap, "Fr")
  hoursMap = getHoursByDay(hours.saturday, hoursMap, "Sa")
  hoursMap = getHoursByDay(hours.sunday, hoursMap, "Su")

  let hoursArray = new Array<string>();

  for (const [interval, days] of hoursMap){
    let daysOfWeek = days.join(",")
    hoursArray.push(daysOfWeek + " " + interval)
  }

  return hoursArray
}

export const getHoursByDay = (hours: any, hoursMap: Map<string, Array<string>>, day: string) => {
  if (hours.isClosed == true) {
    let interval = "00:00-00:00"
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);

    return hoursMap
  }

  for (let i = 0; i < hours.openIntervals.length; i++) {
    let interval = hours.openIntervals[i].start + "-" + hours.openIntervals[i].end;
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);
  }

  return hoursMap
}