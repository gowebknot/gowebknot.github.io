# [Webknot Tech](https://gowebknot.github.io/)

This is a blog/levelup static aware jekyll page. At webknot we will use this to post any technical content. - Blogs, LevelUp tracks etc.

## How to write a Blog
* Create a new branch for your blog
* Navigate to the blogs directory and add your markdown(.md) blog in either process-posts/_posts or tech-posts/_posts based on the type of your blog.
* Refer to sample blogs or old blogs on how they are written
* Avoid writing any HTML/Javascript, unless absolutely required.
* For syntax refer Jekyll Markdown Syntax and Templates
* Raise a PR against the main branch, get it reviewed and merged. Github Actions should deploy your branch immediately.

### Custom fonts

Alembic comes with custom fonts served from Google fonts. By default it requests Merriweather but this can be any font from any provider assuming it supports requesting fonts in the same manner and does not require javascript.

This can be configured under the `custom_fonts` key.

- `urls`: The urls supplied to you from your font provider (eg https://fonts.googleapis.com/css2?family=Merriweather). For best performance try to use as few urls as possible
- `preconnect`: (optional) If your font provider serves the font files from another domain it can be useful to make a connection to that domain in advance. For example google load the font files from fonts.gstatic.com. This can be omitted if not required

If you want to customise this further you can find the include for custom fonts in `_includes/site-custom-fonts.html`.


## How to use pre-built include files

### `button.html`
A button that can link to a page of any kind.

Example usage: `{% include button.html text="I'm a button" link="https://david.darn.es" %}`

Available options:
- `text`: The text of the button _required_
- `link`: The link that the button goes to _required_
- `icon`: The icon that is added to the end of the button text
- `color`: The colour of the button

### `figure.html`
An image with optional caption.

Example usage: `{% include figure.html image="/uploads/feature-image.jpg" caption="Check out my photo" %}`

Available options:
- `image`: The image shown _required_
- `caption`: A caption to explain the image
- `position`: The position of the image; `left`, `right` or `center`
- `width` & `height`: Optional width and height attributes of the containing image


_The first item is the name of the network (must be one of the ones stated above) and the second is the colour of the button. To remove a button remove the line of the same name._

### `video.html`
A YouTube video.

Example usage: `{% include video.html id="zrkcGL5H3MU" %}`

Available options:
- `id`: The YouTube ID for the video _required_

### `map.html`
A Google map. _See Google [My Maps](https://www.google.com/mymaps)_

Example usage: `{% include map.html id="1UT-2Z-Vg_MG_TrS5X2p8SthsJhc" %}`

Available options:
- `id`: The map ID for the video _required_

### `site-form.html`
Adds a contact form to the page. This can be used with [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/docs/form-handling/) depending on your setup.

Example usage: `{% include site-form.html %}`

Available options:
- `netlify_form=true`: Set whether you would like to use Netlify Forms, otherwise the form will default to Formspree
- `name`: Give the form a name, by default the form is called "Contact". The name will be reflected when form submissions come through in Netlify or in your email client. The name is also used in the label and input elements for accessibility


Use the `email` option in the `/_config.yml` to change to the desired email.
