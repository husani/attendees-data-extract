# attendees-data-extract
Quick and dirty JavaScript to convert the HTML page of attendees of the 2016 White House LGBTQ Tech / Innovation Summit (#whlgbtqtech) into JSON data.

(If you just want the JSON, it's up at [https://gist.github.com/husani/39ea0b33d0df8a681340a0efcc73175e](https://gist.github.com/husani/39ea0b33d0df8a681340a0efcc73175e))


### What is this?
[Lesbians Who Tech](http://lesbianswhotech.org/) has a [list of all 2016 White House summit attendees](http://lesbianswhotech.org/attendees/), and I wanted a quick and dirty way to convert that HTML into JSON. That way, the data can be easily imported into a spreadsheet or other format for sorting, follow-ups, note-taking, etc.

This repo contains a downloaded version of the HTML page and some JavaScript to convert relevant HTML into an array of objects w/attendee info (headshot URL, name, job title, etc). Figured that people may want to modify how it is structured, add more info to the conversion process, etc. Hope this is useful to someone.

### How to use
Load index.html from a webserver (because Chrome doesn't like local ajax) and click extract. A textarea will appear from which you can copy the extracted JSON.