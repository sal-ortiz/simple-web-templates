# Simple Web Templates

### Create a WebTemplate Object
```let template = new WebTemplate();```

### Load a template into the WebTemplate object
```let promise = template.load('templates/template.html.template');```

The `load` function returns a JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Object, resolving when the requested template URL is loaded.

### Apply WebTemplate object to DOM Element
```
let element = document.getElementByTagName('body');
promise.then(baseTempl.render.bind(baseTempl, element);
```


### Apply WebTemplate object with data
The WebTemplate object can also be rendered with data provided to allow for customization of newly created DOM elements during the render process. Elements are addressed using CSS-style selectors.
```
let data = {
  'body #content p': {
      'innerHTML': 'a paragraph element has been populated!',
    },
    'body .classId img: [
      { 'src': 'https://i.pinimg.com/736x/40/48/19/404819bd83fbd80a7325b70a48511908.jpg', },
        { 'src': 'https://i.pinimg.com/564x/f4/44/e7/f444e7650cfec94d5b4b8a3b4e5736f3.jpg', },

    ],
    .body .classId: [
      { 'innerHTML': 'the first of many sharing the same class id.' },
    { 'innerHTML': 'the second of many sharing the same class id.' },
        { 'innerHTML': 'the first of many sharing the same class id.'},
    ],

}


let element = document.getElementByTagName('body');

promise.then(baseTempl.render.bind(baseTempl, element, data);
```


## Notes
* This tool is still very much in an early **Alpha testing** stage and not exactly fit for production use.
  * We make no guarantee of fitness, functionality, et al.
* Any code conventions and API details are currently unstable and very likely subject to change.
* We currently don't have much else for live examples.
  * What we do have is questionable, at best, and should not be used as any model for usage.
