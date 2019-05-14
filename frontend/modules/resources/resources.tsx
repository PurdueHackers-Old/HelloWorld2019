import * as React from "react";
import "./index.css";
import ClubResources, { IResourcePage } from "./clubResources";

const res: IResourcePage[] = [
  {
    name: "Purdue Hackers",
    workshop: [
      {
        title: "Nodejs Workshop",
        link:
          "https://purduehackers.gitbook.io/tutorials/workshops/nodejs-workshop"
      },
    ],
    image: "static/images/nodejslogo.png",
  },
  {
    name: "SIG Apps",
    workshop: [
      {
        title: "Android for Beginners",
        link: "https://vidia.gitbooks.io/hello-android/content/building/adding_text_input.html"
      }
    ],
    image: "static/images/android.png"
  },
  {
    name: "Backend / Database",
    workshop: [
      {
        title: "Making a Server",
        link: "https://nodejs.org/en/"
      }
    ],
    image: "static/images/express-node-mongo.png"
  },
  {
    name: "Purdue WebDev Club",
    workshop: [
      {
        title: "WebDev Basics Workshop",
        link: "https://maneesht.gitbooks.io/web-development-basics/content/"
      },
      {
        title: "Full Stack Development",
        link: "https://maneesht.gitbooks.io/hello-spotify/content/"
      }
    ],
    image: "static/images/webDevClub.png"
  },
  {
    name: "Purdue Hackers",
    workshop: [
      {
        title: "React Workshop",
        link: "https://purduehackers.gitbook.io/tutorials/workshops/react-workshop"
      }
    ],
    image: "static/images/logo.svg"
  },
  {
    name: "iOS Dev Club",
    workshop: [
      {
        title: "Node.js Workshop",
        link: "https://nodejs.org/en/"
      }
    ],
    image: "static/images/iOS.jpg"
  },
  // {
  //   name: "res4",
  //   workshop: [
  //     {
  //       title: "Node.js Workshop",
  //       link: "https://nodejs.org/en/"
  //     }
  //   ],
  //   image: "#"
  // },
  // {
  //   name: "res4",
  //   workshop: [
  //     {
  //       title: "Node.js Workshop",
  //       link: "https://nodejs.org/en/"
  //     }
  //   ],
  //   image: "#"
  // },
  // {
  //   name: "res4",
  //   workshop: [
  //     {
  //       title: "Node.js Workshop",
  //       link: "https://nodejs.org/en/"
  //     }
  //   ],
  //   image: "#"
  // },
  // {
  //   name: "res4",
  //   workshop: [
  //     {
  //       title: "Node.js Workshop",
  //       link: "https://nodejs.org/en/"
  //     }
  //   ],
  //   image: "#"
  // }
];

export default class Resources extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <br />
        <ClubResources resources={res} />
      </div>
    );
  }
}