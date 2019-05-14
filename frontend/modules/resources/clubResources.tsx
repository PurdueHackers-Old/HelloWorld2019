import * as React from "react";

export interface IResourcePage {
  name: string;
  workshop: { title: string; link: string }[];
  image: any;
}

const ClubResources = ({ resources }: { resources: IResourcePage[] }) => {
  return (
    <div>
      <br />
      <ul id="alerts" className="res-array">
        {resources.map(resource => {
          const workshops = resource.workshop.map(workshop => {
            return (
              <li className="feild-name">
                <a href={workshop.link} target="_blank">
                  {workshop.title}
                </a>
              </li>
            );
          });

          return (
            <li className="pallete">
              <ul>
                <li className="feild">
                  <div className="title-text">{resource.name}</div>
                </li>
                <li className="feild">
                  <br />
                  <img src={resource.image} alt="image here" />
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
