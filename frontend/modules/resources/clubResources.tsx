import * as React from "react";

export interface IResourcePage {
  name: string;
  workshop: { title: string; link: string }[];
  image: any;
}

export interface IWorkshop {
  title: string,
  link: string,
  technology: string,
}

export const technology = [{ name: "WebDev(Backend)", img: 'static/images/nodejslogo.png' },
{ name: "Android App Dev", img: 'static/images/android.png', },
{ name: "WebDev(Frontend)", img: 'static/images/logo.svg', },
{ name: "iOS App Dev", img: 'static/images/iOS.png', },
{ name: "Sample Projects", img: 'static/images/express-node-mongo.png', },]

const ClubResources = ({ resources }: { resources: IWorkshop[] }) => {
  return (
    <div>
      <br />
      <ul id="alerts" className="res-array">
        {technology.map(workshop => {
          const relevantWorkshops = resources.filter(res => {
            return res.technology.localeCompare(workshop.name) === 0;
          })
          const workshops = relevantWorkshops.map(resource => {
            return (
              <li className="feild-name">
                <a href={resource.link} target="_blank">
                  {resource.title}
                </a>
              </li>
            );
          });

          return (
            <li className="pallete">
              <ul>
                <li className="feild">
                  <div className="title-text">{workshop.name}</div>
                </li>
                <li className="feild">
                  <br />
                  <img src={workshop.img} alt="image here" />
                  <br />
                </li>
                {workshops}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClubResources;
