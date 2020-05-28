import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
import { schemeOranges } from 'd3';
//import * as _d3Tip from "d3-tip";
//let parent = this
@Component
export default class Timeline extends Vue {
  data = [
    {
      Event: "Aragorn II finds the sapling of the White Tree.",
      Age: "T.A.",
      Year: "3019",
      Date: "25 June 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn and Gandalf meet at Sarn Ford. Gandalf tells Aragorn of Frodo's plan to leave the Shire.",
      Age: "T.A.",
      Year: "3018",
      Date: "1 May 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn and Gandalf meet at Sarn Ford. Gandalf tells Aragorn of Frodo's plan to leave the Shire.",
      Age: "T.A.",
      Year: "3018",
      Date: "1 May 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn and Gandalf meet at Sarn Ford. Gandalf tells Aragorn of Frodo's plan to leave the Shire.",
      Age: "T.A.",
      Year: "3018",
      Date: "1 May 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn arrives at Pelargir and captures the fleet.",
      Age: "T.A.",
      Year: "3019",
      Date: "13 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn captures Gollum in the Dead Marshes.",
      Age: "T.A.",
      Year: "3017",
      Date: "1 February 3017",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn captures Gollum in the Dead Marshes.",
      Age: "T.A.",
      Year: "3017",
      Date: "1 February 3017",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn delivers Gollum as a prisoner to Thranduil of Mirkwood.",
      Age: "T.A.",
      Year: "3018",
      Date: "21 March 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn delivers Gollum as a prisoner to Thranduil of Mirkwood.",
      Age: "T.A.",
      Year: "3018",
      Date: "21 March 3018",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn dismisses the faint-hearted among the Host of the West and commands them to to liberate Cair Andros.",
      Age: "T.A.",
      Year: "3019",
      Date: "23 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn is overtaken by the Grey Company in the early hours of the day.",
      Age: "T.A.",
      Year: "3019",
      Date: "6 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn sets out from Erech and comes to Calembel.",
      Age: "T.A.",
      Year: "3019",
      Date: "9 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Aragorn takes the Paths of the Dead at daybreak reaching the Stone of Erech at midnight.",
      Age: "T.A.",
      Year: "3019",
      Date: "8 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn uses the Orthanc-stone and reveals himself to the enemy.",
      Age: "T.A.",
      Year: "3019",
      Date: "6 March 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Aragorn, son of Arathorn, Heir of Isildur, is born.",
      Age: "T.A.",
      Year: "2931",
      Date: "1 March 2931",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo Baggins becomes 131 years old, the longeviest Hobbit in history.",
      Age: "T.A.",
      Year: "3021",
      Date: "22 September 3021",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    //{"Event":"Bilbo Baggins is born.","Age":"T.A.","Year":"2890","Date":"22 September 2890","Name":"Bilbo","DateD":new Date("June 10 1999")},
    {
      Event:
        "Bilbo Baggins returns to Bag End after the Quest of Erebor and learns he has been declared dead.",
      Age: "T.A.",
      Year: "2942",
      Date: "22 June 2942",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo and Gandalf reach Rivendell after their adventures at the Lonely Mountain.",
      Age: "T.A.",
      Year: "2942",
      Date: "1 May 2942",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo and Gandalf reach Rivendell after their adventures at the Lonely Mountain.",
      Age: "T.A.",
      Year: "2942",
      Date: "1 May 2942",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo meets Gollum under the Misty Mountains and finds the One Ring.",
      Age: "T.A.",
      Year: "2941",
      Date: "1 July 2941",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo meets Gollum under the Misty Mountains and finds the One Ring.",
      Age: "T.A.",
      Year: "2941",
      Date: "1 July 2941",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo starts together with the dwarves and Gandalf his journey to the Lonely Mountain.",
      Age: "T.A.",
      Year: "2941",
      Date: "27 April 2941",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo starts together with the dwarves and Gandalf his journey to the Lonely Mountain.",
      Age: "T.A.",
      Year: "2941",
      Date: "27 April 2941",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo turns 111 and throws the Farewell Party at which he announces his intention to leave the Shire. He leaves behind the One Ring and sets off. Frodo turns 33 and comes of age. He inherits Bag End and all the things Bilbo leaves behind.",
      Age: "T.A.",
      Year: "3001",
      Date: "22 September 3001",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Bilbo turns 111 and throws the Farewell Party at which he announces his intention to leave the Shire. He leaves behind the One Ring and sets off. Frodo turns 33 and comes of age. He inherits Bag End and all the things Bilbo leaves behind.",
      Age: "T.A.",
      Year: "3001",
      Date: "22 September 3001",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Birthday of Frodo Baggins. Merry and Fredegar leave for Crickhollow with a cart of Frodo's belongings.",
      Age: "T.A.",
      Year: "3018",
      Date: "22 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Coronation of King Aragorn Elessar. He bids Faramir to remain Steward of Gondor.",
      Age: "T.A.",
      Year: "3019",
      Date: "1 May 3019",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Elrond makes a feast where Frodo meets Gloin. Elladan and Elrohir return and talk to Aragorn. Evening at the Hall of Fire where Frodo meets Bilbo Baggins.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 October 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Elrond makes a feast where Frodo meets Gloin. Elladan and Elrohir return and talk to Aragorn. Evening at the Hall of Fire where Frodo meets Bilbo Baggins.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 October 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Elrond makes a feast where Frodo meets Gloin. Elladan and Elrohir return and talk to Aragorn. Evening at the Hall of Fire where Frodo meets Bilbo Baggins.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 October 3018",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Faramir is rescued by Gandalf and Imrahil outside the gates of the City. He meets Pippin and reports to Denethor.",
      Age: "T.A.",
      Year: "3019",
      Date: "10 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Faramir takes Frodo and Sam to Henneth Annon. He learns about Frodo carrying the One Ring but does not try to take it.",
      Age: "T.A.",
      Year: "3019",
      Date: "7 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo Baggins awakes in Rivendell, recovered from his wound, and meets Gandalf.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 October 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo Baggins awakes in Rivendell, recovered from his wound, and meets Gandalf.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 October 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo Baggins is born.",
      Age: "T.A.",
      Year: "2968",
      Date: "22 September 2968",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and Sam leave Faramir at Henneth Annon with Gollum as their guide.",
      Age: "T.A.",
      Year: "3019",
      Date: "8 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and Sam leave Faramir at Henneth Annon with Gollum as their guide.",
      Age: "T.A.",
      Year: "3019",
      Date: "8 March 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and Sam meet the Last Riding of the Keepers of the Rings in Woody End.",
      Age: "T.A.",
      Year: "3021",
      Date: "22 September 3021",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and Samwise reach the Sammath Naur, the ring is destroyed, and Sauron defeated.",
      Age: "T.A.",
      Year: "3019",
      Date: "25 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and his companions reach Bree at night and stay at the Prancing Pony.",
      Age: "T.A.",
      Year: "3018",
      Date: "29 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo and his companions traverse the Barrow-downs and are captured by a Barrow-wight. Tom Bombadil rescues them, gives them weapons and four ponies and suggests to visit the Prancing Pony at Bree.",
      Age: "T.A.",
      Year: "3018",
      Date: "28 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo feels the pain return again.",
      Age: "T.A.",
      Year: "3020",
      Date: "6 October 3020",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo gets ill again, on the anniversary of his poisoning by Shelob.",
      Age: "T.A.",
      Year: "3021",
      Date: "13 March 3021",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo gets ill, on the anniversary of his poisoning by Shelob.",
      Age: "T.A.",
      Year: "3020",
      Date: "13 March 3020",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo hides in sight of the Morannon, and leaves at dusk.",
      Age: "T.A.",
      Year: "3019",
      Date: "5 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo is stabbed by Shelob and subsequently captured by the Orcs of Cirith Ungol.",
      Age: "T.A.",
      Year: "3019",
      Date: "13 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo, Sam and Gollum finally reach the end of the Dead Marshes.",
      Age: "T.A.",
      Year: "3019",
      Date: "2 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo, Sam and Gollum finally reach the end of the Dead Marshes.",
      Age: "T.A.",
      Year: "3019",
      Date: "2 March 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo, Sam and Gollum pass the Cross-roads, and see the Morgul-host set forth, towards Minas Tirith.",
      Age: "T.A.",
      Year: "3019",
      Date: "10 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo, Sam and Gollum pass the Cross-roads, and see the Morgul-host set forth, towards Minas Tirith.",
      Age: "T.A.",
      Year: "3019",
      Date: "10 March 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo, Sam and Gollum reach the Morgul Road at dusk.",
      Age: "T.A.",
      Year: "3019",
      Date: "9 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo, Sam and Gollum reach the Morgul Road at dusk.",
      Age: "T.A.",
      Year: "3019",
      Date: "9 March 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Frodo, Sam, Merry and Pippin enter the Old Forest leaving Fredegar Bolger behind to impersonate Frodo.",
      Age: "T.A.",
      Year: "3018",
      Date: "26 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Frodo, Sam, Pippin and Merry are arrested at Frogmorton.",
      Age: "T.A.",
      Year: "3019",
      Date: "1 November 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf and Erkenbrand show up and finish the Battle of the Hornburg.",
      Age: "T.A.",
      Year: "3019",
      Date: "4 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf and Pippin reach Minas Tirith.",
      Age: "T.A.",
      Year: "3019",
      Date: "9 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf and the Hobbits arrive at Rivendell.",
      Age: "T.A.",
      Year: "3019",
      Date: "21 September 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf and the four Hobbits leave Bree. Gandalf leaves to visit Tom Bombadil.",
      Age: "T.A.",
      Year: "3019",
      Date: "30 October 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf and the four Hobbits overtake Saruman. While Frodo and his friends go to Rivendell, Saruman heads straight for the Shire.",
      Age: "T.A.",
      Year: "3019",
      Date: "28 August 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf and the four Hobbits overtake Saruman. While Frodo and his friends go to Rivendell, Saruman heads straight for the Shire.",
      Age: "T.A.",
      Year: "3019",
      Date: "28 August 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf and the four Hobbits reach Bree at night, and find out much has changed since they last were there.",
      Age: "T.A.",
      Year: "3019",
      Date: "28 October 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf arrives at Edoras but is denied entrance.",
      Age: "T.A.",
      Year: "3018",
      Date: "19 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf arrives at Weathertop and leave a marked stone for Aragorn. Gandalf is attacked by the Black Riders at night.",
      Age: "T.A.",
      Year: "3018",
      Date: "3 October 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf arrives at Weathertop and leave a marked stone for Aragorn. Gandalf is attacked by the Black Riders at night.",
      Age: "T.A.",
      Year: "3018",
      Date: "3 October 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf arrives in Mirkwood and begins the questioning of Gollum.",
      Age: "T.A.",
      Year: "3018",
      Date: "23 March 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf arrives in Mirkwood and begins the questioning of Gollum.",
      Age: "T.A.",
      Year: "3018",
      Date: "23 March 3018",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf casts down the Balrog from the peak of Celebdil, and passes away afterwards. ",
      Age: "T.A.",
      Year: "3019",
      Date: "25 January 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf comes to Edoras and heals Thuooden. Oomer is released and Thoden holds his sword again.",
      Age: "T.A.",
      Year: "3019",
      Date: "2 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf crosses River Greyflood.",
      Age: "T.A.",
      Year: "3018",
      Date: "27 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf crosses the River Isen.",
      Age: "T.A.",
      Year: "3018",
      Date: "24 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf examines Bilbo's Ring and determines from its inscription that it is the One Ring. He tells Frodo of the Ring's history and Frodo volunteers to leave the Shire in order to secure the Ring.",
      Age: "T.A.",
      Year: "3018",
      Date: "13 April 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf examines Bilbo's Ring and determines from its inscription that it is the One Ring. He tells Frodo of the Ring's history and Frodo volunteers to leave the Shire in order to secure the Ring.",
      Age: "T.A.",
      Year: "3018",
      Date: "13 April 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf examines Bilbo's Ring and determines from its inscription that it is the One Ring. He tells Frodo of the Ring's history and Frodo volunteers to leave the Shire in order to secure the Ring.",
      Age: "T.A.",
      Year: "3018",
      Date: "13 April 3018",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf falls from the Bridge of Khazad-Dom with the balrog Durin's Bane.",
      Age: "T.A.",
      Year: "3019",
      Date: "15 January 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf gains entrance to Edoras and warns Theoden of Saruman. Theoden refuses to listen and sends Gandalf away.",
      Age: "T.A.",
      Year: "3018",
      Date: "20 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf imprisoned in Orthanc by Saruman. ",
      Age: "T.A.",
      Year: "3018",
      Date: "10 July 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf is rescued by Gwaihir from the top of Orthanc in the early hours.",
      Age: "T.A.",
      Year: "3018",
      Date: "18 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf leaves Mirkwood for the Shire.",
      Age: "T.A.",
      Year: "3018",
      Date: "29 March 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf leaves Rohan after taming Shadowfax.",
      Age: "T.A.",
      Year: "3018",
      Date: "23 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf meets Radagast.",
      Age: "T.A.",
      Year: "3018",
      Date: "22 June 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf pursues the Balrog to the peak of Celebdil.",
      Age: "T.A.",
      Year: "3019",
      Date: "23 January 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf reaches Hobbiton.",
      Age: "T.A.",
      Year: "3018",
      Date: "12 April 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf reaches Rivendell from the North and sends Shadowfax back to Rohan.",
      Age: "T.A.",
      Year: "3018",
      Date: "18 October 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf reaches Sarn Ford.",
      Age: "T.A.",
      Year: "3018",
      Date: "28 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf returns to life.",
      Age: "T.A.",
      Year: "3019",
      Date: "15 February 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf visits Bag End but Bilbo Baggins is missing. He talks with Holman Greenhand and realises Bilbo is the right person for the Quest for Erebor.",
      Age: "T.A.",
      Year: "2941",
      Date: "6 April 2941",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf visits Bag End but Bilbo Baggins is missing. He talks with Holman Greenhand and realises Bilbo is the right person for the Quest for Erebor.",
      Age: "T.A.",
      Year: "2941",
      Date: "6 April 2941",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf visits Bag End looking for somebody to take part in an adventure but Bilbo rejects the offer.",
      Age: "T.A.",
      Year: "2941",
      Date: "25 April 2941",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf visits Bag End looking for somebody to take part in an adventure but Bilbo rejects the offer.",
      Age: "T.A.",
      Year: "2941",
      Date: "25 April 2941",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf visits the Gaffer (Hamfast Gamgee).",
      Age: "T.A.",
      Year: "3018",
      Date: "29 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf, Frodo Baggins, Bilbo Baggins, Galadriel and Elrond leave Middle-earth and pass over the Sea.",
      Age: "T.A.",
      Year: "3021",
      Date: "29 September 3021",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf, Frodo Baggins, Bilbo Baggins, Galadriel and Elrond leave Middle-earth and pass over the Sea.",
      Age: "T.A.",
      Year: "3021",
      Date: "29 September 3021",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Gandalf, Frodo Baggins, Bilbo Baggins, Galadriel and Elrond leave Middle-earth and pass over the Sea.",
      Age: "T.A.",
      Year: "3021",
      Date: "29 September 3021",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf, Frodo, Sam, Merry and Pippin leave Rivendell.",
      Age: "T.A.",
      Year: "3019",
      Date: "5 October 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gandalf, Frodo, Sam, Merry and Pippin leave Rivendell.",
      Age: "T.A.",
      Year: "3019",
      Date: "5 October 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Glorfindel, Strider and the four hobbits reach the Ford of Bruinen where they are attacked by Black Riders. Frodo reaches the other riverside but the Riders are cast back by the water, their horses drown and their robes are destroyed.",
      Age: "T.A.",
      Year: "3018",
      Date: "20 October 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gollum begins to trail the Ring-bearer.",
      Age: "T.A.",
      Year: "3019",
      Date: "13 January 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gollum leads Frodo and Sam into Shelob's Lair.",
      Age: "T.A.",
      Year: "3019",
      Date: "12 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gollum leads Frodo and Sam into Shelob's Lair.",
      Age: "T.A.",
      Year: "3019",
      Date: "12 March 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Gwaihir bears Gandalf to Lothlrien.",
      Age: "T.A.",
      Year: "3019",
      Date: "17 February 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Pippin looks into the Orthanc-stone and a short time later a winged Nazg passes over the camp. In response, Gandalf sets out with the Hobbit for Minas Tirith.",
      Age: "T.A.",
      Year: "3019",
      Date: "5 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Shagrat is slain after bringing Frodo's cloak, mithril shirt and sword to Barad-d.",
      Age: "T.A.",
      Year: "3019",
      Date: "17 March 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Strider hides behind the hedge on the Road west of Bree and eavesdrops on Mr. Underhill. In the inn Frodo arouses attention by his sudden disappearance whereupon Strider warns him to be more careful and reveals himself as being Gandalf's friend.",
      Age: "T.A.",
      Year: "3018",
      Date: "29 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Strider hides behind the hedge on the Road west of Bree and eavesdrops on Mr. Underhill. In the inn Frodo arouses attention by his sudden disappearance whereupon Strider warns him to be more careful and reveals himself as being Gandalf's friend.",
      Age: "T.A.",
      Year: "3018",
      Date: "29 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Black Riders visit Saruman who lies that Gandalf has confessed, and gives them directions to the Shire.",
      Age: "T.A.",
      Year: "3018",
      Date: "18 September 3018",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Fellowship are ambushed near Sarn Gebir at night. A frightened Gollum flees to the eastern bank and hides in the Emyn Muil. A flying shadow approaches but Legolas shoots it with the bow of Galadriel.",
      Age: "T.A.",
      Year: "3019",
      Date: "23 February 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Fellowship leave Lothlorien. Gollum observes their departure and follows them as they travel south over the Anduin by boat.",
      Age: "T.A.",
      Year: "3019",
      Date: "16 February 3019",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Fellowship leave Moria and enter Dimrill Dale. Gimli, Frodo and Sam gaze in Mirrormere.",
      Age: "T.A.",
      Year: "3019",
      Date: "15 January 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Fellowship of the Ring rests in Lorien. Frodo is shown The Mirror of Galadriel.",
      Age: "T.A.",
      Year: "3019",
      Date: "15 February 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Hunters enter Fangorn and meets Gandalf the White. They set out for Edoras.",
      Age: "T.A.",
      Year: "3019",
      Date: "1 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The Ring-bearers Samwise and Frodo are honoured on the Field of Cormallen.",
      Age: "T.A.",
      Year: "3019",
      Date: "8 April 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The breaking of the Fellowship of the Ring. Merry and Pippin are captured by Orcs from the North, Mordor and Isengard. Boromir is slain trying to protect them and his horn is heard in Minas Tirith. Frodo and Samwise enter the eastern Emyn Muil.",
      Age: "T.A.",
      Year: "3019",
      Date: "26 February 3019",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The day after the Birthday Party, Frodo manages the inheritance of Bilbo's belongings, and keeps keen treasure-seekers out of Bag End.",
      Age: "T.A.",
      Year: "3001",
      Date: "23 September 3001",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The day after the Birthday Party, Frodo manages the inheritance of Bilbo's belongings, and keeps keen treasure-seekers out of Bag End.",
      Age: "T.A.",
      Year: "3001",
      Date: "23 September 3001",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The four Hobbits and Aragorn cross the Last Bridge and find the beryl left by Glorfindel.",
      Age: "T.A.",
      Year: "3018",
      Date: "13 October 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The four Hobbits and Aragorn reach Weathertop at noon. Their camp is raided by the Black Riders at night and Frodo is stabbed with a Morgul Blade by the Witch King.",
      Age: "T.A.",
      Year: "3018",
      Date: "6 October 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "The four Hobbits and Aragorn reach Weathertop at noon. Their camp is raided by the Black Riders at night and Frodo is stabbed with a Morgul Blade by the Witch King.",
      Age: "T.A.",
      Year: "3018",
      Date: "6 October 3018",
      Name: "Aragorn",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Thirteen dwarves and Gandalf arrive at Bag End. Bilbo learns of the Lonely Mountain and Smaug and agrees to accompany the dwarves and Gandalf on their adventure.",
      Age: "T.A.",
      Year: "2941",
      Date: "26 April 2941",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Thirteen dwarves and Gandalf arrive at Bag End. Bilbo learns of the Lonely Mountain and Smaug and agrees to accompany the dwarves and Gandalf on their adventure.",
      Age: "T.A.",
      Year: "2941",
      Date: "26 April 2941",
      Name: "Bilbo",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Thorin Oakenshield meets with Gandalf at the Prancing Pony in Bree. They agree on setting out on the Quest of Erebor.",
      Age: "T.A.",
      Year: "2941",
      Date: "15 March 2941",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event: "Thranduil is attacked in Mirkwood and Gollum escapes.",
      Age: "T.A.",
      Year: "3018",
      Date: "20 June 3018",
      Name: "Gollum",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Thoden, Gandalf and company reach Isengard and parley with Saruman. Saruman's staff is broken.",
      Age: "T.A.",
      Year: "3019",
      Date: "5 March 3019",
      Name: "Gandalf",
      DateD: new Date("June 10 1999")
    },
    {
      Event:
        "Two covered carts leave Bag End for Frodo's new house in Crickhollow. They convey the furniture and goods that Frodo has not sold by way of the Brandywine Bridge.",
      Age: "T.A.",
      Year: "3018",
      Date: "20 September 3018",
      Name: "Frodo",
      DateD: new Date("June 10 1999")
    }
  ];

  margin = { top: 20, right: 20, bottom: 60, left: 60 };
  width:any = 1000 - this.margin.left - this.margin.right;
  height:any = 600 - this.margin.top - this.margin.bottom;
   
  
  x: any;
  y: any;
  filteredData = this.data;
  svg: any;
  tooltip: any;
  xAxis: any;
  yAxis: any;
  clip: any;
  scatter: any;
  colour: any;
  g: any;
  brush: any;
  idleTimeout: any;
  idleDelay: any;
  y_axis: any;
  x_axis: any;
  xaxises: any;
  xAxisTop: any;
  xaxisesTop: any;
  heroesSelected: Array<string> = [];

  heroes: Array<any> = [
    {text: "Aragorn",value: "wp-aragorn",color: "rgba(68,	74,	230, 0.7)"},
    { text: "Gandalf", value: "wp-gandalf", color: "rgba(185,	2,	138, 0.7)" },
    { text: "Frodo", value: "wp-frodo", color: "rgba(150,	54,	1, 0.7)" },
    { text: "Gollum", value: "wp-gollum", color: " rgba(208,	24,	49, 0.7)" },
    { text: "Bilbo", value: "wp-bilbo", color: " rgba(208,	24,	49, 0.7)" }
    
  ];

  selectTrip() {
    Vue.nextTick(() => {
      this.changeTripsDisplay(this.heroes, this.heroesSelected);
    });
  }
  newx:any;
  newy:any;
  newXAxis:any;
  newXAxisTop:any;
  newYAxis:any;
  yshif:any;
  reDraw(numch:any)
  {
    console.log(this.filteredData)
    this.newx = d3
    .scaleTime()
    .domain([
      d3.min(this.filteredData, (d: any) => d.DateD),
      d3.max(this.filteredData, (d: any) => d.DateD)
    ])
    .range([this.margin.right, this.width - this.margin.left])
    .nice();
  this.newy = d3
    .scaleBand()
    .domain(this.filteredData.map(d => d.Name))
    .range([this.margin.top, this.height - this.margin.bottom]);

  this.newXAxis = d3.axisBottom(this.newx).tickPadding(2);
  this.newXAxisTop = d3.axisTop(this.newx).tickPadding(2);
  this.newYAxis = d3.axisLeft(this.newy);
  
  this.svg.selectAll("g.x.axis").call(this.newXAxis);
  this.svg.selectAll("g.x.axis").call(this.newXAxisTop);
  this.svg.selectAll("g.y.axis").call(this.newYAxis);
  this.yshif = "-4.5em";
console.log(numch)
  if(numch == 5 || numch == 0)
  {
    this.yshif = "-4.5em";

  }else if(numch == 1)
  {
    this.yshif = "-12.1em";
  }else if(numch == 2)
  {
    this.yshif = "-6.3em";
  }
  this.svg.selectAll("g.y.axis")
  .selectAll("text")
  .attr("dx", "-.8em")
  .attr("dy", this.yshif);
  this.colour = d3
  .scaleOrdinal()
  .domain(
    d3
      .map(this.data, function(d: any) {
        return d.Name;
      })
      .keys()
  )
  .range(d3.schemeCategory10);
  
  this.plotData(this.filteredData,this.newx,this.newy,numch);
  }

  draw()
  {
   
    this.tooltip = d3
    .select("#Timeline")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  this.data.forEach((d:any) => (d.DateD = new Date(d.Date)));
  this.x = d3
    .scaleTime()
    .domain([
      d3.min(this.data, (d: any) => d.DateD),
      d3.max(this.data, (d: any) => d.DateD)
    ])
    .range([this.margin.right, this.width - this.margin.left])
    .nice();

  this.y = d3
    .scaleBand()
    .domain(this.data.map(d => d.Name))
    .range([this.margin.top + 40, this.height - this.margin.bottom]);

  this.xAxis = d3.axisBottom(this.x).tickPadding(2);
  this.xAxisTop = d3.axisTop(this.x).tickPadding(2);
  this.yAxis = d3.axisLeft(this.y);

  this.svg = d3
    .select("#Timeline")
    .append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom);

  this.svg.call(
    d3
      .zoom()
      .scaleExtent([0, 500])
      .translateExtent([
        [0, 0],
        [this.width, this.height]
      ])
      .on("zoom", this.zoomx)
  );

  this.g = this.svg
    .append("g")
    .attr(
      "transform",
      "translate(" + this.margin.left + "," + this.margin.top + ")"
    );

  this.clip = this.g
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("x", 0)
    .attr("y", 0);

  this.scatter = this.g
    .append("g")
    .attr("id", "scatterplot")
    .attr("clip-path", "url(#clip)");

  this.colour = d3
    .scaleOrdinal()
    .domain(
      d3
        .map(this.data, function(d: any) {
          return d.Name;
        })
        .keys()
    )
    .range(d3.schemeCategory10);

  // x axis
  this.xaxises = this.g
    .append("g")
    .attr("class", "x axis")
    .attr("id", "axis--x")
    .attr("transform", "translate(0," + this.height + ")")
    .call(this.xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  this.xaxisesTop = this.g
    .append("g")
    .attr("class", "x axis")
    .attr("id", "axis--x")
    .call(this.xAxisTop);

  this.g
    .append("text")
    .style("text-anchor", "end")
    .attr("x", this.width)
    .attr("y", this.height - 8)
    .text("Date");

  // y axis
  const yAX = this.g
    .append("g")
    .attr("class", "y axis")
    .attr("id", "axis--y")
    .call(this.yAxis);

  yAX
    .selectAll("text")
    .attr("dx", "-.8em")
    .attr("dy", "-5.1em");

  this.g
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Character");
  this.plotData(this.data,this.x,this.y,5);
  }
  
  changeTripsDisplay(heroes: Array<any>, selectedTrips: Array<any>) {
    const sheroes:Array<any> = [];
    for (const hero of heroes) {
      if (selectedTrips.indexOf(hero.value) != -1) {
        console.log(hero.text)
        sheroes.push(hero.text)
      }
    }
    console.log("Erdem")
    console.log(sheroes)
    this.filteredData = this.data.filter((d:any)=>
        {
          return sheroes.includes(d.Name)
        }

        )
    console.log(this.filteredData.length)
    if (this.filteredData.length < 1)
    {
      this.filteredData = this.data
    }
    
    this.reDraw(sheroes.length)

  }
  getTooltipContent(d: any) {
    return `<b>${d.Name}</b>
        <br/>
        ${d.time} 
        
        ${d.event}
        <br/>
        `;
  }

  plotData(data: any,x:any,y:any,nofch:any) {
    let shift = 0;
    if (nofch==0)
    {
         shift = 0;
    }
    else{
     shift = 100/nofch-20;
    }
    console.log(shift)
    this.scatter.selectAll(".bubble").remove();
    this.scatter
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("r", 14)
      .attr("cx", (d: any) => {
        return x(d.DateD);
      })
      .attr("cy", (d: any) => {
        return y(d.Name)+shift;
      })
      .attr("opacity", 0.5)
      .style("fill", (d: any) => {
        return this.colour(d.Name);
      })
      .on("mouseover", (d: any) => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.7);
        this.tooltip
          .html("<b>" + d.Name + "</b>" + "<br/>" + d.Date + "<br/>" + d.Event)
          .style("left", d3.event.pageX + 8 + "px")
          .style("top", d3.event.pageY - 28 + "px")
          .style("background", "#d3d3d3");
      })
      .on("mouseout", (d: any) => {
        this.tooltip
          .style("opacity", 0)
          .style("left", d3.event.pageX + 1000 + "px")
          .style("top", d3.event.pageY - 2800 + "px");
      });
    //  this.scatter.append("g")
    // .attr("class", "brush")
    // .call(this.brush);
  }

  zoom() {
    this.xaxises
      .transition()
      .duration(10)
      .call(this.xAxis.scale(d3.event.transform.rescaleX(this.x)));
  }

  zoomx() {
    this.svg
      .selectAll("#axis--x")
      .transition()
      .duration(10)
      .call(this.xAxis.scale(d3.event.transform.rescaleX(this.x)));

    // .attr("transform", "rotate(-65)");

    const newxScale = d3.event.transform.rescaleX(this.x);

    this.svg.selectAll("circle").attr("cx", (d: any) => {
      return newxScale(d.DateD);
    });
  }
  mounted() {
    
    this.draw();
    

 
  }
}
