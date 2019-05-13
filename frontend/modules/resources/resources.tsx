import * as React from "react";
import "./index.css";
import ClubResources, { IResourcePage, IWorkshop, technology } from "./clubResources";

const workshops: IWorkshop[] = [
  {
    title: "Nodejs Workshop",
    link: "https://purduehackers.gitbook.io/tutorials/workshops/nodejs-workshop",
    technology: "WebDev(Backend)",
  },
  {
    title: "Android for Beginners",
    link: "https://vidia.gitbooks.io/hello-android/content/building/adding_text_input.html",
    technology: "Android App Dev",
  },
  {
    title: "HTML, CSS & JS",
    link: "https://maneesht.gitbooks.io/web-development-basics/content/",
    technology: "WebDev(Frontend)",
  },
  {
    title: "React Workshop",
    link: "https://purduehackers.gitbook.io/tutorials/workshops/react-workshop",
    technology: "WebDev(Frontend)",
  },
  {
    title: "Swift and Objective-C",
    link: "https://nodejs.org/en/",
    technology: "iOS App Dev",
  },
  {
    title: "Making a Server",
    link: "https://nodejs.org/en/",
    technology: "Sample Projects"
  },
  {
    title: "Hello-Spotify",
    link: "https://maneesht.gitbooks.io/hello-spotify/content/",
    technology: "Sample Projects"
  }
]

export default class Resources extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <br />
        <ClubResources resources={workshops} />
      </div>
    );
  }
}