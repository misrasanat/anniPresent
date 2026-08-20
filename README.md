# OurFlix - Anniversary Netflix

A Netflix-style anniversary gift with profile selection, video hero, memory galleries, and an animated poem slideshow.

## Setup

1. Add your media to the `assets` folder:
   - `main-video.mp4` - Your anniversary video montage
   - `memory1.jpg` through `memory8.jpg` - Photos for Memory Lane
   - `poem1.jpg` through `poem10.jpg` - Photos for the poem slideshow

2. Customize profile names in `app.js`:
   - Edit the `PROFILES` array at the top

3. Edit the poem in `app.js`:
   - Change the text in the `POEM_SLIDES` array

## Running OurFlix

Simply open `index.html` in your web browser!

Works perfectly on desktop and mobile devices.

## Customization

**Profile Names**: Edit `PROFILES` array in [app.js](app.js#L4)
**Poem Text**: Edit `POEM_SLIDES` array in [app.js](app.js#L20)
**Memory Photos**: Add/remove entries in `MEMORY_PHOTOS` array
**Colors**: Modify the Netflix red (#e50914) in [styles.css](styles.css)

## Features

- Netflix-style profile selection screen
- Hero video with autoplay
- Multiple scrolling content rows
- Memory gallery with hover effects
- Animated poem slideshow with auto-advance
- Fully responsive design
- Authentic Netflix UI/UX
