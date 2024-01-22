const version = '20240122051413';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/blogs/tech-posts/general/2018/08/22/hello-world/","/tracks/java/2016/08/29/java-advanced-copy/","/blogs/tech-posts/general/2016/08/29/example-post-three/","/blogs/process-posts/general/2016/08/29/management/","/blogs/tech-posts/history/external%20sources/2016/08/28/example-post-two/","/tracks/java/2016/08/27/java-fundamentals/","/blogs/tech-posts/general/external%20sources/2016/08/27/example-post-one/","/about/","/elements/","/levelup/","/","/assets/css/main.css","/manifest.json","/offline/","/assets/search.json","/search/","/assets/styles.css","/thanks/","/redirects.json","/sitemap.xml","/robots.txt","/blog/index.html","/blog/2/index.html","/blog/3/index.html","/java/index.html","/blog/process/index.html","/blog/tech/index.html","/blog/tech/2/index.html","/feed.xml","/assets/css/main.css.map","/assets/styles.css.map","/assets/logos/logo.svg", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
  ]
}

const updateStaticCache = () => {
  return caches.open(cacheName).then(cache => {
    return cache.addAll(buildContentBlob());
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    // Remove caches whose name is no longer valid.
    return Promise.all(
      keys
        .filter(key => {
          return key !== cacheName;
        })
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clearOldCache());
});

self.addEventListener("fetch", event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests from the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Default url returned if page isn't cached
  let offlineAsset = "/offline/";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    // If url requested is an image and isn't cached, return default offline image
    offlineAsset = "/assets/default-offline-image.png";
  }

  // For all urls request image from network, then fallback to cache, then fallback to offline page
  event.respondWith(
    fetch(request).catch(async () => {
      return (await caches.match(request)) || caches.match(offlineAsset);
    })
  );
  return;
});
