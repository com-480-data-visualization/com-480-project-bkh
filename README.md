# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Pavlo Karalupov | 293393 |
| Erdem Böcügöz   | 295097 |
| Mammad Hajili   | 294808 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### 1. Dataset

*Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.*

The [dataset](https://www.kaggle.com/paultimothymooney/lord-of-the-rings-data) we are using is from Kaggle, authored by originally Paul Mooney. It is about a famous fictional novel by J.R.R.Tolkien - *The Lord of the Rings*, and a film series based on the novel. The data originally contains two datasets - first one - *lotr_characters.csv* which is about the characters in the novel, and the second one - *lotr_scripts.csv*, the scripts from three films. 

First dataset contains the following features of characters: *Birth, Death, Gender, Hair, Height, Name, Race, Realm, Spouse*
Second dataset contains dialogs from movies and has 3 columns: *Char, Dialog, Movie*

Additionally, in the context of LOTR, we have found another interesting [source](http://tolkiengateway.net/wiki/Timeline) which includes timeline of events in LOTR world. This source provides multiple tables, each corresponds to one of the six ages - *"Years of the Lamps", "Years of the Trees", and First, Second, Third, and Fourth Age*. We have scraped the information from the tables using *BeautifulSoup* and build six datasets. The structure of the datasets are almost the same and each has two main columns: *Year, Event*.

### 2. Problematic

*Frame the general topic of your visualization and the main axis that you want to develop. What am I trying to show with my visualization? Think of an overview for the project, your motivation, and the target audience.*

Our project will illustrate the lifespan of the characters through different Middle-Earth ages, their interactions through the dialogues, analysis of their roles in each movie such as general sentiment, relations with events, and with each other's.

The main axis we would like to develop are the following:
- What are key characters, and how is their development through time starting from first age to the last?
- How is the link between main characters in movies? How their races, physical appearances and realms are important and relevant?
- How is the evolution of the events through time, what are their affects, and consequences in the novel, and in the context of films?

### 4. Related Work

- There are some works that allready done some analysis on the data and visualized the results. For example in [here](https://www.kaggle.com/xvivancos/analyzing-the-lord-of-the-rings-data) you can find very detailed analysis of the same data. Also [here](https://github.com/MokoSan/FSharpAdvent) you can find a more complex work on a similiar data.
- Our approach will be focused on interesting data analysis and interactive visualization simulteaniously. This way we beleive that we can tell a story from the data and not just show the statistical analysis. Also, as far as we found there is a lack of interactivity in previous works.
- We are inspired by one of the last year's projects that visualized a comic book dataset. You can find the project [here](https://exploringcomics.github.io). We thought that we can apply similiar logic to a dataset related to Lord of The Rings.
Of course, since the data and content is different, in the end they will be two seperate works.

## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

